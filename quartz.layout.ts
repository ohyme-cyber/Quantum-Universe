import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"





// 3. 列表页布局
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
// 1. 全局布局定义（只留这一个！）
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: { GitHub: "https://github.com/ohyme-cyber/Quantum-Universe" },
  }),
  // 放在这里，它们会根据文件内的判断自动只在主页显示
  afterBody: [Component.GlobalTags(), Component.TopicGraph()], 
}

// 2. 笔记内容页布局
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(), // 恢复此组件，让每篇文章只显示自己的标签
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.RecentNotes({
      title: "Recently",
      limit: 20,
      showTags: false, // 侧边栏保持简洁，不显示标签
    }),
  ],
  right: [
    Component.Graph(), // Quartz 原生图谱
    Component.TableOfContents(),
    Component.Backlinks(),
  ],
}