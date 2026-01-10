import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// 1. 全局共享布局 (只定义这一次，解决 redeclare 报错)
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: { GitHub: "https://github.com/ohyme-cyber/Quantum-Universe" },
  }),
  // 将全站词条墙放在正文结束后的空白处
  afterBody: [Component.GlobalTags()], 
}

// 2. 笔记内容页布局
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    // 这里删除了 TagList，所以正文顶部不会再有标签
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.RecentNotes({
      title: "Recently",
      limit: 20,
      showTags: false, // 关键：隐藏左侧目录下的标签
      sort: (f1, f2) => (f2.dates?.created?.getTime() ?? 0) - (f1.dates?.created?.getTime() ?? 0),
    }),
  ],
  right: [
    Component.Graph(), // 这就是你问的图谱
    Component.TableOfContents(),
    Component.Backlinks(),
  ],
}

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