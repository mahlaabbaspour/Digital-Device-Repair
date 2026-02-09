'use client'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Transition } from '@/helpers/DialogsHelper'
import { Icon } from '@iconify/react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  TextField,
  Typography,
  CardContent,
  CardHeader,
  Divider,
  Autocomplete,
  FormControlLabel,
  Switch
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { GeTErrorFetch } from '@/components/elements/errorHandler'
import { toast } from 'react-toastify'
import CustomDatePicker from '@/components/elements/customDatePicker'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import { useEffect } from 'react'
import { parse } from 'date-fns-jalali'
import { useUpdateHistoryTeachingRevisionTeachingPermission } from '@/hooks/organization/useRevisionTeachingPermission'

export default function UpdateHistoryTeachingRevisionModal({
  onClose,
  open,
  id,
  revisionId,
  upsertData,
  rowSelect,
  disabled
}: {
  onClose: any
  open: boolean
  id: string
  revisionId: string
  upsertData: any
  rowSelect: any
  disabled: boolean
}) {
  const { control, handleSubmit, setError, reset, setValue, watch } = useForm({
    defaultValues: {
      course_name: '',
      executor_name: '',
      duration: '',
      start_date: null,
      end_date: null,
      executor_type_id: null,
      request_level_id: null,
      region_ids: [],
      historyFile: null,
      status: '0',
      objection: ''
    }
  })

  useEffect(() => {
    if (rowSelect) {
      setValue('course_name', rowSelect?.course_name)
      setValue('executor_name', rowSelect?.executor_name)
      setValue('duration', rowSelect?.duration)
      setValue('executor_type_id', rowSelect?.executorType)
      setValue('request_level_id', rowSelect?.requestLevel)
      //@ts-ignore
      setValue('start_date', rowSelect?.start_date ? parse(rowSelect?.start_date, 'yyyy/MM/dd', new Date()) : null)
      //@ts-ignore
      setValue('end_date', rowSelect?.end_date ? parse(rowSelect?.end_date, 'yyyy/MM/dd', new Date()) : null)
      setValue('region_ids', rowSelect?.regions)
      setValue('objection', rowSelect?.objection ? rowSelect?.objection : [])
      setValue('status', rowSelect?.status ? rowSelect?.status : '0')
    }
  }, [rowSelect])

  const { mutateAsync, isPending }: any = useUpdateHistoryTeachingRevisionTeachingPermission()

  async function onSubmit(values: any) {
    try {
      const data = {
        status: values?.status,
        objection: values?.objection
      }
      const res: any = await toast.promise(mutateAsync({ data: data, id, revisionId, rowId: rowSelect?.id }), {
        pending: 'در حال انجام...'
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
            <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
              <Icon icon='mdi:close' />
            </IconButton>
            <CardHeader
              sx={{ textAlign: 'center' }}
              title={
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                  سوابق تدریس
                </Typography>
              }
              subheader={<Typography variant='caption'>می توانید اطلاعات سوابق تدریس خود را وارد کنید</Typography>}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='course_name'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        InputProps={{ readOnly: disabled }}
                        helperText={error?.message}
                        fullWidth
                        label='نام دوره'
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Controller
                    name='executor_name'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        InputProps={{ readOnly: disabled }}
                        helperText={error?.message}
                        fullWidth
                        label='نام مجری دوره'
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Controller
                    name='duration'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        InputProps={{ readOnly: disabled }}
                        helperText={error?.message}
                        fullWidth
                        label='مدت دوره (ساعت)'
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Controller
                    name='request_level_id'
                    control={control}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <Autocomplete
                        readOnly={disabled}
                        options={upsertData?.requestLevels || []}
                        value={value}
                        onChange={(_, newvalue) => onChange(newvalue)}
                        noOptionsText='هیچ نتیجه ای یافت نشد'
                        getOptionLabel={(options: { name: string }) => options?.name || ''}
                        renderInput={params => (
                          <TextField label='سطح تدریس' {...params} error={!!error} helperText={error?.message} />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Controller
                    control={control}
                    name='start_date'
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <CustomDatePicker
                        error={!!error}
                        helperText={error?.message}
                        label='تاریخ شروع '
                        onChange={onChange}
                        value={value}
                        readOnly={disabled}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Controller
                    control={control}
                    name='end_date'
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <CustomDatePicker
                        error={!!error}
                        helperText={error?.message}
                        label='تاریخ پایان'
                        onChange={onChange}
                        value={value}
                        readOnly={disabled}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Controller
                    name='executor_type_id'
                    control={control}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <Autocomplete
                        readOnly={disabled}
                        options={upsertData?.executorTypes || []}
                        value={value}
                        onChange={(_, newvalue) => onChange(newvalue)}
                        noOptionsText='هیچ نتیجه ای یافت نشد'
                        getOptionLabel={(options: { name: string }) => options?.name || ''}
                        renderInput={params => (
                          <TextField label='نوع مجری دوره' {...params} error={!!error} helperText={error?.message} />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <Controller
                    name='region_ids'
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <CustomAsyncAutocomplete
                        url={`/user/${id}/education/request-teaching-permission/base/select/region`}
                        readOnly={disabled}
                        onAddValue={newValue => onChange(newValue)}
                        value={value}
                        getOptionLabel={optien => optien?.name}
                        label='شهرستان ها'
                        multiple={true}
                        error={!!error}
                        helperText={error?.message}
                      ></CustomAsyncAutocomplete>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name='status'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <FormControlLabel
                        label='تایید نهایی'
                        control={
                          <Switch
                            checked={value === '1'}
                            onChange={(_, check) => onChange(check ? '1' : '0')}
                            readOnly={disabled}
                          />
                        }
                      />
                    )}
                  />
                </Grid>

                {watch('status') == '0' && (
                  <Grid item xs={12}>
                    <Controller
                      name='objection'
                      control={control}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <Autocomplete
                          multiple
                          freeSolo
                          options={[]}
                          readOnly={disabled}
                          //@ts-ignore
                          value={value}
                          onChange={(_, newValue) => onChange(newValue)}
                          renderInput={params => (
                            <TextField error={!!error} helperText={error?.message} {...params} label='دلایل رد' />
                          )}
                        />
                      )}
                    />
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </DialogContent>
          <DialogActions>
            <Button variant='outlined' sx={{ fontFamily: 'inherit' }} color='error' onClick={onClose}>
              بستن
            </Button>
            {!disabled && (
              <Button
                variant='contained'
                sx={{ fontFamily: 'inherit' }}
                color='primary'
                disabled={isPending}
                type='submit'
              >
                ثبت
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
