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
      
      <div id="topic-graph-root" style={{ width: '100%', height: '350px' }}></div>

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
    console.log("TopicGraph: 脚本开始加载...");
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/force-graph';
    script.onload = () => {
      console.log("TopicGraph: 库加载成功");
      const root = document.getElementById('topic-graph-root');
      const container = document.getElementById('topic-graph-container');
      const maxBtn = document.getElementById('graph-maximize-btn');
      const ideaBox = document.getElementById('idea-box');
      const ideaContent = document.getElementById('idea-content');
      const closeBtn = document.getElementById('idea-close-btn');

      if (!root || !maxBtn || !container) {
        console.error("TopicGraph: 找不到必要的 HTML 元素");
        return;
      }

      // 初始化图谱
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
        .width(root.offsetWidth)
        .height(350)
        .onLinkClick(link => {
          ideaContent.innerText = link.idea;
          ideaBox.style.display = 'block';
        });

      // 绑定全屏事件
      maxBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log("TopicGraph: 点击了全屏按钮");
        container.classList.toggle('maximized');
        const isMax = container.classList.contains('maximized');
        
        this.innerText = isMax ? '退出全屏' : '全屏查看';
        
        if (isMax) {
          Graph.width(window.innerWidth).height(window.innerHeight);
        } else {
          Graph.width(container.offsetWidth).height(350);
        }
      });

      closeBtn.onclick = () => ideaBox.style.display = 'none';

      // 窗口缩放自适应
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