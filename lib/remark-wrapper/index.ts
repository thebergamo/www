import { HtmlElementNode } from '@jsdevtools/rehype-toc'
import type { Root, RootContent } from 'mdast'
import { visit } from 'unist-util-visit'

declare module 'mdast' {
  // eslint-disable-next-line no-unused-vars
  interface RootContentMap {
    // Allow using toml nodes defined by `remark-frontmatter`.
    element: HtmlElementNode
  }
}

type RemarkWrapperOptions = {
  containerWrapperClass?: string
  containerWrapperElement?: 'div' | 'span' | 'section'
  articleWrapperClass?: string
  articleWrapperElement?: 'article' | 'div'
}

const defaultOptions: RemarkWrapperOptions = {
  containerWrapperClass: 'container-wrapper',
  containerWrapperElement: 'section',
  articleWrapperClass: 'article-wrapper',
  articleWrapperElement: 'article',
}

function remarkWrapper({
  containerWrapperClass = 'container-wrapper',
  containerWrapperElement = 'section',
  articleWrapperClass = 'article-wrapper',
  articleWrapperElement = 'article',
} = defaultOptions) {
  return async (tree: Root) => {
    visit(tree, 'root', (node) => {
      if (node.children.length > 1) {
        const [toc, ...article] = [...node.children]
        const articleWrapper = {
          type: 'element',
          tagName: articleWrapperElement,
          properties: { className: articleWrapperClass },
          children: article,
        }
        const wrapper: Array<RootContent> = [
          {
            type: 'element',
            tagName: containerWrapperElement,
            properties: { className: containerWrapperClass },
            children: [toc, articleWrapper],
          },
        ]

        node.children = wrapper
      }
    })
  }
}

export default remarkWrapper
