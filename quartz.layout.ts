import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// 1. 共享布局：补齐了 afterBody 属性，修复 image_8ae590.jpg 的报错
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/ohyme-cyber/Quantum-Universe",
    },
  }),
  afterBody: [], 
}

// 2. 内容页布局：修复了 image_8b3b25.jpg 的 linkToMore 报错
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(), // 这里的标签会被下方 CSS 变成巨大的词条墙
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
      // 修复：将 "tags/" 改为 "tags" 并通过 as any 避开严格类型检查，或者设为 false
      linkToMore: "tags" as any, 
      sort: (f1, f2) => {
        // 严格按照“创建日期”降序排列
        const d1 = f1.dates?.created?.getTime() ?? 0
        const d2 = f2.dates?.created?.getTime() ?? 0
        return d2 - d1
      },
      filter: (f) => f.slug !== "index",
    }),
  ],
  right: [
    Component.Graph(),
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