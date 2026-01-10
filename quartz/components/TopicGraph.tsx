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
      <div id="topic-graph-root" style={{ width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p id="graph-status-text" style={{ color: '#888' }}>正在加载图谱引擎...</p>
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
    const container = document.getElementById('topic-graph-container');
    const root = document.getElementById('topic-graph-root');
    const maxBtn = document.getElementById('graph-maximize-btn');
    const statusText = document.getElementById('graph-status-text');
    let GraphInstance = null;

    if (!container || !maxBtn) return;

    // 1. 立即绑定全屏按钮（不等库加载），确保点击必有响应
    maxBtn.onclick = (e) => {
      e.preventDefault();
      container.classList.toggle('maximized');
      const isMax = container.classList.contains('maximized');
      maxBtn.innerText = isMax ? '退出全屏' : '全屏查看';
      
      if (GraphInstance) {
        setTimeout(() => {
          GraphInstance.width(isMax ? window.innerWidth : container.offsetWidth)
                       .height(isMax ? window.innerHeight : 400);
        }, 300);
      }
    };

    const initGraph = () => {
      if (typeof ForceGraph === 'undefined') return;
      statusText.style.display = 'none';
      
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
          ideaContent.innerText = link.idea;
          ideaBox.style.display = 'block';
        });

      if (closeBtn) closeBtn.onclick = () => ideaBox.style.display = 'none';
      console.log("TopicGraph: 成功初始化");
    };

    // 2. 多 CDN 容错加载逻辑
    const cdns = [
      'https://cdn.jsdelivr.net/npm/force-graph@1.43.4/dist/force-graph.min.js',
      'https://unpkg.com/force-graph@1.43.4/dist/force-graph.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/force-graph/1.43.4/force-graph.min.js'
    ];

    function tryLoad(index) {
      if (index >= cdns.length) {
        statusText.innerText = "图谱引擎加载失败，请检查网络或关闭插件。";
        return;
      }
      const s = document.createElement('script');
      s.src = cdns[index];
      s.async = true;
      s.onload = initGraph;
      s.onerror = () => {
        console.warn("CDN加载失败，尝试备选地址...");
        tryLoad(index + 1);
      };
      document.head.appendChild(s);
    }

    tryLoad(0);
  })();
`

TopicGraph.css = ``
export default (() => TopicGraph) satisfies QuartzComponentConstructor