import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import Head from 'next/head'

export default function Home() {
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
                Film tools
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
      </main>
    </>
  )
}
