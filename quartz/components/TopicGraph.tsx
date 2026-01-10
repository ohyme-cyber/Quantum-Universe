import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// 导入你的 JSON 数据
import topicLinks from "../../content/topic-links.json"

const TopicGraph = ({ displayClass, fileData }: QuartzComponentProps) => {
  // 仅在主页显示
  if (fileData.slug !== "index") {return null}

  return (
    <div className={classNames(displayClass, "topic-graph-container")}>
      <div className="graph-header">
        <h3>课题关联图谱</h3>
        <button id="graph-maximize-btn">全屏查看</button>
      </div>
      
      {/* 图谱渲染容器 */}
      <div id="topic-graph-root"></div>

      {/* 右下角 Idea 文本框 */}
      <div id="idea-box" className="idea-box" style={{ display: 'none' }}>
        <h4>💡 研究关联思路</h4>
        <p id="idea-content"></p>
        <button id="idea-close-btn">关闭</button>
      </div>

      {/* 将数据转化为字符串注入，供浏览器脚本读取 */}
      <script dangerouslySetInnerHTML={{ __html: `window.topicLinks = ${JSON.stringify(topicLinks)}` }} />
    </div>
  )
}

// 核心：这里的代码只会在浏览器中运行，不会导致构建报错
TopicGraph.afterDOMDidLoad = `
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/force-graph'; // 动态加载图谱库
  script.onload = () => {
    const root = document.getElementById('topic-graph-root');
    const ideaBox = document.getElementById('idea-box');
    const ideaContent = document.getElementById('idea-content');
    const closeBtn = document.getElementById('idea-close-btn');
    const maxBtn = document.getElementById('graph-maximize-btn');
    const container = document.querySelector('.topic-graph-container');

    const Graph = ForceGraph()(root)
      .graphData({
        nodes: Array.from(new Set([
          ...window.topicLinks.map(l => l.source),
          ...window.topicLinks.map(l => l.target)
        ])).map(id => ({ id })),
        links: window.topicLinks
      })
      .nodeLabel('id')
      .linkDirectionalParticles(2)
      .width(root.clientWidth)
      .height(350)
      .onLinkClick(link => {
        ideaContent.innerText = link.idea;
        ideaBox.style.display = 'block';
      });

    closeBtn.onclick = () => ideaBox.style.display = 'none';
    
    maxBtn.onclick = () => {
      container.classList.toggle('maximized');
      const isMax = container.classList.contains('maximized');
      maxBtn.innerText = isMax ? '退出全屏' : '全屏查看';
      Graph.width(isMax ? window.innerWidth : root.clientWidth)
           .height(isMax ? window.innerHeight : 350);
    };
  };
  document.head.appendChild(script);
`

TopicGraph.css = ``
export default (() => TopicGraph) satisfies QuartzComponentConstructor