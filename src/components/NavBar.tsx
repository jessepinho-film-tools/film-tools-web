import {
  AppBar,
  Box,
  Link,
  Toolbar,
  Typography,
  Tabs,
  Tab,
} from '@mui/material'
import Image from 'next/image'
import { defineMessages, useIntl } from 'react-intl'

const M = defineMessages({
  appName: {
    defaultMessage: 'film tools',
    id: 'NavBar.appName',
  },
  callSheetsLabel: {
    defaultMessage: 'Call sheets',
    id: 'NavBar.callSheetsLabel',
  },
  productionsLabel: {
    defaultMessage: 'Productions',
    id: 'NavBar.productionsLabel',
  },
})

export default function NavBar() {
  const intl = useIntl()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ mr: 2 }}>
            <Image
              src="/logo.svg"
              width={120}
              height={50}
              alt="Jesse Pinho's"
            />
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexShrink: 0, mr: 1 }}
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
          <Tab label={intl.formatMessage(M.callSheetsLabel)} />
          <Tab label={intl.formatMessage(M.productionsLabel)} />
        </Tabs>
      </AppBar>
    </Box>
  )
}
