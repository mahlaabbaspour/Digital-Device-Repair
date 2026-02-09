import CustomDatePicker from '@/components/elements/customDatePicker'
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
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import CustomTimePicker from '@/components/elements/customTimePicker'
import { useEffect } from 'react'
import { parse } from 'date-fns-jalali'
import { useRouter } from 'next/navigation'

export default function ModalMeetUser({
  onClose,
  open,
  title,
  description,
  selectedEvent
}: {
  onClose: any
  open: boolean
  title: string
  description: string
  selectedEvent: any
}) {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      date: null,
      start_time: null,
      end_time: null,
      institution_id: '',
      advisor_id: '',
      activity_field_area_id: [],
      price: '',
      document_number: ''
    }
  })
  const parseTimeToDate = (time: string | undefined | null) => {
    if (!time) return null
    const [hour, minute] = time.split(':').map(Number)
    const date = new Date()
    date.setHours(hour, minute, 0, 0)
    return date
  }

  console.log(selectedEvent, 'seleteeee')

  useEffect(() => {
    if (selectedEvent) {
      //@ts-ignore
      setValue('date', selectedEvent?.date ? parse(selectedEvent?.date, 'yyyy/MM/dd', new Date()) : null)
      //@ts-ignore
      setValue('start_time', selectedEvent?.start_time ? parseTimeToDate(selectedEvent.start_time) : null)
      //@ts-ignore
      setValue('end_time', selectedEvent?.end_time ? parseTimeToDate(selectedEvent.end_time) : null)
      setValue('price', selectedEvent?.price)
      setValue('activity_field_area_id', selectedEvent?.activityFieldAreas)
      setValue('institution_id', selectedEvent?.institution?.name)
      setValue(
        'advisor_id',
        `${selectedEvent?.advisor?.first_name} ${selectedEvent?.advisor?.last_name} (${selectedEvent?.advisor?.username}) `
      )
      setValue('document_number', selectedEvent?.consultationDocument?.document_number)
    }
  }, [selectedEvent])

  async function onSubmit(values: any) {}

  const router = useRouter()

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth={false}
        maxWidth='xs'
        scroll='body'
        TransitionComponent={Transition}
        BackdropProps={{ style: { backgroundColor: 'transparent' } }}
        PaperProps={{
          sx: {
            position: 'fixed',
            right: 0,
            top: 0,
            height: '100%',
            m: 0,
            borderRadius: 0,
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            width: { xs: '80%', sm: '400px' }
          }
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
            <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
              <Icon icon='mdi:close' />
            </IconButton>
            <Box sx={{ mb: 9, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ lineHeight: '1rem' }}>
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
                  name='date'
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomDatePicker
                      error={!!error}
                      helperText={error?.message}
                      label='تاریخ'
                      onChange={onChange}
                      value={value}
                      readOnly={true}
                    />
                  )}
                />
              </Grid>

              {/* start_time */}
              <Grid item xs={12} md={12}>
                <Controller
                  control={control}
                  name='start_time'
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomTimePicker
                      size='large'
                      label='شروع بازه جلسه'
                      value={value}
                      onChange={onChange}
                      readOnly={true}
                    />
                  )}
                />
              </Grid>

              {/* end_time */}
              <Grid item xs={12} md={12}>
                <Controller
                  control={control}
                  name='end_time'
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomTimePicker
                      size='large'
                      label='پایان بازه جلسه'
                      value={value}
                      onChange={onChange}
                      readOnly={true}
                    />
                  )}
                />
              </Grid>

              {/* price */}
              <Grid item xs={3} sm={12}>
                <Controller
                  name='price'
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
                        label='هزینه (ریال)'
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                        value={value ? formatNumber(value.toString()) : ''}
                        onChange={handleChange}
                        InputProps={{ readOnly: true }}
                      />
                    )
                  }}
                />
              </Grid>

              <Grid item xs={3} sm={12}>
                <Controller
                  name='document_number'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => {
                    return (
                      <TextField
                        label='شماره پرونده'
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                        value={value}
                        onChange={onChange}
                        InputProps={{ readOnly: true }}
                      />
                    )
                  }}
                />
              </Grid>

              <Grid item xs={3} sm={12}>
                <Controller
                  name='advisor_id'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => {
                    return (
                      <TextField
                        label='مشاور'
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                        value={value}
                        onChange={onChange}
                        InputProps={{ readOnly: true }}
                      />
                    )
                  }}
                />
              </Grid>

              <Grid item xs={3} sm={12}>
                <Controller
                  name='institution_id'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => {
                    return (
                      <TextField
                        label='مرکز'
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                        value={value}
                        onChange={onChange}
                        InputProps={{ readOnly: true }}
                      />
                    )
                  }}
                />
              </Grid>

              {/* field_activity_ids */}
              <Grid item xs={12} md={12}>
                <Controller
                  name='activity_field_area_id'
                  control={control}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <Autocomplete
                      readOnly={true}
                      options={[]}
                      multiple={true}
                      value={value}
                      onChange={(_, newvalue) => onChange(newvalue)}
                      noOptionsText='هیچ نتیجه ای یافت نشد'
                      getOptionLabel={(options: { name: string }) => options?.name || ''}
                      renderInput={params => (
                        <TextField
                          label='حوزه های حیطه فعالیت'
                          {...params}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
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
        </form>
      </Dialog>
    </>
  )
}
