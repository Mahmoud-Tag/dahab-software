import type { MetadataRoute } from 'next'

const baseUrl = 'https://dahabsoftware.com'

const routes = [
  '',
  '/about',
  '/about-dahab-software',
  '/blog',
  '/careers',
  '/case-studies',
  '/contact',
  '/faq',
  '/partnerships',
  '/portfolio',
  '/privacy',
  '/services',
  '/team',
  '/technologies',
  '/terms',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}
