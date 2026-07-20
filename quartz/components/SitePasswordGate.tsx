import { QuartzComponent, QuartzComponentConstructor } from "./types"
import styles from "./styles/sitePasswordGate.scss"
import { configuredSitePasswordHash } from "../sitePassword"

type SitePasswordGateOptions = {
  passwordHash?: string
  sessionMinutes?: number
  idleMinutes?: number
  storageKey?: string
}

type SitePasswordGateConfig = {
  passwordHash: string
  sessionMs: number
  idleMs: number
  storageKey: string
}

function readMinutes(value: string | undefined, fallback: number): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

function normalizePasswordHash(value: string | undefined): string {
  const hash = value?.trim().toLowerCase() ?? ""
  if (hash !== "" && !/^[a-f0-9]{64}$/.test(hash)) {
    throw new Error("QUARTZ_SITE_PASSWORD_HASH must be a 64-character SHA-256 hex digest")
  }

  return hash
}

function clientConfig(options?: SitePasswordGateOptions): SitePasswordGateConfig {
  const sessionMinutes =
    options?.sessionMinutes ?? readMinutes(process.env.QUARTZ_SITE_SESSION_MINUTES, 12 * 60)
  const idleMinutes = options?.idleMinutes ?? readMinutes(process.env.QUARTZ_SITE_IDLE_MINUTES, 60)

  return {
    passwordHash: normalizePasswordHash(options?.passwordHash ?? configuredSitePasswordHash),
    sessionMs: Math.round(sessionMinutes * 60 * 1000),
    idleMs: Math.round(idleMinutes * 60 * 1000),
    storageKey: options?.storageKey ?? "quartz-site-auth-v1",
  }
}

function beforeDOMLoadedScript(config: SitePasswordGateConfig): string {
  return `
    const config = ${JSON.stringify(config)};
    window.__quartzSiteAuth = config;

    function readSession() {
      try {
        return JSON.parse(localStorage.getItem(config.storageKey) || "null");
      } catch (_) {
        return null;
      }
    }

    function hasValidSession(now) {
      if (!config.passwordHash) return true;
      const session = readSession();
      if (!session || session.passwordHash !== config.passwordHash) return false;
      if (!Number.isFinite(session.expiresAt) || session.expiresAt <= now) return false;
      if (config.idleMs > 0 && (!Number.isFinite(session.lastSeenAt) || session.lastSeenAt + config.idleMs <= now)) {
        return false;
      }
      return true;
    }

    document.documentElement.setAttribute(
      "site-auth",
      hasValidSession(Date.now()) ? "unlocked" : "locked",
    );
  `
}

