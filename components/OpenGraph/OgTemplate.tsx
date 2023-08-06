type Props = {
  image: string
  title: string
  subtitle: string
  siteTitle?: string
}

export function OgTemplate({
  image,
  title,
  subtitle,
  siteTitle = 'https://thedon.com.br',
}: Props) {
  return (
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
        <div tw="mt-3 flex text-5xl leading-normal text-zinc-200 justify-center">
          {title}
        </div>
        <div tw="mt-3 mb-2 flex text-3xl text-zinc-300 justify-center">
          {subtitle.slice(0, 140)}
        </div>
        <div tw="mt-5 flex items-center text-xl text-zinc-300 justify-center">
          <div>{siteTitle}</div>
          <div tw="-mt-2 ml-3">.</div>
          <div tw="ml-3">{`© Copyright ${new Date().getFullYear()} - Marcos Bérgamo`}</div>
        </div>
      </div>
    </div>
  )
}
