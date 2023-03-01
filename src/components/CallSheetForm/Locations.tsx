import { AddCircle } from '@mui/icons-material'
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Table,
  TableBody,
} from '@mui/material'
import { defineMessages, useIntl } from 'react-intl'
import { useFieldArray, useFormContext } from 'react-hook-form'

import Location from './Location'

const M = defineMessages({
  locationsTitle: {
    defaultMessage: 'Location(s)',
    id: 'CallSheetForm.Locations.locationsTitle',
  },
  addButtonLabel: {
    defaultMessage: 'Add another location',
    id: 'CallSheetForm.Locations.addButtonLabel',
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
          <TableBody>
            {fields.map((field, index) => (
              <Location key={field.id} field={field} index={index} />
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
