import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import topicLinks from "../../content/topic-links.json"

const TopicGraph = ({ displayClass, fileData }: QuartzComponentProps) => {
  // 仅在主页 index 显示，防止在每篇笔记下乱跑
  if (fileData.slug !== "index") return null

  return (
    /* 核心修复：添加了 id="topic-graph-container"，这是全屏响应的关键 */
    <div id="topic-graph-container" className={classNames(displayClass, "topic-graph-container")}>
      <div className="graph-header">
        <h3>课题关联图谱</h3>
        <button id="graph-maximize-btn" type="button">全屏查看</button>
      </div>
      
      {/* 图谱渲染根区域 */}
      <div id="topic-graph-root" style={{ width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.05)' }}>
        <p id="graph-status-text" style={{ color: '#888', margin: 0 }}>正在初始化环境...</p>
      </div>

      {/* 点击连线后的文本框 */}
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
    console.log("TopicGraph: 脚本开始执行...");
    
    const startLogic = () => {
      const container = document.getElementById('topic-graph-container');
      const root = document.getElementById('topic-graph-root');
      const maxBtn = document.getElementById('graph-maximize-btn');
      const statusText = document.getElementById('graph-status-text');
      let GraphInstance = null;

      if (!container || !maxBtn || !root) {
        console.warn("TopicGraph: 找不到必要元素，0.5秒后重试...");
        setTimeout(startLogic, 500);
        return;
      }

      // 1. 立即绑定全屏按钮（不依赖图谱库），解决点击无响应
      maxBtn.onclick = (e) => {
        e.preventDefault();
        console.log("TopicGraph: 切换全屏状态");
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

      // 2. 初始化图谱库逻辑
      const initGraph = () => {
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
          .nodeColor(() => '#ebd43f') // 设置节点为你的主黄色
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
        console.log("TopicGraph: 图谱绘制成功");
      };

      // 3. 多 CDN 容错加载，防止 ERR_BLOCKED_BY_CLIENT
      const cdns = [
        'https://cdn.jsdelivr.net/npm/force-graph@1.43.4/dist/force-graph.min.js',
        'https://unpkg.com/force-graph@1.43.4/dist/force-graph.min.js'
      ];

      function tryLoad(index) {
        if (index >= cdns.length) {
          if (statusText) statusText.innerText = "加载失败，请检查网络或关闭插件。";
          return;
        }
        const s = document.createElement('script');
        s.src = cdns[index];
        s.async = true;
        s.onload = initGraph;
        s.onerror = () => tryLoad(index + 1);
        document.head.appendChild(s);
      }

      if (typeof ForceGraph === 'undefined') {
        tryLoad(0);
      } else {
        initGraph();
      }
    };

    startLogic();
  })();
`

TopicGraph.css = ``
export default (() => TopicGraph) satisfies QuartzComponentConstructor