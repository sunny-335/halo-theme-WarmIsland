import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/WarmIsland/',
  title: "WarmIsland 暖屿",
  description: "具有独特气质的生活博客主题",
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: '/WarmIsland/favicon.ico' }]],
  themeConfig: {
    logo: '/WarmIsland/favicon.ico',

    nav: [
      { text: '示例站点', link: 'https://nxxy335.top/' }
    ],

    sidebar: [
      {
        text: '简介',
        collapsed: false,
        items: [
          { text: 'WarmIsland 是什么？', link: '/guide/introduction' },
          { text: '快速开始', link: '/guide/getting-started' },
        ]
      },
      {
        text: '配置',
        collapsed: false,
        items: [
          { text: '基础设置', link: '/config/basic' },
          { text: '样式设置', link: '/config/style' },
          { text: '导航栏', link: '/config/navbar' },
          { text: 'Hero 首屏', link: '/config/hero' },
          { text: '首页', link: '/config/home' },
          { text: '文章', link: '/config/article' },
          { text: '瞬间', link: '/config/moments' },
          { text: '图库', link: '/config/photos' },
          { text: '友情链接', link: '/config/links' },
          { text: '朋友圈', link: '/config/friends' },
          { text: '留言板', link: '/config/messageboard' },
          { text: '评论', link: '/config/comment' },
          { text: '页脚', link: '/config/footer' },
        ]
      },
      {
        text: '页面',
        collapsed: false,
        items: [
          { text: '首页', link: '/pages/home' },
          { text: '文章详情', link: '/pages/post' },
          { text: '归档', link: '/pages/archives' },
          { text: '分类与标签', link: '/pages/categories-tags' },
          { text: '瞬间', link: '/pages/moments' },
          { text: '图库', link: '/pages/photos' },
          { text: '友情链接', link: '/pages/links' },
          { text: '朋友圈', link: '/pages/friends' },
          { text: '自定义页面', link: '/pages/custom-page' },
          { text: '扩展页面', link: '/pages/extended' },
        ]
      },
      {
        text: '自定义',
        collapsed: false,
        items: [
          { text: '样式与配色', link: '/customize/style' },
          { text: 'CSS 变量', link: '/customize/css-variables' },
          { text: '自定义 CSS', link: '/customize/custom-css' },
          { text: '开发指南', link: '/customize/development' },
        ]
      },
      {
        text: '其他',
        collapsed: false,
        items: [
          { text: '常见问题', link: '/faq' },
          { text: '更新日志', link: '/changelog' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/nxxy335top/halo-theme-WarmIsland' }
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
              }
            }
          }
        }
      }
    },

    footer: {
      message: '基于 GPL-3.0 许可发布',
      copyright: '© 2026 暖心向阳335'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    outline: {
      label: '页面导航',
      level: [2, 3]
    },

    lastUpdated: {
      text: '最后更新于'
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  }
})
