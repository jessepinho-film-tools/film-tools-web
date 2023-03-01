import { AddCircle } from '@mui/icons-material'
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { defineMessages, useIntl } from 'react-intl'

import AddressField from './AddressField'

const M = defineMessages({
  locationsTitle: {
    defaultMessage: 'Location(s)',
    id: 'CallSheetForm.Locations.locationsTitle',
  },
  locationHeader: {
    defaultMessage: 'Location',
    id: 'CallSheetForm.Locations.locationHeader',
  },
  notesHeader: {
    defaultMessage: 'Parking & notes',
    id: 'CallSheetForm.Locations.notesHeader',
  },
  nearestHospitalHeader: {
    defaultMessage: 'Nearest hospital',
    id: 'CallSheetForm.Locations.nearestHospitalHeader',
  },
  mapImageAltText: {
    defaultMessage: 'A map of the location',
    id: 'CallSheetForm.Locations.mapImageAltText',
  },
  addButtonLabel: {
    defaultMessage: 'Add another location',
    id: 'CallSheetForm.Locations.addButtonLabel',
  },
  notesLabel: {
    defaultMessage: 'Notes',
    id: 'CallSheetForm.Locations.notesLabel',
  },
})

export default function Locations() {
  const { control } = useFormContext()
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: 'locations',
    }
  )
  const intl = useIntl()

  return (
    <Card>
      <CardHeader title={intl.formatMessage(M.locationsTitle)} />

      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{intl.formatMessage(M.locationHeader)}</TableCell>
              <TableCell>{intl.formatMessage(M.notesHeader)}</TableCell>
              <TableCell>
                {intl.formatMessage(M.nearestHospitalHeader)}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((field, index) => (
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
                            src={`https://maps.googleapis.com/maps/api/staticmap?size=400x200&maptype=roadmap&zoom=16&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_CLIENT_SIDE_API_KEY}&markers=${field.value}`}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <IconButton
          color="primary"
          aria-label={intl.formatMessage(M.addButtonLabel)}
          onClick={() => append('')}
        >
          <AddCircle />
        </IconButton>
      </CardActions>
    </Card>
  )
}
