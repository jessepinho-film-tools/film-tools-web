import {
  AppBar,
  Box,
  Link,
  Toolbar,
  Typography,
  Tabs,
  Tab,
} from '@mui/material'
import { defineMessages, useIntl } from 'react-intl'

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
            variant="h5"
            noWrap
            component="div"
            sx={{ flexShrink: 0, mr: 1 }}
          >
            {intl.formatMessage(M.appName)}
          </Typography>
          <Typography
            color="primary.light"
            variant="body2"
            sx={{
              flexShrink: 0,
              pt: 0.5,
            }}
          >
            <Link
              href="https://jessepinho.com"
              target="_blank"
              underline="hover"
              color="inherit"
            >
              {intl.formatMessage(M.appCredit)}
            </Link>
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
