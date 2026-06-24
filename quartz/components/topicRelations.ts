import { FullSlug } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import fallbackTopicLinks from "../../content/topic-links.json"

type Frontmatter = Record<string, unknown>

type LegacyTopicLink = {
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

export type TopicNodeRecord = {
  id: string
  title?: string
  summary?: string
  page?: FullSlug
}

export type TopicRelationRecord = {
  source: string
  target: string
  title: string
  summary: string
  idea: string
  page?: FullSlug
  slug?: FullSlug
  status: string
  priority: string
  thread: string
  date: string
  index: number
}

export type TopicRelationData = {
  nodes: TopicNodeRecord[]
  links: TopicRelationRecord[]
}

const reservedTopicTags = new Set(["topic-relation", "topic-node"])

export const closedTopicRelationStatuses = new Set([
  "done",
  "closed",
  "complete",
  "completed",
  "finished",
])

export const topicRelationPriorityRank = new Map([
  ["high", 0],
  ["medium", 1],
  ["low", 2],
])

export function readTopicString(value: unknown): string | undefined {
  if (value instanceof Date) return value.toISOString()
  if (typeof value === "string" && value.trim() !== "") return value.trim()
  if (typeof value === "number") return String(value)
}

export function readTopicStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(readTopicString).filter((item): item is string => !!item)
  }

  const single = readTopicString(value)
  if (!single) return []
  return single
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}

export function topicSortDate(value: string): number {
  const parsed = Date.parse(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export function displayTopicDate(value: string): string {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
  }).format(parsed)
}

function readFirst(frontmatter: Frontmatter, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = readTopicString(frontmatter[key])
    if (value) return value
  }
}

function readFirstList(frontmatter: Frontmatter, keys: string[]): string[] {
  for (const key of keys) {
    const value = readTopicStringList(frontmatter[key])
    if (value.length > 0) return value
  }

  return []
}

