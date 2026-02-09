import CustomDatePicker from '@/components/elements/customDatePicker'
import { GeTErrorFetch } from '@/components/elements/errorHandler'
import SubmitButton from '@/components/elements/submitButton'
import { Transition } from '@/helpers/DialogsHelper'
import { Icon } from '@iconify/react'
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  TextField,
  Typography,
  Alert
} from '@mui/material'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { usePaymentMeeting } from '@/hooks/institution/advisoryMeeting/useCalender'
import { dateConverter, dateTimeConverter } from '@/helpers/DateHelpers'
import CustomDateTimePicker from '@/components/elements/customDateTimePicker'
import moment from 'moment-jalaali'
moment.loadPersian({ dialect: 'persian-modern' })

export default function ModalPaymentMeeting({
  onClose,
  open,
  title,
  description,
  id,
  selectedRow,
  date
}: {
  onClose: any
  open: boolean
  title: string
  description: string
  id: string
  selectedRow: any
  date: any
}) {
  const { control, handleSubmit, setValue, clearErrors, reset } = useForm({
    defaultValues: {
      payment_time: null,
      tracking_code: ''
    }
  })

  const { mutateAsync, isPending }: any = usePaymentMeeting()

  async function onSubmit(values: any) {
    try {
      console.log(values, 'sljf')
      const dateTime = dateTimeConverter(values?.payment_time)
      const data = {
        payment_time: dateTime,
        tracking_code: values?.tracking_code
      }
      console.log(data, 'data')

      const res: any = await toast.promise(mutateAsync({ data: data, id: id, date: date, rowId: selectedRow?.id }), {
        pending: 'در حال انجام ...'
      })

      if (res?.status) {
        onClose()
        reset()
      }
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <Dialog TransitionComponent={Transition} fullWidth open={open} maxWidth='md' scroll='body'>
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
              <Typography variant='h5' sx={{ lineHeight: '1rem', fontWeight: 700 }}>
                {title}
              </Typography>
              <Typography variant='caption'>{description}</Typography>
            </Box>
            <Divider />
            <Grid container spacing={5} mb={10} mt={5}>
              {/* date */}
              <Grid item xs={12} md={12}>
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

              {/* tracking_code */}
              <Grid item xs={3} sm={12}>
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
