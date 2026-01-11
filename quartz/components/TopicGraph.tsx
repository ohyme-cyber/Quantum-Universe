import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import topicLinks from "../../content/topic-links.json"

const TopicGraph = ({ displayClass, fileData }: QuartzComponentProps) => {
  // 只在首页显示
  if (fileData.slug !== "index" && fileData.slug !== "") return null

  return (
    <div id="topic-graph-container" className={classNames(displayClass, "topic-graph-container")}>
      <div className="graph-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
        <h3 style={{ margin: 0 }}>课题关联图谱</h3>
        <button id="graph-maximize-btn" type="button">全屏查看</button>
      </div>
      
      <div id="topic-graph-root" style={{ width: '100%', height: '400px', background: 'rgba(0,0,0,0.05)', borderRadius: '8px', position: 'relative' }}>
        <p id="graph-status-text" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#888' }}>
          正在启动绘图引擎...
        </p>
      </div>

      <div id="idea-box" className="idea-box" style={{ display: 'none', position: 'absolute', bottom: '20px', left: '20px', right: '20px', background: 'white', border: '2px solid gold', padding: '10px', z-index: 1000 }}>
        <h4 style={{ margin: '0 0 5px 0' }}>💡 研究思路</h4>
        <p id="idea-content" style={{ margin: 0 }}></p>
        <button id="idea-close-btn">关闭</button>
      </div>

      {/* 核心：直接注入数据 */}
      <script dangerouslySetInnerHTML={{ __html: `window.topicLinks = ${JSON.stringify(topicLinks)};` }} />
    </div>
  )
}

TopicGraph.afterDOMDidLoad = `
  (function() {
    console.log("TopicGraph: 脚本开始载入...");
    let graph = null;

    const renderGraph = () => {
      const root = document.getElementById('topic-graph-root');
      const btn = document.getElementById('graph-maximize-btn');
      const container = document.getElementById('topic-graph-container');
      if (!root || !window.topicLinks) return;

      if (typeof ForceGraph === 'undefined') {
        console.log("TopicGraph: 库未就绪，重试中...");
        setTimeout(renderGraph, 500);
        return;
      }

      console.log("TopicGraph: 库已就绪，准备绘图。数据点:", window.topicLinks.length);
      document.getElementById('graph-status-text').style.display = 'none';
      root.innerHTML = '';

      graph = ForceGraph()(root)
        .graphData({
          nodes: Array.from(new Set([...window.topicLinks.map(l => l.source), ...window.topicLinks.map(l => l.target)])).map(id => ({ id })),
          links: window.topicLinks
        })
        .nodeLabel('id')
        .nodeColor(() => '#ebd43f')
        .width(root.offsetWidth)
        .height(400);

      btn.onclick = () => {
        const isMax = container.classList.toggle('maximized');
        btn.innerText = isMax ? '退出全屏' : '全屏查看';
        setTimeout(() => {
          graph.width(isMax ? window.innerWidth : container.offsetWidth)
               .height(isMax ? window.innerHeight : 400);
          graph.zoomToFit(400);
        }, 100);
      };
    };

    // 适配 Quartz SPA 导航
    document.addEventListener("nav", renderGraph);
    renderGraph();
  })();
`

TopicGraph.css = `
.topic-graph-container.maximized {
  position: fixed !important;
  top: 0; left: 0; width: 100vw !important; height: 100vh !important;
  z-index: 99999 !important; background: #fff !important; margin: 0 !important;
}
`

// 必须确保这一行不在任何引号里，且在文件最末尾
export default (() => TopicGraph) satisfies QuartzComponentConstructor