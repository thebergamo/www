import pick from 'lodash/pick'
import { GetStaticPropsContext } from 'next'
import Root from 'components/Layout/Root'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { generateImage } from 'lib/og-generator'

export type Props = {
  ogImage: string
}
function AboutPage(props: Props) {
  const t = useTranslations('About')
  const tog = useTranslations('SocialImage')
  return (
    <>
      <NextSeo
        openGraph={{
          title: tog('about.title'),
          description: tog('about.subtitle'),
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
            <h1>{t('title')}</h1>
            <h2 className="text-zinc-700 dark:text-zinc-200 text-3xl mb-4">
              {t('welcome')}
            </h2>
          </div>
        </section>
        <section className="text-lg">
          <p>{t('short-intro')}</p>
          <div className="flex justify-center my-8">
            <Image
              src="/static/img/me.jpg"
              alt="Marcos Bérgamo picture"
              width={2316}
              height={3088}
              className="object-contain w-2/3"
            />
          </div>

          <h3 className="text-2xl font-semibold my-4">
            💻 {t('professional-title')}
          </h3>
          <Paragraph text={t('professional-description')} />
          <h3 className="text-2xl font-semibold my-4">
            📖 {t('writings-title')}
          </h3>
          <Paragraph text={t('writings-description')} />
          <ul className="list-disc list-inside">
            <li>
              <a
                className="text-2xl font-bold my-4 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
                href="https://onofilhote.blogspot.com/"
              >
                Ordem Nacional dos Ornitorrincos (ONO)
              </a>
            </li>
            <li>
              <a
                className="text-2xl font-bold my-4 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
                href="https://escrito-sangue.blogspot.com/"
              >
                Escrito em Sangue
              </a>
            </li>
          </ul>
          <Paragraph text={t('book-description')} />
          <ul className="list-disc list-inside">
            <li>
              <a
                className="text-2xl font-bold my-4 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
                href="https://clubedeautores.com.br/livro/se-ainda-houver-amor"
              >
                Se ainda houver amor
              </a>
            </li>
          </ul>
        </section>
      </div>
    </>
  )
}

function Paragraph({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((text) => (
        <p className="my-4" key={text}>
          {text}
        </p>
      ))}
    </>
  )
}

export default AboutPage

AboutPage.messages = ['About', ...Root.messages]

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const tMessages = await import(`../messages/${locale}.json`)

  const ogImage = await generateImage({
    data: {
      title: 'about.title',
      subtitle: 'about.subtitle',
      imagePath: 'avatar-contact.png',
      translate: true,
      locale,
    },
    outputName: `${locale}_about`,
    options: {
      width: 1200,
      height: 630,
    },
  })

  return {
    props: {
      ogImage,
      messages: pick(tMessages, AboutPage.messages),
    },
  }
}
