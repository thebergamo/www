import pick from 'lodash/pick'
import { GetStaticPropsContext } from 'next'
import Root from 'components/Layout/Root'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FeaturedPosts } from 'components/Blocks/FeaturedPosts'
import { getAllPosts, getPostBySlug } from 'lib/blog'
import { PostList } from 'components/Blocks/PostList'
import { NextSeo } from 'next-seo'
import { generateImage } from 'lib/og-generator'

export type Props = {
  featuredPosts: any[]
  allPosts: any[]
  ogImage: string
}

function BlogPage(props: Props) {
  const t = useTranslations('Blog')
  const tog = useTranslations('SocialImage')
  return (
    <>
      <NextSeo
        openGraph={{
          title: tog('blog.title'),
          description: tog('blog.subtitle'),
          images: [
            {
              url: props.ogImage,
              width: 1200,
              height: 630,
              alt: 'Marcos Bérgamo memoji smiling',
              type: 'image/png',
            },
          ],
        }}
      />
      <div className="w-full flex flex-col">
        <section className="mb-16 flex flex-col text-center items-center">
          <div className="items-center">
            <Image
              src="/avatar.png"
              width="124"
              height="124"
              alt="Marcos Bérgamo memoji smiling"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]">
              {t('title')}
            </h1>
            <h2 className="text-zinc-700 dark:text-zinc-200 text-lg mb-4">
              {t('subtitle')}
            </h2>
          </div>
        </section>
        <FeaturedPosts blockName="Featured Posts" posts={props.featuredPosts} />
        <PostList title="All Posts" posts={props.allPosts} />
      </div>
    </>
  )
}

export default BlogPage

BlogPage.messages = ['Blog', 'Post', ...Root.messages]

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const tMessages = await import(`../messages/${locale}.json`)
  const featuredParams = [
    'date',
    'slug',
    'title',
    'image',
    'content',
    'description',
  ]
  // TODO: have a better way to handle featured posts and limit
  const featuredPosts = [
    getPostBySlug('create-next-og-image-at-build-time', featuredParams),
    getPostBySlug('micro-front-ends-key-takeaways', featuredParams),
    getPostBySlug('generate-social-images-as-a-service', featuredParams),
    getPostBySlug(
      'precisamos-falar-sobre-os-novos-desevolvedores',
      featuredParams
    ),
    getPostBySlug(
      'you-might-not-need-a-computer-science-degree',
      featuredParams
    ),
    getPostBySlug('uma-visao-sobre-nosql', featuredParams),
  ]

  const allPosts = getAllPosts([
    'date',
    'skip',
    'slug',
    'title',
    'description',
    'content',
  ])

  const ogImage = await generateImage({
    data: {
      title: 'blog.title',
      subtitle: 'blog.subtitle',
      imagePath: 'avatar.png',
      translate: true,
      locale,
    },
    outputName: `${locale}_blog`,
    options: {
      width: 1200,
      height: 630,
    },
  })

  return {
    props: {
      featuredPosts,
      allPosts,
      ogImage,
      messages: pick(tMessages, BlogPage.messages),
    },
  }
}
