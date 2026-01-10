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
      
      {/* 图谱根容器 */}
      <div id="topic-graph-root" style={{ width: '100%', height: '400px', background: '#1a1a1a' }}></div>

      {/* Idea 展示框 */}
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
    console.log("TopicGraph: 脚本开始初始化...");
    
    const initGraph = () => {
      const root = document.getElementById('topic-graph-root');
      const container = document.getElementById('topic-graph-container');
      const maxBtn = document.getElementById('graph-maximize-btn');
      const ideaBox = document.getElementById('idea-box');
      const ideaContent = document.getElementById('idea-content');
      const closeBtn = document.getElementById('idea-close-btn');

      if (!root || !container || !maxBtn) {
        console.warn("TopicGraph: 正在等待 HTML 元素渲染...");
        setTimeout(initGraph, 500); // 如果没找到元素，半秒后重试
        return;
      }

      console.log("TopicGraph: 元素已就绪，开始渲染图谱");

      const Graph = ForceGraph()(root)
        .graphData({
          nodes: Array.from(new Set([
            ...window.topicLinks.map(l => l.source),
            ...window.topicLinks.map(l => l.target)
          ])).map(id => ({ id })),
          links: window.topicLinks
        })
        .nodeLabel('id')
        .nodeColor(() => '#ebd43f') // 使用你的主色调
        .linkDirectionalParticles(2)
        .width(root.offsetWidth)
        .height(400)
        .onLinkClick(link => {
          ideaContent.innerText = link.idea;
          ideaBox.style.display = 'block';
        });

      // 全屏逻辑
      maxBtn.onclick = (e) => {
        e.preventDefault();
        console.log("TopicGraph: 触发全屏切换");
        container.classList.toggle('maximized');
        const isMax = container.classList.contains('maximized');
        maxBtn.innerText = isMax ? '退出全屏' : '全屏查看';
        
        // 强制重绘
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
        if (container.classList.contains('maximized')) {
          Graph.width(window.innerWidth).height(window.innerHeight);
        } else {
          Graph.width(container.offsetWidth).height(400);
        }
      });
    };

    // 动态加载外部库
    if (typeof ForceGraph === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/force-graph';
      script.onload = initGraph;
      document.head.appendChild(script);
    } else {
      initGraph();
    }
  })();
`

TopicGraph.css = ``
export default (() => TopicGraph) satisfies QuartzComponentConstructor