function normalizeSlug(target: string | undefined): FullSlug | undefined {
  if (!target || /^https?:\/\//i.test(target)) return undefined
  return target.replace(/^\/+/, "") as FullSlug
}

function cleanTopicTags(tags: string[]): string[] {
  return tags.filter((tag) => !reservedTopicTags.has(tag.toLowerCase()))
}

function isTopicRelation(
  file: QuartzPluginData,
  tags: string[],
  frontmatter: Frontmatter,
): boolean {
  return (
    Boolean(file.slug?.startsWith("topic-relations/")) ||
    tags.some((tag) => tag.toLowerCase() === "topic-relation") ||
    readTopicString(frontmatter.kind)?.toLowerCase() === "topic-relation" ||
    readTopicString(frontmatter.type)?.toLowerCase() === "topic-relation"
  )
}

function isTopicNode(file: QuartzPluginData, tags: string[], frontmatter: Frontmatter): boolean {
  return (
    Boolean(file.slug?.startsWith("topics/")) ||
    tags.some((tag) => tag.toLowerCase() === "topic-node") ||
    readTopicString(frontmatter.kind)?.toLowerCase() === "topic-node" ||
    readTopicString(frontmatter.type)?.toLowerCase() === "topic-node"
  )
}

function readTopicPair(frontmatter: Frontmatter, tags: string[]): [string, string] | undefined {
  const source = readFirst(frontmatter, ["source", "topic_source", "topicSource", "from"])
  const target = readFirst(frontmatter, ["target", "topic_target", "topicTarget", "to"])
  if (source && target) return [source, target]

  const topics = readFirstList(frontmatter, ["topics", "relation_topics", "relationTopics"])
  if (topics.length >= 2) return [topics[0], topics[1]]

  const topicTags = cleanTopicTags(tags)
  if (topicTags.length >= 2) return [topicTags[0], topicTags[1]]
}

function readRelationDate(frontmatter: Frontmatter, fallback?: LegacyTopicLink): string {
  return (
    readTopicString(frontmatter.modified) ??
    readTopicString(frontmatter.updated) ??
    readTopicString(fallback?.modified) ??
    readTopicString(fallback?.updated) ??
    readTopicString(frontmatter.created) ??
    readTopicString(frontmatter.date) ??
    readTopicString(fallback?.created) ??
    readTopicString(fallback?.date) ??
    ""
  )
}

function relationKey(relation: Pick<TopicRelationRecord, "source" | "target" | "slug">): string {
  if (relation.slug) return `slug:${relation.slug}`
  return `pair:${relation.source}→${relation.target}`
}

export function getTopicRelationData(allFiles: QuartzPluginData[]): TopicRelationData {
  const nodesById = new Map<string, TopicNodeRecord>()
  const relationsByKey = new Map<string, TopicRelationRecord>()

  function addNode(node: TopicNodeRecord) {
    if (!node.id) return
    const existing = nodesById.get(node.id)
    nodesById.set(node.id, { ...existing, ...node })
  }

  for (const file of allFiles) {
    if (!file.slug) continue
    const frontmatter = (file.frontmatter ?? {}) as Frontmatter
    const tags = readTopicStringList(frontmatter.tags)

    if (isTopicNode(file, tags, frontmatter)) {
      const topicTags = cleanTopicTags(tags)
      const id =
        readFirst(frontmatter, ["topic", "topic_id", "topicId", "id"]) ??
        topicTags[0] ??
        readTopicString(frontmatter.title)

      if (id) {
        addNode({
          id,
          title: readTopicString(frontmatter.title),
          summary: readFirst(frontmatter, ["summary", "abstract", "description"]),
          page: file.slug,
        })
      }
    }

    if (!isTopicRelation(file, tags, frontmatter)) continue

    const pair = readTopicPair(frontmatter, tags)
    if (!pair) continue

    const [source, target] = pair
    const summary =
      readFirst(frontmatter, [
        "summary",
        "idea",
        "result",
        "research",
        "abstract",
        "description",
      ]) ?? ""
    const relation: TopicRelationRecord = {
      source,
      target,
      title: readTopicString(frontmatter.title) ?? `${source} ↔ ${target}`,
      summary,
      idea: summary,
      page: file.slug,
      slug: file.slug,
      status: (readTopicString(frontmatter.status) ?? "open").toLowerCase(),
      priority: (readTopicString(frontmatter.priority) ?? "medium").toLowerCase(),
      thread: readFirst(frontmatter, ["thread", "next", "next_step", "nextStep"]) ?? "",
      date: readRelationDate(frontmatter),
      index: relationsByKey.size,
    }

    addNode({ id: source })
    addNode({ id: target })
    relationsByKey.set(relationKey(relation), relation)
  }

  for (const [index, link] of (fallbackTopicLinks as LegacyTopicLink[]).entries()) {
    if (!link.source || !link.target) continue

    const slug = normalizeSlug(link.page ?? link.href ?? link.url)
    const summary = link.summary ?? link.idea ?? link.result ?? link.research ?? ""
    const relation: TopicRelationRecord = {
      source: link.source,
      target: link.target,
      title: link.title ?? `${link.source} ↔ ${link.target}`,
      summary,
      idea: summary,
      page: slug,
      slug,
      status: (link.status ?? "open").toLowerCase(),
      priority: (link.priority ?? "medium").toLowerCase(),
      thread: link.thread ?? link.next ?? "",
      date: readRelationDate({}, link),
      index: relationsByKey.size + index,
    }

    addNode({ id: relation.source })
    addNode({ id: relation.target })

    if (slug && relationsByKey.has(`slug:${slug}`)) continue
    if (relationsByKey.has(relationKey(relation))) continue
    relationsByKey.set(relationKey(relation), relation)
  }

  return {
    nodes: [...nodesById.values()].sort((a, b) => a.id.localeCompare(b.id)),
    links: [...relationsByKey.values()],
  }
}
