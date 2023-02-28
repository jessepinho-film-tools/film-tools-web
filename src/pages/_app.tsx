import type { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import React from 'react'
import { useRouter } from 'next/router'

import { DEFAULT_LOCALE } from './constants'

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter()

  return (
    <IntlProvider
      locale={locale || DEFAULT_LOCALE}
      textComponent={React.Fragment}
      defaultLocale={DEFAULT_LOCALE}
    >
      <Component {...pageProps} />
    </IntlProvider>
  )
}
