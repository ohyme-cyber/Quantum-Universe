import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import { classNames } from "../util/lang"
import {
  TopicRelationRecord,
  closedTopicRelationStatuses,
  displayTopicDate,
  getTopicRelationData,
  topicRelationPriorityRank,
  topicSortDate,
} from "./topicRelations"

const ResearchDashboard: QuartzComponent = ({
  allFiles,
  displayClass,
  fileData,
}: QuartzComponentProps) => {
  if (fileData.slug !== "index" && fileData.slug !== "") return null

  const relations = getTopicRelationData(allFiles).links
  const openThreads = relations
    .filter((relation) => !closedTopicRelationStatuses.has(relation.status))
    .sort((a, b) => {
      const priorityDiff =
        (topicRelationPriorityRank.get(a.priority) ?? 1) -
        (topicRelationPriorityRank.get(b.priority) ?? 1)
      if (priorityDiff !== 0) return priorityDiff
      return topicSortDate(b.date) - topicSortDate(a.date) || a.index - b.index
    })
    .slice(0, 5)

  const recentlyLinked = [...relations]
    .sort((a, b) => topicSortDate(b.date) - topicSortDate(a.date) || b.index - a.index)
    .slice(0, 5)

  if (openThreads.length === 0 && recentlyLinked.length === 0) return null

  const renderRelationLink = (relation: TopicRelationRecord, className: string) => {
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
                    <span class="research-widget-date">{displayTopicDate(relation.date)}</span>
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
