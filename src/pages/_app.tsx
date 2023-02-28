import type { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import React from 'react'
import { useRouter } from 'next/router'

import de from '@/lang/de.json'
import { DEFAULT_LOCALE } from './constants'

const AVAILABLE_LOCALES: { [key: string]: { [key: string]: string } } = {
  de,
}

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter()

  return (
    <IntlProvider
      messages={
        !locale || locale === DEFAULT_LOCALE
          ? undefined
          : AVAILABLE_LOCALES[locale]
      }
      locale={locale || DEFAULT_LOCALE}
      textComponent={React.Fragment}
      defaultLocale={DEFAULT_LOCALE}
    >
      <Component {...pageProps} />
    </IntlProvider>
  )
}
