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
  page?: string
  href?: string
  url?: string
}

const TopicRelationIndex: QuartzComponent = ({
  allFiles,
  displayClass,
  fileData,
}: QuartzComponentProps) => {
  if (fileData.slug !== "index" && fileData.slug !== "") return null

  const pageTitleBySlug = new Map(
    allFiles
      .filter((file) => file.slug)
      .map((file) => [file.slug, file.frontmatter?.title] as const),
  )

  const relations = (topicLinks as TopicLink[])
    .map((link) => {
      const page = link.page ?? link.href ?? link.url
      if (!link.source || !link.target || !page || /^https?:\/\//i.test(page)) return null

      const slug = page.replace(/^\/+/, "") as FullSlug
      return {
        source: link.source,
        target: link.target,
        title: pageTitleBySlug.get(slug) ?? link.title ?? `${link.source} ↔ ${link.target}`,
        summary: link.idea ?? link.result ?? link.research ?? "",
        slug,
      }
    })
    .filter((relation): relation is NonNullable<typeof relation> => relation !== null)

  if (relations.length === 0) return null

  return (
    <section class={classNames(displayClass, "topic-relation-index")}>
      <h3>关联研究详情</h3>
      <div class="topic-relation-list">
        {relations.map((relation) => (
          <article class="topic-relation-item">
            <a class="topic-relation-title internal" href={resolveRelative(fileData.slug!, relation.slug)}>
              {relation.title}
            </a>
            <div class="topic-relation-topics" aria-label="关联 topic">
              <span>{relation.source}</span>
              <span>{relation.target}</span>
            </div>
            {relation.summary && <p>{relation.summary}</p>}
          </article>
        ))}
      </div>
    </section>
  )
}

TopicRelationIndex.css = ``

export default (() => TopicRelationIndex) satisfies QuartzComponentConstructor
