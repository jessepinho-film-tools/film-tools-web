import { createTheme, lighten, ThemeProvider } from '@mui/material'
import { GlobalStyles } from '@mui/styled-engine'
import React from 'react'

const theme = createTheme({
  palette: {
    tonalOffset: 0.5,
    primary: {
      main: '#900',
    },
    secondary: {
      main: '#FFCC00',
    },
    error: {
      main: '#900',
    },
  },
})

export default function ThemeWrapper({ children }: React.PropsWithChildren) {
  return (
    <>
      <GlobalStyles
        styles={{
          body: { backgroundColor: lighten(theme.palette.secondary.main, 0.9) },
        }}
      />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  )
}
