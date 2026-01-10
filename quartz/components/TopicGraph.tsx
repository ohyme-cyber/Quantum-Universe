import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import ForceGraph2D from 'react-force-graph-2d'
import { useState, useMemo } from "react"
// 确保文件存在于 content/topic-links.json
import topicLinks from "../../content/topic-links.json"

const TopicGraph = ({ displayClass, fileData }: QuartzComponentProps) => {
  // 限制仅在主页显示
  if (fileData.slug !== "index") return null

  const [selectedIdea, setSelectedIdea] = useState<string | null>(null)
  const [isMaximized, setIsMaximized] = useState(false)

  // 修复：定义 graphData 变量，防止 yourData 报错
  const graphData = useMemo(() => {
    const nodes = Array.from(new Set([
      ...topicLinks.map(l => l.source),
      ...topicLinks.map(l => l.target)
    ])).map(id => ({ id }))
    return { nodes, links: topicLinks }
  }, [])

  return (
    <div className={`topic-graph-container ${displayClass ?? ""} ${isMaximized ? 'maximized' : ''}`}>
       <div className="graph-header">
        <h3>课题关联图谱</h3>
        <button onClick={() => setIsMaximized(!isMaximized)}>
          {isMaximized ? "退出全屏" : "全屏查看"}
        </button>
      </div>
      <ForceGraph2D
        graphData={graphData}
        nodeLabel="id"
        onLinkClick={(link: any) => setSelectedIdea(link.idea)}
        width={isMaximized ? window.innerWidth : 400}
        height={isMaximized ? window.innerHeight - 100 : 300}
      />
      {selectedIdea && (
        <div className="idea-box">
          <p>{selectedIdea}</p>
          <button onClick={() => setSelectedIdea(null)}>关闭</button>
        </div>
      )}
    </div>
  )
}

TopicGraph.css = ``
export default (() => TopicGraph) satisfies QuartzComponentConstructor