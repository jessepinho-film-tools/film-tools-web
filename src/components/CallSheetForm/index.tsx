import { Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import { defineMessages, useIntl } from 'react-intl'
import { FormProvider, useForm } from 'react-hook-form'

import Locations from './Locations'
import Forecast from './Forecast'

const M = defineMessages({
  basicInfoTitle: {
    defaultMessage: 'The basics',
    id: 'CallSheetForm.basicInfoTitle',
  },
  productionNameLabel: {
    defaultMessage: 'Production name',
    id: 'CallSheetForm.productionNameLabel',
  },
  productionNamePlaceholder: {
    defaultMessage: 'The Greatest Film of All Time',
    id: 'CallSheetForm.productionNamePlaceholder',
  },
  dateLabel: {
    defaultMessage: 'Date',
    id: 'CallSheetForm.dateLabel',
  },
  callTimeLabel: {
    defaultMessage: 'General call time',
    id: 'CallSheetForm.callTimeLabel',
  },
})

export default function CallSheetForm({ callSheet }: { callSheet?: any }) {
  const intl = useIntl()
  const methods = useForm({ defaultValues: callSheet })
  const { register } = methods

  return (
    <FormProvider {...methods}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label={intl.formatMessage(M.productionNameLabel)}
            inputProps={register('production.name', { required: true })}
            placeholder={intl.formatMessage(M.productionNamePlaceholder)}
            variant="standard"
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                {intl.formatMessage(M.basicInfoTitle)}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    type="date"
                    label={intl.formatMessage(M.dateLabel)}
                    inputProps={register('date', { required: true })}
                    variant="standard"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="time"
                    label={intl.formatMessage(M.callTimeLabel)}
                    inputProps={register('callTime', { required: true })}
                    variant="standard"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Forecast />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Locations />
        </Grid>
      </Grid>
    </FormProvider>
  )
}
