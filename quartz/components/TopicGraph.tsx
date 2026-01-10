import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import topicLinks from "../../content/topic-links.json"

const TopicGraph = ({ displayClass, fileData }: QuartzComponentProps) => {
  if (fileData.slug !== "index") return null

  return (
    <div id="topic-graph-container" className={classNames(displayClass, "topic-graph-container")}>
      <div className="graph-header">
        <h3>课题关联图谱</h3>
        <button id="graph-maximize-btn" type="button">全屏查看</button>
      </div>
      
      {/* 渲染容器 */}
      <div id="topic-graph-root" style={{ width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.05)' }}>
        <p id="graph-status-text" style={{ color: '#888', margin: 0 }}>正在加载图谱引擎...</p>
      </div>

      {/* Idea 弹出框 */}
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
    // 1. 定义核心初始化函数
    const startTopicGraph = () => {
      const container = document.getElementById('topic-graph-container');
      const root = document.getElementById('topic-graph-root');
      const maxBtn = document.getElementById('graph-maximize-btn');
      const statusText = document.getElementById('graph-status-text');
      let GraphInstance = null;

      if (!container || !maxBtn || !root) return;

      // 2. 核心：立即绑定全屏按钮（不依赖任何外部库）
      maxBtn.onclick = (e) => {
        e.preventDefault();
        container.classList.toggle('maximized');
        const isMax = container.classList.contains('maximized');
        maxBtn.innerText = isMax ? '退出全屏' : '全屏查看';
        
        // 如果图谱已加载，则调整其尺寸
        if (GraphInstance) {
          setTimeout(() => {
            GraphInstance.width(isMax ? window.innerWidth : container.offsetWidth)
                         .height(isMax ? window.innerHeight : 400);
          }, 300);
        }
      };

      // 3. 异步加载图谱引擎
      const initGraphContent = () => {
        if (typeof ForceGraph === 'undefined') return;
        if (statusText) statusText.style.display = 'none';
        
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

      // 多CDN尝试
      const cdns = [
        'https://cdn.jsdelivr.net/npm/force-graph@1.43.4/dist/force-graph.min.js',
        'https://unpkg.com/force-graph@1.43.4/dist/force-graph.min.js'
      ];

      function tryLoad(index) {
        if (index >= cdns.length) {
          if (statusText) statusText.innerText = "网络原因图谱加载失败，请刷新或关闭广告拦截插件。";
          return;
        }
        const s = document.createElement('script');
        s.src = cdns[index];
        s.async = true;
        s.onload = initGraphContent;
        s.onerror = () => tryLoad(index + 1);
        document.head.appendChild(s);
      }

      if (typeof ForceGraph === 'undefined') {
        tryLoad(0);
      } else {
        initGraphContent();
      }
    };

    // 4. 确保在 Quartz 的各种加载情况下都能运行
    startTopicGraph();
    window.addEventListener('nav', startTopicGraph); // 适配 Quartz 的单页跳转
  })();
`

TopicGraph.css = ``
export default (() => TopicGraph) satisfies QuartzComponentConstructor