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
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import CustomTimePicker from '@/components/elements/customTimePicker'
import { useState } from 'react'
import axiosConfig from '@/libs/auth/axios'
import moment from 'moment-jalaali'
import {
  useCreateCheckSingleClander,
  useCreateSingleMeetingCalender
} from '@/hooks/institution/advisoryMeeting/useCalender'
import { dateConverter } from '@/helpers/DateHelpers'

export default function ModalSingleMeeting({
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
      date: Date,
      start_time: undefined,
      end_time: undefined,
      advisor_id: null,
      activity_field_area_id: [],
      price: ''
    }
  })

  const { mutateAsync, isPending }: any = useCreateCheckSingleClander()
  const { mutateAsync: create, isPending: loading }: any = useCreateSingleMeetingCalender()

  async function onSubmit(values: any) {
    try {
      console.log(values, 'values')
      const date = dateConverter(values?.date)
      const startTimeShamsi = values.start_time ? moment(values.start_time).format('HH:mm') : ''
      const endTimeShamsi = values.end_time ? moment(values.end_time).format('HH:mm') : ''

      const data = {
        activity_field_area_id: values.activity_field_area_id?.map((el: any) => el.id) || [],
        advisor_id: values.advisor_id?.id || null,
        date: date || null,
        start_time: startTimeShamsi,
        end_time: endTimeShamsi,
        price: values.price || 0
      }

      console.log(data, 'data submit')

      const response: any = await toast.promise(mutateAsync({ id: id, data: data }), {
        pending: 'در حال انجام...'
      })
      console.log(response, 'response')

      if (!response?.status) {
        toast.error(response?.message)
      }

      if (response?.status) {
        const res: any = await toast.promise(create({ id: id, data: data }), {
          pending: 'در حال انجام...'
        })
        console.log(res, 'res')
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
      console.error(err)
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
              <Typography variant='h5' sx={{ mb: 1, lineHeight: '1rem', fontWeight: 700 }}>
                {title}
              </Typography>
              <Typography variant='caption'>{description}</Typography>
            </Box>
            <Divider />
            <Grid container spacing={5} mb={10} mt={5}>
              {/* date */}
              <Grid item xs={12} md={3}>
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

              {/* price */}
              <Grid item xs={3} sm={3}>
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

              {/* field_activity_ids */}
              <Grid item xs={6} md={6}>
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
