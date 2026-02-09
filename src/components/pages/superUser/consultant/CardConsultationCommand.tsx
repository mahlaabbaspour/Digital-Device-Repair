'use client'

import { Transition } from '@/helpers/DialogsHelper'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Typography,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { GeTErrorFetch } from '@/components/elements/errorHandler'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useCommandConstultation } from '@/hooks/superUser/useDocumentConsultant'
import { Close } from '@mui/icons-material'

export default function ConsultationCammandModal({
  onClose,
  open,
  id,
  selectedRow,
  date
}: {
  onClose: any
  open: boolean
  id: string
  selectedRow: any
  date: any
}) {
  console.log(selectedRow, 'selectedRow')
  const { control, handleSubmit, setError, setValue } = useForm({
    defaultValues: {
      command: ''
    }
  })

  useEffect(() => {
    if (selectedRow) {
      setValue('command', selectedRow?.consultationDocumentStatus?.id)
    }
  }, [selectedRow])

  const { mutateAsync, isPending }: any = useCommandConstultation()

  async function onSubmit(values: any) {
    try {
      const res: any = await toast.promise(mutateAsync({ data: values, id: id, rowId: selectedRow?.id, date: date }), {
        pending: ' در حال انجام ...'
      })
      onClose()
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  return (
    <>
      <Dialog TransitionComponent={Transition} fullWidth open={open} maxWidth='md' scroll='body'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
            <IconButton onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
              <Close />
            </IconButton>
            <CardHeader
              sx={{ textAlign: 'center' }}
              title={
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                  دستورات مشاور{' '}
                </Typography>
              }
              subheader={
                <Typography variant='caption'>مشاور می تواند دستورات لازم برای این جلسه را ثبت کند</Typography>
              }
            />
            <Divider />
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2
                }}
              >
                <Grid container spacing={5} justifyContent='center'>
                  <Grid item xs={12} md={12}>
                    <Controller
                      name='command'
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          multiline
                          rows={3}
                          InputProps={{ readOnly: false }}
                          error={!!error}
                          helperText={error?.message}
                          {...field}
                          value={field.value ?? ''}
                          fullWidth
                          label='دستورات مشاور'
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </DialogContent>
          <DialogActions>
            <Button variant='outlined' sx={{ fontFamily: 'inherit' }} color='error' onClick={onClose}>
              بستن
            </Button>

            <Button
              variant='contained'
              sx={{ fontFamily: 'inherit' }}
              type='submit'
              color='primary'
              disabled={isPending}
            >
              ثبت
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
