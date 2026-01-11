import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import topicLinks from "../../content/topic-links.json"

const TopicGraph = ({ displayClass, fileData }: QuartzComponentProps) => {
  // 确认 slug 是否正确（有些 Quartz 配置首页 slug 为 "" 或 "index"）
  if (fileData.slug !== "index" && fileData.slug !== "") return null

  return (
    <div id="topic-graph-container" className={classNames(displayClass, "topic-graph-container")}>
      <div className="graph-header">
        <h3>课题关联图谱</h3>
        <button id="graph-maximize-btn" type="button">全屏查看</button>
      </div>
      
      <div id="topic-graph-root" style={{ width: '100%', height: '400px', minHeight: '400px', background: 'rgba(0,0,0,0.02)' }}>
        <p id="graph-status-text" style={{ textAlign: 'center', paddingTop: '150px', color: '#888' }}>
          正在检查环境...
        </p>
      </div>

      <div id="idea-box" className="idea-box" style={{ display: 'none' }}>
        <h4>💡 研究关联思路</h4>
        <p id="idea-content"></p>
        <button id="idea-close-btn">关闭</button>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `window.topicLinks = ${JSON.stringify(topicLinks)}; console.log('TopicGraph: 数据已注入', window.topicLinks);` }} />
    </div>
  )
}

TopicGraph.afterDOMDidLoad = `
  (function() {
    console.log("TopicGraph: 脚本已加载到页面");

    const runInit = () => {
      console.log("TopicGraph: 开始执行初始化 (init)");
      const container = document.getElementById('topic-graph-container');
      const root = document.getElementById('topic-graph-root');
      const maxBtn = document.getElementById('graph-maximize-btn');
      const statusText = document.getElementById('graph-status-text');

      if (!container || !root || !maxBtn) {
        console.warn("TopicGraph: 未发现图谱容器，跳过初始化。当前页面 Slug:", document.body.dataset.slug);
        return;
      }

      console.log("TopicGraph: 找到所有 DOM 元素，准备加载库");

      const render = () => {
        if (typeof ForceGraph === 'undefined') {
          console.error("TopicGraph: ForceGraph 库加载失败，无法渲染");
          return;
        }
        if (!window.topicLinks || window.topicLinks.length === 0) {
          console.error("TopicGraph: window.topicLinks 数据为空");
          if (statusText) statusText.innerText = "错误：数据源为空";
          return;
        }

        console.log("TopicGraph: 准备渲染图谱，节点数:", window.topicLinks.length);
        if (statusText) statusText.style.display = 'none';
        root.innerHTML = ''; 

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
            const box = document.getElementById('idea-box');
            const content = document.getElementById('idea-content');
            if (box && content) {
              content.innerText = link.idea || '暂无思路描述';
              box.style.display = 'block';
            }
          });

        maxBtn.onclick = (e) => {
          e.preventDefault();
          const isMax = container.classList.toggle('maximized');
          maxBtn.innerText = isMax ? '退出全屏' : '全屏查看';
          setTimeout(() => {
            Graph.width(isMax ? window.innerWidth : container.offsetWidth)
                 .height(isMax ? window.innerHeight : 400);
          }, 200);
        };
        
        console.log("TopicGraph: 渲染完成");
      };

      if (typeof ForceGraph === 'undefined') {
        const s = document.createElement('script');
        s.src = 'https://unpkg.com/force-graph@1.43.4/dist/force-graph.min.js';
        s.async = true;
        s.onload = () => { console.log("TopicGraph: 库加载成功"); render(); };
        s.onerror = () => { console.error("TopicGraph: 库加载失败 (网络问题)"); };
        document.head.appendChild(s);
      } else {
        render();
      }
    };

    // 针对 Quartz 的不同加载场景执行
    document.addEventListener("nav", () => {
      console.log("TopicGraph: 监听到 Quartz 导航切换");
      runInit();
    });
    
    // 页面初次载入
    if (document.readyState === 'complete') {
        runInit();
    } else {
        window.addEventListener('load', runInit);
    }
  })();
`

export default (() => TopicGraph) satisfies QuartzComponentConstructor