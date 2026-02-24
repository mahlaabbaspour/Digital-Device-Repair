'use client'

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
import CustomTimePicker from '@/components/elements/customTimePicker'
import { useState } from 'react'
import axiosConfig from '@/libs/auth/axios'
import moment from 'moment-jalaali'
import { useCreateCalenderGroup, useCreateCheckClanderGroup } from '@/hooks/institution/advisoryMeeting/useCalender'
import { dateConverter } from '@/helpers/DateHelpers'

export default function ModalGroupMeeting({
  onClose,
  open,
  title,
  description,
  id
}: {
  onClose: any
  open: boolean
  title: string
  description: string
  id: string
}) {
  const { setError, control, handleSubmit, reset } = useForm({
    defaultValues: {
      start_date: Date,
      end_date: Date,
      start_time: undefined,
      end_time: undefined,
      advisor_id: null,
      activity_field_area_id: [],
      price: '',
      is_holiday: '0',
      sat: '0',
      sun: '0',
      mon: '0',
      tue: '0',
      wed: '0',
      thu: '0',
      fri: '0'
    }
  })

  const [openAlert, setOpenAlert] = useState(false)
  const [errorMessages, setErrorMessages] = useState<any>()
  const [formData, setFormData] = useState<any>(null)

  const handleCloseAlert = () => setOpenAlert(false)
  const { mutateAsync, isPending }: any = useCreateCheckClanderGroup()
  const { mutateAsync: create, isPending: loading }: any = useCreateCalenderGroup()

  async function onSubmit(values: any) {
    try {
      const daysOrder = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri']
      const days: any = {}
      daysOrder.forEach(day => {
        days[day] = Number(values[day])
      })
      const data = {
        is_holiday: values?.is_holiday,
        activity_field_area_id: values?.activity_field_area_id?.map((el: any) => el?.id),
        price: values?.price,
        advisor_id: values?.advisor_id?.id,
        start_date: dateConverter(values?.start_date),
        end_date: dateConverter(values?.end_date),
        start_time: values.start_time ? moment(values.start_time).format('HH:mm') : '',
        end_time: values.end_time ? moment(values.end_time).format('HH:mm') : '',
        working_days: days
      }
      setFormData(data)

      const response = await mutateAsync({ id: id, data: data })

      if (!response?.status) {
        const conflicts = response?.message?.conflicts
        setErrorMessages(conflicts)
        setOpenAlert(true)

        return
      }

      if (response?.status) {
        const res: any = await toast.promise(
          create({
            id: id,
            data: {
              ...data,
              conflicts: response?.message?.conflicts || []
            }
          }),
          {
            pending: 'در حال انجام...'
          }
        )
        reset()
        onClose()

        if (!res?.status) {
          toast.error(res?.message)
        } else {
          toast.success('با موفقیت ایجاد شد')
        }
      }
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  const [advisorData, setAdvisorData] = useState<any>(null)
  const fetchAdvisorInfo = async (advisorId: number) => {
    try {
      const res = await axiosConfig.get(`/institution/${id}/meeting/core/consultation-meeting/activity-field-area`, {
        params: {
          advisor_id: advisorId
        }
      })
      setAdvisorData(res.data?.data)
    } catch (err) {
      throw err
    }
  }

  return (
    <>
      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        maxWidth='sm'
        fullWidth
        PaperProps={{
          sx: {
            color: '#fff',
            borderRadius: 2
          }
        }}
        BackdropProps={{
          invisible: true
        }}
      >
        <Box sx={{ mt: 5, textAlign: 'center' }}>
          <Typography variant='h5' sx={{ lineHeight: '1rem' }}>
            تداخل جلسات
          </Typography>
          <Typography variant='caption'>می توانید با وجود تداخل ها بقیه جلسات را ایجاد کنید</Typography>
        </Box>
        <DialogContent>
          {errorMessages?.map((msg: any, index: any) => (
            <Alert
              key={index}
              severity='warning'
              sx={{
                mb: 1,
                bgcolor: '#FFB74D',
                color: '#fff',
                border: 'none',
                py: 0.5,
                px: 1,
                fontSize: '0.75rem',
                alignItems: 'flex-start'
              }}
            >
              {`جلسه در تاریخ ${
                msg?.date
              } از ساعت ${msg?.start_time} تا ساعت ${msg?.end_time} در ${msg?.institution?.name} تداخل زمانی دارد`}
            </Alert>
          ))}
          <Typography variant='body2' sx={{ color: '#fff', mt: 1 }}>
            لطفاً موارد فوق را بررسی کنید.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} color='error' variant='outlined'>
            لغو
          </Button>
          <Button
            onClick={async () => {
              if (formData) {
                const res: any = await toast.promise(
                  create({
                    id: id,
                    data: {
                      ...formData,
                      conflicts: errorMessages || []
                    }
                  }),
                  {
                    pending: 'در حال انجام....'
                  }
                )
                setOpenAlert(false)
                reset()
                onClose()

                if (!res?.status) {
                  toast.error(res?.message)
                } else {
                  toast.success('با موفقیت ایجاد شد')
                }
              }
            }}
            variant='contained'
            sx={{ bgcolor: '#F57C00', color: '#fff', '&:hover': { bgcolor: '#EF6C00' } }}
          >
            تایید و ثبت
          </Button>
        </DialogActions>
      </Dialog>

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
              <Typography variant='h5' sx={{ mb: 1, lineHeight: '1rem', fontWeight: 700 }}>
                {title}
              </Typography>
              <Typography variant='caption'>{description}</Typography>
            </Box>
            <Divider />
            <Grid container spacing={5} mb={10} mt={5}>
              {/* start_date */}
              <Grid item xs={12} md={3}>
                <Controller
                  control={control}
                  name='start_date'
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomDatePicker
                      error={!!error}
                      helperText={error?.message}
                      label='تاریخ شروع بازه'
                      onChange={onChange}
                      value={value}
                      readOnly={false}
                    />
                  )}
                />
              </Grid>

              {/* end_date */}
              <Grid item xs={12} md={3}>
                <Controller
                  control={control}
                  name='end_date'
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomDatePicker
                      error={!!error}
                      helperText={error?.message}
                      label='تاریخ پایان بازه'
                      onChange={onChange}
                      value={value}
                      readOnly={false}
                    />
                  )}
                />
              </Grid>

              {/* start_time */}
              <Grid item xs={12} md={3}>
                <Controller
                  control={control}
                  name='start_time'
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomTimePicker size='large' label='شروع بازه جلسه' value={value} onChange={onChange} />
                  )}
                />
              </Grid>

              {/* end_time */}
              <Grid item xs={12} md={3}>
                <Controller
                  control={control}
                  name='end_time'
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomTimePicker size='large' label='پایان بازه جلسه' value={value} onChange={onChange} />
                  )}
                />
              </Grid>

              {/* advisor_id */}
              <Grid item xs={6}>
                <Controller
                  name='advisor_id'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomAsyncAutocomplete
                      url={`/institution/${id}/meeting/base/select/advisor`}
                      readOnly={false}
                      value={value}
                      getOptionLabel={option => `${option?.first_name} ${option?.last_name} - ${option?.username}`}
                      label='مشاور'
                      error={!!error}
                      helperText={error?.message}
                      onAddValue={newValue => {
                        onChange(newValue)
                        if (newValue?.id) {
                          fetchAdvisorInfo(newValue.id)
                        }
                      }}
                    />
                  )}
                />
              </Grid>

              {/* price */}
              <Grid item xs={6} sm={6}>
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
                        InputProps={{ readOnly: false }}
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
                      readOnly={false}
                      options={advisorData ?? []}
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

              {/* is_holiday */}
              <Grid item xs={3}>
                <Controller
                  name='is_holiday'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      label='ایام تعطیل'
                      control={<Switch checked={value === '1'} onChange={(_, check) => onChange(check ? '1' : '0')} />}
                    />
                  )}
                />
              </Grid>

              {/* sat */}
              <Grid item xs={3}>
                <Controller
                  name='sat'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      label='شنبه'
                      control={<Switch checked={value === '1'} onChange={(_, check) => onChange(check ? '1' : '0')} />}
                    />
                  )}
                />
              </Grid>

              {/* sun */}
              <Grid item xs={3}>
                <Controller
                  name='sun'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      label='یکشنبه'
                      control={<Switch checked={value === '1'} onChange={(_, check) => onChange(check ? '1' : '0')} />}
                    />
                  )}
                />
              </Grid>

              {/* mon */}
              <Grid item xs={3}>
                <Controller
                  name='mon'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      label='دوشنبه'
                      control={<Switch checked={value === '1'} onChange={(_, check) => onChange(check ? '1' : '0')} />}
                    />
                  )}
                />
              </Grid>

              {/* tue */}
              <Grid item xs={3}>
                <Controller
                  name='tue'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      label='سه شنبه'
                      control={<Switch checked={value === '1'} onChange={(_, check) => onChange(check ? '1' : '0')} />}
                    />
                  )}
                />
              </Grid>

              {/* wed */}
              <Grid item xs={3}>
                <Controller
                  name='wed'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      label='چهارشنبه'
                      control={<Switch checked={value === '1'} onChange={(_, check) => onChange(check ? '1' : '0')} />}
                    />
                  )}
                />
              </Grid>

              {/* the */}
              <Grid item xs={3}>
                <Controller
                  name='thu'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      label='پنج شنبه'
                      control={<Switch checked={value === '1'} onChange={(_, check) => onChange(check ? '1' : '0')} />}
                    />
                  )}
                />
              </Grid>

              {/* fri */}
              <Grid item xs={3}>
                <Controller
                  name='fri'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      label='جمعه'
                      control={<Switch checked={value === '1'} onChange={(_, check) => onChange(check ? '1' : '0')} />}
                    />
                  )}
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
