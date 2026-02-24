'use client'

import SubmitButton from '@/components/elements/submitButton'
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
import { toast } from 'react-toastify'
import { dateTimeConverter } from '@/helpers/DateHelpers'
import CustomDateTimePicker from '@/components/elements/customDateTimePicker'
import moment from 'moment-jalaali'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import { usePaymentMeetingConsultation } from '@/hooks/institution/advisoryMeeting/useMeetingConsultation'
import { GeTErrorFetch } from '@/components/elements/errorHandler'
moment.loadPersian({ dialect: 'persian-modern' })

export default function ModalPaymentMeeting({
  onClose,
  open,
  title,
  description,
  id,
  selectedRow
}: {
  onClose: any
  open: boolean
  title: string
  description: string
  id: string
  selectedRow: any
}) {
  console.log(selectedRow, 'selectedRow')
  const { control, handleSubmit, setValue, clearErrors, reset, setError } = useForm({
    defaultValues: {
      payment_time: null,
      tracking_code: '',
      consultationVoucher_id: null,
      paid_amount: ''
    }
  })

  const { mutateAsync, isPending }: any = usePaymentMeetingConsultation()

  async function onSubmit(values: any) {
    try {
      const dateTime = dateTimeConverter(values?.payment_time)
      const data = {
        payment_time: dateTime,
        tracking_code: values?.tracking_code,
        consultationVoucher_id: values?.consultationVoucher_id?.id ?? null,
        paid_amount: values?.paid_amount
      }

      const res: any = await toast.promise(mutateAsync({ data: data, id: id, rowId: selectedRow?.id }), {
        pending: 'در حال انجام ...'
      })

      if (res?.status) {
        onClose()
        reset()
      }
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  return (
    <>
      <Dialog TransitionComponent={Transition} fullWidth open={open} maxWidth='lg' scroll='body'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
            <IconButton
              size='small'
              onClick={() => {
                onClose()
                reset()
              }}
              sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            >
              <Icon icon='mdi:close' />
            </IconButton>
            <Box sx={{ mb: 9, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ lineHeight: '1rem', fontWeight: 600, mb: 1 }}>
                {title}
              </Typography>
              <Typography variant='caption'>{description}</Typography>
            </Box>

            <Grid container spacing={5} mb={10} mt={5}>
              <Grid item xs={12} md={12}>
                <Controller
                  name='consultationVoucher_id'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomAsyncAutocomplete
                      url={`/institution/${id}/meeting/core/consultation-meeting/consultation-voucher/${selectedRow?.id}`}
                      readOnly={false}
                      onAddValue={newValue => onChange(newValue)}
                      value={value}
                      getOptionLabel={optien => `${optien?.expires_at}`}
                      label='یاری برگ'
                      error={!!error}
                      helperText={error?.message}
                    ></CustomAsyncAutocomplete>
                  )}
                />
              </Grid>

              <Divider sx={{ mt: 3, mb: 3 }} />

              <Grid item xs={12} md={4}>
                <Controller
                  control={control}
                  name='payment_time'
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomDateTimePicker
                      error={!!error}
                      helperText={error?.message}
                      label='زمان پرداخت'
                      onChange={onChange}
                      value={value}
                      readOnly={false}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={3} sm={4}>
                <Controller
                  name='tracking_code'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => {
                    return (
                      <TextField
                        label='شماره پیگیری'
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                        value={value}
                        onChange={onChange}
                        InputProps={{ readOnly: false }}
                      />
                    )
                  }}
                />
              </Grid>

              <Grid item xs={3} sm={4}>
                <Controller
                  name='paid_amount'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => {
                    const formatNumber = (num: string) => num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    const removeCommas = (str: string) => str.replace(/,/g, '')

                    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                      const raw = removeCommas(e.target.value)
                      if (!/^\d*$/.test(raw)) return

                      onChange(raw)
                    }

                    return (
                      <TextField
                        label='مبلغ پرداختی (ریال)'
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                        value={value ? formatNumber(value.toString()) : ''}
                        onChange={handleChange}
                        InputProps={{ readOnly: false }}
                      />
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12} sx={{ mt: 10 }}>
                <Box display='flex' justifyContent='space-around'>
                  <Typography variant='body2'>جمع پرداختی : 1000000 ریال </Typography>
                  <Typography>مانده : 500000ریال</Typography>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              variant='outlined'
              sx={{ fontFamily: 'inherit' }}
              color='error'
              onClick={() => {
                onClose()
                reset()
              }}
            >
              بستن
            </Button>

            <SubmitButton disabled={isPending} />
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
