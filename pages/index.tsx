import pick from 'lodash/pick'
import { GetStaticPropsContext } from 'next'
import Root from 'components/Layout/Root'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FeaturedPosts } from 'components/Blocks/FeaturedPosts'
import { getPostBySlug } from 'lib/blog'
import { NextSeo } from 'next-seo'

import { generateImage } from 'lib/og-generator'

export type Props = {
  featuredPosts: any[]
  ogImage: string
}

function HomePage(props: Props) {
  const t = useTranslations('Home')
  const tog = useTranslations('SocialImage')
  return (
    <>
      <NextSeo
        openGraph={{
          title: tog('home.title'),
          description: tog('home.subtitle'),
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
              src="/avatar-hello.png"
              width="124"
              height="124"
              alt="Marcos Bérgamo memoji smiling"
            />
          </div>
          <div className="flex flex-col">
            <h1>{t('greeting')}</h1>
            <h2 className="text-zinc-700 dark:text-zinc-200 text-lg mb-4">
              {t('work-title')}
              <span className="font-semibold">{t('company')}</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-lg">
              {t('description')}
            </p>
          </div>
        </section>
        <FeaturedPosts blockName="Featured Posts" posts={props.featuredPosts} />
      </div>
    </>
  )
}

export default HomePage

HomePage.messages = ['Home', 'Post', ...Root.messages]

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

  const ogImage = await generateImage({
    data: {
      title: 'home.title',
      subtitle: 'home.subtitle',
      imagePath: 'avatar-hello.png',
      translate: true,
      locale,
    },
    outputName: `${locale}_home`,
    options: {
      width: 1200,
      height: 630,
    },
  })

  return {
    props: {
      featuredPosts,
      ogImage,
      messages: pick(tMessages, HomePage.messages),
    },
  }
}
