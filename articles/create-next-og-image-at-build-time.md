---
title: Create Next.js Open Graph(OG) images at build time
description: 'From issue with recommended method for generating OG images to statically generated ones at build time. Check it out!'
date: '2023-08-15'
tags: development, en-us, nextjs, og, open-graph
lang: en-US
image: /static/img/posts/next-og-build/cover.jpg
---

## Short story

Before to begin the **"how to"** just would like to give a brief story on **"why"** I had to make it.

While I was putting my blog online again and trying to use this nice feature from Next.js to generate the OG images for each of my blog posts, the [recommended way](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation) to do it, is basically adding an endpoint(e.g.: `pages/api/og.tsx`) that can take advantage of the `ImageResponse` class from `@vercel/og`.

That's ofcourse if you're not using the new `app` folder in [Next.js 13](https://nextjs.org/docs/app/building-your-application/routing).

Everything seemed great, until my last post didn't quite generate properly the OG image and I couldn't find any way to debug it, because locally it was working, but only inside Vercel hosting itself was returning [200 OK](https://http.cat/200) without any image.

![200 OK](https://http.cat/200)

Because of lack of way to debug it in "production", I opened an [issue on Github](https://github.com/orgs/vercel/discussions/3432#discussioncomment-6607542) trying to get some support.

Question is still open at moment of writting this blog post (August 15th, 2023).

I'm not quite a fan of broken stuff, so I started to wonder how I could fix it, after giving up on the current approach.

That concludes the **why** section.

## Generate Image

Despite being the recommended way of doing such thing from Next.js docs, I had couple of doubts with such approach.

> What is someone abused my endpoint?

> Why it needs to be "dynamic" if I won't be chaning that much the metadata of it?

These were the big "?" I always had, then I thought about static generation of those, but that would be a tedious work for every blog post, specially for old ones (due to migration).

So, I had it working, with `ImageResponse`, basically I had to make my own `ImageResponse` and that's it.

Vercel docs, had a session of [Technical details](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation#technical-details) where it highlight the amazing library: [Satori](https://github.com/vercel/satori) which allow us to generate an SVG based on JSX markup.

Until this point, I could simply reuse basically 90% of what I have done already, but there was one last thing that it was missing...

Satori just renders an SVG, but I need a PNG file to be saved, for that I found [resvg-js](https://github.com/yisibl/resvg-js) which seems to be a wrapper on [Resvg](https://github.com/RazrFalcon/resvg/) which is a Rust based high-performance SVG renderer and toolkit(in short: it will generate the PNG based on our SVG).

And guess what? That's basically what the ImageResponse does behind the scenes.

Ok, tools in place.

![Yay celebration gif](/static/img/posts/next-og-build/yay.gif)

```tsx title="lib/og-generator.tsx"
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { writeFile, readFile, stat } from 'fs/promises'
import { join } from 'path'

type ImageOptions = {
  width: number
  height: number
}
type GenerateImageArguments = {
  outputName: string
  options: ImageOptions
}
export async function generateImage({
  outputName,
  options
}: GenerateImageArguments) {
  const publicPath = 'public'
  const relativePath = `og-images/${outputName}.png`
  const pngPath = join(process.cwd(), publicPath, relativePath)
  ...
  const og = /* template */
  const svg = await satori(og, {
    width: options.width,
    height: options.height,
    fonts: [],
  })
  const resvg = new Resvg(svg)
  const pngBuffer = resvg.render().asPng()

  await writeFile(pngPath, pngBuffer)

  return relativePath
}
```

This is a simplified version of it, because we have to deal with Fonts as well, I did the easiest way for the given time:

- Go to [Google Fonts](https://fonts.google.com/)
- Choose a font (in my case Inter)
- Download it and Unzip it
- Place it inside `fonts` folder
- Load it

```tsx title="lib/og-generator.tsx"
import { writeFile, readFile, stat } from 'fs/promises'
import { join } from 'path'
...
const fontPath = 'fonts'
const interPath = join(
  process.cwd(),
  fontPath,
  'Inter/static/Inter-Regular.ttf'
)

export async function generateImage({
  outputName,
  options
}: GenerateImageArguments) {
  ...
  const interFont = await readFile(interPath)
  ...
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
  ...
}

```

After that, our fonts are loaded. with that our tempalte should work and be based on the choosen font.

That should be enough code to make your own `generateImage` method, of course you must implement on your own the template, but I guess that should be the easiest part from now.

> You can take a look on the full code on my [Github repository](https://github.com/thebergamo/www/blob/main/lib/og-generator.tsx#L46-L124)
>
> In my case it's a bit more complex due to some other use cases I would like to handle.

You can grab some inspiration from [OG Image Playground](https://og-playground.vercel.app/) (it works with Tailwind, so yay 🎉)

## Include into Pages

Once, our `generateImage` method is created we can move to how to add it to our pages.

I think the most interesting one is the one inside my `pages/blog/[slug].tsx`, so I will quote this one.

So, what is the trick? I will use the `getStaticProps` method to generate my static image and pass the generated reference into my `BlogPage` component.

Take a look into the snippet:

```tsx title="pages/blog/[slug].tsx"
type Props = {
  ...
  ogImage: string
}

function BlogPage({ ogImage, ...props}: Props) {
  ...
  return (
    <>
      <NextSeo
        openGraph={{
          ...
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              type: 'image/png'
            }
          ]
          ...
        }}
      />
      ...
    </>
  )
  ...
}

export async function getStaticProps(props) {
  ...
  const post = /* get your post */
  const ogImage = await generateImage({
    ...,
    outputName: `${locale}_${post.slug}`,
    options: {
      width: 1200,
      height: 630,
    }
  })

  return {
    props: {
      ...,
      ogImage
    }
  }
}
```

> Again, this is an oversimplified version of my own code, take a look into my repository for [full version](https://github.com/thebergamo/www/blob/main/pages/blog/%5Bslug%5D.tsx).

That's it, with this code we should be able to generate the images for all static pages that we would like.

In case of my blog posts, it's important to remember to use the `getStaticPaths` that I omited for brevity.

> 💡 In this case, remember to place the output dir of these images in the .gitignore.
>
> That's interesting, because if you changed anything, the new image will be generated in every deploy.
>
> As a side effect your build will be also longer if you have quite a big list of pages to generate them.

As we know, `getStaticProps` is called for our static generated pages, so this method will be called and these OG images would be generated and saved for us automatically in each build.

## Side effect...

There is one side effect that it's important to be aware, I wasn't really that concerned with image sizes until I rolled [this change](https://github.com/thebergamo/www/pull/2).

That basically created a quite big zip file that was exceding Vercel limits under the Free Plan.

In order to fix that, I used [Tiny PNG](https://tinypng.com/) to remove any extra bytes from my images, so the final bundle version was smaller and also the generated images were smaller too.

That happened because, I also added couple of images(covers of the blog posts) as part of the OG image, after srinking the images I was again back under Vercel limits and being a good citizen 😻.

### That's it folks!
