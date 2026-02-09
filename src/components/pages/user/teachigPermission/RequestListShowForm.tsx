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
  useFetchHistoryComposingTeachingPermission,
  useFetchHistoryEducationTeachingPermission,
  useFetchHistoryStudyTeachingPermission,
  useFetchHistoryTeachingTeachingPermission,
  useUpdateTeachingPermission
} from '@/hooks/user/useTeachigPermission'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import TableRequestsTeaching from './TableRequests'
import { IconButton } from '@mui/material'
import { BiShowAlt } from 'react-icons/bi'
import UpdateHistoryStudyModal from './UpdateHistoryStudyModal'
import UpdateHistoryComposingModal from './UpdateHistoryComposingModal'
import UpdateHistoryTeachingModal from './UpdateHistoryTeachingModal'
import UpdateHistoryEducationModal from './UpdateHistoryEducationModal'
import { parse } from 'date-fns-jalali'

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

export default function RequestShowForm({
  upsertData,
  id,
  teachId,
  show,
  dataStudy,
  dataEducation,
  dataTeaching,
  dataComposing
}: any) {
  console.log(show, 'show')
  const { settings } = useSettings()
  const [activeStep, setActiveStep] = useState<number>(0)
  const { control, handleSubmit, setError, watch, setValue, formState } = useForm({
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
      issuance_locality_permission_activity_id: null,
      teaching_group_work_id: null,
      request_level_id: null,
      activity_field_teaching_id: null,
      region_ids: [],
      activity_field_area_ids: [],
      request_approval_final: null,
      organization_id: null
    }
  })

  useEffect(() => {
    if (show) {
      setValue('address', show?.address ? show?.address : '')
      setValue('postal_code', show?.postal_code ? show?.postal_code : '')
      setValue('employment_locality_name', show?.employment_locality_name ? show?.employment_locality_name : '')
      setValue('number_permission_activity', show?.number_permission_activity ? show?.number_permission_activity : '')
      setValue('employment_status_id', show?.employmentStatus ? show?.employmentStatus : null)
      setValue('employment_locality_type_id', show?.employmentLocalityType ? show?.employmentLocalityType : null)
      setValue('scientific_council', show?.scientific_council ? show?.scientific_council : '')
      setValue('activity_permission', show?.activity_permission ? show?.activity_permission : '')
      setValue('compiler', show?.compiler ? show?.compiler : null)
      setValue('rank_scientific_council_id', show?.rankScientificCouncil ? show?.rankScientificCouncil : null)
      setValue('issuance_locality_permission_activity_id', show?.issuanceLocalityPermissionActivity)
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
      setValue('organization_id', show?.organization)
    }
  }, [show])

  const { mutateAsync, isPending }: any = useUpdateTeachingPermission()
  const router = useRouter()

  const onSubmit = async (values: any) => {
    try {
      console.log(values, 'values')
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
      console.log(result, 'result')

      const res: any = await toast.promise(mutateAsync({ data: result, id: id, teachId: teachId }), {
        pending: 'در حال انجام...'
      })
      if (res?.status) {
        router.push(`/user/${id}/teachigPermission/requestListTeaching`)
      }
    } catch (error) {
      console.log(error, 'error')
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
  const [historyStudyUpdate, setHistoryStudyUpdate] = useState(false)
  const { data: dataHistoryStudy, isPending: isLoadStaduy }: any = useFetchHistoryStudyTeachingPermission({
    id: id,
    teachId: teachId
  })

  const [historyEducationUpdate, setHistoryEducationUpdate] = useState(false)
  const { data: dataHistoryEducation, isPending: isLoadEducation }: any = useFetchHistoryEducationTeachingPermission({
    id: id,
    teachId: teachId
  })

  const [historyTeachingUpdate, setHistoryTeachingUpdate] = useState(false)
  const { data: dataHistoryTeaching, isPending: isLoadTeaching }: any = useFetchHistoryTeachingTeachingPermission({
    id: id,
    teachId: teachId
  })

  const [historyComposingUpdate, setHistoryComposingUpdate] = useState(false)
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
                      url={`/user/${id}/education/request-teaching-permission/base/select/region`}
                      readOnly={true}
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
                      InputProps={{ readOnly: true }}
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
                      readOnly={true}
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
                      readOnly={true}
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
                      InputProps={{ readOnly: true }}
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
                      readOnly={true}
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
                      readOnly={true}
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
                      readOnly={true}
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
                      readOnly={true}
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
                      control={
                        <Switch
                          checked={value === '1'}
                          onChange={(_, check) => onChange(check ? '1' : '0')}
                          readOnly={true}
                        />
                      }
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
                        readOnly={true}
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
                      control={
                        <Switch
                          checked={value === '1'}
                          onChange={(_, check) => onChange(check ? '1' : '0')}
                          readOnly={true}
                        />
                      }
                    />
                  )}
                />
              </Grid>

              {watch('activity_permission') == '1' && (
                <>
                  <Grid item xs={12} md={3}>
                    <Controller
                      name='issuance_locality_permission_activity_id'
                      control={control}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <Autocomplete
                          readOnly={true}
                          options={upsertData?.issuanceLocalityPermissionActivities || []}
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
                          InputProps={{ readOnly: true }}
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
                          readOnly={true}
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
                          readOnly={true}
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
                      control={
                        <Switch
                          checked={value === '1'}
                          onChange={(_, check) => onChange(check ? '1' : '0')}
                          readOnly={true}
                        />
                      }
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
            <UpdateHistoryStudyModal
              open={historyStudyUpdate}
              onClose={() => setHistoryStudyUpdate(false)}
              id={id}
              teachId={teachId}
              upsertData={dataStudy}
              rowSelect={rowSelect}
              disabled={disabled}
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
              onOpen={() => false}
              upsertData={upsertData}
              disabled={true}
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
            <UpdateHistoryEducationModal
              open={historyEducationUpdate}
              onClose={() => setHistoryEducationUpdate(false)}
              id={id}
              teachId={teachId}
              upsertData={dataEducation}
              rowSelect={rowSelect}
              disabled={disabled}
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
              isLoading={isLoadEducation}
              id={id}
              onOpen={() => false}
              upsertData={upsertData}
              disabled={true}
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
            <UpdateHistoryTeachingModal
              open={historyTeachingUpdate}
              onClose={() => setHistoryTeachingUpdate(false)}
              id={id}
              teachId={teachId}
              upsertData={dataTeaching}
              rowSelect={rowSelect}
              disabled={disabled}
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
              isLoading={isLoadTeaching}
              id={id}
              onOpen={() => false}
              upsertData={upsertData}
              disabled={true}
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
            <UpdateHistoryComposingModal
              open={historyComposingUpdate}
              onClose={() => setHistoryComposingUpdate(false)}
              id={id}
              teachId={teachId}
              upsertData={dataComposing}
              rowSelect={rowSelect}
              disabled={disabled}
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
              isLoading={isLoadComposing}
              id={id}
              onOpen={() => false}
              upsertData={upsertData}
              disabled={true}
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
                      control={
                        <Switch
                          checked={value === '1'}
                          onChange={(_, check) => onChange(check ? '1' : '0')}
                          readOnly={true}
                        />
                      }
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
                        readOnly={true}
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
  )
}
