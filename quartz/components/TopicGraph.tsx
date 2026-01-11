import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import topicLinks from "../../content/topic-links.json"

const TopicGraph = ({ displayClass, fileData }: QuartzComponentProps) => {
  // 仅在主页 index 显示
  if (fileData.slug !== "index" && fileData.slug !== "") return null

  return (
    <div id="topic-graph-container" className={classNames(displayClass, "topic-graph-container")}>
      <div className="graph-header">
        <h3>课题关联图谱</h3>
        <button id="graph-maximize-btn" type="button">全屏查看</button>
      </div>
      
      <div id="topic-graph-root" style={{ width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--lightgray)' }}>
        <p id="graph-status-text" style={{ color: 'var(--gray)', margin: 0 }}>正在启动量子绘图引擎...</p>
      </div>

      <div id="idea-box" className="idea-box" style={{ display: 'none' }}>
        <h4>💡 研究关联思路</h4>
        <p id="idea-content"></p>
        <button id="idea-close-btn">关闭</button>
      </div>

      {/* 1. 直接通过 HTML 标签引入，浏览器会更早开始下载 */}
      <script src="https://cdn.jsdelivr.net/npm/force-graph@1.43.4/dist/force-graph.min.js"></script>
      
      {/* 2. 注入数据 */}
      <script dangerouslySetInnerHTML={{ __html: `window.topicLinks = ${JSON.stringify(topicLinks)};` }} />
    </div>
  )
}

TopicGraph.afterDOMDidLoad = `
  (function() {
    console.log("TopicGraph: 脚本已入场");
    let graphInstance = null;

    const startDrawing = () => {
      const root = document.getElementById('topic-graph-root');
      const container = document.getElementById('topic-graph-container');
      const btn = document.getElementById('graph-maximize-btn');
      const status = document.getElementById('graph-status-text');

      if (!root || !container || !btn) return;

      // 关键检查：等待 ForceGraph 函数在全局作用域出现
      if (typeof ForceGraph === 'undefined') {
        console.log("TopicGraph: 等待库加载...");
        setTimeout(startDrawing, 500); // 没加载好就每 0.5 秒重试一次
        return;
      }

      console.log("TopicGraph: 库已就绪，开始渲染。数据量:", window.topicLinks.length);
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
        .linkColor(() => '#666')
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

      // 针对单链接的视角调整
      setTimeout(() => {
        graphInstance.zoomToFit(400, 100);
        if(window.topicLinks.length < 2) graphInstance.zoom(4);
      }, 300);

      btn.onclick = (e) => {
        e.preventDefault();
        const isMax = container.classList.toggle('maximized');
        btn.innerText = isMax ? '退出全屏' : '全屏查看';
        setTimeout(() => {
          graphInstance.width(isMax ? window.innerWidth : container.offsetWidth)
                       .height(isMax ? window.innerHeight : 400);
          graphInstance.zoomToFit(400);
        }, 200);
      };

      const closeBtn = document.getElementById('idea-close-btn');
      if (closeBtn) closeBtn.onclick = () => document.getElementById('idea-box').style.display = 'none';
    };

    // 适配 Quartz SPA
    document.addEventListener("nav", startDrawing);
    startDrawing();
  })();
`

// ... 上方的代码保持不变 ...

// 1. 确保这里的反引号在样式结束后立即关闭！
TopicGraph.css = `
.topic-graph-container.maximized {
  position: fixed !important;
  top: 0; left: 0; 
  width: 100vw !important; 
  height: 100vh !important;
  z-index: 999999 !important; 
  background: var(--light) !important;
  margin: 0 !important;
}
`

// 2. 导出语句必须在反引号外面，不能变色（在 VS Code 中应该是绿/蓝色而非红色字符串色）
export default (() => TopicGraph) satisfies QuartzComponentConstructor

