import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import topicLinks from "../../content/topic-links.json"

const TopicGraph = ({ displayClass, fileData }: QuartzComponentProps) => {
  // 仅在主页 index 显示
  if (fileData.slug !== "index") return null

  return (
    <div id="topic-graph-container" className={classNames(displayClass, "topic-graph-container")}>
      <div className="graph-header">
        <h3>课题关联图谱</h3>
        <button id="graph-maximize-btn" type="button">全屏查看</button>
      </div>
      
      <div id="topic-graph-root" style={{ width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.05)' }}>
        <p id="graph-status-text" style={{ color: '#888', margin: 0 }}>正在加载图谱引擎...</p>
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
    let GraphInstance = null;

    const init = () => {
      const container = document.getElementById('topic-graph-container');
      const root = document.getElementById('topic-graph-root');
      const maxBtn = document.getElementById('graph-maximize-btn');
      const statusText = document.getElementById('graph-status-text');

      if (!container || !root || !maxBtn) return;

      maxBtn.onclick = (e) => {
        e.preventDefault();
        const isMax = container.classList.toggle('maximized');
        maxBtn.innerText = isMax ? '退出全屏' : '全屏查看';
        
        if (GraphInstance) {
          setTimeout(() => {
            GraphInstance.width(isMax ? window.innerWidth : container.offsetWidth)
                         .height(isMax ? window.innerHeight : 400);
          }, 200);
        }
      };

      const render = () => {
        if (typeof ForceGraph === 'undefined' || !window.topicLinks) return;
        if (statusText) statusText.style.display = 'none';
        
        // 清理旧实例防止重复渲染
        root.innerHTML = ''; 

        const ideaBox = document.getElementById('idea-box');
        const ideaContent = document.getElementById('idea-content');
        const closeBtn = document.getElementById('idea-close-btn');

        GraphInstance = ForceGraph()(root)
          .graphData({
            nodes: Array.from(new Set([
              ...window.topicLinks.map(l => l.source),
              ...window.topicLinks.map(l => l.target)
            ])).map(id => ({ id })),
            links: window.topicLinks
          })
          .nodeLabel('id')
          .nodeColor(() => '#ebd43f')
          .linkDirectionalParticles(2)
          .width(root.offsetWidth)
          .height(400)
          .onLinkClick(link => {
            if (ideaBox && ideaContent) {
              ideaContent.innerText = link.idea;
              ideaBox.style.display = 'block';
            }
          });

        if (closeBtn && ideaBox) closeBtn.onclick = () => ideaBox.style.display = 'none';
      };

      if (typeof ForceGraph === 'undefined') {
        const s = document.createElement('script');
        s.src = 'https://unpkg.com/force-graph@1.43.4/dist/force-graph.min.js';
        s.async = true;
        s.onload = render;
        document.head.appendChild(s);
      } else {
        render();
      }
    };

    // 适配 Quartz SPA 导航
    document.addEventListener("nav", init);
    init();
  })();
`

TopicGraph.css = ``

// 必须确保这一行存在且在文件最底部
export default (() => TopicGraph) satisfies QuartzComponentConstructor