import React from 'react'
import { Card, CardHeader, CardContent, CardActions } from '@mui/material'
import { Grid, Box, Typography, TextField, Button } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import UploadIcon from '@mui/icons-material/Upload'
import DeleteIcon from '@mui/icons-material/Delete'
import { Controller } from 'react-hook-form'

export default function ImageUploader({ label, accept, value, onChange, size = 'large' }: any) {
  const previewUrl = value?.length ? URL.createObjectURL(value[0]) : null

  const handleFileChange = (e: any) => {
    const file = e.target.files[0]
    if (!file) return

    if (!accept.includes(file.type)) {
      alert(`فرمت فایل باید باشد: ${accept.join(', ')}`)
      e.target.value = ''
      return
    }

    onChange([file])
  }

  const boxSize = size === 'large' ? { w: 600, h: 260 } : { w: 200, h: 200 }

  return (
    <Box display='flex' flexDirection='column' alignItems='center' gap={2}>
      <Typography variant='subtitle1' fontWeight={600}>
        {label}
      </Typography>

      <Box
        width={boxSize.w}
        height={boxSize.h}
        borderRadius={3}
        display='flex'
        justifyContent='center'
        alignItems='center'
        bgcolor='#fafafa'
        sx={{ border: '1px solid #ddd' }}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt='preview'
            style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 12 }}
          />
        ) : (
          <Box display='flex' flexDirection='column' alignItems='center' gap={1}>
            <ImageIcon sx={{ fontSize: 60, color: 'grey' }} />
            <Typography color='grey'>تصویری انتخاب نشده</Typography>
          </Box>
        )}
      </Box>

      <Box display='flex' gap={2}>
        <Button size='small' variant='contained' startIcon={<UploadIcon />} component='label'>
          انتخاب تصویر
          <input type='file' hidden accept={accept.join(',')} onChange={handleFileChange} />
        </Button>

        <Button
          size='small'
          variant='outlined'
          color='error'
          startIcon={<DeleteIcon />}
          disabled={!value?.length}
          onClick={() => onChange([])}
        >
          حذف
        </Button>
      </Box>
    </Box>
  )
}
