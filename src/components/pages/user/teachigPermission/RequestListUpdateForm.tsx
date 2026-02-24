'use client'

import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardContentProps,
  FormControl,
  FormControlLabel,
  Grid,
  styled,
  Switch,
  TextField,
  Typography,
  RadioGroup,
  Radio,
  Divider,
  List,
  ListItem,
  Alert
} from '@mui/material'
import MuiStep, { StepProps } from '@mui/material/Step'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import StepperWrapper from '@/@core/styles/stepper'
import { useEffect, useState } from 'react'
import StepperCustomDot from '@/components/stepper-dot'
import { Controller, useForm } from 'react-hook-form'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import { Icon } from '@iconify/react'
import CustomDatePicker from '@/components/elements/customDatePicker'
import { useSettings } from '@/@core/hooks/useSettings'
import axiosConfig from '@/libs/auth/axios'
import { dateConverter } from '@/helpers/DateHelpers'
import {
  useDeleteHistoryComposingTeachingPermission,
  useDeleteHistoryEducationTeachingPermission,
  useDeleteHistoryStudyTeachingPermission,
  useDeleteHistoryTeachingTeachingPermission,
  useFetchHistoryComposingTeachingPermission,
  useFetchHistoryEducationTeachingPermission,
  useFetchHistoryStudyTeachingPermission,
  useFetchHistoryTeachingTeachingPermission,
  useObjectionTeachingPermission,
  useUpdateTeachingPermission
} from '@/hooks/user/useTeachigPermission'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import TableRequestsTeaching from './TableRequests'
import { IconButton } from '@mui/material'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { BiShowAlt } from 'react-icons/bi'
import { IoTrashOutline } from 'react-icons/io5'
import CreateHistoryStudyModal from './CreateHistoryStudyModal'
import UpdateHistoryStudyModal from './UpdateHistoryStudyModal'
import CreateHistoryEducationModal from './CreateHistoryEducationModal'
import CreateHistoryTeachingModal from './CreateHistoryTeachingModal'
import CreateHistoryComposingModal from './CreateHistoryComposingModal'
import UpdateHistoryComposingModal from './UpdateHistoryComposingModal'
import DialogAlertTeachingPermission from './DialogAlertTeachingPermission'
import UpdateHistoryTeachingModal from './UpdateHistoryTeachingModal'
import UpdateHistoryEducationModal from './UpdateHistoryEducationModal'
import { parse } from 'date-fns-jalali'
import { GeTErrorFetch } from '@/components/elements/errorHandler'

const steps = [
  {
    title: 'اطلاعات اولیه',
    icon: 'mdi:tag-outline',
    subtitle: 'تکمیل اطلاعات اولیه را وارد کنید'
  },
  {
    title: 'سوابق تحصیلی',
    subtitle: 'می توانید اطلاعات سوابق تحصیلی را وارد کنید',
    icon: 'mdi:clipboard-text-outline'
  },
  {
    title: 'سوابق آموزشی',
    icon: 'mdi:credit-card-outline',
    subtitle: 'می توانید اطلاعات سوابق آموزشی را وارد کنید'
  },
  {
    title: 'سوابق تدریس',
    subtitle: 'می توانید اطلاعات سوابق تدریس را وارد کنید',
    icon: 'mdi:rocket-launch-outline'
  },
  {
    title: 'سوابق تالیف و ترجمه',
    subtitle: 'می توانید اطلاعات تالیف و ترجمه را وارد کنید',
    icon: 'mdi:rocket-launch-outline'
  },
  {
    title: 'تایید نهایی',
    subtitle: 'می توانید تایید نهایی کنید',
    icon: 'mdi:rocket-launch-outline'
  }
]

const Step = styled(MuiStep)<StepProps>(({ theme }) => ({
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(4)
  },
  '& .MuiStepLabel-root': {
    padding: 0,
    cursor: 'pointer'
  }
}))

