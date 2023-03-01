import { Card, CardContent, TextField } from '@mui/material'
import { defineMessages, useIntl } from 'react-intl'
import { FormProvider, useForm } from 'react-hook-form'

const M = defineMessages({
  productionNameLabel: {
    defaultMessage: 'Production name',
    id: 'CallSheetForm.productionNameLabel',
  },
  productionNamePlaceholder: {
    defaultMessage: 'The Greatest Film of All Time',
    id: 'CallSheetForm.productionNamePlaceholder',
  },
})

export default function CallSheetForm({ callSheet }: { callSheet?: any }) {
  const intl = useIntl()
  const methods = useForm({ defaultValues: callSheet })
  const { register } = methods

  return (
    <FormProvider {...methods}>
      <Card>
        <CardContent>
          <TextField
            label={intl.formatMessage(M.productionNameLabel)}
            inputProps={register('production.name', { required: true })}
            placeholder={intl.formatMessage(M.productionNamePlaceholder)}
            variant="standard"
            fullWidth
          />
        </CardContent>
      </Card>
    </FormProvider>
  )
}
