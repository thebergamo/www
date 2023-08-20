import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeRaw from 'rehype-raw'

import remarkOembed from './rehype-oembed'

export async function parseMarkdownToHTML(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkOembed)
    .use(remarkRehype)
    .use(rehypeRaw)
    .use(rehypePrettyCode, {
      theme: 'dracula',
    })
    // .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(content)

  return String(result)
}