const StepperHeaderContainer = styled(CardContent)<CardContentProps>(({ theme }) => ({
  minWidth: 300,
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    borderRight: 0,
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

export default function RequestUpdateForm({
  upsertData,
  id,
  teachId,
  show,
  dataStudy,
  dataEducation,
  dataTeaching,
  dataComposing
}: any) {
  const { settings } = useSettings()
  const [activeStep, setActiveStep] = useState<number>(1)
  const {
    control,
    handleSubmit,
    setError,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      address: '',
      postal_code: '',
      employment_locality_name: '',
      number_permission_activity: '',
      employment_status_id: null,
      employment_locality_type_id: null,
      activity_permission_date: null,
      activity_expiration_date: null,
      scientific_council: '',
      activity_permission: '',
      compiler: null,
      compilationFile: null,
      rank_scientific_council_id: null,
      locality_permission_activity_id: null,
      teaching_group_work_id: null,
      request_level_id: null,
      activity_field_teaching_id: null,
      region_ids: [],
      activity_field_area_ids: [],
      request_approval_final: null,
      organization_id: null
    }
  })

  const {
    control: controlObjection,
    handleSubmit: handleSubmitObjection,
    setValue: setValueObjection
  } = useForm({
    defaultValues: {
      request_teaching_permission_status_id: 5,
      objection_description: ''
    }
  })
  const { mutateAsync: objection, isPending: isPendingObjection }: any = useObjectionTeachingPermission()

  const onSubmitObjection = async (values: any) => {
    try {
      const data = {
        objection_description: values?.objection_description
      }
      const res: any = await toast.promise(objection({ data: data, id: id, teachId: teachId }), {
        pending: 'در حال انجام...'
      })
      if (res?.status) {
        router.push(`/user/${id}/teachigPermission/requestListTeaching`)
      }
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  useEffect(() => {
    if (show) {
      setValueObjection('request_teaching_permission_status_id', show?.requestTeachingPermissionStatus?.id)
    }
  }, [show])


  useEffect(() => {
    if (show) {
      setValue('address', show?.address ? show?.address : '')
      setValue('postal_code', show?.postal_code ? show?.postal_codepostal_code : '')
      setValue('employment_locality_name', show?.employment_locality_name ? show?.employment_locality_name : '')
      setValue('number_permission_activity', show?.number_permission_activity ? show?.number_permission_activity : '')
      setValue('employment_status_id', show?.employmentStatus ? show?.employmentStatus : null)
      setValue('employment_locality_type_id', show?.employmentLocalityType ? show?.employmentLocalityType : null)
      setValue('scientific_council', show?.scientific_council ? show?.scientific_council : '')
      setValue('activity_permission', show?.activity_permission ? show?.activity_permission : '')
      setValue('compiler', show?.compiler ? show?.compiler : null)
      setValue('rank_scientific_council_id', show?.rankScientificCouncil ? show?.rankScientificCouncil : null)
      setValue('locality_permission_activity_id', show?.issuanceLocalityPermissionActivity)
      setValue('teaching_group_work_id', show?.teachingGroupWork ? show?.teachingGroupWork : null)
      setValue('request_level_id', show?.requestLevel ? show?.requestLevel : null)
      setValue('activity_field_teaching_id', show?.activityFieldTeaching ? show?.activityFieldTeaching : null)
      setValue('region_ids', show?.regions ? show?.regions : [])
      setValue('activity_field_area_ids', show?.teachingActivityFieldAreas ? show?.teachingActivityFieldAreas : [])
      setValue(
        'activity_expiration_date',
        //@ts-ignore
        show?.activity_expiration_date ? parse(show?.activity_expiration_date, 'yyyy/MM/dd', new Date()) : null
      )
      setValue(
        'activity_permission_date',
        //@ts-ignore
        show?.activity_permission_date ? parse(show?.activity_permission_date, 'yyyy/MM/dd', new Date()) : null
      )
      setValue('request_approval_final', show?.request_approval_final ? show?.request_approval_final : '')
      setValue('organization_id', show?.organization ? show?.organization : null)
    }
  }, [show])

  const { mutateAsync, isPending }: any = useUpdateTeachingPermission()
  const router = useRouter()

  const onSubmit = async (values: any) => {
    try {
      const result: any = {}
      Object.entries(values).forEach(([key, value]) => {
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

      const res: any = await toast.promise(mutateAsync({ data: result, id: id, teachId: teachId }), {
        pending: 'در حال انجام...'
      })
      if (res?.status) {
        router.push(`/user/${id}/teachigPermission/requestListTeaching`)
      }
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  const [activity, setActivity] = useState(null)
  const fetchActivityArea = async (activityId: number) => {
    try {
      const res: any = await axiosConfig.get(
        `/user/${id}/education/request-teaching-permission/core/request-teaching-permission/get-activity-field-area`,
        {
          params: {
            activity_field_id: activityId
          }
        }
      )
      setActivity(res?.data?.data)
    } catch (error) {
      throw error
    }
  }

  const [rowSelect, setRowSelect] = useState(false)
  const [disabled, setDisabled] = useState<boolean>(false)
  const [historyStudy, setHistoryStudy] = useState(false)
  const [historyStudyUpdate, setHistoryStudyUpdate] = useState(false)
  const [historyStudyDelete, setHistoryStudyDelete] = useState(false)
  const { mutateAsync: deleteHistoryStudy, isPending: loadDeleteHistoryStudy }: any =
    useDeleteHistoryStudyTeachingPermission()
  const { data: dataHistoryStudy, isPending: isLoadStaduy }: any = useFetchHistoryStudyTeachingPermission({
    id: id,
    teachId: teachId
  })

  const [historyEducation, setHistoryEducation] = useState(false)
  const [historyEducationUpdate, setHistoryEducationUpdate] = useState(false)
  const [historyEducationDelete, setHistoryEducationDelete] = useState(false)
  const { mutateAsync: deleteHistoryEducation, isPending: loadDeleteHistoryEducation }: any =
    useDeleteHistoryEducationTeachingPermission()
  const { data: dataHistoryEducation, isPending: isLoadEducation }: any = useFetchHistoryEducationTeachingPermission({
    id: id,
    teachId: teachId
  })

  const [historyTeaching, setHistoryTeaching] = useState(false)
  const [historyTeachingUpdate, setHistoryTeachingUpdate] = useState(false)
  const [historyTeachingDelete, setHistoryTeachingDelete] = useState(false)
  const { mutateAsync: deleteHistoryTeaching, isPending: loadDeleteHistoryTeaching }: any =
    useDeleteHistoryTeachingTeachingPermission()
  const { data: dataHistoryTeaching, isPending: isLoadTeaching }: any = useFetchHistoryTeachingTeachingPermission({
    id: id,
    teachId: teachId
  })

  const [historyComposing, setHistoryComposing] = useState(false)
  const [historyComposingUpdate, setHistoryComposingUpdate] = useState(false)
  const [historyComposingDelete, setHistoryComposingDelete] = useState(false)
  const { mutateAsync: deleteHistoryComposing, isPending: loadDeleteHistoryComposing }: any =
    useDeleteHistoryComposingTeachingPermission()
  const { data: dataHistoryComposing, isPending: isLoadComposing }: any = useFetchHistoryComposingTeachingPermission({
    id: id,
    teachId: teachId
  })

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='h5' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[0].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[0].subtitle}
                </Typography>
              </Grid>

              <Grid item xs={12} md={9}>
                <Controller
                  name='region_ids'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomAsyncAutocomplete
                      url={`/user/${id}/education/request-teaching-permission/base/select/city`}
                      readOnly={false}
                      onAddValue={newValue => onChange(newValue)}
                      value={value}
                      getOptionLabel={optien => optien?.name}
                      label='شهرستان های محل سکونت'
                      multiple={true}
                      error={!!error}
                      helperText={error?.message}
                    ></CustomAsyncAutocomplete>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Controller
                  name='postal_code'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      InputProps={{ readOnly: false }}
                      helperText={error?.message}
                      fullWidth
                      label='کد پستی'
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  name='employment_status_id'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomAsyncAutocomplete
                      url={`/user/${id}/education/request-teaching-permission/base/select/employment-status`}
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

              <Grid item xs={12} md={4}>
                <Controller
                  name='employment_locality_type_id'
                  control={control}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <Autocomplete
                      readOnly={false}
                      options={upsertData?.employmentLocalityTypes || []}
                      value={value}
                      onChange={(_, newvalue) => onChange(newvalue)}
                      noOptionsText='هیچ نتیجه ای یافت نشد'
                      getOptionLabel={(options: { name: string }) => options?.name || ''}
                      renderInput={params => (
                        <TextField label='نوع محل اشتغال' {...params} error={!!error} helperText={error?.message} />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name='employment_locality_name'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      InputProps={{ readOnly: false }}
                      helperText={error?.message}
                      fullWidth
                      label='نام محل اشتغال'
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Controller
                  name='activity_field_teaching_id'
                  control={control}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <Autocomplete
                      readOnly={false}
                      options={upsertData?.activityFields || []}
                      value={value}
                      onChange={(_, newvalue) => {
                        onChange(newvalue)
                        if (newvalue) {
                          //@ts-ignore
                          fetchActivityArea(newvalue?.id)
                        }
                      }}
                      noOptionsText='هیچ نتیجه ای یافت نشد'
                      getOptionLabel={(options: { name: string }) => options?.name || ''}
                      renderInput={params => (
                        <TextField
                          label='حیطه های درخواست تدریس'
                          {...params}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={9}>
                <Controller
                  name='activity_field_area_ids'
                  control={control}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <Autocomplete
                      readOnly={false}
                      options={activity || []}
                      value={value}
                      multiple={true}
                      onChange={(_, newvalue) => onChange(newvalue)}
                      noOptionsText='هیچ نتیجه ای یافت نشد'
                      getOptionLabel={(options: { name: string }) => options?.name || ''}
                      renderInput={params => (
                        <TextField
                          label='حوزه های حوزه های تدریس'
                          {...params}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name='teaching_group_work_id'
                  control={control}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <Autocomplete
                      readOnly={false}
                      options={upsertData?.teachingGroupWorks || []}
                      value={value}
                      onChange={(_, newvalue) => onChange(newvalue)}
                      noOptionsText='هیچ نتیجه ای یافت نشد'
                      getOptionLabel={(options: { name: string }) => options?.name || ''}
                      renderInput={params => (
                        <TextField label='کارگروه های تدریس' {...params} error={!!error} helperText={error?.message} />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name='request_level_id'
                  control={control}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <Autocomplete
                      readOnly={false}
                      options={upsertData?.requestLevels || []}
                      value={value}
                      onChange={(_, newvalue) => onChange(newvalue)}
                      noOptionsText='هیچ نتیجه ای یافت نشد'
                      getOptionLabel={(options: { name: string }) => options?.name || ''}
                      renderInput={params => (
                        <TextField label='سطح درخواست تدریس' {...params} error={!!error} helperText={error?.message} />
                      )}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='scientific_council'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      label='هیئت عملی دانشگاه'
                      control={<Switch checked={value === '1'} onChange={(_, check) => onChange(check ? '1' : '0')} />}
                    />
                  )}
                />
              </Grid>

              {watch('scientific_council') == '1' && (
                <Grid item xs={12} md={12}>
                  <Controller
                    name='rank_scientific_council_id'
                    control={control}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <Autocomplete
                        readOnly={false}
                        options={upsertData?.rankScientificCouncils || []}
                        value={value}
                        onChange={(_, newvalue) => onChange(newvalue)}
                        noOptionsText='هیچ نتیجه ای یافت نشد'
                        getOptionLabel={(options: { name: string }) => options?.name || ''}
                        renderInput={params => (
                          <TextField label='رتبه هیئت عملی' {...params} error={!!error} helperText={error?.message} />
                        )}
                      />
                    )}
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <Controller
                  name='activity_permission'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      label='مجوز فعالیت / پروانه اشتغال'
                      control={<Switch checked={value === '1'} onChange={(_, check) => onChange(check ? '1' : '0')} />}
                    />
                  )}
                />
              </Grid>

              {watch('activity_permission') == '1' && (
                <>
                  <Grid item xs={12} md={3}>
                    <Controller
                      name='locality_permission_activity_id'
                      control={control}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <Autocomplete
                          readOnly={false}
                          options={upsertData?.localityPermissionActivity || []}
                          value={value}
                          onChange={(_, newvalue) => onChange(newvalue)}
                          noOptionsText='هیچ نتیجه ای یافت نشد'
                          getOptionLabel={(options: { name: string }) => options?.name || ''}
                          renderInput={params => (
                            <TextField
                              label='محل صدور مجوز فعالیت'
                              {...params}
                              error={!!error}
                              helperText={error?.message}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Controller
                      name='number_permission_activity'
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          error={!!error}
                          InputProps={{ readOnly: false }}
                          helperText={error?.message}
                          fullWidth
                          label='شماره مجوز فعالیت'
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <Controller
                      control={control}
                      name='activity_permission_date'
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomDatePicker
                          error={!!error}
                          helperText={error?.message}
                          label='تاریخ مجوز فعالیت'
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
                      name='activity_expiration_date'
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomDatePicker
                          error={!!error}
                          helperText={error?.message}
                          label='تاریخ انقضاء مجوز فعالیت'
                          onChange={onChange}
                          value={value}
                          readOnly={false}
                        />
                      )}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <Controller
                  name='compiler'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      label='مولف و فایل محتوای تالیف'
                      control={<Switch checked={value === '1'} onChange={(_, check) => onChange(check ? '1' : '0')} />}
                    />
                  )}
                />
              </Grid>

              {watch('compiler') == '1' && (
                <Grid item xs={12}>
                  <Controller
                    name='compilationFile'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Box
                        border={0.3}
                        borderRadius={0.8}
                        overflow='hidden'
                        display='flex'
                        justifyContent='start'
                        height={51}
                        borderColor={settings.mode === 'dark' ? '#57596C' : '#BFBFD5'}
                      >
                        <label htmlFor={`file-input`}>
                          {
                            //@ts-ignore
                            !value?.length && (
                              <Button
                                variant='contained'
                                component='span'
                                style={{
                                  height: '100%',
                                  overflow: 'hidden',
                                  width: '120px',
                                  borderTopRightRadius: 1,
                                  borderBottomRightRadius: 1,
                                  borderTopLeftRadius: 0,
                                  borderBottomLeftRadius: 0
                                }}
                              >
                                <Typography variant='body2' color='white'>
                                  بارگذاری فایل
                                </Typography>
                              </Button>
                            )
                          }
                          {
                            //@ts-ignore
                            value?.length > 0 && (
                              <Button
                                onClick={() => onChange(null)}
                                variant='contained'
                                component='span'
                                style={{
                                  height: '100%',
                                  overflow: 'hidden',
                                  width: '105px',
                                  borderTopRightRadius: 1,
                                  borderBottomRightRadius: 1,
                                  borderTopLeftRadius: 0,
                                  borderBottomLeftRadius: 0
                                }}
                              >
                                <Typography variant='body2' color='white'>
                                  حذف فایل
                                </Typography>
                              </Button>
                            )
                          }
                        </label>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            paddingRight: '18px',
                            paddingLeft: '8px',
                            fontSize: '13px',
                            color: 'grey'
                          }}
                        >
                          {
                            //@ts-ignore
                            value?.length > 0 ? (
                              <p>فایل های موردنظر انتخاب شدند</p>
                            ) : (
                              <p>فایل مورد نظر خود را انتخاب کنید</p>
                            )
                          }
                        </div>
                        <input
                          name='file-e'
                          type='file'
                          id={`file-input`}
                          onChange={(e: any) => {
                            const files = Array.from(e.target.files)
                            onChange(files[0] ? files[0] : null)
                          }}
                          style={{ display: 'none' }}
                        />
                      </Box>
                    )}
                  />
                </Grid>
              )}

              <Grid item xs={12} sm={12}>
                <Controller
                  name='address'
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
                      label='نشانی'
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                sx={{ fontFamily: 'inherit' }}
                color='secondary'
                variant='outlined'
                onClick={handlePrev}
                disabled={activeStep === 0}
                startIcon={<Icon icon='mdi:arrow-right' />}
              >
                قبلی
              </Button>
              {activeStep === 0 && (
                <Button
                  sx={{ fontFamily: 'inherit', width: 75 }}
                  variant='contained'
                  color={'primary'}
                  onClick={() => handleNext()}
                >
                  {'بعدی'}
                </Button>
              )}
            </Box>
          </form>
        )
      case 1:
        return (
          <>
            <Grid item xs={12}>
              <Typography variant='h5' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {steps[1].title}
              </Typography>
              <Typography variant='caption' component='p'>
                {steps[1].subtitle}
              </Typography>
            </Grid>
            <CreateHistoryStudyModal
              open={historyStudy}
              onClose={() => setHistoryStudy(false)}
              id={id}
              teachId={teachId}
              upsertData={dataStudy}
            />
            <UpdateHistoryStudyModal
              open={historyStudyUpdate}
              onClose={() => setHistoryStudyUpdate(false)}
              id={id}
              teachId={teachId}
              upsertData={dataStudy}
              rowSelect={rowSelect}
              disabled={disabled}
            />
            <DialogAlertTeachingPermission
              title='حذف سابقه تحصیلی'
              description='آیا از حذف سابقه تحصیلی اطمینان دارید؟'
              open={historyStudyDelete}
              onClose={() => setHistoryStudyDelete(false)}
              selectedRow={rowSelect}
              id={id}
              teachId={teachId}
              deleteFun={deleteHistoryStudy}
              isLoading={loadDeleteHistoryStudy}
            />
            <TableRequestsTeaching
              columns={[
                { label: 'مقطع تحصیلی', key: 'studyLevel.name' },
                { label: 'گروه تحصیلی', key: 'studyGroup.name' },
                { label: 'رشته تحصیلی', key: 'studyMajor.name' },
                { label: 'دانشگاه محل تدریس', key: 'studyUniversityType.name' }
              ]}
              title='فهرست سوابق تحصیلی'
              description='می توانید فهرست سوابق تحصیلی را مشاهده کنید'
              rows={dataHistoryStudy}
              isLoading={isLoadStaduy}
              id={id}
              onOpen={() => setHistoryStudy(true)}
              upsertData={upsertData}
              disabled={false}
              actions={(row: any) => (
                <>
                  <IconButton
                    color='warning'
                    onClick={() => {
                      setHistoryStudyUpdate(true)
                      setRowSelect(row)
                      setDisabled(true)
                    }}
                  >
                    <BiShowAlt size={19} />
                  </IconButton>
                  <IconButton
                    color='primary'
                    onClick={() => {
                      setHistoryStudyUpdate(true)
                      setRowSelect(row)
                      setDisabled(false)
                    }}
                  >
                    <HiOutlinePencilAlt size={18} />
                  </IconButton>
                  <IconButton
                    color='error'
                    onClick={() => {
                      setHistoryStudyDelete(true)
                      setRowSelect(row)
                    }}
                  >
                    <IoTrashOutline size={18} />
                  </IconButton>
                </>
              )}
            />
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                sx={{ fontFamily: 'inherit' }}
                color='secondary'
                variant='outlined'
                onClick={handlePrev}
                disabled={activeStep === 0}
                startIcon={<Icon icon='mdi:arrow-right' />}
              >
                قبلی
              </Button>
              <Button
                sx={{ fontFamily: 'inherit', width: 75 }}
                variant='contained'
                color={'primary'}
                onClick={() => handleNext()}
              >
                {'بعدی'}
              </Button>
            </Box>
          </>
        )
      case 2:
        return (
          <>
            <Grid item xs={12}>
              <Typography variant='h5' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {steps[2].title}
              </Typography>
              <Typography variant='caption' component='p'>
                {steps[2].subtitle}
              </Typography>
            </Grid>
            <CreateHistoryEducationModal
              open={historyEducation}
              onClose={() => setHistoryEducation(false)}
              id={id}
              teachId={teachId}
              upsertData={dataEducation}
            />
            <UpdateHistoryEducationModal
              open={historyEducationUpdate}
              onClose={() => setHistoryEducationUpdate(false)}
              id={id}
              teachId={teachId}
              upsertData={dataEducation}
              rowSelect={rowSelect}
              disabled={disabled}
            />
            <DialogAlertTeachingPermission
              title='حذف سابقه آموزشی'
              description='آیا از حذف سابقه آموزشی اطمینان دارید؟'
              open={historyEducationDelete}
              onClose={() => setHistoryEducationDelete(false)}
              selectedRow={rowSelect}
              id={id}
              teachId={teachId}
              deleteFun={deleteHistoryEducation}
              isLoading={loadDeleteHistoryEducation}
            />
            <TableRequestsTeaching
              columns={[
                { label: 'نام دوره', key: 'course_name' },
                { label: 'مجری دوره', key: 'executor_name' },
                { label: 'تاریخ شروع', key: 'start_date' },
                { label: 'تاریخ پایان', key: 'end_date' }
              ]}
              title='فهرست سوابق آموزشی'
              description='می توانید فهرست سوابق آموزشی را مشاهده کنید'
              rows={dataHistoryEducation}
              isLoading={isLoadStaduy}
              id={id}
              onOpen={() => setHistoryEducation(true)}
              upsertData={upsertData}
              disabled={false}
              actions={(row: any) => (
                <>
                  <IconButton
                    color='warning'
                    onClick={() => {
                      setHistoryEducationUpdate(true)
                      setRowSelect(row)
                      setDisabled(true)
                    }}
                  >
                    <BiShowAlt size={19} />
                  </IconButton>
                  <IconButton
                    color='primary'
                    onClick={() => {
                      setHistoryEducationUpdate(true)
                      setRowSelect(row)
                      setDisabled(false)
                    }}
                  >
                    <HiOutlinePencilAlt size={18} />
                  </IconButton>
                  <IconButton
                    color='error'
                    onClick={() => {
                      setHistoryEducationDelete(true)
                      setRowSelect(row)
                    }}
                  >
                    <IoTrashOutline size={18} />
                  </IconButton>
                </>
              )}
            />
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                sx={{ fontFamily: 'inherit' }}
                color='secondary'
                variant='outlined'
                onClick={handlePrev}
                disabled={activeStep === 0}
                startIcon={<Icon icon='mdi:arrow-right' />}
              >
                قبلی
              </Button>
              <Button
                sx={{ fontFamily: 'inherit', width: 75 }}
                variant='contained'
                color={'primary'}
                onClick={() => handleNext()}
              >
                {'بعدی'}
              </Button>
            </Box>
          </>
        )
      case 3:
        return (
          <>
            <Grid item xs={12}>
              <Typography variant='h5' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {steps[3].title}
              </Typography>
              <Typography variant='caption' component='p'>
                {steps[3].subtitle}
              </Typography>
            </Grid>
            <CreateHistoryTeachingModal
              open={historyTeaching}
              onClose={() => setHistoryTeaching(false)}
              id={id}
              teachId={teachId}
              upsertData={dataTeaching}
            />
            <UpdateHistoryTeachingModal
              open={historyTeachingUpdate}
              onClose={() => setHistoryTeachingUpdate(false)}
              id={id}
              teachId={teachId}
              upsertData={dataTeaching}
              rowSelect={rowSelect}
              disabled={disabled}
            />
            <DialogAlertTeachingPermission
              title='حذف سابقه تدریس'
              description='آیا از حذف سابقه تدریس اطمینان دارید؟'
              open={historyTeachingDelete}
              onClose={() => setHistoryTeachingDelete(false)}
              selectedRow={rowSelect}
              id={id}
              teachId={teachId}
              deleteFun={deleteHistoryTeaching}
              isLoading={loadDeleteHistoryTeaching}
            />
            <TableRequestsTeaching
              columns={[
                { label: 'نام دوره', key: 'course_name' },
                { label: 'مجری دوره', key: 'executor_name' },
                { label: 'تاریخ شروع', key: 'start_date' },
                { label: 'تاریخ پایان', key: 'end_date' }
              ]}
              title='فهرست سوابق تدریس'
              description='می توانید فهرست سوابق تدریس را مشاهده کنید'
              rows={dataHistoryTeaching}
              isLoading={isLoadStaduy}
              id={id}
              onOpen={() => setHistoryTeaching(true)}
              upsertData={upsertData}
              disabled={false}
              actions={(row: any) => (
                <>
                  <IconButton
                    color='warning'
                    onClick={() => {
                      setHistoryTeachingUpdate(true)
                      setRowSelect(row)
                      setDisabled(true)
                    }}
                  >
                    <BiShowAlt size={19} />
                  </IconButton>
                  <IconButton
                    color='primary'
                    onClick={() => {
                      setHistoryTeachingUpdate(true)
                      setRowSelect(row)
                      setDisabled(false)
                    }}
                  >
                    <HiOutlinePencilAlt size={18} />
                  </IconButton>
                  <IconButton
                    color='error'
                    onClick={() => {
                      setHistoryTeachingDelete(true)
                      setRowSelect(row)
                    }}
                  >
                    <IoTrashOutline size={18} />
                  </IconButton>
                </>
              )}
            />
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                sx={{ fontFamily: 'inherit' }}
                color='secondary'
                variant='outlined'
                onClick={handlePrev}
                disabled={activeStep === 0}
                startIcon={<Icon icon='mdi:arrow-right' />}
              >
                قبلی
              </Button>
              <Button
                sx={{ fontFamily: 'inherit', width: 75 }}
                variant='contained'
                color={'primary'}
                onClick={() => handleNext()}
              >
                {'بعدی'}
              </Button>
            </Box>
          </>
        )
      case 4:
        return (
          <>
            <Grid item xs={12}>
              <Typography variant='h5' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {steps[4].title}
              </Typography>
              <Typography variant='caption' component='p'>
                {steps[4].subtitle}
              </Typography>
            </Grid>
            <CreateHistoryComposingModal
              open={historyComposing}
              onClose={() => setHistoryComposing(false)}
              id={id}
              teachId={teachId}
              upsertData={dataComposing}
            />
            <UpdateHistoryComposingModal
              open={historyComposingUpdate}
              onClose={() => setHistoryComposingUpdate(false)}
              id={id}
              teachId={teachId}
              upsertData={dataComposing}
              rowSelect={rowSelect}
              disabled={disabled}
            />
            <DialogAlertTeachingPermission
              title='حذف سابقه تالیف و ترجمه'
              description='آیا از حذف سابقه تالیف و ترجمه اطمینان دارید؟'
              open={historyComposingDelete}
              onClose={() => setHistoryComposingDelete(false)}
              selectedRow={rowSelect}
              id={id}
              teachId={teachId}
              deleteFun={deleteHistoryComposing}
              isLoading={loadDeleteHistoryComposing}
            />
            <TableRequestsTeaching
              columns={[
                { label: 'نام کتاب', key: 'book_name' },
                { label: 'نوع تالیف / ترجمه', key: 'composingType.name' },
                { label: 'انتشارات', key: 'publication_name' },
                { label: 'سال انتشار', key: 'print_year' }
              ]}
              title='فهرست سوابق تالیف و ترجمه'
              description='می توانید فهرست سوابق تالیف و ترجمه  را مشاهده کنید'
              rows={dataHistoryComposing}
              isLoading={isLoadStaduy}
              id={id}
              onOpen={() => setHistoryComposing(true)}
              upsertData={upsertData}
              disabled={false}
              actions={(row: any) => (
                <>
                  <IconButton
                    color='warning'
                    onClick={() => {
                      setHistoryComposingUpdate(true)
                      setRowSelect(row)
                      setDisabled(true)
                    }}
                  >
                    <BiShowAlt size={19} />
                  </IconButton>
                  <IconButton
                    color='primary'
                    onClick={() => {
                      setHistoryComposingUpdate(true)
                      setRowSelect(row)
                      setDisabled(false)
                    }}
                  >
                    <HiOutlinePencilAlt size={18} />
                  </IconButton>
                  <IconButton
                    color='error'
                    onClick={() => {
                      setHistoryComposingDelete(true)
                      setRowSelect(row)
                    }}
                  >
                    <IoTrashOutline size={18} />
                  </IconButton>
                </>
              )}
            />
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                sx={{ fontFamily: 'inherit' }}
                color='secondary'
                variant='outlined'
                onClick={handlePrev}
                disabled={activeStep === 0}
                startIcon={<Icon icon='mdi:arrow-right' />}
              >
                قبلی
              </Button>
              <Button
                sx={{ fontFamily: 'inherit', width: 75 }}
                variant='contained'
                color={'primary'}
                onClick={() => handleNext()}
              >
                {'بعدی'}
              </Button>
            </Box>
          </>
        )
      case 5:
        return (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='h5' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[5].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[5].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='request_approval_final'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      label='تایید نهایی درخواست'
                      control={<Switch checked={value === '1'} onChange={(_, check) => onChange(check ? '1' : '0')} />}
                    />
                  )}
                />
              </Grid>
              {watch('request_approval_final') == '1' && (
                <Grid item xs={12} md={12}>
                  <Controller
                    name='organization_id'
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <CustomAsyncAutocomplete
                        url={`/user/${id}/education/request-teaching-permission/base/select/organization`}
                        readOnly={false}
                        onAddValue={newValue => onChange(newValue)}
                        value={value}
                        getOptionLabel={optien => optien?.name}
                        label='سازمان درخواست گیرنده'
                        error={!!error}
                        helperText={error?.message}
                      ></CustomAsyncAutocomplete>
                    )}
                  />
                </Grid>
              )}
              <Grid item xs={12} mb={55}></Grid>
            </Grid>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                sx={{ fontFamily: 'inherit' }}
                color='secondary'
                variant='outlined'
                onClick={handlePrev}
                disabled={activeStep === 0}
                startIcon={<Icon icon='mdi:arrow-right' />}
              >
                قبلی
              </Button>
              <Button
                sx={{ fontFamily: 'inherit', width: 75 }}
                disabled={isPending}
                variant='contained'
                color={'primary'}
                type='submit'
              >
                {'ثبت'}
              </Button>
            </Box>
          </form>
        )
      default:
        return null
    }
  }

  const renderContent = () => {
    return getStepContent(activeStep)
  }

  // Handle Stepper
  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handlePrev = () => {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1)
    }
  }

  // ff4e5b
  // backgroundColor: '#FFE9EA'

  return (
    <>
      {(show?.requestTeachingPermissionStatus?.id == 5 ||
        show?.requestTeachingPermissionStatus?.id == 2 ||
        show?.requestTeachingPermissionStatus?.id == 4) && (
        <Card sx={{ mb: 5 }}>
          <CardContent>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography sx={{ fontWeight: 900, fontSize: '1rem' }}>وضعیت درخواست</Typography>
              <Typography variant='caption'>{`می توانید دلایل ${show?.requestTeachingPermissionStatus?.id == 5 ? 'رد درخواست ' : 'عودت برای اصلاح'} را نیز مشاهده کنید`}</Typography>
            </Box>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='request_teaching_permission_status_id'
                    control={controlObjection}
                    render={({ field }) => (
                      <RadioGroup
                        row
                        {...field}
                        sx={{
                          justifyContent: 'center',
                          gap: 2
                        }}
                      >
                        <FormControlLabel
                          value={4}
                          control={<Radio sx={{ display: 'none' }} />}
                          label={
                            <Box
                              sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 999,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                cursor: 'pointer',
                                fontWeight: 700,
                                color: field.value == 4 ? '#fff' : '#4caf50',
                                background: field.value == 4 ? 'linear-gradient(135deg,#22c55e,#16a34a)' : '#e8f5e9',
                                boxShadow: field.value == 4 ? '0 8px 24px rgba(34,197,94,.4)' : 'none'
                              }}
                            >
                              ✔ تأیید شده
                            </Box>
                          }
                        />

                        <FormControlLabel
                          value={2}
                          control={<Radio sx={{ display: 'none' }} />}
                          label={
                            <Box
                              sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 999,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                cursor: 'pointer',
                                fontWeight: 700,
                                color: field.value == 2 ? '#fff' : '#d0d17aff',
                                background:
                                  field.value == 2 ? 'linear-gradient(135deg,#d0d17aff,#d0d17aff)' : '#f5f3e8ff',
                                boxShadow: field.value == 2 ? '0 8px 24px rgba(218, 228, 81, 0.4)' : 'none'
                              }}
                            >
                              عودت برای اصلاح
                            </Box>
                          }
                        />

                        <FormControlLabel
                          value={5}
                          control={<Radio sx={{ display: 'none' }} />}
                          label={
                            <Box
                              sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 999,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                cursor: 'pointer',
                                fontWeight: 700,
                                color: field.value == 5 ? '#fff' : '#ef4444',
                                background: field.value == 5 ? 'linear-gradient(135deg,#ef4444,#dc2626)' : '#fdecec',
                                boxShadow: field.value == 5 ? '0 8px 24px rgba(239,68,68,.4)' : 'none'
                              }}
                            >
                              ✖ رد شده
                            </Box>
                          }
                        />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {show?.objection && (
              <Grid item xs={12} mb={5} mt={3}>
                <Alert
                  severity={
                    show?.requestTeachingPermissionStatus?.id == 5
                      ? 'error'
                      : show?.requestTeachingPermissionStatus?.id == 4
                        ? 'success'
                        : show?.requestTeachingPermissionStatus?.id == 2
                          ? 'warning'
                          : 'info'
                  }
                  icon={false}
                >
                  <List>
                    {show?.objection?.map((item: any) => (
                      <ListItem
                        key={item}
                        disablePadding
                        sx={{
                          color: `${
                            show?.requestTeachingPermissionStatus?.id == 5
                              ? 'error.main'
                              : show?.requestTeachingPermissionStatus?.id == 4
                                ? 'success.main'
                                : show?.requestTeachingPermissionStatus?.id == 2
                                  ? 'warning.main'
                                  : 'info.main'
                          }`
                        }}
                      >
                        {item}
                      </ListItem>
                    ))}
                  </List>
                </Alert>
              </Grid>
            )}
            <Divider />

            {show?.requestTeachingPermissionStatus?.id == 5 && (
              <form onSubmit={handleSubmitObjection(onSubmitObjection)}>
                <Box sx={{ textAlign: 'center', mb: 3, mt: 4 }}>
                  <Typography sx={{ fontWeight: 900, fontSize: '1rem' }}>اعتراض به درخواست</Typography>
                  <Typography variant='caption'>برای ثبت اعتراض خود ابتدا توضیحات را تکمیل کنید</Typography>
                </Box>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={12}>
                    <Controller
                      name='objection_description'
                      control={controlObjection}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          error={!!error}
                          InputProps={{ readOnly: false }}
                          helperText={error?.message}
                          fullWidth
                          rows={3}
                          multiline
                          label='توضیحات'
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Button variant='contained' color='error' type='submit' disabled={isPendingObjection}>
                    ثبت اعتراض
                  </Button>
                </Box>
              </form>
            )}
          </CardContent>
        </Card>
      )}
      <Card sx={{ display: 'flex', overflow: 'visible', flexDirection: { xs: 'column', lg: 'row' } }}>
        <StepperHeaderContainer>
          <StepperWrapper sx={{ height: '100%', '& .MuiStepLabel-label': { cursor: 'pointer' } }}>
            <Stepper connector={<></>} activeStep={activeStep} orientation='vertical'>
              {steps.map((step, index) => {
                const labelProps: {
                  error?: boolean
                } = {}

                return (
                  <Step
                    key={index}
                    onClick={index === 0 ? () => setActiveStep(index) : () => setActiveStep(index)}
                    sx={{ '&.Mui-completed + svg': { color: 'primary.main' } }}
                  >
                    <StepLabel {...labelProps} StepIconComponent={StepperCustomDot}>
                      <div style={{ cursor: 'pointer' }} className='step-label'>
                        <Typography className='step-number'>{`0${index + 1}`}</Typography>
                        <div>
                          <Typography className='step-title'>{step.title}</Typography>
                          <Typography className='step-subtitle'>{step.subtitle}</Typography>
                        </div>
                      </div>
                    </StepLabel>
                  </Step>
                )
              })}
            </Stepper>
          </StepperWrapper>
        </StepperHeaderContainer>
        <div style={{ width: '100%', marginTop: '15px', marginRight: '3px' }}>
          <CardContent>{renderContent()}</CardContent>
        </div>
      </Card>
    </>
  )
}
