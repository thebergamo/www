import '../globals.css'
import { Header } from 'components/Globals/Header'
import { Metadata } from "next"
import { NextIntlClientProvider, useLocale } from "next-intl"
import {notFound} from 'next/navigation'
import Footer from 'components/Globals/Footer'

export const metadata: Metadata = {
  metadataBase: new URL("https://thedon.com.br"),
  title: "Marcos Bergamo website",
  description: "LOL WTF BBQ",
  themeColor: "#fff",
  robots: "max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  
}

export default async function RootLayout({
  children, params
}: { children: React.ReactNode, params: { locale: string }}) {
  const locale = useLocale()
  let messages

  if (params.locale !== locale) {
    notFound()
  }

  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body className="bg-white dark:bg-black text-black dark:text-white">
        <NextIntlClientProvider locale={locale} messages={messages}>

        
      <div className="bg-gray-50 dark:bg-gray-900">
      <main
        id="skip"
        className="flex flex-col justify-center px-8 bg-gray-50  dark:bg-gray-900"
      >
       <Header />
        <div className="flex flex-col justify-center items-start self-center max-w-4xl pb-16">
          {children}
        </div>
        <Footer />
      </main>
        </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
