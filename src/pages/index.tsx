import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import { defineMessages, useIntl } from 'react-intl'
import Head from 'next/head'
import { useRouter } from 'next/router'

const M = defineMessages({
  appCredit: {
    defaultMessage: 'by Jesse Pinho',
    id: 'NavBar.appCredit',
  },
  appName: {
    defaultMessage: 'Film tools',
    id: 'NavBar.appName',
  },
  callSheetsLabel: {
    defaultMessage: 'Call sheets',
    id: 'NavBar.callSheetsLabel',
  },
})

export default function Home() {
  const intl = useIntl()
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Jesse Pinho&apos;s Film Tools</title>
        <meta
          name="description"
          content="A free call sheet generator by Jesse Pinho."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1 }}
              >
                {intl.formatMessage(M.appName)}
              </Typography>
            </Toolbar>

            <Tabs
              value={0}
              textColor="inherit"
              indicatorColor="secondary"
              variant="scrollable"
            >
              <Tab label="Call sheets" />
            </Tabs>
          </AppBar>
        </Box>
        {router.locale}
      </main>
    </>
  )
}
