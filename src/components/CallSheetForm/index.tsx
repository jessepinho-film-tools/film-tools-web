import { Card, CardContent, Grid, TextField } from '@mui/material'
import { defineMessages, useIntl } from 'react-intl'
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form'

import AddressField from './AddressField'
import { GOOGLE_MAPS_API_KEY } from '@/pages/constants'
import styles from './index.module.css'

const M = defineMessages({
  productionNameLabel: {
    defaultMessage: 'Production name',
    id: 'CallSheetForm.productionNameLabel',
  },
  productionNamePlaceholder: {
    defaultMessage: 'The Greatest Film of All Time',
    id: 'CallSheetForm.productionNamePlaceholder',
  },
  mapImageAltText: {
    defaultMessage: 'A map of the location',
    id: 'CallSheetForm.mapImageAltText',
  },
})

export default function CallSheetForm({ callSheet }: { callSheet?: any }) {
  const intl = useIntl()
  const methods = useForm({ defaultValues: callSheet })
  const { control, register } = methods
  const locations = useWatch({ control, name: 'locations' })

  return (
    <FormProvider {...methods}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent>
              <Controller
                control={control}
                name="locations"
                defaultValue=""
                render={({ field }) => (
                  <AddressField onChange={field.onChange} value={field.value} />
                )}
              />

              {locations && (
                <img
                  className={styles.map}
                  src={`https://maps.googleapis.com/maps/api/staticmap?size=200x200&maptype=roadmap&zoom=16&key=${GOOGLE_MAPS_API_KEY}&markers=${locations}`}
                  alt={intl.formatMessage(M.mapImageAltText)}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12} sm={3} />
      </Grid>
    </FormProvider>
  )
}
