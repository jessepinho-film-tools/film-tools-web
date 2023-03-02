import {
  Autocomplete,
  Grid,
  IconButton,
  TableRow,
  TableCell,
  TextField,
  Typography,
} from '@mui/material'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { defineMessages, useIntl } from 'react-intl'
import { Delete } from '@mui/icons-material'
import { getPreciseDistance } from 'geolib'
import { useEffect, useState } from 'react'

import AddressField from './AddressField'
import Coordinates from '@/types/Coordinates'

const M = defineMessages({
  mapImageAltText: {
    defaultMessage: 'A map of the location',
    id: 'CallSheetForm.Locations.mapImageAltText',
  },
  notesLabel: {
    defaultMessage: 'Notes (parking, etc.)',
    id: 'CallSheetForm.Locations.notesLabel',
  },
  nearestHospitalLabel: {
    defaultMessage: 'Nearest hospital',
    id: 'CallSheetForm.Location.nearestHospitalLabel',
  },
  distanceMilesLabel: {
    defaultMessage: '{distance}mi from set',
    id: 'CallSheetForm.Location.distanceMilesLabel',
  },
  removeButtonLabel: {
    defaultMessage: 'Remove this location',
    id: 'CallSheetForm.Location.removeButtonLabel',
  },
})

const roundToOneDecimalPlace = (number: number) => Math.round(number * 10) / 10
const convertMetersToMiles = (meters: number) =>
  roundToOneDecimalPlace(meters * 0.000621)
const getDistanceInMiles = (
  coordinates1: Coordinates,
  coordinates2: Coordinates
) => convertMetersToMiles(getPreciseDistance(coordinates1, coordinates2))

export default function Location({
  field,
  index,
  remove,
}: {
  field: Record<'id', string>
  index: number
  remove: () => void
}) {
  const [hospitals, setHospitals] = useState<any[]>([])
  const { control } = useFormContext()
  const intl = useIntl()
  const location = useWatch({ control, name: `locations.${index}` })

  useEffect(() => {
    if (!location) return

    const params = new URLSearchParams({
      latlng: `${location.coordinates.lat},${location.coordinates.lng}`,
    })
    fetch(`/api/nearestHospital?${params}`)
      .then((res) => res.json())
      .then(setHospitals)
  }, [location])

  return (
    <TableRow key={field.id}>
      <TableCell sx={{ verticalAlign: 'top', width: '33%' }}>
        <Controller
          control={control}
          name={`locations.${index}`}
          defaultValue=""
          render={({ field }) => (
            <>
              <AddressField
                onChange={field.onChange}
                value={field.value || ''}
              />

              {field.value && (
                <img
                  style={{ width: '100%' }}
                  src={`https://maps.googleapis.com/maps/api/staticmap?size=400x200&maptype=roadmap&zoom=16&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_CLIENT_SIDE_API_KEY}&markers=${field.value.address}`}
                  alt={intl.formatMessage(M.mapImageAltText)}
                />
              )}
            </>
          )}
        />
      </TableCell>

      <TableCell sx={{ verticalAlign: 'top', width: '33%' }}>
        <TextField
          variant="standard"
          label={intl.formatMessage(M.notesLabel)}
          multiline
          fullWidth
        />
      </TableCell>

      <TableCell sx={{ verticalAlign: 'top', width: '33%' }}>
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label={intl.formatMessage(M.nearestHospitalLabel)}
              fullWidth
            />
          )}
          options={hospitals}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Grid component="li" container {...props}>
              <Grid item xs={12} sx={{ fontWeight: 'bold' }}>
                {option.name}
              </Grid>
              <Grid item xs={12}>
                {option.address}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption">
                  {intl.formatMessage(M.distanceMilesLabel, {
                    distance: getDistanceInMiles(
                      location.coordinates,
                      option.coordinates
                    ),
                  })}
                </Typography>
              </Grid>
            </Grid>
          )}
        />
      </TableCell>

      <TableCell sx={{ verticalAlign: 'top' }}>
        <IconButton
          color="primary"
          size="large"
          aria-label={intl.formatMessage(M.removeButtonLabel)}
          onClick={() => remove()}
        >
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
