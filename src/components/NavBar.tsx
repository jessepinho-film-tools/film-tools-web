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
    defaultMessage: 'Film tools',
    id: 'NavBar.appName',
  },
  appCredit: {
    defaultMessage: 'by Jesse Pinho',
    id: 'NavBar.appCredit',
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
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ flexShrink: 0, mr: 2 }}
          >
            {intl.formatMessage(M.appName)}
          </Typography>

          <Box sx={{ opacity: 0.7 }}>
            <Image
              src="/signature.svg"
              width={150}
              height={70}
              alt={intl.formatMessage(M.appCredit)}
            />
          </Box>
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
