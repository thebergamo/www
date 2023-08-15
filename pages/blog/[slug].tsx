import PostLayout from 'components/Layout/PostLayout'
import Root from 'components/Layout/Root'
import { convertMarkdownToHtml, getAllPosts, getPostBySlug } from 'lib/blog'
import { generateImage } from 'lib/og-generator'
import pick from 'lodash/pick'
import { GetStaticPropsContext } from 'next'
import { useTranslations } from 'next-intl'
import { NextSeo } from 'next-seo'

export type Props = {
  errorCode?: number
  post: any
  ogImage: string
}

function BlogPage({ post, errorCode, ogImage }: Props) {
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
      <NextSeo
        title={post.title}
        description={post.description}
        canonical={`https://www.thedon.com.br/blog/${post.slug}`}
        openGraph={{
          title: post.title,
          description: post.description,
          url: `https://www.thedon.com.br/blog/${post.slug}`,
          type: 'article',
          article: {
            tags: post.tags.split(','),
            publishedTime: post.date,
            modifiedTime: post.date,
          },
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: 'Marcos Bérgamo memoji smiling',
              type: 'image/png',
            },
          ],
        }}
      />
      {post.original_post && (
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
      )}
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
  const tMessages = await import(`../../messages/${locale}.json`)
  let post = null
  let errorCode = null
  let ogImage = ''

  try {
    const slug = (params?.slug ?? '') as string

    post = getPostBySlug(slug, [
      'content',
      'date',
      'description',
      'image',
      'tags',
      'image_credit',
      'image_alt',
      'lang',
      'slug',
      'title',
      'original_post',
    ])

    post.content = await convertMarkdownToHtml(post.content)
    post.image_credit = await convertMarkdownToHtml(post.image_credit)

    ogImage = await generateImage({
      data: {
        title: post.title,
        subtitle: post.description || '',
        imagePath: post.image,
        translate: false,
        locale,
      },
      outputName: `${locale}_${post.slug}`,
      options: {
        width: 1200,
        height: 630,
      },
    })
  } catch (err) {
    console.error('Error while rendering post', err)
    errorCode = 404
  }

  return {
    props: {
      post,
      errorCode,
      ogImage,
      messages: pick(tMessages, BlogPage.messages),
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
