import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const GlobalTags: QuartzComponent = ({ allFiles, displayClass, fileData }: QuartzComponentProps) => {
  // 终极判断：只要不是最根目录的主页，就立刻停止渲染
  // trim('/') 是为了处理某些环境下路径前后的斜杠
  const isHomePage = fileData.slug === "index" || fileData.slug === ""
  
  if (!isHomePage) {
    return null
  }

  // 后面的代码保持不变...

  const allTags = new Set(allFiles.flatMap((f) => f.frontmatter?.tags ?? []))
  const sortedTags = [...allTags].sort()

  if (sortedTags.length > 0) {
    return (
      <div className={classNames(displayClass, "global-tags")}>
        <hr />
        <h3 style={{ marginTop: "2rem" }}>全站研究词条</h3>
        <ul className="tags">
          {sortedTags.map((tag) => {
            // 使用相对路径 'tags/' 确保在 GitHub Pages 路径下也能找到文件
            const linkDest = `./tags/${tag}` 
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