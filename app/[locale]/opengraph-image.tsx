import { useTranslations } from "next-intl";
import { ImageResponse } from "next/server";

export const runtime = 'edge'

export const alt = ''
export const size = {
  width: 1200,
  height: 630
}

export const contentType = 'image/png'

function OgImageSite({ srcImage }: { srcImage: string }) {
  const t = useTranslations("SocialImage")
 

return (
  <div
  tw="p-6 h-full w-full flex justify-center items-center"
  style={{
    background: "linear-gradient(133deg, rgb(110, 231, 183) 0%, rgb(59, 130, 246) 45%, rgb(147, 51, 234) 100%)",
  }}
>
  <div tw="rounded p-10 bg-zinc-900 h-full w-full flex flex-col">
    <div tw="mt-10 mb-3 flex items-center justify-center">
      <img
        width="240"
        height="240"
        src={srcImage}
        tw="border-2 border-white rounded-full"
      />
    </div>
    <div tw="mt-8 flex text-6xl leading-normal text-gray-200 justify-center">{t("homeTite")}</div>
    <div tw="mt-5 flex text-3xl text-gray-300 justify-center">{t('homeSubtitle')}</div>
    <div tw="mt-5 flex items-center text-xl text-gray-300 justify-center">
      <div>{t("siteTitle")}</div>
      <div tw="-mt-2 ml-3">.</div>
      <div tw="ml-3">{`© Copyright ${new Date().getFullYear()} - Marcos Bérgamo`}</div>
    </div>
  </div>
</div>
)
}

type OGParams = {
  params: {
    locale: string
  }
}

export default async function Image({ params: { locale }}: OGParams) {
  const image = new URL('../../public/avatar-hello.png', import.meta.url).toString()

  return new ImageResponse(
   <OgImageSite srcImage={image} /> 
  )
}
