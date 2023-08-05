import { ReactElement } from 'react'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { writeFile, readFile, stat } from 'fs/promises'
import { join } from 'path'
import { OgTemplate } from 'components/OpenGraph/OgTemplate'
import mimeType from 'mime-types'

type ImageOptions = {
  width: number
  height: number
}

type TemplateOptions = { title: string; subtitle: string; imagePath: string }

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

  console.log('no image found in cache.. proceed generating')

  if (!template && !data) {
    throw new SyntaxError(
      'Missing data to generate OG image or Template itself'
    )
  }
  console.log('data to be run')

  let og = template

  if (!template && data) {
    const imageType = mimeType.lookup(data.imagePath)
    const imageData = await readFile(
      join(process.cwd(), publicPath, data.imagePath),
      { encoding: 'base64' }
    ).catch(console.error)
    console.log('image loaded')
    og = (
      <OgTemplate
        title={data.title}
        subtitle={data.subtitle}
        image={`data:${imageType};base64,${imageData}`}
      />
    )
  }

  const interFont = await readFile(interPath)

  console.log('run satori')
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
  console.log('satori done', svg)
  const resvg = new Resvg(svg)
  const pngBuffer = resvg.render().asPng()

  console.log('just write file')
  await writeFile(pngPath, pngBuffer)

  return relativePath
}
