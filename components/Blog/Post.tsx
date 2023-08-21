import { Calendar } from 'components/Icons/Calendar'
import { Clock } from 'components/Icons/Clock'
import { useTranslations } from 'next-intl'
import { PropsWithChildren } from 'react'
import readingTime from 'reading-time'

export const Post: React.FC<PropsWithChildren> = ({ children }) => {
  return <main className="overflow-hidden flex-1">{children}</main>
}

export const PostHero: React.FC<PropsWithChildren> = ({ children }) => {
  return <main className="overflow-hidden flex-1">{children}</main>
}

export const PostHeader: React.FC<{
  title: string
  image: string
  date: string
  content: string
  imageCredit?: string
  imageAlt?: string
}> = ({ title, image, date, content, imageCredit, imageAlt }) => {
  const t = useTranslations('Post')
  const stats = readingTime(content)
  return (
    <div className="h-screen flex justify-center flex-col">
      <h1 className="lg:text-7xl text-4xl text-center z-30">{title}</h1>
      <span
        role="img"
        aria-label={imageAlt}
        className="absolute right-0 top-0 opacity-20 h-screen bg-cover bg-center w-full z-0"
        style={{ backgroundImage: `url(${image})` }}
      />
      {imageCredit && (
        <div className="absolute right-5 bottom-5 dark:bg-orange-300 bg-orange-200 rounded-full">
          <div
            className="prose dark:prose-invert px-4"
            dangerouslySetInnerHTML={{ __html: imageCredit }}
          />
        </div>
      )}

      <div className="flex justify-center lg:text-2xl mb-8 mt-12 z-30">
        <div className="flex items-center  text-zinc-800 dark:text-zinc-200 capsize mr-8">
          <Calendar />
          <span className="ml-2 align-baseline capsize">{date}</span>
        </div>
        <div className="flex items-center text-zinc-800 dark:text-zinc-200 capsize">
          <Clock />
          <span className="ml-2 align-baseline capsize capitalize">
            {t('readingTime', { time: Math.ceil(stats.minutes) })}
          </span>
        </div>
      </div>
    </div>
  )
}

export const PostContent: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="lg:flex lg:justify-center">
      <div className="lg:max-w-6xl">{children}</div>
    </div>
  )
}

export const PostContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>
}
