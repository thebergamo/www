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
    // @ts-ignore-next-line
    .use(remarkParse)
    // @ts-ignore-next-line
    .use(remarkGfm)
    .use(remarkOembed)
    // @ts-ignore-next-line
    .use(remarkRehype)
    // @ts-ignore-next-line
    .use(rehypeRaw)
    // @ts-ignore-next-line
    .use(rehypePrettyCode, {
      theme: 'dracula',
    })
    // .use(rehypeSanitize)
    // @ts-ignore-next-line
    .use(rehypeStringify)
    .process(content)

  return String(result)
}
