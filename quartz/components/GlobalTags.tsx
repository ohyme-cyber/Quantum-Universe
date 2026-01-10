import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const GlobalTags: QuartzComponent = ({ allFiles, displayClass }: QuartzComponentProps) => {
  // 自动从所有笔记中提取标签
  const allTags = new Set(allFiles.flatMap((f) => f.frontmatter?.tags ?? []))
  const sortedTags = [...allTags].sort()

  if (sortedTags.length > 0) {
    return (
      <div className={`tags ${displayClass ?? ""}`}>
        <hr />
        <h3>全站研究词条</h3>
        <ul className="tags">
          {sortedTags.map((tag) => {
            // 手动构建链接，避开报错的 tagTarget
            // Quartz 默认的标签路径是 /tags/标签名
            const linkDest = `/tags/${tag}` 
            return (
              <li key={tag}>
                <a href={linkDest} className="internal tag-link">
                  {tag}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
  return null
}

GlobalTags.css = ``
export default (() => GlobalTags) satisfies QuartzComponentConstructor