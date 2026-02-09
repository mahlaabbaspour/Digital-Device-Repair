'use client'

import { Transition } from '@/helpers/DialogsHelper'
import { Icon } from '@iconify/react'
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
  FormControlLabel,
  Divider,
  TextField,
  Switch
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { GeTErrorFetch } from '@/components/elements/errorHandler'
import { toast } from 'react-toastify'
import { useCreateSupervisorComment } from '@/hooks/institution/consultationDocuments/useDocumentList'
import { useEffect } from 'react'

export default function SupervisorApprovalModal({
  onClose,
  open,
  id,
  selectedRow
}: {
  onClose: any
  open: boolean
  id: string
  selectedRow: any
}) {
  console.log(selectedRow, 'selectedRow')
  const { control, handleSubmit, setError, clearErrors, setValue, watch, reset } = useForm({
    defaultValues: {
      supervisor_description: '',
      supervisor_status: '0'
    }
  })

  useEffect(() => {
    if (selectedRow) {
      setValue('supervisor_description', selectedRow?.supervisor_description)
      setValue('supervisor_status', selectedRow?.supervisor_status)
    }
  }, [selectedRow])

  const { mutateAsync, isPending }: any = useCreateSupervisorComment()

  async function onSubmit(values: any) {
    try {
      console.log(values, 'values')
      await toast.promise(mutateAsync({ data: values, id: id, rowId: selectedRow?.id }), {
        pending: ' در حال انجام ...'
      })
      onClose()
      reset()
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  return (
    <>
      <Dialog TransitionComponent={Transition} fullWidth open={open} maxWidth='md' scroll='body'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
            <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
              <Icon icon='mdi:close' />
            </IconButton>
            <CardHeader
              sx={{ textAlign: 'center' }}
              title={
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                  تایید و نظر سوپروایزر
                </Typography>
              }
              subheader={
                <Typography variant='caption'>
                  سوپروایزر می توانید نظر خود را ثبت و تایید نهایی را انجام بدهد
                </Typography>
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
                      name='supervisor_description'
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
                          label='نظر سوپروایزر'
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name='supervisor_status'
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <FormControlLabel
                          label='تایید نهایی'
                          control={
                            <Switch checked={value === '1'} onChange={(_, check) => onChange(check ? '1' : '0')} />
                          }
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
              انصراف
            </Button>

            <Button variant='contained' sx={{ fontFamily: 'inherit' }} type='submit' color='primary' disabled={false}>
              ثبت
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
