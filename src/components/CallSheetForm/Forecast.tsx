import { Bedtime, LightMode, Thermostat } from '@mui/icons-material'
import { defineMessages, useIntl } from 'react-intl'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import type Forecast from '@/types/Forecast'

const M = defineMessages({
  noDateOrLocationMessage: {
    defaultMessage:
      "Weather forecast will appear once you've entered a date and at least one location.",
    id: 'CallSheetForm.Forecast.noDateOrLocationMessage',
  },
})

export default function Forecast() {
  const { control } = useFormContext()
  const [date, coordinates] = useWatch({
    control,
    name: ['date', 'locations.0.coordinates'],
  })
  const [forecast, setForecast] = useState<Forecast>()

  const intl = useIntl()

  useEffect(() => {
    if (date && coordinates) {
      const params = new URLSearchParams({
        latlng: `${coordinates.lat},${coordinates.lng}`,
        date,
      })

      fetch(`/api/forecast?${params}`)
        .then((res) => res.json())
        .then(setForecast)
    }
  }, [date, coordinates])

  if (!date || !coordinates) {
    return intl.formatMessage(M.noDateOrLocationMessage)
  }

  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <Thermostat />
        </ListItemIcon>
        <ListItemText
          primary={
            <>
              {forecast?.highF}&deg; / {forecast?.lowF}&deg;;{' '}
              {forecast?.condition}
            </>
          }
        />
      </ListItem>

      <ListItem>
        <ListItemIcon>
          <LightMode />
        </ListItemIcon>
        <ListItemText primary={forecast?.sunrise} />
      </ListItem>

      <ListItem>
        <ListItemIcon>
          <Bedtime />
        </ListItemIcon>
        <ListItemText primary={forecast?.sunset} />
      </ListItem>
    </List>
  )
}