function afterDOMLoadedScript(config: SitePasswordGateConfig): string {
  return `
    const config = window.__quartzSiteAuth || ${JSON.stringify(config)};
    const root = document.documentElement;

    if (!config.passwordHash) {
      root.setAttribute("site-auth", "unlocked");
      return;
    }

    function readSession() {
      try {
        return JSON.parse(localStorage.getItem(config.storageKey) || "null");
      } catch (_) {
        return null;
      }
    }

    function writeSession(session) {
      try {
        localStorage.setItem(config.storageKey, JSON.stringify(session));
      } catch (_) {}
    }

    function clearSession() {
      try {
        localStorage.removeItem(config.storageKey);
      } catch (_) {}
    }

    function hasValidSession(now) {
      const session = readSession();
      if (!session || session.passwordHash !== config.passwordHash) return false;
      if (!Number.isFinite(session.expiresAt) || session.expiresAt <= now) return false;
      if (config.idleMs > 0 && (!Number.isFinite(session.lastSeenAt) || session.lastSeenAt + config.idleMs <= now)) {
        return false;
      }
      return true;
    }

    function formatDuration(ms) {
      const minutes = Math.round(ms / 60000);
      if (minutes >= 60) {
        const hours = minutes / 60;
        return Number.isInteger(hours) ? hours + " 小时" : hours.toFixed(1) + " 小时";
      }
      return minutes + " 分钟";
    }

    async function sha256Hex(value) {
      const bytes = new TextEncoder().encode(value);
      const digest = await crypto.subtle.digest("SHA-256", bytes);
      return Array.from(new Uint8Array(digest))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
    }

    function ensureGate(message) {
      let gate = document.getElementById("site-password-gate");
      if (!gate) {
        gate = document.createElement("div");
        gate.id = "site-password-gate";
        gate.innerHTML = \`
          <div class="site-password-card" role="dialog" aria-modal="true" aria-labelledby="site-password-title">
            <p class="site-password-kicker">Private Research Space</p>
            <h1 id="site-password-title">Quantum Universe</h1>
            <p class="site-password-copy">请输入访问密码后继续浏览。</p>
            <form class="site-password-form">
              <label for="site-password-input">访问密码</label>
              <div class="site-password-row">
                <input id="site-password-input" name="password" type="password" autocomplete="current-password" required />
                <button type="submit">进入</button>
              </div>
              <p class="site-password-error" aria-live="polite"></p>
            </form>
            <p class="site-password-hint">本浏览器解锁有效期为 \${formatDuration(config.sessionMs)}；闲置 \${formatDuration(config.idleMs)} 后会重新锁定。</p>
          </div>
        \`;
        document.body.appendChild(gate);

        const form = gate.querySelector(".site-password-form");
        const input = gate.querySelector("#site-password-input");
        const button = gate.querySelector("button");
        const error = gate.querySelector(".site-password-error");

        form.addEventListener("submit", async (event) => {
          event.preventDefault();
          error.textContent = "";
          button.disabled = true;

          try {
            const hash = await sha256Hex(input.value);
            if (hash !== config.passwordHash) {
              error.textContent = "密码不正确。";
              input.select();
              return;
            }

            const now = Date.now();
            writeSession({
              passwordHash: config.passwordHash,
              expiresAt: now + config.sessionMs,
              lastSeenAt: now,
            });
            root.setAttribute("site-auth", "unlocked");
            input.value = "";
          } catch (_) {
            error.textContent = "当前浏览器无法完成密码验证。";
          } finally {
            button.disabled = false;
          }
        });
      }

      const error = gate.querySelector(".site-password-error");
      if (message && error) error.textContent = message;

      if (root.getAttribute("site-auth") === "locked") {
        const input = gate.querySelector("#site-password-input");
        window.setTimeout(() => input?.focus(), 50);
      }
    }

    function lock(message) {
      clearSession();
      root.setAttribute("site-auth", "locked");
      ensureGate(message);
    }

    function unlockIfValid() {
      if (hasValidSession(Date.now())) {
        root.setAttribute("site-auth", "unlocked");
      } else {
        lock();
      }
    }

    function touchSession() {
      const now = Date.now();
      if (!hasValidSession(now)) {
        lock("会话已过期，请重新输入密码。");
        return;
      }

      const session = readSession();
      if (!session || now - session.lastSeenAt < 30000) return;
      session.lastSeenAt = now;
      writeSession(session);
    }

    unlockIfValid();
    ensureGate();

    for (const eventName of ["click", "keydown", "mousemove", "scroll", "touchstart"]) {
      window.addEventListener(eventName, touchSession, { passive: true });
    }

    window.setInterval(() => {
      if (root.getAttribute("site-auth") === "unlocked" && !hasValidSession(Date.now())) {
        lock("会话已过期，请重新输入密码。");
      }
    }, 30000);
  `
}

export default ((options?: SitePasswordGateOptions) => {
  const config = clientConfig(options)

  const SitePasswordGate: QuartzComponent = () => null

  if (config.passwordHash) {
    SitePasswordGate.beforeDOMLoaded = beforeDOMLoadedScript(config)
    SitePasswordGate.afterDOMLoaded = afterDOMLoadedScript(config)
    SitePasswordGate.css = styles
  }

  return SitePasswordGate
}) satisfies QuartzComponentConstructor<SitePasswordGateOptions | undefined>
