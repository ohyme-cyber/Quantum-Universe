import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import topicLinks from "../../content/topic-links.json"

const TopicGraph = ({ displayClass, fileData }: QuartzComponentProps) => {
  // 只在首页显示
  if (fileData.slug !== "index" && fileData.slug !== "") return null
  const topicLinksJson = JSON.stringify(topicLinks).replace(/</g, "\\u003c")

  return (
    <div id="topic-graph-container" className={classNames(displayClass, "topic-graph-container")}>
      <div className="graph-header">
        <div>
          <h3>课题关联图谱</h3>
          <p>topic 是节点，已有研究结果是连线；悬停连线查看摘要，点击进入详情。</p>
        </div>
        <button id="graph-maximize-btn" type="button" aria-expanded="false">
          全屏查看
        </button>
      </div>

      <div id="topic-graph-root" aria-label="课题关联图谱">
        <p id="graph-status-text">量子绘图引擎准备中...</p>
      </div>

      <script
        id="topic-graph-data"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: topicLinksJson }}
      />
    </div>
  )
}

TopicGraph.afterDOMLoaded = `
  let topicGraphCleanup = null;

  const topicGraphSvgNS = "http://www.w3.org/2000/svg";

  function topicGraphEscapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function topicGraphRouteTo(target) {
    if (!target) return;
    const url = String(target);
    if (/^https?:\\/\\//i.test(url)) {
      window.open(url, "_blank", "noopener");
      return;
    }

    const next = new URL(url.replace(/^\\/+/, ""), window.location.href);
    if (window.spaNavigate) {
      window.spaNavigate(next);
    } else {
      window.location.assign(next.href);
    }
  }

  function topicGraphLinkLabel(link) {
    return link.title || link.result || link.idea || link.research || link.paper || "";
  }

  function topicGraphRender() {
    if (topicGraphCleanup) {
      topicGraphCleanup();
      topicGraphCleanup = null;
    }

    const container = document.getElementById("topic-graph-container");
    const root = document.getElementById("topic-graph-root");
    const dataEl = document.getElementById("topic-graph-data");
    const btn = document.getElementById("graph-maximize-btn");
    if (!container || !root || !dataEl) return;

    let links = [];
    try {
      const parsed = JSON.parse(dataEl.textContent || "[]");
      links = Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      root.innerHTML = '<p id="graph-status-text">topic-links.json 解析失败，请检查 JSON 格式。</p>';
      console.warn("[TopicGraph] Invalid topic-links.json", err);
      return;
    }

    links = links
      .filter((link) => link && link.source && link.target)
      .map((link, index) => ({
        ...link,
        index,
        source: String(link.source),
        target: String(link.target),
      }));

    root.innerHTML = "";
    if (links.length === 0) {
      root.innerHTML = '<p id="graph-status-text">还没有研究关联。请在 content/topic-links.json 中添加 source / target / idea / page。</p>';
      return;
    }

    const width = Math.max(root.clientWidth || container.clientWidth, 320);
    const height = container.classList.contains("maximized")
      ? Math.max(window.innerHeight - 96, 360)
      : Math.max(root.clientHeight || 420, 360);

    const tooltip = document.createElement("div");
    tooltip.className = "topic-graph-tooltip";
    tooltip.hidden = true;
    container.appendChild(tooltip);

    const svg = document.createElementNS(topicGraphSvgNS, "svg");
    svg.setAttribute("viewBox", "0 0 " + width + " " + height);
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", String(height));
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "课题关联图谱");
    root.appendChild(svg);

    const linkLayer = document.createElementNS(topicGraphSvgNS, "g");
    const hitLayer = document.createElementNS(topicGraphSvgNS, "g");
    const labelLayer = document.createElementNS(topicGraphSvgNS, "g");
    const nodeLayer = document.createElementNS(topicGraphSvgNS, "g");
    svg.append(linkLayer, hitLayer, labelLayer, nodeLayer);

    const nodeById = new Map();
    for (const link of links) {
      if (!nodeById.has(link.source)) nodeById.set(link.source, { id: link.source, degree: 0 });
      if (!nodeById.has(link.target)) nodeById.set(link.target, { id: link.target, degree: 0 });
      nodeById.get(link.source).degree += 1;
      nodeById.get(link.target).degree += 1;
    }

    const nodes = Array.from(nodeById.values()).map((node, index, all) => {
      const angle = (Math.PI * 2 * index) / Math.max(all.length, 1);
      const radius = Math.min(width, height) * 0.28;
      return {
        ...node,
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
      };
    });

    const positionedNodeById = new Map(nodes.map((node) => [node.id, node]));
    const graphLinks = links.map((link) => ({
      ...link,
      sourceNode: positionedNodeById.get(link.source),
      targetNode: positionedNodeById.get(link.target),
    }));

    function moveTooltip(event) {
      const bounds = container.getBoundingClientRect();
      const x = Math.min(Math.max(event.clientX - bounds.left + 16, 12), bounds.width - 280);
      const y = Math.min(Math.max(event.clientY - bounds.top + 16, 12), bounds.height - 120);
      tooltip.style.left = x + "px";
      tooltip.style.top = y + "px";
    }

    function showLinkTooltip(link, event) {
      const title = topicGraphLinkLabel(link) || link.source + " ↔ " + link.target;
      const body = link.idea || link.result || link.research || "暂无摘要。";
      const detail = link.page || link.href || link.url
        ? '<div class="topic-graph-tooltip-hint">点击连线查看详情</div>'
        : '<div class="topic-graph-tooltip-hint">在 JSON 中添加 page 后可跳转详情页</div>';
      tooltip.innerHTML =
        "<strong>" + topicGraphEscapeHtml(title) + "</strong>" +
        "<p>" + topicGraphEscapeHtml(body) + "</p>" +
        detail;
      tooltip.hidden = false;
      moveTooltip(event);
    }

    function showNodeTooltip(node, event) {
      tooltip.innerHTML =
        "<strong>" + topicGraphEscapeHtml(node.id) + "</strong>" +
        "<p>关联数：" + node.degree + "。点击节点可打开对应 tag 页面。</p>";
      tooltip.hidden = false;
      moveTooltip(event);
    }

    function hideTooltip() {
      tooltip.hidden = true;
    }

    const linkEls = graphLinks.map((link) => {
      const line = document.createElementNS(topicGraphSvgNS, "line");
      line.setAttribute("class", "topic-link-line");
      linkLayer.appendChild(line);

      const hit = document.createElementNS(topicGraphSvgNS, "line");
      hit.setAttribute("class", "topic-link-hit");
      hit.setAttribute("tabindex", "0");
      hit.setAttribute("role", "link");
      hit.setAttribute("aria-label", link.source + " 到 " + link.target + " 的研究关联");
      hitLayer.appendChild(hit);

      const label = document.createElementNS(topicGraphSvgNS, "text");
      label.setAttribute("class", "topic-link-label");
      label.textContent = topicGraphLinkLabel(link).slice(0, 56);
      labelLayer.appendChild(label);

      hit.addEventListener("pointerenter", (event) => showLinkTooltip(link, event));
      hit.addEventListener("pointermove", moveTooltip);
      hit.addEventListener("pointerleave", hideTooltip);
      hit.addEventListener("click", () => topicGraphRouteTo(link.page || link.href || link.url));
      hit.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          topicGraphRouteTo(link.page || link.href || link.url);
        }
      });

      return { link, line, hit, label };
    });

    const nodeEls = nodes.map((node) => {
      const group = document.createElementNS(topicGraphSvgNS, "g");
      group.setAttribute("class", "topic-node");
      group.setAttribute("tabindex", "0");
      group.setAttribute("role", "link");
      group.setAttribute("aria-label", "Topic " + node.id);
      nodeLayer.appendChild(group);

      const circle = document.createElementNS(topicGraphSvgNS, "circle");
      circle.setAttribute("r", String(7 + Math.min(node.degree, 6)));
      group.appendChild(circle);

      const label = document.createElementNS(topicGraphSvgNS, "text");
      label.textContent = node.id;
      group.appendChild(label);

      group.addEventListener("pointerenter", (event) => showNodeTooltip(node, event));
      group.addEventListener("pointermove", moveTooltip);
      group.addEventListener("pointerleave", hideTooltip);
      group.addEventListener("click", () => topicGraphRouteTo("tags/" + encodeURIComponent(node.id)));
      group.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          topicGraphRouteTo("tags/" + encodeURIComponent(node.id));
        }
      });

      return { node, group };
    });

    function renderPositions() {
      for (const item of linkEls) {
        const source = item.link.sourceNode;
        const target = item.link.targetNode;
        item.line.setAttribute("x1", source.x);
        item.line.setAttribute("y1", source.y);
        item.line.setAttribute("x2", target.x);
        item.line.setAttribute("y2", target.y);
        item.hit.setAttribute("x1", source.x);
        item.hit.setAttribute("y1", source.y);
        item.hit.setAttribute("x2", target.x);
        item.hit.setAttribute("y2", target.y);
        item.label.setAttribute("x", String((source.x + target.x) / 2));
        item.label.setAttribute("y", String((source.y + target.y) / 2 - 8));
      }

      for (const item of nodeEls) {
        item.group.setAttribute("transform", "translate(" + item.node.x + " " + item.node.y + ")");
      }
    }

    let alpha = 1;
    let frame = 0;
    let stopped = false;

    function step() {
      if (stopped) return;

      for (const link of graphLinks) {
        const source = link.sourceNode;
        const target = link.targetNode;
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
        const desired = 130;
        const force = (distance - desired) * 0.006 * alpha;
        const fx = (dx / distance) * force;
        const fy = (dy / distance) * force;
        source.vx += fx;
        source.vy += fy;
        target.vx -= fx;
        target.vy -= fy;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distanceSq = Math.max(dx * dx + dy * dy, 80);
          const distance = Math.sqrt(distanceSq);
          const force = (650 / distanceSq) * alpha;
          const fx = (dx / distance) * force;
          const fy = (dy / distance) * force;
          a.vx -= fx;
          a.vy -= fy;
          b.vx += fx;
          b.vy += fy;
        }
      }

      for (const node of nodes) {
        node.vx += (width / 2 - node.x) * 0.012 * alpha;
        node.vy += (height / 2 - node.y) * 0.012 * alpha;
        node.vx *= 0.84;
        node.vy *= 0.84;
        node.x = Math.min(Math.max(node.x + node.vx, 36), width - 36);
        node.y = Math.min(Math.max(node.y + node.vy, 36), height - 36);
      }

      renderPositions();
      alpha *= 0.985;
      if (alpha > 0.03) frame = window.requestAnimationFrame(step);
    }

    renderPositions();
    frame = window.requestAnimationFrame(step);

    function rerenderSoon() {
      window.setTimeout(topicGraphRender, 180);
    }

    if (btn) {
      btn.onclick = (event) => {
        event.preventDefault();
        const isMaximized = container.classList.toggle("maximized");
        btn.textContent = isMaximized ? "退出全屏" : "全屏查看";
        btn.setAttribute("aria-expanded", String(isMaximized));
        rerenderSoon();
      };
    }

    window.addEventListener("resize", rerenderSoon);
    topicGraphCleanup = () => {
      stopped = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", rerenderSoon);
      tooltip.remove();
    };
  }

  document.addEventListener("nav", topicGraphRender);
  window.requestAnimationFrame(topicGraphRender);
`

export default (() => TopicGraph) satisfies QuartzComponentConstructor
