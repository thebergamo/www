import { ReactElement } from 'react'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { writeFile, readFile, stat } from 'fs/promises'
import { join } from 'path'
import { OgTemplate } from 'components/OpenGraph/OgTemplate'
import mimeType from 'mime-types'
import { createTranslator } from 'next-intl'

type ImageOptions = {
  width: number
  height: number
}

type TemplateOptions = {
  title: string
  subtitle: string
  imagePath: string
  translate: boolean
  locale?: string
}

type Options = {
  data?: TemplateOptions
  template?: ReactElement
  outputName: string
  options: ImageOptions
}

const fontPath = 'fonts'
const interPath = join(
  process.cwd(),
  fontPath,
  'Inter/static/Inter-Regular.ttf'
)

async function getTranslator(locale: string = 'en-US') {
  const tMessages = await import(`../messages/${locale}.json`)
  return createTranslator({
    messages: tMessages,
    locale: locale || 'en-US',
    namespace: 'SocialImage',
  })
}

export async function generateImage({
  data,
  template,
  outputName,
  options,
}: Options) {
  const publicPath = 'public'
  const relativePath = `/og-images/${outputName}.png`
  const pngPath = join(process.cwd(), publicPath, relativePath)

  console.info('generating new og image for: ', outputName)
  try {
    if (await stat(pngPath)) {
      console.info('file already generated')
      return relativePath
    }
  } catch (err) {
    // in case of error file doesn't exist
  }

  if (!template && !data) {
    throw new SyntaxError(
      'Missing data to generate OG image or Template itself'
    )
  }

  let og = template

  if (!template && data) {
    const imageType = mimeType.lookup(data.imagePath)
    const imageData = await readFile(
      join(process.cwd(), publicPath, data.imagePath),
      { encoding: 'base64' }
    ).catch(console.error)

    if (data.translate) {
      const t = await getTranslator(data.locale)
      og = (
        <OgTemplate
          //@ts-ignore-next-line
          title={t(data.title)}
          //@ts-ignore-next-line
          subtitle={t(data.subtitle)}
          image={`data:${imageType};base64,${imageData}`}
        />
      )
    } else {
      og = (
        <OgTemplate
          title={data.title}
          subtitle={data.subtitle}
          image={`data:${imageType};base64,${imageData}`}
        />
      )
    }
  }

  const interFont = await readFile(interPath)

  const svg = await satori(og, {
    width: options.width,
    height: options.height,
    fonts: [
      {
        name: 'Inter-Regular',
        data: interFont,
        weight: 400,
        style: 'normal',
      },
    ],
  })

  const resvg = new Resvg(svg)
  const pngBuffer = resvg.render().asPng()

  await writeFile(pngPath, pngBuffer)

  return relativePath
}
