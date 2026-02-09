'use client'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Transition } from '@/helpers/DialogsHelper'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  Autocomplete
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { GeTErrorFetch } from '@/components/elements/errorHandler'
import { useCreateInPersonMeetingCourseInstitution } from '@/hooks/institution/education/useLessonEducation'
import { CloseRounded } from '@mui/icons-material'
import { toast } from 'react-toastify'
import CustomDatePicker from '@/components/elements/customDatePicker'
import CustomTimePicker from '@/components/elements/customTimePicker'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import { dateConverter } from '@/helpers/DateHelpers'
import moment from 'moment-jalaali'

export default function CreateInPersonMeetingModal({
  onClose,
  open,
  id,
  courseId,
  rowSelect,
  upsertData
}: {
  onClose: any
  open: boolean
  id: string
  courseId: string
  rowSelect: any
  upsertData: any
}) {
  const { control, handleSubmit, setError, reset } = useForm({
    defaultValues: {
      date: null,
      start_time: null,
      end_time: null,
      person_id: null,
      venue: '',
      description: '',
      training_meeting_type_id: null
    }
  })

  const { mutateAsync, isPending }: any = useCreateInPersonMeetingCourseInstitution()

  async function onSubmit(values: any) {
    try {
      const date = values?.date ? dateConverter(values?.date) : null
      const time1 = values.start_time ? moment(values.start_time).format('HH:mm') : ''
      const time2 = values.end_time ? moment(values.end_time).format('HH:mm') : ''
      const data = {
        date: date,
        start_time: time1,
        end_time: time2,
        person_id: values?.person_id?.id,
        venue: values?.venue,
        description: values?.description,
        training_meeting_type_id: values?.training_meeting_type_id?.id
      }
      console.log(data, 'data')
      await toast.promise(mutateAsync({ data: data, id, courseId }), {
        pending: 'در حال انجام...'
      })
      onClose()
      reset()
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  return (
    <>
      <Dialog TransitionComponent={Transition} fullWidth open={open} maxWidth='lg' scroll='body'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
            <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
              <CloseRounded />
            </IconButton>
            <CardHeader
              sx={{ textAlign: 'center' }}
              title={
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                  جلسه حضوری
                </Typography>
              }
              subheader={<Typography variant='caption'>می توانید جلسه حضوری را ایجاد کنید</Typography>}
            />
            <CardContent>
              <Grid container spacing={5}>
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

                <Grid item xs={12} md={3}>
                  <Controller
                    control={control}
                    name='start_time'
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <CustomTimePicker
                        error={!!error}
                        helperText={error?.message}
                        label='ساعت شروع'
                        onChange={onChange}
                        value={value}
                        size=''
                        readOnly={false}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Controller
                    control={control}
                    name='end_time'
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <CustomTimePicker
                        error={!!error}
                        helperText={error?.message}
                        label='ساعت پایان'
                        onChange={onChange}
                        value={value}
                        size=''
                        readOnly={false}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Controller
                    name='training_meeting_type_id'
                    control={control}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <Autocomplete
                        readOnly={false}
                        options={upsertData?.trainingMeetingType || []}
                        value={value}
                        onChange={(_, newvalue) => onChange(newvalue)}
                        noOptionsText='هیچ نتیجه ای یافت نشد'
                        getOptionLabel={(options: { name: string }) => options?.name || ''}
                        renderInput={params => (
                          <TextField label='توع جلسه آموزش' {...params} error={!!error} helperText={error?.message} />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Controller
                    name='person_id'
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <CustomAsyncAutocomplete
                        url={`/institution/${id}/education/course/base/select/teacher`}
                        readOnly={false}
                        onAddValue={newValue => onChange(newValue)}
                        value={value}
                        getOptionLabel={optien => optien?.name}
                        label='مدرس'
                        error={!!error}
                        helperText={error?.message}
                      ></CustomAsyncAutocomplete>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={9}>
                  <Controller
                    name='venue'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        InputProps={{ readOnly: false }}
                        helperText={error?.message}
                        fullWidth
                        label='محل برگذاری'
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Controller
                    name='description'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        multiline={true}
                        rows={3}
                        error={!!error}
                        InputProps={{ readOnly: false }}
                        helperText={error?.message}
                        fullWidth
                        label='توضیحات'
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </DialogContent>
          <DialogActions>
            <Button variant='outlined' sx={{ fontFamily: 'inherit' }} color='error' onClick={onClose}>
              بستن
            </Button>
            <Button
              variant='contained'
              sx={{ fontFamily: 'inherit' }}
              color='primary'
              disabled={isPending}
              type='submit'
            >
              ثبت
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
