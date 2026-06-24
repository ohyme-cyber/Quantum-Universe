import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative } from "../util/path"
import { classNames } from "../util/lang"
import topicLinks from "../../content/topic-links.json"

type TopicLink = {
  source?: string
  target?: string
  title?: string
  idea?: string
  result?: string
  research?: string
  summary?: string
  page?: string
  href?: string
  url?: string
  created?: string
  date?: string
  updated?: string
  modified?: string
  status?: string
  priority?: string
  thread?: string
  next?: string
}

type RelationRecord = {
  source: string
  target: string
  title: string
  summary: string
  slug?: FullSlug
  status: string
  priority: string
  thread: string
  date: string
  index: number
}

type Frontmatter = Record<string, unknown>

const closedStatuses = new Set(["done", "closed", "complete", "completed", "finished"])
const priorityRank = new Map([
  ["high", 0],
  ["medium", 1],
  ["low", 2],
])

function readString(value: unknown): string | undefined {
  if (value instanceof Date) return value.toISOString()
  if (typeof value === "string" && value.trim() !== "") return value.trim()
  if (typeof value === "number") return String(value)
}

function readStringList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(readString).filter((item): item is string => !!item)
  const single = readString(value)
  return single ? [single] : []
}

function normalizeSlug(target: string | undefined): FullSlug | undefined {
  if (!target || /^https?:\/\//i.test(target)) return undefined
  return target.replace(/^\/+/, "") as FullSlug
}

function sortDate(value: string): number {
  const parsed = Date.parse(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function displayDate(value: string): string {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
  }).format(parsed)
}

const ResearchDashboard: QuartzComponent = ({
  allFiles,
  displayClass,
  fileData,
}: QuartzComponentProps) => {
  if (fileData.slug !== "index" && fileData.slug !== "") return null

  const fileBySlug = new Map(allFiles.filter((file) => file.slug).map((file) => [file.slug, file]))
  const relationBySlug = new Map<FullSlug, RelationRecord>()

  const relationLinks = (topicLinks as TopicLink[])
    .map((link, index): RelationRecord | null => {
      const slug = normalizeSlug(link.page ?? link.href ?? link.url)
      if (!link.source || !link.target) return null

      const page = slug ? fileBySlug.get(slug) : undefined
      const frontmatter = (page?.frontmatter ?? {}) as Frontmatter
      const date =
        readString(frontmatter.modified) ??
        readString(frontmatter.updated) ??
        readString(link.modified) ??
        readString(link.updated) ??
        readString(frontmatter.created) ??
        readString(frontmatter.date) ??
        readString(link.created) ??
        readString(link.date) ??
        ""

      const relation: RelationRecord = {
        source: link.source,
        target: link.target,
        title: readString(frontmatter.title) ?? link.title ?? `${link.source} ↔ ${link.target}`,
        summary:
          readString(frontmatter.summary) ??
          link.summary ??
          link.idea ??
          link.result ??
          link.research ??
          "",
        slug,
        status: (readString(frontmatter.status) ?? link.status ?? "open").toLowerCase(),
        priority: (readString(frontmatter.priority) ?? link.priority ?? "medium").toLowerCase(),
        thread:
          readString(frontmatter.thread) ??
          readString(frontmatter.next) ??
          link.thread ??
          link.next ??
          "",
        date,
        index,
      }

      if (slug) relationBySlug.set(slug, relation)
      return relation
    })
    .filter((relation): relation is RelationRecord => relation !== null)

  for (const file of allFiles) {
    if (!file.slug || relationBySlug.has(file.slug)) continue
    const frontmatter = (file.frontmatter ?? {}) as Frontmatter
    const tags = readStringList(frontmatter.tags)
    const isRelation =
      file.slug.startsWith("topic-relations/") || tags.some((tag) => tag === "topic-relation")
    if (!isRelation) continue

    const topicTags = tags.filter((tag) => tag !== "topic-relation")
    const source = readString(frontmatter.source) ?? topicTags[0]
    const target = readString(frontmatter.target) ?? topicTags[1]
    if (!source || !target) continue

    relationBySlug.set(file.slug, {
      source,
      target,
      title: readString(frontmatter.title) ?? `${source} ↔ ${target}`,
      summary: readString(frontmatter.summary) ?? "",
      slug: file.slug,
      status: (readString(frontmatter.status) ?? "open").toLowerCase(),
      priority: (readString(frontmatter.priority) ?? "medium").toLowerCase(),
      thread: readString(frontmatter.thread) ?? readString(frontmatter.next) ?? "",
      date:
        readString(frontmatter.modified) ??
        readString(frontmatter.updated) ??
        readString(frontmatter.created) ??
        readString(frontmatter.date) ??
        "",
      index: relationBySlug.size + relationLinks.length,
    })
  }

  const relations = Array.from(relationBySlug.values())
  const openThreads = relations
    .filter((relation) => !closedStatuses.has(relation.status))
    .sort((a, b) => {
      const priorityDiff = (priorityRank.get(a.priority) ?? 1) - (priorityRank.get(b.priority) ?? 1)
      if (priorityDiff !== 0) return priorityDiff
      return sortDate(b.date) - sortDate(a.date) || a.index - b.index
    })
    .slice(0, 5)

  const recentlyLinked = [...relationLinks]
    .sort((a, b) => sortDate(b.date) - sortDate(a.date) || b.index - a.index)
    .slice(0, 5)

  if (openThreads.length === 0 && recentlyLinked.length === 0) return null

  const renderRelationLink = (relation: RelationRecord, className: string) => {
    if (!relation.slug) return <span class={className}>{relation.title}</span>

    return (
      <a class={`${className} internal`} href={resolveRelative(fileData.slug!, relation.slug)}>
        {relation.title}
      </a>
    )
  }

  return (
    <aside class={classNames(displayClass, "research-dashboard")} aria-label="Research dashboard">
      <section class="research-widget research-open-threads">
        <h3>Open Threads</h3>
        {openThreads.length > 0 ? (
          <ul>
            {openThreads.map((relation) => (
              <li>
                <div class="research-widget-row">
                  {renderRelationLink(relation, "research-widget-title")}
                  <span class={`research-status research-status-${relation.status}`}>
                    {relation.status}
                  </span>
                </div>
                <p class="research-widget-topics">
                  {relation.source} ↔ {relation.target}
                </p>
                {relation.thread && <p class="research-widget-note">{relation.thread}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <p class="research-widget-empty">暂无未完成线索。</p>
        )}
      </section>

      <section class="research-widget research-recent-links">
        <h3>Recently Linked</h3>
        {recentlyLinked.length > 0 ? (
          <ul>
            {recentlyLinked.map((relation) => (
              <li>
                <div class="research-widget-row">
                  {renderRelationLink(relation, "research-widget-title")}
                  {relation.date && (
                    <span class="research-widget-date">{displayDate(relation.date)}</span>
                  )}
                </div>
                <p class="research-widget-topics">
                  {relation.source} ↔ {relation.target}
                </p>
                {relation.summary && <p class="research-widget-note">{relation.summary}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <p class="research-widget-empty">暂无新增关联。</p>
        )}
      </section>
    </aside>
  )
}

ResearchDashboard.css = ``

export default (() => ResearchDashboard) satisfies QuartzComponentConstructor
