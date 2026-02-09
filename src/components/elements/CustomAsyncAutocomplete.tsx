'use client'

import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { AutocompleteProps } from '@mui/material/Autocomplete'
import { fetchOptionsSelect } from '@/libs/method/method'

interface CustomProps {
  url: string
  label: string
  error?: any
  onAddValue?: (value: any) => void
  readOnly?: boolean
  multiple?: boolean
  helperText?: string
}

type Props = CustomProps & Omit<AutocompleteProps<any, boolean, boolean, boolean>, 'renderInput' | 'options'>

export default function CustomAsyncAutocomplete({
  url,
  readOnly,
  label,
  error,
  onAddValue,
  disabled,
  value,
  helperText,
  multiple,
  ...autocompleteProps
}: Props) {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<any[]>([])
  console.log(options, 'options')
  const [loading, setLoading] = useState(false)

  const [inputValue, setInputValue] = useState('')

  const fetchData = useCallback(async () => {
    setLoading(true)
    const data = await fetchOptionsSelect(url, inputValue)
    console.log(data, 'data')
    setOptions(data)
    setLoading(false)
  }, [url, inputValue])

  useEffect(() => {
    if (!open || disabled || readOnly) return

    const timer = setTimeout(fetchData, 500)
    return () => clearTimeout(timer)
  }, [open, inputValue, disabled, readOnly, fetchData])

  return (
    <Autocomplete
      {...autocompleteProps}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      multiple={Boolean(multiple)}
      fullWidth
      readOnly={readOnly}
      disabled={disabled}
      value={value ?? (multiple ? [] : null)}
      options={options}
      loading={loading}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue)
      }}
      onChange={(_, newValue) => {
        onAddValue?.(newValue)
      }}
      loadingText='در حال جستجو'
      noOptionsText='موردی یافت نشد'
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={option =>
        typeof option === 'string'
          ? option
          : (option?.name ??
            option?.title ??
            (option?.first_name ? `${option.first_name} ${option.last_name ?? ''} (${option.mobile ?? ''})` : ''))
      }
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          error={Boolean(error)}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? <CircularProgress size={20} /> : null}
                {params.InputProps.endAdornment}
              </Fragment>
            )
          }}
        />
      )}
    />
  )
}
