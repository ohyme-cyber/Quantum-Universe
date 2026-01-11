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
      
      <div id="topic-graph-root" style={{ width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.05)' }}>
        <p id="graph-status-text" style={{ color: '#888', margin: 0 }}>正在渲染图谱引擎...</p>
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
      const root = document.getElementById('topic-graph-root');
      const container = document.getElementById('topic-graph-container');
      const btn = document.getElementById('graph-maximize-btn');
      if (!root || !container || !btn) return;

      const render = () => {
        if (typeof ForceGraph === 'undefined') return;
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
          .height(400);

        btn.onclick = (e) => {
          e.preventDefault();
          const isMax = container.classList.toggle('maximized');
          btn.innerText = isMax ? '退出全屏' : '全屏查看';
          setTimeout(() => {
            graphInstance.width(isMax ? window.innerWidth : container.offsetWidth)
                         .height(isMax ? window.innerHeight : 400);
          }, 100);
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

// 注意：CSS 的反引号必须在样式结束后立即关闭！
TopicGraph.css = `
.topic-graph-container.maximized {
  position: fixed !important;
  top: 0; left: 0; width: 100vw; height: 100vh;
  z-index: 99999; background: var(--light) !important;
}
`

// 导出语句必须在最外层，不能被任何反引号包裹
export default (() => TopicGraph) satisfies QuartzComponentConstructor