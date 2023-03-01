import { Card } from '@mui/material'
import Head from 'next/head'
import { defineMessages, useIntl } from 'react-intl'

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Card>Hello, world!</Card>
      </main>
    </>
  )
}
