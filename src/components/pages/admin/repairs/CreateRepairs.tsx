'use client'

import { useRouter } from 'next/navigation'

import { Controller, useForm } from 'react-hook-form'

import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography
} from '@mui/material'

import DevicesOtherOutlinedIcon from '@mui/icons-material/DevicesOtherOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'

import { format } from 'date-fns-jalali'

import { useCreateRepairs } from '@/hooks/admin/repairs/useRepairs'
import Breadcrumb from '@/components/Breadcrumb'
import { useGetRepairsUpsertData } from '@/hooks/admin/upsertData/useUpsertData'
import CustomDateTimePicker from '@/components/CustomDateTimePicker'

type FormValue = {
  device_type: string | null
  name: string
  device_serial: number | null
  customer_code: string | null
  operator_code: string | null
  received_at: Date | null
  delivery_due_at: Date | null
  status_code: string | null
  customer_description: string
}

export default function RepairsCreate() {
  const { mutateAsync: createRepairs, isPending } = useCreateRepairs()
  const { data: upsertData } = useGetRepairsUpsertData()

  const router = useRouter()

  const { control, handleSubmit, setError } = useForm<FormValue>({
    defaultValues: {
      device_type: null,
      name: '',
      device_serial: null,
      customer_code: null,
      operator_code: null,
      received_at: null,
      delivery_due_at: null,
      status_code: null,
      customer_description: ''
    }
  })

  const onSubmit = async (data: FormValue) => {
    try {
      const finalData = {
        device_type: data.device_type,
        name: data.name,
        device_serial: data.device_serial,
        customer_code: data.customer_code,
        operator_code: data.operator_code,
        status_code: data.status_code,
        received_at: data.received_at ? format(data.received_at, 'yyyy/MM/dd HH:mm') : null,

        delivery_due_at: data.delivery_due_at ? format(data.delivery_due_at, 'yyyy/MM/dd HH:mm') : null,
        customer_description: data.customer_description
      }

      await createRepairs(finalData)

      router.push('/admin/repairs')
    } catch (error: any) {
      const backendErrors = error?.response?.data?.errors

      if (!backendErrors) return

      Object.entries(backendErrors).forEach(([field, messages]) => {
        setError(field as keyof FormValue, {
          type: 'server',
          message: Array.isArray(messages) ? String(messages[0]) : String(messages)
        })
      })
    }
  }

  const items = [
    {
      title: 'داشبورد',
      to: '/admin'
    },
    {
      title: 'لیست تعمیرات',
      to: '/admin/repairs'
    },
    {
      title: 'ایجاد تعمیر'
    }
  ]

  return (
    <>
      <Breadcrumb items={items} />

      <Card>
        <Box
          sx={{
            position: 'relative',
            px: 5,
            py: 4.5,
            borderRadius: '12px 12px 0 0'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 2
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                backgroundColor: 'primary.main',
                color: 'common.white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <DevicesOtherOutlinedIcon />
            </Box>

            <Box>
              <Typography
                variant='h6'
                sx={{
                  fontWeight: 700,
                  fontSize: '1.15rem',
                  lineHeight: 1.5
                }}
              >
                ایجاد تعمیر
              </Typography>

              <Typography
                variant='body2'
                color='text.secondary'
                sx={{
                  mt: 0.25
                }}
              >
                اطلاعات تعمیر را وارد کنید
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider />

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={6}>
              <Grid item xs={12} md={4}>
                <Controller
                  name='device_type'
                  control={control}
                  render={({ field, fieldState }) => (
                    <Autocomplete
                      options={upsertData?.data.device_types ?? []}
                      getOptionLabel={option => option.name}
                      value={
                        (upsertData?.data.device_types ?? []).find(
                          (device: any) => String(device.id) === field.value
                        ) ?? null
                      }
                      onChange={(_, newValue) => {
                        field.onChange(newValue?.id ? String(newValue.id) : null)
                      }}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label='نوع دستگاه'
                          fullWidth
                          placeholder='نوع دستگاه را انتخاب کنید'
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  name='name'
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label='نام خدمت'
                      fullWidth
                      placeholder='نام خدمت را وارد کنید'
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  name='device_serial'
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      value={field.value ?? ''}
                      label='سریال دستگاه'
                      fullWidth
                      placeholder='سریال دستگاه را وارد کنید'
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={5}>
                <Controller
                  name='customer_code'
                  control={control}
                  render={({ field, fieldState }) => (
                    <Autocomplete
                      options={upsertData?.data.customers ?? []}
                      getOptionLabel={option => `${option.first_name} ${option.last_name}`}
                      value={
                        (upsertData?.data.customers ?? []).find(
                          (customer: any) => String(customer.id) === field.value
                        ) ?? null
                      }
                      onChange={(_, newValue) => {
                        field.onChange(newValue ? String(newValue.id) : null)
                      }}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                          {option.first_name} {option.last_name}
                        </li>
                      )}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label='مشتری'
                          fullWidth
                          placeholder='مشتری را انتخاب کنید'
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={5}>
                <Controller
                  name='operator_code'
                  control={control}
                  render={({ field, fieldState }) => (
                    <Autocomplete
                      options={upsertData?.data.operators ?? []}
                      getOptionLabel={option => `${option.first_name} ${option.last_name}`}
                      value={
                        (upsertData?.data.operators ?? []).find(
                          (operator: any) => String(operator.id) === field.value
                        ) ?? null
                      }
                      onChange={(_, newValue) => {
                        field.onChange(newValue ? String(newValue.id) : null)
                      }}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                          {option.first_name} {option.last_name}
                        </li>
                      )}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label='اپراتور'
                          fullWidth
                          placeholder='اپراتور را انتخاب کنید'
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <Controller
                  name='status_code'
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      select
                      label='وضعیت'
                      fullWidth
                      value={field.value ?? ''}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    >
                      {(upsertData?.data.status_codes ?? []).map((status: any) => (
                        <MenuItem key={status.id} value={status.id}>
                          {status.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name='received_at'
                  control={control}
                  render={({ field, fieldState }) => (
                    <CustomDateTimePicker
                      label='زمان دریافت'
                      value={field.value}
                      onChange={field.onChange}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name='delivery_due_at'
                  control={control}
                  render={({ field, fieldState }) => (
                    <CustomDateTimePicker
                      label='زمان موعد تحویل'
                      value={field.value}
                      onChange={field.onChange}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <Controller
                  name='customer_description'
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label='توضیحات مشتری'
                      placeholder='توضیحات مشتری را وارد کنید'
                      multiline
                      rows={4}
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button color='inherit' variant='outlined' type='button' onClick={() => router.push('/admin/repairs')}>
                  انصراف
                </Button>

                <Button
                  startIcon={<SaveOutlinedIcon />}
                  variant='contained'
                  color='primary'
                  type='submit'
                  disabled={isPending}
                >
                  {isPending ? 'در حال ثبت...' : 'ثبت'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
