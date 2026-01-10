import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { useState, useMemo, useEffect } from "react"
// 1. 导入 JSON 数据不受影响
import topicLinks from "../../content/topic-links.json"

const TopicGraph = ({ displayClass, fileData }: QuartzComponentProps) => {
  // 仅在主页显示
  if (fileData.slug !== "index") return null

  const [selectedIdea, setSelectedIdea] = useState<string | null>(null)
  const [isMaximized, setIsMaximized] = useState(false)
  
  // 2. 核心修复：创建一个状态来存储动态导入的图谱组件
  const [ForceGraph, setForceGraph] = useState<any>(null)

  // 3. 只在浏览器环境中加载库 (useEffect 在 Node 端不会执行)
  useEffect(() => {
    import('react-force-graph-2d').then(mod => {
      setForceGraph(() => mod.default)
    })
  }, [])

  const graphData = useMemo(() => {
    const nodes = Array.from(new Set([
      ...topicLinks.map(l => l.source),
      ...topicLinks.map(l => l.target)
    ])).map(id => ({ id }))
    return { nodes, links: topicLinks }
  }, [])

  // 如果库还没加载完，先显示一个占位符
  if (!ForceGraph) {
    return <div className="graph-placeholder">正在加载课题关联图谱...</div>
  }

  return (
    <div className={`topic-graph-container ${displayClass ?? ""} ${isMaximized ? 'maximized' : ''}`}>
       <div className="graph-header">
        <h3>课题关联图谱 (Beta)</h3>
        <button onClick={() => setIsMaximized(!isMaximized)}>
          {isMaximized ? "退出全屏" : "全屏查看"}
        </button>
      </div>
      
      <div className="graph-wrapper">
        <ForceGraph
          graphData={graphData}
          nodeLabel="id"
          nodeAutoColorBy="id"
          linkDirectionalParticles={2}
          onLinkClick={(link: any) => setSelectedIdea(link.idea)}
          width={isMaximized ? window.innerWidth : 400}
          height={isMaximized ? window.innerHeight - 100 : 350}
        />

        {selectedIdea && (
          <div className="idea-box">
            <h4>💡 研究关联思路</h4>
            <p>{selectedIdea}</p>
            <button onClick={() => setSelectedIdea(null)}>关闭</button>
          </div>
        )}
      </div>
    </div>
  )
}

TopicGraph.css = ``
export default (() => TopicGraph) satisfies QuartzComponentConstructor