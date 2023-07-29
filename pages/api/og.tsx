import { ImageResponse } from '@vercel/og'
import { createTranslator } from 'next-intl'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(request: NextRequest) {
  try {
    //const image = new URL('../../public/avatar-hello.png', import.meta.url)
    const { searchParams, pathname } = new URL(request.url)
    const langSegment = pathname.split('/')[1]
    const language = ['pt-BR', 'en-US'].includes(langSegment)
      ? langSegment
      : 'en-US'

    const messages = (await import(`../../messages/${language}.json`)).default

    const t = createTranslator({
      messages,
      locale: language,
      namespace: 'SocialImage',
    })

    const hasImage = searchParams.has('image')
    const title = searchParams.has('title')
      ? searchParams.get('title')?.slice(0, 100)
      : t('homeTitle')
    const subtitle = searchParams.has('subtitle')
      ? searchParams.get('subtitle')
      : t('homeSubtitle')
    const imageUrl = hasImage ? `${searchParams.get('image')}` : ''
    console.log({
      imageUrl,
      url: new URL(imageUrl, import.meta.url).toString(),
    })
    const image = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}${imageUrl}`
      : `http://localhost:3000${imageUrl}`

    return new ImageResponse(
      (
        <div
          tw="p-6 h-full w-full flex justify-center items-center"
          style={{
            background:
              'linear-gradient(133deg, rgb(110, 231, 183) 0%, rgb(59, 130, 246) 45%, rgb(147, 51, 234) 100%)',
          }}
        >
          <div tw="rounded p-10 bg-zinc-900 h-full w-full flex flex-col">
            <div tw="mt-10 flex items-center justify-center">
              <img
                width="240"
                height="240"
                src={image}
                tw="border-2 border-white rounded-full"
              />
            </div>
            <div tw="mt-3 flex text-6xl leading-normal text-gray-200 justify-center">
              {title}
            </div>
            <div tw="mt-3 mb-2 flex text-3xl text-gray-300 justify-center">
              {subtitle}
            </div>
            <div tw="mt-5 flex items-center text-xl text-gray-300 justify-center">
              <div>{t('siteTitle')}</div>
              <div tw="-mt-2 ml-3">.</div>
              <div tw="ml-3">{`© Copyright ${new Date().getFullYear()} - Marcos Bérgamo`}</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
