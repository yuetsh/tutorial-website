// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '徐越的编程书',
  tagline: '轻轻松松上手编程语言',
  url: 'https://book.hyyz.izhai.net',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          breadcrumbs: false
        },
        blog: false,
        // blog: {
        //   showReadingTime: true,
        //   blogSidebarTitle: "近期文章"
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      announcementBar: {
        content: '本网站正在建设中...',
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
      },
      navbar: {
        title: '徐越的编程书',
        hideOnScroll: true,
        logo: {
          alt: '徐越的编程书',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'basic/intro',
            label: '编程基础',
          },
          {
            type: 'dropdown',
            label: '编程语言',
            items: [
              {
                type: 'doc',
                docId: 'clang/intro',
                label: 'C',
              },
              {
                type: 'doc',
                docId: 'python/intro',
                label: 'Python',
              },
            ]
          },
          {
            type: 'doc',
            docId: 'linux/intro',
            label: 'Linux',
          },
          {
            type: 'doc',
            docId: 'cs/intro/index',
            label: '计算机科学'
          },
          // {
          //   to: 'blog',
          //   label: '文章',
          //   position: 'left',
          // }
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
