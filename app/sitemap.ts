import { getAllPosts } from "lib/blog"
import { MetadataRoute } from "next"

const URL = 'https://www.thedon.com.br'
const STATIC_ROUTES = ['', '/blog', '/about', '/feed.xml']

type Sitemap =  MetadataRoute.Sitemap

export default function sitemap(): Sitemap {
  const posts: Sitemap = getAllPosts([
    'date',
    'slug'
  ]).map(({ date, slug }) => ({
    url: `${URL}/blog/${slug}`,
    lastModified: date
  }))

  const routes: Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString()
  }))

  return [...routes, ...posts]

}
