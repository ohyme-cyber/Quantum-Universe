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
        <p id="graph-status-text" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#888', margin: 0 }}>
          正在启动量子绘图引擎...
        </p>
      </div>

      <div id="idea-box" className="idea-box" style={{ display: 'none', position: 'absolute', bottom: '20px', left: '20px', right: '20px', background: 'var(--light)', border: '2px solid var(--tertiary)', padding: '15px', borderRadius: '10px', zIndex: 1000 }}>
        <h4 style={{ margin: '0 0 10px 0' }}>💡 研究关联思路</h4>
        <p id="idea-content" style={{ margin: '0 0 10px 0', fontSize: '0.9rem' }}></p>
        <button id="idea-close-btn" style={{ cursor: 'pointer' }}>关闭</button>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `window.topicLinks = ${JSON.stringify(topicLinks)};` }} />
    </div>
  )
}

TopicGraph.afterDOMDidLoad = `
  (function() {
    console.log("🚀 [TopicGraph] 核心脚本已载入浏览器");
    let graph = null;

    const render = () => {
      const root = document.getElementById('topic-graph-root');
      const btn = document.getElementById('graph-maximize-btn');
      const container = document.getElementById('topic-graph-container');
      
      if (!root || !window.topicLinks) return;

      if (typeof ForceGraph === 'undefined') {
        console.log("⏳ [TopicGraph] 等待库加载...");
        setTimeout(render, 500);
        return;
      }

      console.log("✅ [TopicGraph] 开始渲染，数据点:", window.topicLinks.length);
      const status = document.getElementById('graph-status-text');
      if (status) status.style.display = 'none';
      
      root.innerHTML = '';
      graph = ForceGraph()(root)
        .graphData({
          nodes: Array.from(new Set([...window.topicLinks.map(l => l.source), ...window.topicLinks.map(l => l.target)])).map(id => ({ id })),
          links: window.topicLinks
        })
        .nodeLabel('id')
        .nodeColor(() => '#ebd43f')
        .width(root.offsetWidth)
        .height(400)
        .onLinkClick(link => {
          const box = document.getElementById('idea-box');
          const content = document.getElementById('idea-content');
          if (box && content) {
            content.innerText = link.idea || '暂无描述';
            box.style.display = 'block';
          }
        });

      // 自动缩放
      setTimeout(() => graph.zoomToFit(400, 50), 500);

      btn.onclick = (e) => {
        e.preventDefault();
        const isMax = container.classList.toggle('maximized');
        btn.innerText = isMax ? '退出全屏' : '全屏查看';
        setTimeout(() => {
          graph.width(isMax ? window.innerWidth : container.offsetWidth)
               .height(isMax ? window.innerHeight : 400);
          graph.zoomToFit(400);
        }, 200);
      };
      
      const closeBtn = document.getElementById('idea-close-btn');
      if (closeBtn) closeBtn.onclick = () => document.getElementById('idea-box').style.display = 'none';
    };

    if (typeof ForceGraph === 'undefined') {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/force-graph@1.43.4/dist/force-graph.min.js';
      s.onload = render;
      document.head.appendChild(s);
    } else {
      render();
    }

    document.addEventListener("nav", render);
  })();
`

TopicGraph.css = `
.topic-graph-container.maximized {
  position: fixed !important;
  top: 0; left: 0; width: 100vw !important; height: 100vh !important;
  zIndex: 999999 !important; background: var(--light) !important; margin: 0 !important;
}
.topic-graph-container.maximized .graph-header {
  position: absolute; top: 20px; right: 20px; zIndex: 1000000;
  background: rgba(var(--highlight), 0.8); padding: 10px; border-radius: 8px;
}
`

export default (() => TopicGraph) satisfies QuartzComponentConstructor