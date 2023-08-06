import Footer from 'components/Globals/Footer'

import { Header } from 'components/Globals/Header'
import { NextSeo } from 'next-seo'
import { useTheme } from 'next-themes'
import { PropsWithChildren } from 'react'

export default function RootLayout({ children }: PropsWithChildren) {
  const { theme } = useTheme()
  const themeColor = theme === 'light' ? '#FFFFFF' : '#000000'
  return (
    <>
      <NextSeo themeColor={themeColor} />
      <div className="bg-gray-50 dark:bg-gray-900">
        <main id="skip" className="flex flex-col justify-center px-8">
          <Header />
          <div className="flex flex-col justify-center items-start self-center max-w-4xl pb-16">
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </>
  )
}

RootLayout.messages = [
  'Root',
  'SocialImage',
  ...Header.messages,
  ...Footer.messages,
]
