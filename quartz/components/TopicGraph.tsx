import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import ForceGraph2D from 'react-force-graph-2d'
import { useState, useMemo } from "react"
// 1. 导入你的 JSON 数据
import topicLinks from "../../content/topic-links.json"

const TopicGraph = ({ displayClass }: QuartzComponentProps) => {
  const [selectedIdea, setSelectedIdea] = useState<string | null>(null)
  const [isMaximized, setIsMaximized] = useState(false)

  // 2. 核心修复：定义 graphData (替换你报错的 yourData)
  // 使用 useMemo 封装数据，防止频繁刷新导致的警告
  const graphData = useMemo(() => {
    const nodes = Array.from(new Set([
      ...topicLinks.map(l => l.source),
      ...topicLinks.map(l => l.target)
    ])).map(id => ({ id }))
    
    return {
      nodes,
      links: topicLinks
    }
  }, [])

  return (
    <div className={`topic-graph ${displayClass ?? ""} ${isMaximized ? 'maximized' : ''}`}>
      <div className="graph-controls">
        <button onClick={() => setIsMaximized(!isMaximized)}>
          {isMaximized ? "退出全屏" : "全屏查看"}
        </button>
      </div>
      
      <ForceGraph2D 
        graphData={graphData} // 3. 这里现在引用定义的 graphData
        nodeLabel="id"
        linkDirectionalParticles={2}
        onLinkClick={(link: any) => setSelectedIdea(link.idea)}
        // 动态调整尺寸
        width={isMaximized ? window.innerWidth : 400}
        height={isMaximized ? window.innerHeight - 80 : 300}
      />

      {selectedIdea && (
        <div className="idea-box">
          <h4>💡 研究关联思路</h4>
          <p>{selectedIdea}</p>
          <button onClick={() => setSelectedIdea(null)}>关闭</button>
        </div>
      )}
    </div>
  )
}

TopicGraph.css = ``
export default (() => TopicGraph) satisfies QuartzComponentConstructor