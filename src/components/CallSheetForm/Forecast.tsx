import { useFormContext, useWatch } from 'react-hook-form'
import { defineMessages, useIntl } from 'react-intl'

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

  const intl = useIntl()

  if (!date || !coordinates) {
    return intl.formatMessage(M.noDateOrLocationMessage)
  }

  return <>Weather</>
}
