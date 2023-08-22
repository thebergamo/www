/* eslint-disable no-unused-vars */
// Declaring this interface provides type safety for message keys
type Messages = typeof import('./messages/en-US.json')
declare interface IntlMessages extends Messages {}

export * from 'mdash'
declare module 'mdast' {
  interface RootContentMap {
    // Allow using toml nodes defined by `remark-frontmatter`.
    element: HtmlElementNode
  }
}
