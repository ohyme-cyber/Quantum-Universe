// quartz/components/TopicGraph.tsx 代码核心逻辑草图
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import ForceGraph2D from 'react-force-graph-2d' // 需要先安装这个库
import { useState } from "react"

const TopicGraph = ({ displayClass }: QuartzComponentProps) => {
  const [selectedIdea, setSelectedIdea] = useState<string | null>(null)
  const [isMaximized, setIsMaximized] = useState(false)

  // 渲染逻辑：
  // 1. 点击连线时：onLinkClick={(link) => setSelectedIdea(link.idea)}
  // 2. 右下角文本框：{selectedIdea && <div className="idea-box">{selectedIdea}</div>}
  
  return (
    <div className={`topic-graph ${isMaximized ? 'maximized' : ''}`}>
      <button onClick={() => setIsMaximized(!isMaximized)}>全屏查看</button>
      <ForceGraph2D 
        graphData={yourData}
        onLinkClick={(link: any) => setSelectedIdea(link.idea)}
      />
      {selectedIdea && (
        <div className="idea-box">
          <h4>关联思路:</h4>
          <p>{selectedIdea}</p>
          <button onClick={() => setSelectedIdea(null)}>关闭</button>
        </div>
      )}
    </div>
  )
}