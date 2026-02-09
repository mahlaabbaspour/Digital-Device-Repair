import Autocomplete from '@mui/material/Autocomplete'
import {  TextField } from '@mui/material'
interface CustomProps {
  value: any
  getOptionLabel: any
  label: string
  renderTags: any
}

export default function AutoCompleteShow({ value, getOptionLabel, label, renderTags }: CustomProps) {
  return (
    <Autocomplete
      multiple
      options={[]}
      value={value}
      getOptionLabel={getOptionLabel}
      popupIcon={null}
      disableClearable
      readOnly
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            readOnly: true,
            endAdornment: null
          }}
        />
      )}
      renderTags={renderTags}
    />
  )
}
