'use client'

import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import SubmitButton from '@/components/elements/submitButton'
import { Card, CardContent, CardHeader, Typography, Grid, Button, TextField, Autocomplete } from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ModalCreateUser from './UserCreateModal'
import { useUpdateConsultationDocuments } from '@/hooks/institution/consultationDocuments/useDocumentList'
import { dateConverter } from '@/helpers/DateHelpers'
import { toast } from 'react-toastify'
import { GeTErrorFetch } from '@/components/elements/errorHandler'

export default function FormUpdateDocumentConsultation({ documentId, id, upsertData, disabled, action, show }: any) {
  console.log(show, 'show')
  const [open, setOpen] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    setValue
  }: any = useForm({
    defaultValues: {
      user_id: null,
      first_name: '',
      last_name: '',
      username: '',
      mobile: '',
      description: '',
      gender_id: null,
      nationality_id: null,
      education_id: null,
      marital_id: null,
      employment_status_id: null,
      activity_field_area_ids: [],
      service_recipient_type_ids: [],
      service_recipient_decile: ''
    }
  })

  useEffect(() => {
    if (show) {
      setValue('first_name', show?.first_name)
      setValue('last_name', show?.last_name)
      setValue('username', show?.username)
      setValue('mobile', show?.mobile)
      setValue('gender_id', show?.gender)
      setValue('nationality_id', show?.nationality)
      setValue('education_id', show?.education)
      setValue('marital_id', show?.marital)
      setValue('employment_status_id', show?.employmentStatus)
      setValue('description', show?.description)
      setValue('activity_field_area_ids', show?.activityFieldAreas)
      setValue('service_recipient_type_ids', show?.serviceRecipientTypes)
      setValue('advisor_ids', show?.advisors)
      setValue('service_recipient_decile', show?.service_recipient_decile)
    }
  }, [show])

  const { mutateAsync, isPending } = useUpdateConsultationDocuments()

  const onSubmit = async (values: any) => {
    try {
      const result: any = {}
      Object.entries(values).forEach(([key, value]) => {
        if (value === false || value === null || value === undefined) return
        if (value && typeof value === 'object' && 'id' in value) {
          result[key] = value?.id
        } else if (Array.isArray(value)) {
          result[key] = value.map((item: any) => (typeof item === 'object' && 'id' in item ? item?.id : item))
        } else if (value instanceof Date) {
          result[key] = dateConverter(value)
        } else {
          result[key] = value
        }
      })

      await toast.promise(mutateAsync({ data: result, id: id, rowId: documentId }), {
        pending: 'در حال انجام...'
      })
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  return (
    <>
      <ModalCreateUser
        title='ایجاد کاربر'
        description='می توانید کاربر مورد نظر را ایجاد کنید'
        open={open}
        onClose={() => setOpen(false)}
        id={id}
        upsertData={upsertData}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader
            sx={{ textAlign: 'center' }}
            title={
              <Typography variant='h6' sx={{ fontWeight: 900 }}>
                {action === 'edit' ? 'ویرایش پرونده' : 'نمایش پرونده'}
              </Typography>
            }
            subheader={
              <Typography variant='caption'>
                {action === 'edit'
                  ? 'می توانید اطلاعات پرونده مورد نظر را ویرایش کنید'
                  : 'می توانید اطلاعات پرونده مورد نظر را مشاهده کنید'}
              </Typography>
            }
          />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={3}>
                <Controller
                  name='first_name'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      InputProps={{ readOnly: disabled }}
                      helperText={error?.message}
                      fullWidth
                      label='نام'
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Controller
                  name='last_name'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      InputProps={{ readOnly: disabled }}
                      helperText={error?.message}
                      fullWidth
                      label='نام خانوادگی'
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Controller
                  name='username'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      InputProps={{ readOnly: disabled }}
                      helperText={error?.message}
                      fullWidth
                      label='کد ملی'
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Controller
                  name='mobile'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      InputProps={{ readOnly: disabled }}
                      helperText={error?.message}
                      fullWidth
                      label='موبایل'
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Controller
                  name='gender_id'
                  control={control}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <Autocomplete
                      readOnly={disabled}
                      options={upsertData?.genders || []}
                      value={value}
                      onChange={(_, newvalue) => onChange(newvalue)}
                      noOptionsText='هیچ نتیجه ای یافت نشد'
                      getOptionLabel={(options: { name: string }) => options?.name || ''}
                      renderInput={params => (
                        <TextField label='جنسیت' {...params} error={!!error} helperText={error?.message} />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Controller
                  name='marital_id'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomAsyncAutocomplete
                      url='/admin/membership/base/select/marital'
                      readOnly={disabled}
                      onAddValue={newValue => onChange(newValue)}
                      value={value}
                      getOptionLabel={optien => optien?.name}
                      label='وضعیت تاهل'
                      error={!!error}
                      helperText={error?.message}
                    ></CustomAsyncAutocomplete>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Controller
                  name='nationality_id'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomAsyncAutocomplete
                      url='/admin/membership/base/select/nationality'
                      readOnly={disabled}
                      onAddValue={newValue => onChange(newValue)}
                      value={value}
                      getOptionLabel={optien => optien?.name}
                      label='ملیت'
                      error={!!error}
                      helperText={error?.message}
                    ></CustomAsyncAutocomplete>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Controller
                  name='education_id'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomAsyncAutocomplete
                      url='/admin/membership/base/select/education'
                      readOnly={disabled}
                      onAddValue={newValue => onChange(newValue)}
                      value={value}
                      getOptionLabel={optien => optien?.name}
                      label='تحصیلات'
                      error={!!error}
                      helperText={error?.message}
                    ></CustomAsyncAutocomplete>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Controller
                  name='employment_status_id'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomAsyncAutocomplete
                      url='/admin/membership/base/select/employment-status'
                      readOnly={disabled}
                      onAddValue={newValue => onChange(newValue)}
                      value={value}
                      getOptionLabel={optien => optien?.name}
                      label='وضعیت اشتغال'
                      error={!!error}
                      helperText={error?.message}
                    ></CustomAsyncAutocomplete>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <Controller
                  name='service_recipient_decile'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      InputProps={{ readOnly: disabled }}
                      helperText={error?.message}
                      fullWidth
                      label='دهک گیرنده خدمت'
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={7}>
                <Controller
                  name='service_recipient_type_ids'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomAsyncAutocomplete
                      url={`/institution/${id}/inPerson-consultation/base/select/service-recipient-type`}
                      readOnly={disabled}
                      onAddValue={newValue => onChange(newValue)}
                      value={value}
                      getOptionLabel={optien => optien?.name}
                      label='خدمت گیرنده'
                      multiple={true}
                      error={!!error}
                      helperText={error?.message}
                    ></CustomAsyncAutocomplete>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name='description'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      multiline
                      rows={3}
                      InputProps={{ readOnly: disabled }}
                      error={!!error}
                      helperText={error?.message}
                      {...field}
                      value={field.value ?? ''}
                      fullWidth
                      label='توضیحات'
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <Controller
                  name='activity_field_area_ids'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomAsyncAutocomplete
                      url={`/institution/${id}/inPerson-consultation/base/select/consulting-activity-field-area`}
                      readOnly={disabled}
                      onAddValue={newValue => onChange(newValue)}
                      value={value}
                      getOptionLabel={optien => optien?.name}
                      label='حوزه های حیطه فعالیت'
                      multiple={true}
                      error={!!error}
                      helperText={error?.message}
                    ></CustomAsyncAutocomplete>
                  )}
                />
              </Grid>

              <Grid item xs={12} className='flex justify-between mt-4'>
                <Button href={`/institution/${id}/consultationServices/consultationDocuments/documentList`}>
                  بازگشت به فهرست پرونده ها
                </Button>

                {!disabled && <SubmitButton disabled={isPending} />}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </>
  )
}
