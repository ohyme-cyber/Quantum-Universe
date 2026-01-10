import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages


// components for pages that display a single page (e.g. a single note)
// 1. 在 defaultContentPageLayout 中修改
// quartz.layout.ts

// 1. 这里的 sharedPageComponents 负责页面的页眉和页脚
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/ohyme-cyber/Quantum-Universe",
    },
  }),
}

// 2. 这里的 defaultContentPageLayout 负责内容页的布局
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(), // 文章顶部的普通标签展示
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.RecentNotes({
      title: "Recently",
      limit: 20,
      sort: (f1, f2) => {
        // 严格按照创建日期排序，新的在前
        const d1 = f1.dates?.created?.getTime() ?? 0
        const d2 = f2.dates?.created?.getTime() ?? 0
        return d2 - d1
      },
      filter: (f) => f.slug !== "index", // 过滤掉主页本身
    }),
  ],
  right: [
    Component.Graph(),
    Component.TableOfContents(),
    Component.Backlinks(),
  ],
}
// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
