import { themes as prismThemes } from "prism-react-renderer"
import type { Config } from "@docusaurus/types"
import type * as Preset from "@docusaurus/preset-classic"

const config: Config = {
  title: "徐越的编程书",
  tagline: "轻轻松松上手编程语言",
  url: "https://book.hyyz.izhai.net",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",
          breadcrumbs: true,
        },
        blog: false,
        // blog: {
        //   showReadingTime: true,
        //   blogSidebarTitle: "近期文章"
        // },
        theme: {
          customCss: ["./src/css/custom.css"],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    announcementBar: {
      content: "本网站正在建设中...",
      backgroundColor: "#fafbfc",
      textColor: "#091E42",
    },
    navbar: {
      title: "徐越的编程书",
      hideOnScroll: false,
      logo: {
        alt: "徐越的编程书",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "doc",
          docId: "basic/intro/index",
          label: "编程基础",
        },
        {
          type: "doc",
          docId: "games/跑操喊口号/index",
          label: "游戏闯关",
        },
        {
          label: "编程语言",
          items: [
            {
              type: "doc",
              docId: "clang/intro/index",
              label: "C",
            },
            {
              type: "doc",
              docId: "python/intro/index",
              label: "Python",
            },
          ],
        },
        {
          type: "doc",
          docId: "cs/intro/index",
          label: "计算机科学",
        },
        {
          type: "doc",
          docId: "tools/index",
          label: "工具集合",
        },
        // {
        //   type: "doc",
        //   docId: "linux/intro",
        //   label: "Linux",
        // },
        // {
        //   to: 'blog',
        //   label: '文章',
        //   position: 'left',
        // }
        {
          label: "导航",
          position: "right",
          href: "https://home.hyyz.izhai.net",
        },
        {
          label: "判题狗",
          position: "right",
          href: "https://oj.hyyz.izhai.net",
        },
        {
          label: "自测猫",
          position: "right",
          href: "https://code.hyyz.izhai.net",
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
}

export default config
