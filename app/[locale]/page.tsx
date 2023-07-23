import { useTranslations } from "next-intl"
import Image from 'next/image'
import { FeaturedPosts } from 'components/Blocks/FeaturedPosts'
import { getPostBySlug } from 'lib/blog'
import type { Post } from 'components/Blog/PostCard'

export type Props = {
  featuredPosts: any[]
}
const featuredParams = [
  'date',
  'slug',
  'title',
  'image',
  'content',
  'description',
]

export default function HomePage() {
  const featuredPosts = [
    getPostBySlug('generate-social-images-as-a-service', featuredParams),
  ] as  Post[]


  const t = useTranslations('Home')
  return (
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
          <h2 className="text-gray-700 dark:text-gray-200 text-lg mb-4">
            {t('work-title')}
            <span className="font-semibold">{t('company')}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-lg">
            {t('description')}
          </p>
        </div>
      </section>
      <FeaturedPosts blockName="Featured Posts" posts={featuredPosts} />
    </div>
  )
}
