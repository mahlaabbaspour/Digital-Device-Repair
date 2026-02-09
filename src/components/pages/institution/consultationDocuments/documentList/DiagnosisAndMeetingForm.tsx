'use client'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import CustomDatePicker from '@/components/elements/customDatePicker'
import CustomTimePicker from '@/components/elements/customTimePicker'
import {
  Box,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  Typography,
  Switch,
  TextField,
  CardHeader,
  Divider,
  Autocomplete,
  Button,
  Chip
} from '@mui/material'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import { Controller, useForm } from 'react-hook-form'
import SubmitButton from '@/components/elements/submitButton'
import { dateConverter } from '@/helpers/DateHelpers'
import moment from 'moment-jalaali'
import { useCreateMeetInstitution1480 } from '@/hooks/superUser/useInstitution1480'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axiosConfig from '@/libs/auth/axios'
import { convertEditorContent } from '@/helpers/EditorsHelper'
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import ReactDraftWysiwyg from '@/@core/components/react-draft-wysiwyg'
import { EditorWrapper } from '@/@core/styles/react-draft-wysiwyg'

export default function DiagnosisAndDocumentUpdateMeeting1480({ id, upsertData = [] }: any) {
  const [userData, setUserData] = useState<any>(null)
  const fetchAdvisorInfo = async (userId: number) => {
    try {
      const res = await axiosConfig.get(
        `/institution/${id}/consultation-document/core/consultation-document/get-user`,
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

  const { setError, control, handleSubmit, setValue, clearErrors, reset, watch } = useForm({
    defaultValues: {
      date: Date,
      start_time: undefined,
      end_time: undefined,
      // activity_field_area_ids: [],
      institution_id: null,
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
      service_recipient_decile: '',
      psychotherapy_history: 0,
      psychiatric_hospitalization_history: 0,
      psychiatric_medication_history: 0,
      hospitalization_duration: '',
      medication_history: '',
      specific_disease_type: 0,
      specific_disease_type_history: '',
      past_medical_history: '',
      personal_history: '',
      mental_status_history: '',
      history_interventions: '',
      suicide_history: 0,
      client_remarks: null,
      note_advisor: '',
      advisor_instruction: '',
      mental_disorder_ids: [],
      clinical_item_ids: [],
      clinical_diagnosis_ids: []
    }
  })
  const anonymous = watch('anonymous')
  const router = useRouter()

  const [remarks, setRemarks] = useState(EditorState.createEmpty())
  const [note, setNote] = useState(EditorState.createEmpty())

  const { mutateAsync, isPending }: any = useCreateMeetInstitution1480()

  async function onSubmit(values: any) {
    try {
      const startTimeShamsi = values.start_time ? moment(values.start_time).format('HH:mm') : ''
      const endTimeShamsi = values.end_time ? moment(values.end_time).format('HH:mm') : ''
      const data = {
        date: dateConverter(values?.date),
        start_time: startTimeShamsi,
        end_time: endTimeShamsi,
        activity_field_area_ids: values?.activity_field_area_ids?.map((el: any) => el?.id),
        psychotherapy_history: values?.psychotherapy_history,
        psychiatric_hospitalization_history: values?.psychiatric_hospitalization_history,
        psychiatric_medication_history: values?.psychiatric_medication_history,
        specific_disease_history: values?.specific_disease_history,
        suicide_history: values?.suicide_history,
        hospitalization_duration: values?.hospitalization_duration,
        medication_type: values?.medication_type,
        specific_disease_type: values?.specific_disease_type,
        mental_disorder_ids: values?.mental_disorder_ids?.map((el: any) => el?.id),
        past_medical_histroy: values?.past_medical_histroy,
        personal_histroy: values?.personal_histroy,
        mental_status: values?.mental_status,
        interventions_description: values?.interventions_description,
        institution_id: values?.institution_id?.id
      }

      const res: any = await toast.promise(mutateAsync({ data: data, id: id }), {
        pending: 'درحال انجام ...'
      })
      if (res?.status) {
        router.back()
      }
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 9, textAlign: 'center' }}>
              <Typography variant='h6' sx={{ lineHeight: '1rem', fontWeight: 700 }}>
                اطلاعات جلسه
              </Typography>
              <Typography variant='caption'> ابتدا اطلاعات اولیه جلسه را واردکنید</Typography>
            </Box>
            <Grid container spacing={5}>
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

              <Grid item xs={12} md={3}>
                <Controller
                  name='institution_id'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomAsyncAutocomplete
                      url={`/super-user/${id}/meeting-1480/base/select/institution-1480`}
                      readOnly={false}
                      onAddValue={newValue => onChange(newValue)}
                      value={value}
                      getOptionLabel={optien => optien?.name}
                      label='مراکز'
                      error={!!error}
                      helperText={error?.message}
                    ></CustomAsyncAutocomplete>
                  )}
                />
              </Grid>

              {/* diagnosis_ids */}
              <Grid item xs={12} md={12}>
                <Controller
                  name='activity_field_area_ids'
                  control={control}
                  defaultValue={[]}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomAsyncAutocomplete
                      url={`/super-user/${id}/meeting-1480/base/select/consulting-activity-field-area`}
                      readOnly={false}
                      onAddValue={newValue => onChange(newValue)}
                      value={value || []}
                      getOptionLabel={optien => optien?.name}
                      label='حوزه های فعالیت'
                      multiple={true}
                      error={!!error}
                      helperText={error?.message}
                    ></CustomAsyncAutocomplete>
                  )}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ mt: 5 }}>
          <Box sx={{ textAlign: 'center' }}>
            <CardHeader
              title={
                <Typography variant='h6' sx={{ fontWeight: 900 }}>
                  ایجاد پرونده
                </Typography>
              }
              subheader={<Typography variant='caption'>می توانید اطلاعات پرونده مورد نظر را وارد کنید</Typography>}
            />
          </Box>
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
                          url={`/institution/${id}/consultation-document/base/select/user`}
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

                  {/* <Grid item xs={8} sx={{ mt: 1.5 }}>
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
                  </Grid> */}

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
                      url={`/institution/${id}/consultation-document/base/select/service-recipient-type`}
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

              {/* {isSubsidyActive && (
                        <Grid item xs={12} md={4}>
                          <Controller
                            name='consultation_subsidy_id'
                            control={control}
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                              <Autocomplete
                                readOnly={false}
                                options={upsertData?.consultationSubsides || []}
                                value={value}
                                onChange={(_, newvalue: any) => {
                                  onChange(newvalue)
                                  console.log(newvalue, 'newValue')
        
                                  if (newvalue) {
                                    const discount =
                                      upsertData?.consultationFreeInstitution * (newvalue?.discount_percentage / 100)
                                    const price = upsertData?.consultationFreeInstitution - discount
                                    setValue('consultation_fee', price)
                                  }
                                }}
                                noOptionsText='هیچ نتیجه ای یافت نشد'
                                getOptionLabel={(options: any) => `${options?.name} (${options?.discount_percentage}%)` || ''}
                                renderInput={params => (
                                  <TextField label='یارانه مشاوره' {...params} error={!!error} helperText={error?.message} />
                                )}
                              />
                            )}
                          />
                        </Grid>
                      )} */}

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
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ mt: 5, position: 'relative' }}>
          <CardHeader
            sx={{ textAlign: 'center', pb: 1, mb: 5 }}
            title={
              <Typography variant='h6' fontWeight={800}>
                سابقه مراجع
              </Typography>
            }
            subheader={
              <Typography variant='caption' color='text.secondary'>
                ابتدا سابقه کلی مراجع را تکمیل کنید
              </Typography>
            }
          />
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'stretch',
                width: '100%'
              }}
            >
              <Box sx={{ flex: 6 }}>
                <Grid container spacing={5}>
                  {/* suicide_histroy */}
                  <Grid item xs={12}>
                    <Controller
                      name='psychotherapy_history'
                      control={control}
                      defaultValue={0}
                      render={({ field }) => (
                        <FormControlLabel
                          label='سابقه روان درمانی'
                          control={
                            <Switch
                              checked={field.value === 1}
                              onChange={(_, check) => field.onChange(check ? 1 : 0)}
                            />
                          }
                        />
                      )}
                    />
                  </Grid>

                  {/* psychiatric_hospitalization_histroy */}
                  <Grid item xs={12}>
                    <Controller
                      name='psychiatric_hospitalization_history'
                      control={control}
                      defaultValue={0}
                      render={({ field }) => (
                        <FormControlLabel
                          label='سابقه بستری به دلیل مشکلات روان پزشکی'
                          control={
                            <Switch
                              checked={field.value === 1}
                              onChange={(_, check) => field.onChange(check ? 1 : 0)}
                            />
                          }
                        />
                      )}
                    />
                  </Grid>

                  {/* hospitalization_duration */}
                  {watch('psychiatric_hospitalization_history') == 1 && (
                    <>
                      <Grid item xs={12}>
                        <Controller
                          name='hospitalization_duration'
                          control={control}
                          defaultValue=''
                          render={({ field, fieldState: { error } }) => (
                            <TextField
                              error={!!error}
                              helperText={error?.message}
                              InputProps={{ readOnly: false }}
                              {...field}
                              value={field.value ?? ''}
                              fullWidth
                              label='مدت زمان بستری'
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={4}></Grid>
                    </>
                  )}

                  {/* psychiatric_medication_histroy */}
                  <Grid item xs={12}>
                    <Controller
                      name='psychiatric_medication_history'
                      control={control}
                      defaultValue={0}
                      render={({ field }) => (
                        <FormControlLabel
                          label='سابقه مصرف داروهای روانپزشکی'
                          control={
                            <Switch
                              checked={field.value === 1}
                              onChange={(_, check) => field.onChange(check ? 1 : 0)}
                            />
                          }
                        />
                      )}
                    />
                  </Grid>

                  {/* medication_type */}
                  {watch('psychiatric_medication_history') == 1 && (
                    <>
                      <Grid item xs={12}>
                        <Controller
                          name='medication_history'
                          control={control}
                          defaultValue=''
                          render={({ field, fieldState: { error } }) => (
                            <TextField
                              error={!!error}
                              helperText={error?.message}
                              InputProps={{ readOnly: false }}
                              {...field}
                              value={field.value ?? ''}
                              fullWidth
                              label='نوع دارو'
                            />
                          )}
                        />
                      </Grid>
                    </>
                  )}

                  {/* specific_disease_histroy */}
                  <Grid item xs={12}>
                    <Controller
                      name='specific_disease_type'
                      control={control}
                      defaultValue={0}
                      render={({ field: { value, onChange } }) => (
                        <FormControlLabel
                          label='سابقه بیماری خاص'
                          control={<Switch checked={value === 1} onChange={(_, check) => onChange(check ? 1 : 0)} />}
                        />
                      )}
                    />
                  </Grid>

                  {/* specific_disease_type */}
                  {watch('specific_disease_type') == 1 && (
                    <>
                      <Grid item xs={12}>
                        <Controller
                          name='specific_disease_type_history'
                          control={control}
                          defaultValue=''
                          render={({ field, fieldState: { error } }) => (
                            <TextField
                              error={!!error}
                              helperText={error?.message}
                              InputProps={{ readOnly: false }}
                              {...field}
                              value={field.value ?? ''}
                              fullWidth
                              label='نوع بیماری خاص'
                            />
                          )}
                        />
                      </Grid>
                    </>
                  )}

                  {/* suicide_histroy */}
                  <Grid item xs={12}>
                    <Controller
                      name='suicide_history'
                      control={control}
                      defaultValue={0}
                      render={({ field: { value, onChange } }) => (
                        <FormControlLabel
                          label='سابقه خودکشی'
                          control={<Switch checked={value === 1} onChange={(_, check) => onChange(check ? 1 : 0)} />}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Divider
                orientation='vertical'
                flexItem
                sx={{
                  borderColor: '#dbdbdbff',
                  mx: 5
                }}
              />
              <Box sx={{ flex: 6 }}>
                <Grid container spacing={5}>
                  {/* past_medical_histroy */}
                  <Grid item xs={12}>
                    <Controller
                      name='past_medical_history'
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
                          label='تاریخچه بیماری های قبلی'
                        />
                      )}
                    />
                  </Grid>

                  {/* personal_histroy */}
                  <Grid item xs={12}>
                    <Controller
                      name='personal_history'
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
                          label='تاریخچه شخصی'
                        />
                      )}
                    />
                  </Grid>

                  {/* mental_status */}
                  <Grid item xs={12}>
                    <Controller
                      name='mental_status_history'
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
                          label='وضعیت روانی'
                        />
                      )}
                    />
                  </Grid>

                  {/* interventions_description */}
                  <Grid item xs={12}>
                    <Controller
                      name='history_interventions'
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
                          label='شرح مداخلات'
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ mt: 5 }}>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <EditorWrapper>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Chip
                      label='اظهارات مراجع'
                      sx={{
                        backgroundColor: '#e0f2fe',
                        color: '#0369a1',
                        fontWeight: 600
                      }}
                    />
                  </Box>
                  <ReactDraftWysiwyg
                    toolbar={{
                      fontFamily: {
                        options: [
                          'Arial',
                          'Georgia',
                          'Impact',
                          'Tahoma',
                          'Times New Roman',
                          'Verdana',
                          'b nazanin',
                          'b lotus',
                          'b mitra',
                          'IRANSans'
                        ]
                      }
                    }}
                    editorState={remarks}
                    onEditorStateChange={editorState => {
                      setRemarks(editorState)
                    }}
                  />
                </EditorWrapper>
              </Grid>

              <Grid item xs={12}>
                <EditorWrapper>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Chip
                      label='یادداشت های مشاور'
                      sx={{
                        backgroundColor: '#fef0e0ff',
                        color: '#a18903ff',
                        fontWeight: 600
                      }}
                    />
                  </Box>
                  <ReactDraftWysiwyg
                    toolbar={{
                      fontFamily: {
                        options: [
                          'Arial',
                          'Georgia',
                          'Impact',
                          'Tahoma',
                          'Times New Roman',
                          'Verdana',
                          'b nazanin',
                          'b lotus',
                          'b mitra',
                          'IRANSans'
                        ]
                      }
                    }}
                    editorState={note}
                    onEditorStateChange={editorState => {
                      setNote(editorState)
                    }}
                  />
                </EditorWrapper>
              </Grid>

              <Grid item xs={12} md={12}>
                <Controller
                  name='clinical_diagnosis_ids'
                  control={control}
                  defaultValue={[]}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomAsyncAutocomplete
                      url={`/super-user/${id}/base/select/clinical-diagnosis`}
                      readOnly={false}
                      onAddValue={newValue => onChange(newValue)}
                      value={value || []}
                      getOptionLabel={optien => optien?.name}
                      label='تشخیص های بالینی'
                      multiple={true}
                      error={!!error}
                      helperText={error?.message}
                    ></CustomAsyncAutocomplete>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <Controller
                  name='mental_disorder_ids'
                  control={control}
                  defaultValue={[]}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomAsyncAutocomplete
                      url={`/super-user/${id}/base/select/mental-disorder`}
                      readOnly={false}
                      onAddValue={newValue => onChange(newValue)}
                      value={value || []}
                      getOptionLabel={optien => optien?.name}
                      label='تشخیص های رسمی (DSM5)'
                      multiple={true}
                      error={!!error}
                      helperText={error?.message}
                    ></CustomAsyncAutocomplete>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <Controller
                  name='clinical_item_ids'
                  control={control}
                  defaultValue={[]}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomAsyncAutocomplete
                      url={`/super-user/${id}/base/select/clinical-item`}
                      readOnly={false}
                      onAddValue={newValue => onChange(newValue)}
                      value={value || []}
                      getOptionLabel={optien => optien?.name}
                      label='ابزار ها و تکنیک های مشاوره'
                      multiple={true}
                      error={!!error}
                      helperText={error?.message}
                    ></CustomAsyncAutocomplete>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name='advisor_instruction'
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
                      label='دستورات مشاور'
                    />
                  )}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </>
  )
}
