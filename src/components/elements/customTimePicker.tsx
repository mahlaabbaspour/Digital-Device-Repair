'use client'

import { TimePicker } from '@mui/x-date-pickers'
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

export default function CustomTimePicker({
  label,
  onChange,
  error = false,
  helperText,
  value,
  readOnly,
  size
}: {
  error?: boolean
  label: string
  onChange: (value: Date | null) => void
  value?: any
  readOnly?: boolean
  helperText?: string
  size: any
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
      <TimePicker
        label={label}
        value={value ? new Date(value) : null}
        onChange={onChange}
        readOnly={readOnly}
        ampm={false}
        slotProps={{
          textField: {
            fullWidth: true,
            variant: 'outlined',
            error: error,
            helperText: helperText,
            size: size
          }
        }}
      />
    </LocalizationProvider>
  )
}
