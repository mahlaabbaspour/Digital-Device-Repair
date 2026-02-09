'use client'

// React Imports
import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Step from '@mui/material/Step'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MuiStepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import type { StepperProps } from '@mui/material/Stepper'
import { toast } from 'react-toastify'
import { Controller, useForm } from 'react-hook-form'
import StepperWrapper from '@core/styles/stepper'
import StepperCustomDot from '@components/stepper-dot'
import DirectionalIcon from '@components/DirectionalIcon'
import { Autocomplete, Grid, TextField } from '@mui/material'
import Link from 'next/link'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import { useRouter } from 'next/navigation'
import SubmitButton from '@/components/elements/submitButton'
import CustomDatePicker from '@/components/elements/customDatePicker'
import { dateConverter } from '@/helpers/DateHelpers'
import { useUpdateUser } from '@/hooks/admin/membership/useUser'
import { GeTErrorFetch } from '@/components/elements/errorHandler'
import { parse } from 'date-fns-jalali'

// Vars
const steps = [
  {
    title: 'اطلاعات پایه ',
    subtitle: 'تنظیم اطلاعات پایه'
  },
  {
    title: 'اطلاعات تکمیلی',
    subtitle: 'تنظیم اطلاعات تکمیلی'
  }
]

// Styled Components
const Stepper = styled(MuiStepper)<StepperProps>(({ theme }) => ({
  justifyContent: 'center',
  '& .MuiStep-root': {
    '&:first-of-type': {
      paddingInlineStart: 0
    },
    '&:last-of-type': {
      paddingInlineEnd: 0
    },
    [theme.breakpoints.down('md')]: {
      paddingInline: 0
    }
  }
}))

