'use client'

// React Imports
import { ChangeEvent, ElementType, useEffect, useState } from 'react'

// MUI Imports
import { styled } from '@mui/material/styles'
import Step from '@mui/material/Step'
import Button, { ButtonProps } from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MuiStepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import type { StepperProps } from '@mui/material/Stepper'

// Third-party Imports
import { toast } from 'react-toastify'
import { Controller, useForm } from 'react-hook-form'

// Component Imports
import StepperWrapper from '@core/styles/stepper'
import StepperCustomDot from '@components/stepper-dot'
import DirectionalIcon from '@components/DirectionalIcon'
import Image from 'next/image'
import {
  Autocomplete,
  Box,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  IconButton
} from '@mui/material'

// import { useSetFormFile } from '@/libs/admin/permissions/getTable'

import Link from 'next/link'

import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'

import { useRouter } from 'next/navigation'

import SubmitButton from '@/components/elements/submitButton'

import { GeTErrorFetch } from '@/components/elements/errorHandler'
import CustomDatePicker from '@/components/elements/customDatePicker'
import { dateConverter } from '@/helpers/DateHelpers'
import { useCreateUser } from '@/hooks/admin/membership/useUser'
import { Transition } from '@/helpers/DialogsHelper'
import { Icon } from '@iconify/react'
import { useCreateUserInstitution } from '@/hooks/institution/consultationDocuments/useDocumentList'

// /image/profile/Screenshot 2025-09-24 182759.png
const DEFAULT_IMAGE = '/logo.png'
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

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

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

export default function Modal({
  onClose,
  open,
  title,
  description,
  id,
  upsertData
}: {
  onClose: any
  open: boolean
  title: string
  description: string
  id: string
  upsertData: any
}) {
  // States
  const router = useRouter()
  const [file, setfile] = useState<any>([])
  const [ImageSrc, setImageSrc] = useState<any>(DEFAULT_IMAGE)
  const [activeStep, setActiveStep] = useState(0)
  const [permissionsType, setPermissionsType] = useState<{
    language_id: any | null
    race_id: any | null
    nationality_id: any | null
    citizenship_id: any | null
    education_id: any | null
    marital_id: any | null
    employment_status_id: any | null
    refferrer_type_id: any | null
    region_id: any | null
  }>({
    language_id: null,
    race_id: null,
    nationality_id: null,
    citizenship_id: null,
    education_id: null,
    marital_id: null,
    employment_status_id: null,
    refferrer_type_id: null,
    region_id: null
  })

  console.log(permissionsType, 'permissionstype')

  // Vars
  // Hooks
  const {
    control,
    setError,
    reset,
    watch,
    clearErrors,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      birth_date: undefined,
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

  const { mutateAsync, isPending } = useCreateUserInstitution()

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

      const res = await toast.promise(mutateAsync({ data: result, id: id }), {
        pending: 'در حال انجام ....'
      })

      if (res?.status) {
        onClose()
        reset()
      }
    } catch (error: any) {
      GeTErrorFetch({ error, setError })
    }
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles && selectedFiles.length > 0) {
      const file = selectedFiles[0]
      setfile([file]) // اگه خواستی لیست نگه داری

      const reader = new FileReader()
      reader.onload = () => {
        setImageSrc(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
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
                    InputProps={{ readOnly: false }}
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
                    InputProps={{ readOnly: false }}
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
                    InputProps={{ readOnly: false }}
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
                    InputProps={{ readOnly: false }}
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
                    InputProps={{ readOnly: false }}
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
                    InputProps={{ readOnly: false }}
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
                    InputProps={{ readOnly: false }}
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
                    readOnly={false}
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
                    InputProps={{ readOnly: false }}
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
              <Button href='/admin/membership/organization' LinkComponent={Link}>
                بازگشت به فهرست سازمان ها
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
                name='region_ids'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomAsyncAutocomplete
                    url={`/institution/${id}/user/base/select/region`}
                    readOnly={false}
                    onAddValue={newValue => onChange(newValue)}
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

            <Grid item xs={12} md={4}>
              <Controller
                name='language_id'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomAsyncAutocomplete
                    url={`/institution/${id}/user/base/select/language`}
                    readOnly={false}
                    onAddValue={newValue => onChange(newValue)}
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
                    url={`/institution/${id}/user/base/select/race`}
                    readOnly={false}
                    onAddValue={newValue => onChange(newValue)}
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
                name='nationality_id'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomAsyncAutocomplete
                    url={`/institution/${id}/user/base/select/nationality`}
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

            <Grid item xs={12} md={4}>
              <Controller
                name='citizenship_id'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomAsyncAutocomplete
                    url={`/institution/${id}/user/base/select/citizenship`}
                    readOnly={false}
                    onAddValue={newValue => onChange(newValue)}
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
                name='education_id'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomAsyncAutocomplete
                    url={`/institution/${id}/user/base/select/education`}
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

            <Grid item xs={12} md={4}>
              <Controller
                name='marital_id'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomAsyncAutocomplete
                    url={`/institution/${id}/user/base/select/marital`}
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

            <Grid item xs={12} md={4}>
              <Controller
                name='employment_status_id'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomAsyncAutocomplete
                    url={`/institution/${id}/user/base/select/employment-status`}
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
                name='refferrer_type_id'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomAsyncAutocomplete
                    url={`/institution/${id}/user/base/select/referrer-type`}
                    readOnly={false}
                    onAddValue={newValue => onChange(newValue)}
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

              <SubmitButton disabled={false} />
            </Grid>
          </Grid>
        )

      default:
        return <Typography>Unknown stepIndex</Typography>
    }
  }

  return (
    <>
      <Dialog
        TransitionComponent={Transition}
        fullWidth
        open={open}
        PaperProps={{
          sx: {
            width: '70vw',
            maxWidth: '80vw',
            height: '80vh'
          }
        }}
        scroll='body'
      >
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 9, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ lineHeight: '1rem', fontWeight: 900, mb: 2 }}>
              {title}
            </Typography>
            <Typography variant='caption'>{description}</Typography>
          </Box>
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
        </DialogContent>
      </Dialog>
    </>
  )
}
