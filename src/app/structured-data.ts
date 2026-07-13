import { SEO } from './seo'

const org = {
  '@type': 'Organization',
  name: SEO.brand.name,
  url: SEO.siteUrl,
  logo: SEO.brand.logo,
  email: SEO.brand.email || undefined,
  telephone: SEO.brand.phone || undefined,
  address: SEO.brand.address || undefined,
}

function cleanUndefined<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as T
}

export function buildJsonLd() {
  const organization = cleanUndefined(org)


  return [
    {
      '@context': 'https://schema.org',
      '@graph': [
        organization,
        {
          '@type': 'WebSite',
          name: SEO.brand.name,
          url: SEO.siteUrl,
          inLanguage: SEO.language,
          publisher: { '@type': 'Organization', '@id': `${SEO.siteUrl}/#organization` },
          potentialAction: {
            '@type': 'SearchAction',
            target: `${SEO.siteUrl}/?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        },
        {
          '@type': 'WebPage',
          '@id': `${SEO.siteUrl}/#webpage`,
          url: SEO.siteUrl,
          name: SEO.brand.name,
          isPartOf: { '@id': `${SEO.siteUrl}/#website` },
          about: { '@id': `${SEO.siteUrl}/#organization` },
        },
      ],
    },
  ]
}

