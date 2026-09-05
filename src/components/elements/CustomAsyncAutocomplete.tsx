'use client'

import { Fragment, useCallback, useEffect, useState } from 'react'

import { Autocomplete, CircularProgress, TextField } from '@mui/material'

import type { AutocompleteProps } from '@mui/material/Autocomplete'

import { fetchOptionsSelect } from '@/libs/method/method'

interface CustomProps {
  url: string
  label: string
  error?: any
  onAddValue?: (value: any) => void
  readOnly?: boolean
  multiple?: boolean
  helperText?: string
  placeholder?: string
}

type Props = CustomProps & Omit<AutocompleteProps<any, boolean, boolean, boolean>, 'renderInput' | 'options'>

export default function CustomAsyncAutocomplete({
  url,
  readOnly,
  label,
  error,
  onAddValue,
  disabled,
  placeholder,
  value,
  helperText,
  multiple,
  ...autocompleteProps
}: Props) {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const fetchData = useCallback(async () => {
    setLoading(true)
    const data = await fetchOptionsSelect(url, inputValue)

    setOptions(data)
    setLoading(false)
  }, [url, inputValue])

  const selectedOption =
    !multiple && value !== null && value !== undefined
      ? options.find(option => Number(option.id) === Number(value))
      : null

  useEffect(() => {
    if (multiple || value === null || value === undefined || value === '' || disabled || readOnly) return

    const loadSelectedOption = async () => {
      setLoading(true)

      try {
        const data = await fetchOptionsSelect(url, '')

        setOptions(data)
      } finally {
        setLoading(false)
      }
    }

    loadSelectedOption()
  }, [value, url, multiple, disabled, readOnly])

  useEffect(() => {
    if (!open || disabled || readOnly) return

    const timer = setTimeout(fetchData, 500)

    return () => clearTimeout(timer)
  }, [open, inputValue, disabled, readOnly, fetchData])

  const defaultGetOptionLabel = (option: any) =>
    typeof option === 'string'
      ? option
      : (option?.name ?? option?.title ?? (option?.first_name ? `${option.first_name} ${option.last_name ?? ''}` : ''))

  return (
    <Autocomplete
      {...autocompleteProps}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      multiple={Boolean(multiple)}
      fullWidth
      readOnly={readOnly}
      disableCloseOnSelect={Boolean(multiple)}
      disabled={disabled}
      value={multiple ? (value ?? []) : (selectedOption ?? (typeof value === 'object' ? value : null))}
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
      getOptionLabel={autocompleteProps.getOptionLabel ?? defaultGetOptionLabel}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
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