const UpdateUserForm = ({
  upsertData,
  disabled,
  show,
  id
}: {
  upsertData?: any
  show?: any
  disabled?: boolean
  id?: string
}) => {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)

  const {
    control,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
    handleSubmit
  } = useForm<any>({
    defaultValues: {
      first_name: '',
      last_name: '',
      birth_date: null,
      username: '',
      mobile: '',
      email: '',
      postal_code: '',
      address: '',
      phone: '',
      gender_id: null,
      language_id: null,
      race_id: null,
      nationality_id: null,
      citizenship_id: null,
      education_id: null,
      marital_id: null,
      employment_status_id: null,
      refferrer_type_id: null,
      region_ids: []
    }
  })

  useEffect(() => {
    if (show) {
      clearErrors()
      setValue('first_name', show?.first_name)
      setValue('last_name', show?.last_name)
      setValue('username', show?.username)
      setValue('mobile', show?.mobile)
      setValue('email', show?.email)
      setValue('postal_code', show?.postal_code)
      setValue('phone', show?.phone)
      setValue('birth_date', show?.birth_date ? parse(show?.birth_date, 'yyyy/MM/dd', new Date()) : null)
      setValue('address', show?.address)
      setValue('gender_id', show?.gender)
      setValue('language_id', show?.language)
      setValue('race_id', show?.race)
      setValue('nationality_id', show?.nationality)
      setValue('citizenship_id', show?.citizenship)
      setValue('education_id', show?.education)
      setValue('marital_id', show?.marital)
      setValue('employment_status_id', show?.employmentStatus)
      setValue('region_ids', show?.regions)
    }
  }, [show])

  // Function to check if a step has errors
  const hasStepErrors = (stepIndex: number) => {
    const stepFields = getStepFields(stepIndex)
    return stepFields.some((fieldName: any) => (errors as any)?.[fieldName])
  }

  // Function to get fields for each step
  const getStepFields = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return ['name', 'national_code', 'phone', 'fax', 'website', 'address']
      case 1:
        return ['supervisionCenter']
      default:
        return []
    }
  }

  const { mutateAsync, isPending } = useUpdateUser()

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

      await toast.promise(mutateAsync({ data: result, id: id }), {
        pending: 'در حال انجام ....'
      })

      router.push('/admin/membership/realPersons/users')
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const renderStepContent = (activeStep: number) => {
    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={4} my={2}>
            <Grid item xs={12} mb={'1rem'}>
              <Typography variant='h5' fontWeight='bold' color='text.primary'>
                {steps[0].title}
              </Typography>
              <Typography variant='caption'>{steps[0].subtitle}</Typography>
            </Grid>

            {/* first_name */}
            <Grid item xs={4}>
              <Controller
                key='first-name-field'
                name='first_name'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    error={!!error}
                    helperText={error?.message}
                    InputProps={{ readOnly: disabled }}
                    {...field}
                    value={field.value ?? ''}
                    fullWidth
                    label='نام'
                  />
                )}
              />
            </Grid>

            {/* last_name */}
            <Grid item xs={4}>
              <Controller
                key='first-national_code-field'
                name='last_name'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    error={!!error}
                    helperText={error?.message}
                    {...field}
                    value={field.value ?? ''}
                    InputProps={{ readOnly: disabled }}
                    fullWidth
                    label='نام خانوادگی'
                  />
                )}
              />
            </Grid>

            {/* username */}
            <Grid item xs={4}>
              <Controller
                key='first-phone-field'
                name='username'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    error={!!error}
                    helperText={error?.message}
                    {...field}
                    value={field.value ?? ''}
                    InputProps={{ readOnly: disabled }}
                    fullWidth
                    label='کد ملی'
                  />
                )}
              />
            </Grid>

            {/* mobile */}
            <Grid item xs={4}>
              <Controller
                key='first-fax-field'
                name='mobile'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    error={!!error}
                    helperText={error?.message}
                    {...field}
                    value={field.value ?? ''}
                    InputProps={{ readOnly: disabled }}
                    fullWidth
                    label='موبایل'
                  />
                )}
              />
            </Grid>

            {/* email */}
            <Grid item xs={4}>
              <Controller
                key='first-website-field'
                name='email'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    error={!!error}
                    helperText={error?.message}
                    {...field}
                    value={field.value ?? ''}
                    InputProps={{ readOnly: disabled }}
                    fullWidth
                    label='ایمیل'
                  />
                )}
              />
            </Grid>

            {/* postal_code */}
            <Grid item xs={4}>
              <Controller
                key='first-website-field'
                name='postal_code'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    error={!!error}
                    helperText={error?.message}
                    {...field}
                    value={field.value ?? ''}
                    InputProps={{ readOnly: disabled }}
                    fullWidth
                    label='کد پستی'
                  />
                )}
              />
            </Grid>

            {/* phone */}
            <Grid item xs={4}>
              <Controller
                key='first-website-field'
                name='phone'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    error={!!error}
                    helperText={error?.message}
                    {...field}
                    value={field.value ?? ''}
                    InputProps={{ readOnly: disabled }}
                    fullWidth
                    label='تلفن'
                  />
                )}
              />
            </Grid>

            {/* birth_date */}
            <Grid item xs={12} md={4}>
              <Controller
                key='birth-data-field'
                control={control}
                name='birth_date'
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomDatePicker
                    error={!!error}
                    helperText={error?.message}
                    label='تاریخ تولد'
                    onChange={onChange}
                    value={value}
                    readOnly={disabled}
                  />
                )}
              />
            </Grid>

            {/* address */}
            <Grid item xs={12}>
              <Controller
                key='first-address-field'
                name='address'
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
                    label='آدرس'
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} className='flex justify-between mt-4'>
              <Button href='/admin/membership/realPersons/users' LinkComponent={Link}>
                بازگشت به فهرست کاربران
              </Button>
              <Button
                variant='contained'
                onClick={() => setActiveStep(e => e + 1)}
                endIcon={<DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />}
              >
                بعدی
              </Button>
            </Grid>
          </Grid>
        )
      case 1:
        return (
          <Grid container spacing={4} my={2}>
            <Grid item xs={12}></Grid>

            <Grid item xs={12} md={4}>
              <Controller
                key='last-name-field'
                name='region_ids'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomAsyncAutocomplete
                    url='/admin/membership/base/select/region'
                    readOnly={disabled}
                    onAddValue={newValue => !disabled && onChange(newValue)}
                    value={value}
                    getOptionLabel={optien => optien?.name}
                    label='شهرستان'
                    multiple={true}
                    error={!!error}
                    helperText={error?.message}
                  ></CustomAsyncAutocomplete>
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
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

            <Grid item xs={12} md={4}>
              <Controller
                key='last-name-field'
                name='language_id'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomAsyncAutocomplete
                    url='/admin/membership/base/select/language'
                    readOnly={disabled}
                    onAddValue={newValue => !disabled && onChange(newValue)}
                    value={value}
                    getOptionLabel={optien => optien?.name}
                    label='زبان'
                    error={!!error}
                    helperText={error?.message}
                  ></CustomAsyncAutocomplete>
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                key='last-name-field'
                name='race_id'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomAsyncAutocomplete
                    url='/admin/membership/base/select/race'
                    readOnly={disabled}
                    onAddValue={newValue => !disabled && onChange(newValue)}
                    value={value}
                    getOptionLabel={optien => optien?.name}
                    label='نژاد'
                    error={!!error}
                    helperText={error?.message}
                  ></CustomAsyncAutocomplete>
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                key='last-name-field'
                name='nationality_id'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomAsyncAutocomplete
                    url='/admin/membership/base/select/nationality'
                    readOnly={disabled}
                    onAddValue={newValue => !disabled && onChange(newValue)}
                    value={value}
                    getOptionLabel={optien => optien?.name}
                    label='ملیت'
                    error={!!error}
                    helperText={error?.message}
                  ></CustomAsyncAutocomplete>
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                key='last-name-field'
                name='citizenship_id'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomAsyncAutocomplete
                    url='/admin/membership/base/select/citizenship'
                    readOnly={disabled}
                    onAddValue={newValue => !disabled && onChange(newValue)}
                    value={value}
                    getOptionLabel={optien => optien?.name}
                    label='تابعیت'
                    error={!!error}
                    helperText={error?.message}
                  ></CustomAsyncAutocomplete>
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                key='last-name-field'
                name='education_id'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomAsyncAutocomplete
                    url='/admin/membership/base/select/education'
                    readOnly={disabled}
                    onAddValue={newValue => !disabled && onChange(newValue)}
                    value={value}
                    getOptionLabel={optien => optien?.name}
                    label='تحصیلات'
                    error={!!error}
                    helperText={error?.message}
                  ></CustomAsyncAutocomplete>
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                key='last-name-field'
                name='marital_id'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomAsyncAutocomplete
                    url='/admin/membership/base/select/marital'
                    readOnly={disabled}
                    onAddValue={newValue => !disabled && onChange(newValue)}
                    value={value}
                    getOptionLabel={optien => optien?.name}
                    label='وضعیت تاهل'
                    error={!!error}
                    helperText={error?.message}
                  ></CustomAsyncAutocomplete>
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                key='last-name-field'
                name='employment_status_id'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomAsyncAutocomplete
                    url='/admin/membership/base/select/employment-status'
                    readOnly={disabled}
                    onAddValue={newValue => !disabled && onChange(newValue)}
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
                key='last-name-field'
                name='refferrer_type_id'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomAsyncAutocomplete
                    url='/admin/membership/base/select/referrer-type'
                    readOnly={disabled}
                    onAddValue={newValue => !disabled && onChange(newValue)}
                    value={value}
                    getOptionLabel={optien => optien?.name}
                    label='معرف'
                    error={!!error}
                    helperText={error?.message}
                  ></CustomAsyncAutocomplete>
                )}
              />
            </Grid>

            <Grid item xs={12} className='flex justify-between mt-4'>
              <Button
                variant='outlined'
                onClick={handleBack}
                color='secondary'
                startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />}
              >
                قبلی
              </Button>

              {disabled ? (
                <Button href='/admin/membership/realPersons/users' LinkComponent={Link}>
                  بازگشت به فهرست کاربران
                </Button>
              ) : (
                <SubmitButton disabled={isPending} />
              )}
            </Grid>
          </Grid>
        )

      default:
        return <Typography>Unknown stepIndex</Typography>
    }
  }

  return (
    <>
      <StepperWrapper>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const labelProps: {
              error?: boolean
            } = {
              error: hasStepErrors(index)
            }

            return (
              <Step key={index} className='max-md:mbe-5 '>
                <StepLabel
                  {...labelProps}
                  slots={{
                    stepIcon: StepperCustomDot
                  }}
                >
                  <div className='step-label m-1 cursor-pointer' onClick={() => setActiveStep(index)}>
                    <Typography className='step-number' color={hasStepErrors(index) ? 'error' : 'inherit'}>
                      {index + 1}
                    </Typography>

                    <div>
                      <Typography className='step-title' color={hasStepErrors(index) ? 'error' : 'text.primary'}>
                        {label.title}
                      </Typography>
                      <Typography className='step-subtitle' color={hasStepErrors(index) ? 'error' : 'inherit'}>
                        {label.subtitle}
                      </Typography>
                    </div>
                  </div>
                </StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </StepperWrapper>
      <Divider />
      {activeStep === steps.length ? (
        <>
          <Typography className='mlb-2 mli-1'>All steps are completed!</Typography>
          <div className='flex justify-end mt-4'>
            <Button variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>{renderStepContent(activeStep)}</form>
      )}
    </>
  )
}

export default UpdateUserForm
