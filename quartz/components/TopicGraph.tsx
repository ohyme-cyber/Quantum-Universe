import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// 确保此文件路径正确，存放着你的物理研究关联数据
import topicLinks from "../../content/topic-links.json"

const TopicGraph = ({ displayClass, fileData }: QuartzComponentProps) => {
  // 仅在主页 index 显示，避免在每篇笔记下重复出现
  if (fileData.slug !== "index") return null

  return (
    /* 核心修复：添加了 id="topic-graph-container" */
    <div id="topic-graph-container" className={classNames(displayClass, "topic-graph-container")}>
      <div className="graph-header">
        <h3>课题关联图谱</h3>
        <button id="graph-maximize-btn" type="button">全屏查看</button>
      </div>
      
      {/* 图谱渲染区域 */}
      <div id="topic-graph-root" style={{ width: '100%', height: '350px' }}></div>

      {/* 点击连线显示的 Idea 文本框 */}
      <div id="idea-box" className="idea-box" style={{ display: 'none' }}>
        <h4>💡 研究关联思路</h4>
        <p id="idea-content"></p>
        <button id="idea-close-btn">关闭</button>
      </div>

      {/* 将 JSON 数据安全注入到浏览器全局环境 */}
      <script dangerouslySetInnerHTML={{ __html: `window.topicLinks = ${JSON.stringify(topicLinks)}` }} />
    </div>
  )
}

TopicGraph.afterDOMDidLoad = `
  (function() {
    console.log("TopicGraph: 脚本开始加载...");
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/force-graph'; // 动态加载图谱引擎
    script.onload = () => {
      console.log("TopicGraph: 库加载成功");
      const root = document.getElementById('topic-graph-root');
      const container = document.getElementById('topic-graph-container');
      const maxBtn = document.getElementById('graph-maximize-btn');
      const ideaBox = document.getElementById('idea-box');
      const ideaContent = document.getElementById('idea-content');
      const closeBtn = document.getElementById('idea-close-btn');

      // 验证所有必要的 HTML 元素是否已挂载
      if (!root || !maxBtn || !container) {
        console.error("TopicGraph: 找不到必要的 HTML 元素，请检查 ID 是否拼写正确");
        return;
      }

      // 初始化 D3 动力学图谱
      const Graph = ForceGraph()(root)
        .graphData({
          nodes: Array.from(new Set([
            ...window.topicLinks.map(l => l.source),
            ...window.topicLinks.map(l => l.target)
          ])).map(id => ({ id })),
          links: window.topicLinks
        })
        .nodeLabel('id')
        .nodeColor(() => '#tertiary') // 设置节点颜色
        .linkDirectionalParticles(2) // 连线粒子动画
        .width(root.offsetWidth)
        .height(350)
        .onLinkClick(link => {
          // 点击连线，在文本框展示关联 idea
          ideaContent.innerText = link.idea;
          ideaBox.style.display = 'block';
        });

      // 绑定全屏切换逻辑
      maxBtn.addEventListener('click', function(e) {
        e.preventDefault();
        container.classList.toggle('maximized');
        const isMax = container.classList.contains('maximized');
        
        this.innerText = isMax ? '退出全屏' : '全屏查看';
        
        // 关键：全屏切换后必须手动调用宽度更新，否则画布会显示不全
        if (isMax) {
          Graph.width(window.innerWidth).height(window.innerHeight);
        } else {
          Graph.width(container.offsetWidth).height(350);
        }
      });

      closeBtn.onclick = () => ideaBox.style.display = 'none';

      // 响应窗口尺寸变化
      window.addEventListener('resize', () => {
        if (container.classList.contains('maximized')) {
          Graph.width(window.innerWidth).height(window.innerHeight);
        } else {
          Graph.width(container.offsetWidth).height(350);
        }
      });
    };
    document.head.appendChild(script);
  })();
`

TopicGraph.css = ``
export default (() => TopicGraph) satisfies QuartzComponentConstructor