import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import topicLinks from "../../content/topic-links.json"

const TopicGraph = ({ displayClass, fileData }: QuartzComponentProps) => {
  if (fileData.slug !== "index" && fileData.slug !== "") return null

  return (
    <div id="topic-graph-container" className={classNames(displayClass, "topic-graph-container")}>
      <div className="graph-header">
        <h3>课题关联图谱</h3>
        <button id="graph-maximize-btn" type="button">全屏查看</button>
      </div>
      
      <div id="topic-graph-root" style={{ width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.05)', borderRadius: '8px' }}>
        <p id="graph-status-text" style={{ color: '#888', margin: 0 }}>正在准备绘图环境...</p>
      </div>

      <div id="idea-box" className="idea-box" style={{ display: 'none' }}>
        <h4>💡 研究关联思路</h4>
        <p id="idea-content"></p>
        <button id="idea-close-btn">关闭</button>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `window.topicLinks = ${JSON.stringify(topicLinks)}` }} />
    </div>
  )
}

TopicGraph.afterDOMDidLoad = `
  (function() {
    let graphInstance = null;

    const init = () => {
      console.log("TopicGraph: 脚本开始运行...");
      const root = document.getElementById('topic-graph-root');
      const container = document.getElementById('topic-graph-container');
      const btn = document.getElementById('graph-maximize-btn');
      if (!root || !container || !btn) return;

      const render = () => {
        if (typeof ForceGraph === 'undefined') {
          console.error("TopicGraph: ForceGraph 库未加载");
          return;
        }
        const status = document.getElementById('graph-status-text');
        if (status) status.style.display = 'none';

        root.innerHTML = ''; 
        graphInstance = ForceGraph()(root)
          .graphData({
            nodes: Array.from(new Set([
              ...window.topicLinks.map(l => l.source),
              ...window.topicLinks.map(l => l.target)
            ])).map(id => ({ id })),
            links: window.topicLinks
          })
          .nodeLabel('id')
          .nodeColor(() => '#ebd43f')
          .width(root.offsetWidth)
          .height(400)
          .linkDirectionalParticles(2)
          .onLinkClick(link => {
            const box = document.getElementById('idea-box');
            const content = document.getElementById('idea-content');
            if (box && content) {
              content.innerText = link.idea || '暂无描述';
              box.style.display = 'block';
            }
          });

        btn.onclick = (e) => {
          e.preventDefault();
          const isMax = container.classList.toggle('maximized');
          btn.innerText = isMax ? '退出全屏' : '全屏查看';
          setTimeout(() => {
            graphInstance.width(isMax ? window.innerWidth : container.offsetWidth)
                         .height(isMax ? window.innerHeight : 400);
            graphInstance.zoomToFit(400); // 全屏后自动缩放以适应节点
          }, 200);
        };
      };

      if (typeof ForceGraph === 'undefined') {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/force-graph@1.43.4/dist/force-graph.min.js';
        s.onload = render;
        document.head.appendChild(s);
      } else {
        render();
      }
    };

    document.addEventListener("nav", init);
    init();
  })();
`

// --- 关键点：这里的反引号必须在 export 之前闭合 ---
TopicGraph.css = `
.topic-graph-container.maximized {
  position: fixed !important;
  top: 0; left: 0; 
  width: 100vw !important; 
  height: 100vh !important;
  z-index: 999999 !important; 
  background: #1a1b1e !important; /* 强制暗色背景适配图谱 */
  margin: 0 !important;
  border-radius: 0 !important;
}
.topic-graph-container.maximized .graph-header {
  position: absolute;
  top: 20px; right: 20px;
  z-index: 1000000;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 10px;
  border-radius: 8px;
}
`

// 导出语句必须在最外层
export default (() => TopicGraph) satisfies QuartzComponentConstructor