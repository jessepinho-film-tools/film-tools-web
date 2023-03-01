import { defineMessages, useIntl } from 'react-intl'
import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

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
  const [forecast, setForecast] = useState()

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

  return <>{JSON.stringify(forecast)}</>
}
