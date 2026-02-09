'use client'

import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import SubmitButton from '@/components/elements/submitButton'
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  FormControlLabel,
  Switch,
  Button,
  TextField,
  Autocomplete,
  Divider
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { BiPlus } from 'react-icons/bi'
import ModalCreateUser from './UserCreateModal'
import axiosConfig from '@/libs/auth/axios'
import { useCreateConsultationDocuments } from '@/hooks/institution/consultationDocuments/useDocumentList'
import { dateConverter } from '@/helpers/DateHelpers'
import { toast } from 'react-toastify'
import { GeTErrorFetch } from '@/components/elements/errorHandler'

export default function FormDocumentConsultation({ id, upsertData }: any) {
  console.log(upsertData, 'upsertData')
  const [open, setOpen] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    setValue,
    watch
  }: any = useForm({
    defaultValues: {
      anonymous: false,
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
      consultation_subsidy_id: null,
      service_fee_type_id: null,
      consultation_fee: '',
      service_recipient_type_ids: [],
      service_recipient_decile: ''
    }
  })

  const [isSubsidyActive, setIsSubsidyActive] = useState(false)
  const anonymous = watch('anonymous')
  const [userData, setUserData] = useState<any>(null)
  const fetchAdvisorInfo = async (userId: number) => {
    try {
      const res = await axiosConfig.get(
        `/institution/${id}/inPerson-consultation/core/inPerson-consultation/get-user`,
        {
          params: {
            user_id: userId
          }
        }
      )
      setUserData(res.data?.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (userData) {
      setValue('first_name', userData?.first_name)
      setValue('last_name', userData?.last_name)
      setValue('username', userData?.username)
      setValue('mobile', userData?.mobile)
      setValue('gender_id', userData?.gender)
      setValue('nationality_id', userData?.nationality)
      setValue('education_id', userData?.education)
      setValue('marital_id', userData?.marital)
      setValue('employment_status_id', userData?.employmentStatus)
    }
  }, [userData])

  const { mutateAsync, isPending } = useCreateConsultationDocuments()

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
      console.log(result, 'result')

      await toast.promise(mutateAsync({ data: result, id: id }), {
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
            title={
              <Typography variant='h6' sx={{ fontWeight: 900 }}>
                ایجاد پرونده
              </Typography>
            }
            subheader={<Typography variant='caption'>می توانید اطلاعات پرونده مورد نظر را وارد کنید</Typography>}
          />
          <CardContent>
            <Grid container spacing={5}>
              {/* unknow */}
              <Grid item xs={12} sm={12}>
                <Controller
                  name='anonymous'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <FormControlLabel
                      sx={{ m: 2 }}
                      label='تشکلیل پرونده به صورت ناشناس'
                      control={<Switch checked={value} onChange={(_, check) => onChange(check)} />}
                    />
                  )}
                />
              </Grid>

              {!anonymous && (
                <>
                  {/* advisor_id */}
                  <Grid item xs={4}>
                    <Controller
                      name='user_id'
                      control={control}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAsyncAutocomplete
                          url={`/institution/${id}/inPerson-consultation/base/select/user`}
                          readOnly={false}
                          value={value}
                          getOptionLabel={option => `${option?.first_name} ${option?.last_name} - ${option?.username}`}
                          label='کاربر'
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

                  <Grid item xs={8} sx={{ mt: 1.5 }}>
                    <Button
                      onClick={() => setOpen(true)}
                      variant='contained'
                      sx={{
                        minWidth: 40,
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <BiPlus size={20} />
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ m: 2 }} />
                  </Grid>
                </>
              )}

              <Grid item xs={12} sm={3}>
                <Controller
                  name='username'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      InputProps={{ readOnly: false }}
                      helperText={error?.message}
                      fullWidth
                      label='کد ملی'
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Controller
                  name='first_name'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      InputProps={{ readOnly: false }}
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
                      InputProps={{ readOnly: false }}
                      helperText={error?.message}
                      fullWidth
                      label='نام خانوادگی'
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
                      InputProps={{ readOnly: false }}
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
                      readOnly={false}
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
                      readOnly={false}
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
                      readOnly={false}
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
                      readOnly={false}
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
                      readOnly={false}
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
                      InputProps={{ readOnly: false }}
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
                      readOnly={false}
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
                      InputProps={{ readOnly: false }}
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
                      readOnly={false}
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

              <Grid item xs={12} md={4}>
                <Controller
                  name='service_fee_type_id'
                  control={control}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <Autocomplete
                      readOnly={false}
                      options={upsertData?.ServiceFreeTypes || []}
                      value={value}
                      onChange={(_, newvalue: any) => {
                        onChange(newvalue)

                        if (newvalue?.id === 2) {
                          setIsSubsidyActive(true)
                        } else if (newvalue?.id === 1) {
                          setValue('consultation_fee', upsertData?.consultationFreeInstitution)
                        } else if (newvalue?.id === 3) {
                          setValue('consultation_fee', '0')
                        }
                      }}
                      noOptionsText='هیچ نتیجه ای یافت نشد'
                      getOptionLabel={(options: { name: string }) => options?.name || ''}
                      renderInput={params => (
                        <TextField label='نوع هزینه' {...params} error={!!error} helperText={error?.message} />
                      )}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name='consultation_fee'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      InputProps={{ readOnly: false }}
                      helperText={error?.message}
                      fullWidth
                      label='هزینه مشاوره (هر جلسه )'
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} className='flex justify-between mt-4'>
                <Button href={`/institution/${id}/consultationServices/consultationDocuments/documentList`}>
                  بازگشت به فهرست پرونده ها
                </Button>

                <SubmitButton disabled={isPending} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </>
  )
}
