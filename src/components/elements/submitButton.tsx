'use client'

import { Box, Button, CircularProgress } from '@mui/material'

export default function SubmitButton({ disabled, color, text, ...buttonProps }: any) {
  return (
    <Button variant='contained' {...buttonProps} color={color ? color : 'primary'} type='submit'>
      {text || 'ثبت'}

      {disabled && (
        <Box mx={2} display='flex' alignItems='center'>
          <CircularProgress size={18} color='inherit' />
        </Box>
      )}
    </Button>
  )
}
