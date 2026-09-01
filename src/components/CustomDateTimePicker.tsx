'use client'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalaliV3'

// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DateTimePicker } from '@mui/x-date-pickers'

export default function CustomDateTimePicker({
  label,
  onChange,
  error = false,
  helperText,
  value,
  minDate,
  maxDate,
  disabled,
  readOnly
}: {
  label: string
  error?: boolean
  onChange: (value: Date | null) => void
  value?: any
  minDate?: any
  maxDate?: any
  disabled?: boolean
  readOnly?: boolean
  helperText?: string
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
      <DateTimePicker
        label={label}
        value={value || null}
        onChange={onChange}
        maxDate={maxDate}
        minDate={minDate}
        readOnly={readOnly}
        disabled={disabled}
        slotProps={{
          textField: {
            fullWidth: true,
            variant: 'outlined',
            error: error,
            helperText: helperText,
            InputProps: {
              readOnly: readOnly
            }
          }
        }}
      />
    </LocalizationProvider>
  )
}
