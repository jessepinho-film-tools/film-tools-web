import CssBaseline from '@mui/material/CssBaseline'
import { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <CssBaseline />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
