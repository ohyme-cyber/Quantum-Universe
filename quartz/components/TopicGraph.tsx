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
      
      {/* 确保背景不是纯黑，方便观察容器是否加载 */}
      <div id="topic-graph-root" style={{ width: '100%', height: '400px', background: 'var(--highlight)' }}></div>

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
    console.log("TopicGraph: 开始加载脚本...");
    
    const initGraph = () => {
      console.log("TopicGraph: 准备初始化图谱内容...");
      const root = document.getElementById('topic-graph-root');
      const container = document.getElementById('topic-graph-container');
      const maxBtn = document.getElementById('graph-maximize-btn');
      const ideaBox = document.getElementById('idea-box');
      const ideaContent = document.getElementById('idea-content');
      const closeBtn = document.getElementById('idea-close-btn');

      if (!root || !container || !maxBtn) {
        console.error("TopicGraph: 关键 HTML 元素缺失！");
        return;
      }

      const Graph = ForceGraph()(root)
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

      maxBtn.onclick = (e) => {
        e.preventDefault();
        container.classList.toggle('maximized');
        const isMax = container.classList.contains('maximized');
        maxBtn.innerText = isMax ? '退出全屏' : '全屏查看';
        
        // 延迟重绘以适应 CSS 动画
        setTimeout(() => {
          if (isMax) {
            Graph.width(window.innerWidth).height(window.innerHeight);
          } else {
            Graph.width(container.offsetWidth).height(400);
          }
        }, 100);
      };

      closeBtn.onclick = () => ideaBox.style.display = 'none';
      window.addEventListener('resize', () => {
        Graph.width(container.classList.contains('maximized') ? window.innerWidth : container.offsetWidth);
      });
      console.log("TopicGraph: 初始化完成！");
    };

    // 备选 CDN 列表，防止被拦截
    const cdns = [
      'https://unpkg.com/force-graph',
      'https://cdn.jsdelivr.net/npm/force-graph',
      'https://cdnjs.cloudflare.com/ajax/libs/force-graph/1.43.4/force-graph.min.js'
    ];

    function loadScript(idx) {
      if (idx >= cdns.length) {
        console.error("TopicGraph: 所有 CDN 均加载失败，请检查网络或关闭广告屏蔽器。");
        return;
      }
      const s = document.createElement('script');
      s.src = cdns[idx];
      s.onload = initGraph;
      s.onerror = () => {
        console.warn("TopicGraph: 无法从 " + cdns[idx] + " 加载，尝试下一个...");
        loadScript(idx + 1);
      };
      document.head.appendChild(s);
    }

    loadScript(0);
  })();
`

TopicGraph.css = ``
export default (() => TopicGraph) satisfies QuartzComponentConstructor