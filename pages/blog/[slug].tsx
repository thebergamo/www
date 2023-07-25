import PostLayout from 'components/Layout/PostLayout'
import Root from 'components/Layout/Root'
import { convertMarkdownToHtml, getAllPosts, getPostBySlug } from 'lib/blog'
import pick from 'lodash/pick'
import { GetStaticPropsContext } from 'next'
import { useTranslations } from 'next-intl'

export type Props = {
  errorCode?: number
  post: any
}

function BlogPage({ post, errorCode }: Props) {
  const t = useTranslations('Post')
  if (errorCode) {
    return (
      <>
        <h1>Oh no! ;(</h1>
      </>
    )
  }

  return (
    <>
      <aside className="bg-orange-300 rounded-lg p-4 text-lg">
        <div className="flex flex-row">
          <p className="text-2xl p-2 mx-2">🔄</p>
          <p>
            {t('disclaimer')}
            <a className="underline" href={post.original_post}>
              {t('original')}.
            </a>
            <br />
            {t('reason')}
          </p>
        </div>
      </aside>
      <span
        className="prose dark:prose-invert max-w-prose"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </>
  )
}

export default BlogPage

BlogPage.messages = ['Blog', 'Post', ...Root.messages]

export async function getStaticProps({
  locale,
  params,
}: GetStaticPropsContext) {
  let post = null
  let errorCode = null

  try {
    const slug = (params?.slug ?? '') as string

    post = getPostBySlug(slug, [
      'content',
      'date',
      'description',
      'image',
      'image_credit',
      'image_alt',
      'lang',
      'slug',
      'title',
      'original_post',
    ])

    post.content = await convertMarkdownToHtml(post.content)
    post.image_credit = await convertMarkdownToHtml(post.image_credit)
  } catch (err) {
    errorCode = 404
  }

  return {
    props: {
      post,
      errorCode,
      messages: pick(
        await import(`../../messages/${locale}.json`),
        BlogPage.messages
      ),
    },
  }
}

BlogPage.Layout = PostLayout

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }))

  console.info(paths)

  return {
    paths,
    fallback: 'blocking',
  }
}
