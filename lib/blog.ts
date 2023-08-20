import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'
import { parseMarkdownToHTML } from './markdown-parser'

const postsDirectory = join(process.cwd(), 'articles')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items: Record<string, string> = {}

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }

    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) =>
      new Date(post1.date).getTime() > new Date(post2.date).getTime() ? -1 : 1
    )

  return posts
}

export function searchPosts(term: string) {
  return getAllPosts(['title', 'content', 'slug']).filter(
    (p) => p.title.includes(term) || p.content.includes(term)
  )
}

export async function convertMarkdownToHtml(markdown: string) {
  return parseMarkdownToHTML(markdown)
}
