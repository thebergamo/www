import type { Root, Node, Parent, Link } from 'mdast'
import { visitParents } from 'unist-util-visit-parents'
import { oEmbedNode } from './oembed'

function isOEmbedNode(node: Node | Parent, parents: Array<Parent>): boolean {
  const isRootParagraph =
    parents.length === 2 && parents[1].type === 'paragraph'
  const hasOneLink = parents[1].children.length === 1
  const hasNoComplexLinkChildren =
    'children' in node &&
    node.children.length === 1 &&
    node.children[0].type === 'text'
  return isRootParagraph && hasOneLink && hasNoComplexLinkChildren
}

async function makeOEmbed(node: Parent) {
  console.log('MAKE EMBED', { node, c: node.children })

  const oembed = await oEmbedNode((node.children[0] as Link).url)

  if (!oembed) {
    return
  }

  node.children = []
  node.type = 'raw'
  node.data = {
    hName: 'raw',
    hChildren: [{ type: 'raw', value: oembed }],
  }
}

function remarkOembed() {
  return async (tree: Root) => {
    const oembedNodes: Array<Parent> = []
    visitParents(tree, 'link', (node, parents) => {
      if (isOEmbedNode(node, parents)) {
        oembedNodes.push(parents[1])
      }
    })

    for (const node of oembedNodes) {
      await makeOEmbed(node)
    }
  }
}

export default remarkOembed
