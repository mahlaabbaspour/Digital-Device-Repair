'use client'

import { DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

export default function CustomDateTimePicker({
  label,
  onChange,
  error = false,
  helperText,
  value,
  minDate,
  maxDate,
  readOnly
}: {
  error?: boolean
  label: string
  onChange: (value: Date | null) => void
  value?: any
  minDate?: any
  maxDate?: any
  readOnly?: boolean
  helperText?: string
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
      <DateTimePicker
        label={label}
        value={value ? new Date(value) : null}
        onChange={onChange}
        maxDate={maxDate}
        minDate={minDate}
        ampm={false}
        readOnly={readOnly}
        slotProps={{
          textField: {
            fullWidth: true,
            variant: 'outlined',
            error: error,
            helperText: helperText
          }
        }}
      />
    </LocalizationProvider>
  )
}
