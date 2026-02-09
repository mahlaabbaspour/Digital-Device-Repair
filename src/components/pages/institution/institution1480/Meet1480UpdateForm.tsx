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
  Chip
} from '@mui/material'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import { Controller, useForm } from 'react-hook-form'
import SubmitButton from '@/components/elements/submitButton'
import { dateConverter } from '@/helpers/DateHelpers'
import moment from 'moment-jalaali'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axiosConfig from '@/libs/auth/axios'
import { convertEditorContent } from '@/helpers/EditorsHelper'
import { ContentState, convertFromHTML, EditorState } from 'draft-js'
import ReactDraftWysiwyg from '@/@core/components/react-draft-wysiwyg'
import { EditorWrapper } from '@/@core/styles/react-draft-wysiwyg'
import { parse } from 'date-fns-jalali'
import { useUpdateMeetingAndDiagnosisInstitution1480 } from '@/hooks/institution/institution1480/useinstitution1480Institution'
import { GeTErrorFetch } from '@/components/elements/errorHandler'

export default function UpdateMeet1480Form({ id, upsertData, meetingId, disabled, show }: any) {
  console.log(upsertData, show, 'upsertData')
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

  const [remarks, setRemarks] = useState(EditorState.createEmpty())
  const [note, setNote] = useState(EditorState.createEmpty())

  const htmlToEditorState = (html?: string | null) => {
    if (!html) return EditorState.createEmpty()

    const blocksFromHTML = convertFromHTML(html)
    const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)

    return EditorState.createWithContent(contentState)
  }

  const { setError, control, handleSubmit, setValue, clearErrors, reset, watch } = useForm({
    defaultValues: {
      //information meet
      date: null,
      start_time: undefined,
      end_time: undefined,
      advisor_id: null,
      activity_field_area_ids: [],

      //document
      anonymous: false,
      user_id: null,
      first_name: '',
      last_name: '',
      username: '',
      mobile: '',
      phone: '',
      description: '',
      consultation_fee: '',
      service_recipient_decile: '',
      service_fee_type_id: null,
      gender_id: null,
      nationality_id: null,
      employment_status_id: null,
      marital_id: null,
      education_id: null,
      service_recipient_type_ids: [],

      //
      consultation_subsidy_id: null,
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

  useEffect(() => {
    if (show) {
      //@ts-ignore
      setValue('date', show?.date ? parse(show.date, 'yyyy/MM/dd', new Date()) : undefined)
      //@ts-ignore
      setValue('start_time', show?.start_time ? moment(show?.start_time, 'HH:mm:ss').toDate() : undefined)
      //@ts-ignore
      setValue('end_time', show?.end_time ? moment(show?.end_time, 'HH:mm:ss').toDate() : undefined)
      setValue('advisor_id', show?.advisor ? show?.advisor : undefined)
      setValue('activity_field_area_ids', show?.activityFieldAreas)

      //document
      setValue('first_name', show?.consultationDocument?.first_name ? show?.consultationDocument?.first_name : '')
      setValue('last_name', show?.consultationDocument?.last_name ? show?.consultationDocument?.last_name : '')
      setValue('username', show?.consultationDocument?.username ? show?.consultationDocument?.username : '')
      setValue('mobile', show?.consultationDocument?.mobile ? show?.consultationDocument?.mobile : '')
      setValue('phone', show?.consultationDocument?.phone ? show?.consultationDocument?.phone : '')
      setValue('gender_id', show?.consultationDocument?.gender ? show?.consultationDocument?.gender : undefined)
      setValue(
        'nationality_id',
        show?.consultationDocument?.nationality ? show?.consultationDocument?.nationality : undefined
      )
      setValue(
        'education_id',
        show?.consultationDocument?.education ? show?.consultationDocument?.education : undefined
      )
      setValue('marital_id', show?.consultationDocument?.marital ? show?.consultationDocument?.marital : undefined)
      setValue(
        'employment_status_id',
        show?.consultationDocument?.employmentStatus ? show?.consultationDocument?.employmentStatus : undefined
      )
      setValue(
        'description',
        show?.consultationDocument?.description ? show?.consultationDocument?.description : undefined
      )
      setValue(
        'service_recipient_type_ids',
        show?.consultationDocument?.serviceRecipientTypes
          ? show?.consultationDocument?.serviceRecipientTypes
          : undefined
      )
      setValue(
        'service_fee_type_id',
        show?.consultationDocument?.serviceFeeType ? show?.consultationDocument?.serviceFeeType : undefined
      )
      setValue('consultation_fee', '')
      setValue(
        'service_recipient_decile',
        show?.consultationDocument?.service_recipient_decile
          ? show?.consultationDocument?.service_recipient_decile
          : undefined
      )

      setValue(
        'psychotherapy_history',
        Number(show?.consultationDocument?.psychotherapy_history)
          ? Number(show?.consultationDocument?.psychotherapy_history)
          : 0
      )
      setValue(
        'psychiatric_hospitalization_history',
        Number(show?.consultationDocument?.psychiatric_hospitalization_history)
      )
      setValue(
        'psychiatric_medication_history',
        Number(show?.consultationDocument?.psychiatric_medication_history)
          ? Number(show?.consultationDocument?.psychiatric_medication_history)
          : 0
      )
      setValue(
        'hospitalization_duration',
        show?.consultationDocument?.hospitalization_duration ? show?.consultationDocument?.hospitalization_duration : ''
      )
      setValue(
        'medication_history',
        show?.consultationDocument?.medication_history ? show?.consultationDocument?.medication_history : ''
      )
      setValue(
        'specific_disease_type',
        Number(show?.consultationDocument?.specific_disease_type)
          ? Number(show?.consultationDocument?.specific_disease_type)
          : 0
      )
      setValue(
        'specific_disease_type_history',
        show?.consultationDocument?.specific_disease_type_history
          ? show?.consultationDocument?.specific_disease_type_history
          : ''
      )
      setValue(
        'suicide_history',
        Number(show?.consultationDocument?.suicide_history) ? Number(show?.consultationDocument?.suicide_history) : 0
      )
      setValue(
        'past_medical_history',
        show?.consultationDocument?.past_medical_history ? show?.consultationDocument?.past_medical_history : ''
      )
      setValue(
        'personal_history',
        show?.consultationDocument?.personal_history ? show?.consultationDocument?.personal_history : ''
      )
      setValue(
        'mental_status_history',
        show?.consultationDocument?.mental_status_history ? show?.consultationDocument?.mental_status_history : ''
      )
      setValue(
        'history_interventions',
        show?.consultationDocument?.history_interventions ? show?.consultationDocument?.history_interventions : ''
      )
      //@ts-ignore
      setRemarks(show?.client_remarks ? htmlToEditorState(show?.client_remarks) : EditorState.createEmpty())
      //@ts-ignore
      setNote(show?.note_advisor ? htmlToEditorState(show?.note_advisor) : EditorState.createEmpty())
      setValue('mental_disorder_ids', show.mentalDisorders ? show.mentalDisorders : [])
      setValue('clinical_diagnosis_ids', show.clinicalDiagnoses ? show.clinicalDiagnoses : [])
      setValue('clinical_item_ids', show.clinicalItems ? show.clinicalItems : [])
      setValue('advisor_instruction', show.advisor_instruction ? show.advisor_instruction : '')
    }
  }, [show])

  const anonymous = watch('anonymous')
  const router = useRouter()

  const { mutateAsync, isPending }: any = useUpdateMeetingAndDiagnosisInstitution1480()

  async function onSubmit(values: any) {
    try {
      console.log(values, 'values')
      const test1 = convertEditorContent(remarks)
      const test2 = convertEditorContent(note)
      const startTimeShamsi = values.start_time ? moment(values.start_time).format('HH:mm') : ''
      const endTimeShamsi = values.end_time ? moment(values.end_time).format('HH:mm') : ''
      const result: any = {}
      Object.entries(values).forEach(([key, value]) => {
        if (key === 'start_time' || key === 'end_time') return
        if (value && typeof value === 'object' && 'id' in value) {
          result[key] = value?.id
        } else if (Array.isArray(value)) {
          result[key] = value.map((item: any) => (typeof item === 'object' && 'id' in item ? item?.id : item))
        } else if (value instanceof Date) {
          if (!isNaN(value.getTime())) {
            result[key] = dateConverter(value)
          }
        } else {
          result[key] = value
        }
      })
      const data = {
        ...result,
        start_time: startTimeShamsi,
        end_time: endTimeShamsi,
        client_remarks: test1,
        note_advisor: test2
      }
      console.log(data, 'data')

      const res: any = await toast.promise(mutateAsync({ data: data, id: id, meetingId: meetingId }), {
        pending: 'درحال انجام ...'
      })
      if (res?.status) {
        router.push(`/institution/${id}/institution1480/meetings`)
      }
    } catch (error) {
      GeTErrorFetch({ error, setError })
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
                      readOnly={disabled}
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
                    <CustomTimePicker
                      size='large'
                      label='شروع بازه جلسه'
                      value={value}
                      onChange={onChange}
                      readOnly={disabled}
                    />
                  )}
                />
              </Grid>

              {/* end_time */}
              <Grid item xs={12} md={3}>
                <Controller
                  control={control}
                  name='end_time'
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomTimePicker
                      size='large'
                      label='پایان بازه جلسه'
                      value={value}
                      onChange={onChange}
                      readOnly={disabled}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Controller
                  name='advisor_id'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomAsyncAutocomplete
                      url={`/institution/${id}/meeting-1480/base/select/advisor`}
                      readOnly={disabled}
                      onAddValue={newValue => onChange(newValue)}
                      value={value}
                      getOptionLabel={option => `${option?.first_name} ${option?.last_name} (${option?.username})`}
                      label='مشاور'
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
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomAsyncAutocomplete
                      url={`/institution/${id}/meeting-1480/base/select/consulting-activity-field-area`}
                      readOnly={disabled}
                      onAddValue={newValue => onChange(newValue)}
                      value={value}
                      getOptionLabel={optien => optien?.name}
                      label='حوزه های حیطه های فعالیت'
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
              {/* <Grid item xs={12} sm={12}>
                <Controller
                  name='anonymous'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <FormControlLabel
                      sx={{ m: 2 }}
                      label='تشکلیل پرونده به صورت ناشناس'
                      control={<Switch checked={value} onChange={(_, check) => onChange(check)} readOnly={disabled} />}
                    />
                  )}
                />
              </Grid> */}

              {/* {!anonymous && (
                <>
                  <Grid item xs={4}>
                    <Controller
                      name='user_id'
                      control={control}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAsyncAutocomplete
                          url={`/super-user/${id}/meeting-1480/base/select/user`}
                          readOnly={disabled}
                          value={value}
                          getOptionLabel={option =>
                            `${option?.first_name} ${option?.last_name} (${option?.username} (${option?.mobile || option?.phone ? option?.mobile || option?.phone : ''}))`
                          }
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

                  <Grid item xs={12}>
                    <Divider sx={{ m: 2 }} />
                  </Grid>
                </>
              )} */}

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

              <Grid item xs={12} sm={3}>
                <Controller
                  name='phone'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      InputProps={{ readOnly: disabled }}
                      helperText={error?.message}
                      fullWidth
                      label='تلفن'
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
                      url={`/institution/${id}/meeting-1480/base/select/marital`}
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
                      url={`/institution/${id}/meeting-1480/base/select/nationality`}
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
                      url={`/institution/${id}/meeting-1480/base/select/education`}
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
                      url={`/institution/${id}/meeting-1480/base/select/employment-status`}
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

              <Grid item xs={12} sm={3}>
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

              <Grid item xs={12} md={3}>
                <Controller
                  name='service_recipient_type_ids'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomAsyncAutocomplete
                      url={`/institution/${id}/meeting-1480/base/select/service-recipient-type`}
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

              <Grid item xs={12} md={4}>
                <Controller
                  name='service_fee_type_id'
                  control={control}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <Autocomplete
                      readOnly={disabled}
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

              <Grid item xs={12} sm={4}>
                <Controller
                  name='consultation_fee'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      InputProps={{ readOnly: disabled }}
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
                              readOnly={disabled}
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
                              readOnly={disabled}
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
                              InputProps={{ readOnly: disabled }}
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
                              readOnly={disabled}
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
                              InputProps={{ readOnly: disabled }}
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
                          control={
                            <Switch
                              checked={value === 1}
                              onChange={(_, check) => onChange(check ? 1 : 0)}
                              readOnly={disabled}
                            />
                          }
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
                              InputProps={{ readOnly: disabled }}
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
                          control={
                            <Switch
                              checked={value === 1}
                              onChange={(_, check) => onChange(check ? 1 : 0)}
                              readOnly={disabled}
                            />
                          }
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
                          InputProps={{ readOnly: disabled }}
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
                          InputProps={{ readOnly: disabled }}
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
                          InputProps={{ readOnly: disabled }}
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
                          InputProps={{ readOnly: disabled }}
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
                    readOnly={disabled}
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
                    readOnly={disabled}
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
                      url={`/institution/${id}/meeting-1480/base/select/clinical-diagnosis`}
                      readOnly={disabled}
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
                      url={`/institution/${id}/meeting-1480/base/select/mental-disorder`}
                      readOnly={disabled}
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
                      url={`/institution/${id}/meeting-1480/base/select/clinical-item`}
                      readOnly={disabled}
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
                      InputProps={{ readOnly: disabled }}
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
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', mt: 5 }}>
          <SubmitButton disabled={isPending} />
        </Box>
      </form>
    </>
  )
}
