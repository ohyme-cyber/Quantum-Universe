import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import topicLinks from "../../content/topic-links.json"

const TopicGraph = ({ displayClass, fileData }: QuartzComponentProps) => {
  if (fileData.slug !== "index") return null

  return (
    /* 必须确保外层 div 有 id="topic-graph-container" */
    <div id="topic-graph-container" className={classNames(displayClass, "topic-graph-container")}>
      <div className="graph-header">
        <h3>课题关联图谱</h3>
        <button id="graph-maximize-btn" type="button">全屏查看</button>
      </div>
      
      {/* 图谱根容器 */}
      <div id="topic-graph-root" style={{ width: '100%', height: '400px', background: 'transparent' }}></div>

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
    // 1. 检查是否已经加载过库，防止重复加载
    if (window.ForceGraphInitialized) return;

    const loadGraph = () => {
      const root = document.getElementById('topic-graph-root');
      const container = document.getElementById('topic-graph-container');
      const maxBtn = document.getElementById('graph-maximize-btn');
      const ideaBox = document.getElementById('idea-box');
      const ideaContent = document.getElementById('idea-content');
      const closeBtn = document.getElementById('idea-close-btn');

      if (!root || !container || !maxBtn) return;

      // 初始化图谱逻辑
      const Graph = ForceGraph()(root)
        .graphData({
          nodes: Array.from(new Set([
            ...window.topicLinks.map(l => l.source),
            ...window.topicLinks.map(l => l.target)
          ])).map(id => ({ id })),
          links: window.topicLinks
        })
        .nodeLabel('id')
        .nodeColor(() => '#a69d5f') // 使用你的黄色系作为节点颜色
        .linkColor(() => '#555')
        .linkDirectionalParticles(2)
        .width(root.offsetWidth)
        .height(400)
        .onLinkClick(link => {
          ideaContent.innerText = link.idea;
          ideaBox.style.display = 'block';
        });

      // 全屏按钮响应逻辑
      maxBtn.onclick = function(e) {
        e.preventDefault();
        container.classList.toggle('maximized');
        const isMax = container.classList.contains('maximized');
        this.innerText = isMax ? '退出全屏' : '全屏查看';
        
        // 强制触发重绘
        if (isMax) {
          Graph.width(window.innerWidth).height(window.innerHeight);
        } else {
          Graph.width(container.offsetWidth).height(400);
        }
      };

      closeBtn.onclick = () => ideaBox.style.display = 'none';

      window.addEventListener('resize', () => {
        if (container.classList.contains('maximized')) {
          Graph.width(window.innerWidth).height(window.innerHeight);
        } else {
          Graph.width(container.offsetWidth).height(400);
        }
      });
      
      window.ForceGraphInitialized = true;
    };

    // 动态加载外部库
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/force-graph';
    script.async = true;
    script.onload = loadGraph;
    document.head.appendChild(script);
  })();
`

TopicGraph.css = ``
export default (() => TopicGraph) satisfies QuartzComponentConstructor