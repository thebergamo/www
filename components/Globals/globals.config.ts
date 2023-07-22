type PageLink<GlobalType> = {
  link: string
  title: GlobalType
}

type SocialLink = {
  link: string
  title: string
}

type GlobalsConfig = {
  header: PageLink<keyof Messages['Header']>[]
  footer: PageLink<keyof Messages['Footer']>[]
  socials: SocialLink[]
}

const configs: GlobalsConfig = {
  header: [
    {
      link: '/',
      title: 'home',
    },
    {
      link: '/blog',
      title: 'blog',
    },
    {
      link: '/about',
      title: 'about',
    },
  ],
  footer: [
    {
      link: '/',
      title: 'home',
    },
    {
      link: '/blog',
      title: 'blog',
    },
    {
      link: '/about',
      title: 'about',
    },
  ],
  socials: [
    {
      link: 'https://github.com/thebergamo',
      title: 'Github',
    },
    {
      link: 'https://twitter.com/thebergamo',
      title: 'Twitter',
    },
    {
      link: 'https://www.linkedin.com/in/thebergamo/',
      title: 'LinkedIn',
    },
  ],
}

export default configs
