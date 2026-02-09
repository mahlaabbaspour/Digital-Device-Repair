'use client'

import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { Box, TextField, IconButton } from '@mui/material'

export default function DebouncedInput({ value: initialValue, onChange, debounce = 500, ...props }: any) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, debounce, onChange])

  const clearSearch = () => {
    setValue('')
    onChange('')
  }

  return (
    <TextField
      size='small'
      {...props}
      onChange={e => setValue(e.target.value)}
      placeholder='جستجو...'
      InputProps={{
        startAdornment: (
          <Box sx={{ mr: 2, display: 'flex' }}>
            <Icon icon='mdi:magnify' fontSize={20} />
          </Box>
        ),
        endAdornment: (
          <IconButton size='small' title='Clear' aria-label='Clear' onClick={clearSearch}>
            <Icon icon='mdi:close' fontSize={20} />
          </IconButton>
        )
      }}
      sx={{
        width: {
          xs: 1,
          sm: 'auto'
        },
        '& .MuiInputBase-root > svg': {
          mr: 2
        }
      }}
    />
  )
}
