import { DefaultSeoProps } from 'next-seo'

const config: DefaultSeoProps = {
  titleTemplate: '%s - Marcos Bérgamo',
  defaultTitle: 'Marcos Bérgamo Blog',
  description: 'Writer, mostly software writer',
  canonical: 'https://www.thedon.com.br',
  themeColor: '#FFFFFF',
  robotsProps: {
    maxImagePreview: 'large',
    maxVideoPreview: -1,
    maxSnippet: -1,
  },
  additionalLinkTags: [
    {
      rel: 'shortcut icon',
      href: '/favicons/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/favicons/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'icon',
      href: '/favicons/favicon-32x32.png',
      sizes: '32x32',
    },
    {
      rel: 'icon',
      href: '/favicons/favicon-16x16.png',
      sizes: '16x16',
    },
    {
      rel: 'alternative',
      type: 'application/rss+xml',
      href: '/feed.xml',
    },
  ],
  languageAlternates: [
    {
      hrefLang: 'pt-BR',
      href: 'https://www.thedon.com.br/pt-BR',
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.thedon.com.br',
    siteName: 'Marcos Bérgamo Personal Blog',
    description: 'Writer, mostly software writer',
  },
  twitter: {
    handle: '@thebergamo',
    site: '@thebergamo',
    cardType: 'summary_large_image',
  },
}

export default config
