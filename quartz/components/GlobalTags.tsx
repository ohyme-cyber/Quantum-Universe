import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const GlobalTags: QuartzComponent = ({ allFiles, displayClass }: QuartzComponentProps) => {
  const allTags = new Set(allFiles.flatMap((f) => f.frontmatter?.tags ?? []))
  const sortedTags = [...allTags].sort()

  if (sortedTags.length > 0) {
    return (
      <div className={`global-tags ${displayClass ?? ""}`}>
        <hr />
        <h3 style={{ marginTop: "2rem" }}>全站研究词条</h3>
        <ul className="tags" style={{ listStyle: "none", display: "flex", flexWrap: "wrap", gap: "10px", padding: 0 }}>
          {sortedTags.map((tag) => (
            <li key={tag}>
              <a href={`/tags/${tag}`} className="internal tag-link">
                {tag}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  return null
}

GlobalTags.css = ``
export default (() => GlobalTags) satisfies QuartzComponentConstructor