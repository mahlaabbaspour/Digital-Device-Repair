'use client'

import { Transition } from '@/helpers/DialogsHelper'
import { Icon } from '@iconify/react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'

export default function MeetingCancelledShowModal({
  onClose,
  open,
  title,
  description,
  currunt
}: {
  onClose: any
  open: boolean
  title: string
  description: string
  currunt: any
}) {
  const { control, setValue } = useForm({
    defaultValues: {
      cancelled_time: '',
      payment_time: '',
      tracking_code: '',
      advisor: ''
    }
  })

  useEffect(() => {
    if (currunt) {
      setValue('cancelled_time', currunt?.cancelled_time)
      setValue('payment_time', currunt?.payment_time)
      setValue('tracking_code', currunt?.tracking_code)
      setValue('advisor', `${currunt?.consultationDocument?.first_name} ${currunt?.consultationDocument?.last_name}`)
    }
  }, [currunt])

  return (
    <>
      <Dialog TransitionComponent={Transition} fullWidth open={open} maxWidth='md' scroll='body'>
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 9, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ lineHeight: '1rem', fontWeight: 600, mt: 1 }}>
              {title}
            </Typography>
            <Typography variant='caption' sx={{ mt: 1 }}>
              {description}
            </Typography>
          </Box>
          <Divider />
          <Grid container spacing={5} mb={10} mt={5}>
            <Grid item xs={12} md={6}>
              <Controller
                name='cancelled_time'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    InputProps={{ readOnly: true }}
                    error={!!error}
                    helperText={error?.message}
                    {...field}
                    value={field.value ?? ''}
                    fullWidth
                    label='زمان کنسل'
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name='payment_time'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    InputProps={{ readOnly: true }}
                    error={!!error}
                    helperText={error?.message}
                    {...field}
                    value={field.value ?? ''}
                    fullWidth
                    label='زمان پرداخت'
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name='tracking_code'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    InputProps={{ readOnly: true }}
                    error={!!error}
                    helperText={error?.message}
                    {...field}
                    value={field.value ?? ''}
                    fullWidth
                    label='شماره پیگیری'
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name='advisor'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    InputProps={{ readOnly: true }}
                    error={!!error}
                    helperText={error?.message}
                    {...field}
                    value={field.value ?? ''}
                    fullWidth
                    label='مشاور'
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' sx={{ fontFamily: 'inherit' }} color='error' onClick={onClose}>
            بستن
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
