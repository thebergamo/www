import type { Root, RootContent } from 'mdast'
import { visit } from 'unist-util-visit'

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
        console.log('NODE SELECTED')
        console.log({ node })
      }
    })
    // const [toc, ...article] = { ...tree.children }
    // tree.children = [
    //   toc,
    //   {
    //     type: 'html',
    //     tagName: 'article',
    //     properties: { className: 'article-wrapper' },
    //     children: article,
    //   },
    // ]
  }
}

export default remarkWrapper
