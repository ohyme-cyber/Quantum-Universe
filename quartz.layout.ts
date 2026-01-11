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
    links: { GitHub: "https://github.com/ohyme-cyber/Quantum-Universe","League of Legends": "https://op.gg/zh-cn/lol/summoners/tw/Ohyme-tw2" }
  }),
  // 全局组件放在这里没问题，因为我们已经在组件内部写了“非主页即消失”的逻辑
  afterBody: [Component.GlobalTags(), Component.TopicGraph()], 
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(), // 这就是让“文章显示自己标签”的关键组件
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.RecentNotes({
      title: "Recently",
      limit: 20,
      showTags: false, // 侧边栏保持干净
    }),
  ],
  right: [
    Component.Graph(), 
    Component.TableOfContents(),
    Component.Backlinks(),
  ],
}