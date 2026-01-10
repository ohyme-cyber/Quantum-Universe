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
      
      <div id="topic-graph-root" style={{ width: '100%', height: '400px', background: 'rgba(0,0,0,0.1)' }}>
        <p style={{ textAlign: 'center', paddingTop: '150px', color: '#888' }}>正在加载图谱引擎...</p>
      </div>

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
    const initGraph = () => {
      const root = document.getElementById('topic-graph-root');
      const container = document.getElementById('topic-graph-container');
      const maxBtn = document.getElementById('graph-maximize-btn');
      const ideaBox = document.getElementById('idea-box');
      const ideaContent = document.getElementById('idea-content');
      const closeBtn = document.getElementById('idea-close-btn');

      if (!root || !container || !maxBtn) return;

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
        
        setTimeout(() => {
          if (isMax) {
            Graph.width(window.innerWidth).height(window.innerHeight);
          } else {
            Graph.width(container.offsetWidth).height(400);
          }
        }, 200);
      };

      closeBtn.onclick = () => ideaBox.style.display = 'none';
    };

    // 解决 ERR_BLOCKED_BY_CLIENT：备选 CDN 列表
    const cdns = [
      'https://unpkg.com/force-graph',
      'https://cdn.jsdelivr.net/npm/force-graph',
      'https://cdnjs.cloudflare.com/ajax/libs/force-graph/1.43.4/force-graph.min.js'
    ];

    function loadScript(idx) {
      if (idx >= cdns.length) return;
      const s = document.createElement('script');
      s.src = cdns[idx];
      s.onload = initGraph;
      s.onerror = () => loadScript(idx + 1);
      document.head.appendChild(s);
    }
    loadScript(0);
  })();
`

TopicGraph.css = ``
export default (() => TopicGraph) satisfies QuartzComponentConstructor