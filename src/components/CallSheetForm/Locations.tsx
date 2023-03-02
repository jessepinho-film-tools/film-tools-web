import { AddCircle } from '@mui/icons-material'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Table,
  TableBody,
  Typography,
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
    defaultMessage: 'Add a location',
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
      <CardContent>
        <Typography variant="h6">
          {intl.formatMessage(M.locationsTitle)}
        </Typography>

        <Table>
          <TableBody>
            {fields.map((field, index) => (
              <Location
                key={field.id}
                field={field}
                index={index}
                remove={() => remove(index)}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button onClick={() => append('')}>
          {intl.formatMessage(M.addButtonLabel)}
        </Button>
      </CardActions>
    </Card>
  )
}
