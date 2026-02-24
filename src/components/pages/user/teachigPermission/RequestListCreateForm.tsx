'use client'

import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardContentProps,
  FormControlLabel,
  Grid,
  styled,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import MuiStep, { StepProps } from '@mui/material/Step'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import StepperWrapper from '@/@core/styles/stepper'
import { useState } from 'react'
import StepperCustomDot from '@/components/stepper-dot'
import { Controller, useForm } from 'react-hook-form'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import { Icon } from '@iconify/react'
import CustomDatePicker from '@/components/elements/customDatePicker'
import { useSettings } from '@/@core/hooks/useSettings'
import axiosConfig from '@/libs/auth/axios'
import { dateConverter } from '@/helpers/DateHelpers'
import { useCreateTeachingPermission } from '@/hooks/user/useTeachigPermission'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { GeTErrorFetch } from '@/components/elements/errorHandler'

const steps = [
  {
    title: 'اطلاعات اولیه',
    icon: 'mdi:tag-outline',
    subtitle: 'تکمیل اطلاعات اولیه را وارد کنید'
  },
  {
    title: 'تکمیل اطلاعات تکمیلی',
    subtitle: 'اطلاعات تکمیلی دوره را وارد کنید',
    icon: 'mdi:clipboard-text-outline'
  },
  {
    title: 'منابع اموزشی',
    icon: 'mdi:credit-card-outline',
    subtitle: 'منالع اموزشی دروه را بارگذاری کنید'
  },
  {
    title: 'آزمون الکترونیک',
    subtitle: 'اطلاعات ازمون الکترونیک را وارد کنید',
    icon: 'mdi:rocket-launch-outline'
  },
  {
    title: 'گواهینامه',
    subtitle: 'اطلاعات گواهینامه دوره را وارد کنید',
    icon: 'mdi:rocket-launch-outline'
  },
  {
    title: 'انتشار',
    subtitle: 'اطلاعات انتشار دروه ',
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

export default function RequestCreateForm({ upsertData, id }: any) {
  const { settings } = useSettings()
  const [activeStep, setActiveStep] = useState<number>(0)
  const { control, handleSubmit, setError, watch, formState } = useForm({
    defaultValues: {
      address: '',
      postal_code: '',
      employment_locality_name: '',
      number_permission_activity: '',
      employment_status_id: null,
      employment_locality_type_id: null,
      activity_permission_date: null,
      activity_expiration_date: null,
      scientific_council: '0',
      activity_permission: '0',
      compiler: '0',
      compilationFile: null,
      rank_scientific_council_id: null,
      locality_permission_activity_id: null,
      teaching_group_work_id: null,
      request_level_id: null,
      activity_field_teaching_id: null,
      region_ids: [],
      activity_field_area_ids: []
    }
  })

  const { mutateAsync, isPending }: any = useCreateTeachingPermission()
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

      const res: any = await toast.promise(mutateAsync({ data: result, id: id }), {
        pending: 'در حال انجام...'
      })
      if (res?.status) {
        router.push(`/user/${id}/teachigPermission/requestListTeaching/${res?.data?.id}/update`)
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
                  type='submit'
                  disabled={isPending}
                >
                  {'بعدی'}
                </Button>
              )}
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

  return (
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
                  onClick={index === 0 ? () => setActiveStep(index) : () => setActiveStep(0)}
                  sx={{ '&.Mui-completed + svg': { color: 'primary.main' } }}
                >
                  <StepLabel {...labelProps} StepIconComponent={StepperCustomDot}>
                    <div style={{ cursor: 'pointer' }} className='step-label'>
                      <Typography className='step-number'>{`${index + 1}`}</Typography>
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
  )
}
