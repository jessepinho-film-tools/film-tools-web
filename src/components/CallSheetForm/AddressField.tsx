/**
 * Example copied from https://mui.com/material-ui/react-autocomplete/
 */
import * as React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import { debounce } from '@mui/material/utils'
import { defineMessages, useIntl } from 'react-intl'
import Grid from '@mui/material/Grid'
import parse from 'autosuggest-highlight/parse'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import AddressAndCoordinates from '@/types/AddressAndCoordinates'

const M = defineMessages({
  addressLabel: {
    defaultMessage: 'Address',
    id: 'AddressField.label',
  },
  noOptionsText: {
    defaultMessage: 'No addresses found',
    id: 'AddressField.noOptionsText',
  },
})

function loadScript(src: string, position: HTMLHeadElement | null, id: string) {
  if (!position) {
    return
  }

  const script = document.createElement('script')
  script.setAttribute('async', '')
  script.setAttribute('id', id)
  script.src = src
  position.appendChild(script)
}

const autocompleteService: {
  current: null | google.maps.places.AutocompleteService
} = { current: null }

export default function AddressField({
  value: valueFromProps = null,
  onChange,
}: {
  value: any
  onChange: (addressAndCoordinates: AddressAndCoordinates) => void
}) {
  const [value, setValue] = React.useState(valueFromProps)
  const [inputValue, setInputValue] = React.useState('')
  const [options, setOptions] = React.useState<
    google.maps.places.AutocompletePrediction[]
  >([])
  const loaded = React.useRef(false)
  const geocoder = React.useRef<null | google.maps.Geocoder>(null)
  const intl = useIntl()

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_CLIENT_SIDE_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps'
      )
    }

    loaded.current = true
  }

  const fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        if (!autocompleteService.current) return
        autocompleteService.current.getPlacePredictions(request, callback)
      }, 400),
    []
  )

  React.useEffect(() => {
    let active = true

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService()
    }
    if (!autocompleteService.current) {
      return undefined
    }

    if (inputValue === '') {
      setOptions(value ? [value] : [])
      return undefined
    }

    fetch(
      { input: inputValue },
      (results: google.maps.places.AutocompletePrediction[]) => {
        if (active) {
          let newOptions: google.maps.places.AutocompletePrediction[] = []

          if (value) {
            newOptions = [value]
          }

          if (results) {
            newOptions = [...newOptions, ...results]
          }

          setOptions(newOptions)
        }
      }
    )

    return () => {
      active = false
    }
  }, [value, inputValue, fetch])

  return (
    <Autocomplete
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      sx={{ mb: 2 }}
      noOptionsText={intl.formatMessage(M.noOptionsText)}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options)
        setValue(newValue)
        if (!newValue) return
        if (!geocoder.current) geocoder.current = new google.maps.Geocoder()
        geocoder.current.geocode(
          { address: newValue.description },
          (results, status) => {
            if (status === 'OK' && results?.length) {
              onChange({
                address: newValue.description,
                coordinates: {
                  lat: results[0].geometry.location.lat(),
                  lng: results[0].geometry.location.lng(),
                },
              })
            }
          }
        )
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={intl.formatMessage(M.addressLabel)}
          variant="standard"
        />
      )}
      renderOption={(
        props,
        option: google.maps.places.AutocompletePrediction
      ) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings || []

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        )

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ wordWrap: 'break-word' }}>
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                  >
                    {part.text}
                  </Box>
                ))}

                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        )
      }}
    />
  )
}
