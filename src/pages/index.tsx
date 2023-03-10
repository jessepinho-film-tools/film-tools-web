import { defineMessages, useIntl } from 'react-intl'
import Head from 'next/head'

import CallSheetForm from '@/components/CallSheetForm'

const M = defineMessages({
  title: {
    defaultMessage: "Jesse Pinho's free call sheet generator",
    id: 'CallSheetPage.title',
  },
  description: {
    defaultMessage: 'A free call sheet generator by Jesse Pinho.',
    id: 'CallSheetPage.description',
  },
})

export default function Home() {
  const intl = useIntl()

  return (
    <>
      <Head>
        <title>{intl.formatMessage(M.title)}</title>
        <meta name="description" content={intl.formatMessage(M.description)} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <CallSheetForm />
      </main>
    </>
  )
}
