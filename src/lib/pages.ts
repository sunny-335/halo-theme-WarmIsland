// Astro 构建时辅助函数，提供页面配置信息
// 运行时由 Thymeleaf 模板中的 theme.config 覆盖

interface PageConfig {
  title: string
  slug: string
  enabled: boolean
}

const pages: Record<string, PageConfig> = {
  moments: {
    title: '瞬间',
    slug: 'moments',
    enabled: true,
  },
  photos: {
    title: '图库',
    slug: 'photos',
    enabled: true,
  },
}

export function findPageBySlug(slug: string): PageConfig | undefined {
  return pages[slug]
}
