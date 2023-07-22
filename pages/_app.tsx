import '../styles/globals.css'

import { ThemeProvider } from 'next-themes'

import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import { useState } from 'react'
import Root from 'components/Layout/Root'
import { ScrollInfoProvider } from '@faceless-ui/scroll-info'
import { WindowInfoProvider } from '@faceless-ui/window-info'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { NextIntlProvider } from 'next-intl'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: typeof Root
  auth?: boolean
}

type PageProps = {
  messages: IntlMessages
  dehydratedState?: unknown
}

type AppPropsWithLayout = AppProps<PageProps> & {
  Component: NextPageWithLayout<PageProps>
}

const breakpoints = {
  xs: '480',
  s: '600',
  m: '850',
  l: '1280',
  xl: '1680',
  xxl: '1920',
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Create a client
  const [queryClient] = useState(() => new QueryClient())
  const Layout = Component.Layout || Root
  return (
    <ScrollInfoProvider>
      <WindowInfoProvider breakpoints={breakpoints}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider attribute="class">
              <NextIntlProvider messages={pageProps.messages}>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </NextIntlProvider>
            </ThemeProvider>
          </Hydrate>
        </QueryClientProvider>
      </WindowInfoProvider>
    </ScrollInfoProvider>
  )
}

export default MyApp
