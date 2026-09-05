'use client'

import { useEffect, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

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
import { format, parse } from 'date-fns-jalali'

import DevicesOtherOutlinedIcon from '@mui/icons-material/DevicesOtherOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'

import Breadcrumb from '@/components/Breadcrumb'
import CustomDateTimePicker from '@/components/CustomDateTimePicker'

import { useGetRepairsUpsertData } from '@/hooks/admin/upsertData/useUpsertData'
import { useGetRepairs, useUpdateRepairs } from '@/hooks/admin/repairs/useRepairs'
import RepairItemsTable from '../repairItems/TableRepairItems'

type FormValue = {
  device_type: string | null
  name: string
  device_serial: string
  customer_code: string | null
  operator_code: string | null
  received_at: Date | null
  delivery_due_at: Date | null
  delivery_at: Date | null
  status_code: number | null
  total_amount: number | null
  discount_amount: number | null
  payable_amount: number | null
  customer_description: string
}

export default function RepairsEdit() {
  const [itemsTotal, setItemsTotal] = useState<number>(0)
  const { id } = useParams()

  const { mutateAsync: updateRepairs, isPending } = useUpdateRepairs()
  const { data: repairsData } = useGetRepairs(Number(id))
  const { data: upsertData } = useGetRepairsUpsertData()

  const router = useRouter()

  const { control, handleSubmit, reset, setError, watch, setValue } = useForm<FormValue>({
    defaultValues: {
      device_type: null,
      name: '',
      device_serial: '',
      customer_code: null,
      operator_code: null,
      received_at: null,
      delivery_due_at: null,
      delivery_at: null,
      status_code: null,
      total_amount: null,
      discount_amount: null,
      payable_amount: null,
      customer_description: ''
    }
  })

  const discountAmount = watch('discount_amount') ?? 0
  const payableAmount = Math.max(itemsTotal - discountAmount, 0)

  useEffect(() => {
    setValue('total_amount', itemsTotal)
    setValue('payable_amount', payableAmount)
  }, [itemsTotal, payableAmount, setValue])

  useEffect(() => {
    if (!repairsData || !upsertData?.data) return

    const deviceType = (upsertData.data.device_types ?? []).find((item: any) => item.name === repairsData.device_type)

    const customer = (upsertData.data.customers ?? []).find(
      (item: any) => `${item.first_name} ${item.last_name}` === repairsData.customer_code
    )

    const operator = (upsertData.data.operators ?? []).find(
      (item: any) => `${item.first_name} ${item.last_name}` === repairsData.operator_code
    )

    const status = (upsertData.data.status_codes ?? []).find((item: any) => item.name === repairsData.status_code)

    reset({
      device_type: deviceType ? String(deviceType.id) : null,
      name: repairsData.name ?? '',
      device_serial: repairsData.device_serial ?? '',
      customer_code: customer ? String(customer.id) : null,
      operator_code: operator ? String(operator.id) : null,
      received_at: repairsData.received_at ? parse(repairsData.received_at, 'yyyy/MM/dd HH:mm', new Date()) : null,
      delivery_due_at: repairsData.delivery_due_at
        ? parse(repairsData.delivery_due_at, 'yyyy/MM/dd HH:mm', new Date())
        : null,
      delivery_at: repairsData.delivery_at ? parse(repairsData.delivery_at, 'yyyy/MM/dd HH:mm', new Date()) : null,
      status_code: status?.id ?? null,
      total_amount: repairsData.total_amount ? Number(repairsData.total_amount) : null,
      discount_amount: repairsData.discount_amount ? Number(repairsData.discount_amount) : null,
      payable_amount: repairsData.payable_amount ? Number(repairsData.payable_amount) : null,
      customer_description: repairsData.customer_description ?? ''
    })
  }, [repairsData, upsertData, reset])

  const onSubmit = async (data: FormValue) => {
    try {
      const finalData = {
        device_type: data.device_type,
        name: data.name,
        device_serial: data.device_serial,
        customer_code: data.customer_code,
        operator_code: data.operator_code,
        received_at: data.received_at ? format(data.received_at, 'yyyy/MM/dd HH:mm') : null,
        delivery_due_at: data.delivery_due_at ? format(data.delivery_due_at, 'yyyy/MM/dd HH:mm') : null,
        delivery_at: data.delivery_at ? format(data.delivery_at, 'yyyy/MM/dd HH:mm') : null,
        status_code: data.status_code,
        total_amount: data.total_amount,
        discount_amount: data.discount_amount,
        payable_amount: data.payable_amount,
        customer_description: data.customer_description
      }

      await updateRepairs({
        id: Number(id),
        payload: finalData
      })

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
      title: 'ویرایش تعمیر'
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
                ویرایش تعمیر
              </Typography>

              <Typography
                variant='body2'
                color='text.secondary'
                sx={{
                  mt: 0.25
                }}
              >
                اطلاعات تعمیر را ویرایش کنید
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider />

        <CardContent>
          <form id='repair-edit-form' onSubmit={handleSubmit(onSubmit)}>
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
                        field.onChange(newValue ? String(newValue.id) : null)
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
                      label='نام دستگاه'
                      fullWidth
                      placeholder='نام دستگاه را وارد کنید'
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

              <Grid item xs={12} md={4}>
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

              <Grid item xs={12} md={4}>
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

              <Grid item xs={12} md={4}>
                <Controller
                  name='delivery_at'
                  control={control}
                  render={({ field, fieldState }) => (
                    <CustomDateTimePicker
                      label='زمان تحویل'
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
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Card sx={{ mt: 4 }}>
        <RepairItemsTable
          repairId={Number(id)}
          onTotalChange={total => {
            setItemsTotal(total)
            setValue('total_amount', total)
            setValue('payable_amount', Math.max(total - discountAmount, 0))
          }}
        />
      </Card>

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Controller
                name='total_amount'
                control={control}
                render={({ field, fieldState }) => {
                  const formattedValue = field.value !== null ? Number(field.value).toLocaleString('en-US') : ''

                  return (
                    <TextField
                      {...field}
                      value={formattedValue}
                      type='text'
                      label='مبلغ کل'
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      slotProps={{
                        input: {
                          readOnly: true,
                          endAdornment: (
                            <Typography variant='body2' color='text.secondary' sx={{ ml: 1, whiteSpace: 'nowrap' }}>
                              تومان
                            </Typography>
                          )
                        }
                      }}
                    />
                  )
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name='discount_amount'
                control={control}
                render={({ field, fieldState }) => {
                  const formattedValue = field.value !== null ? Number(field.value).toLocaleString('en-US') : ''

                  return (
                    <TextField
                      {...field}
                      value={formattedValue}
                      type='text'
                      label='مبلغ تخفیف'
                      placeholder='مبلغ تخفیف را وارد کنید'
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      onChange={e => {
                        const inputValue = e.target.value.replace(/,/g, '').replace(/[^\d]/g, '')

                        field.onChange(inputValue === '' ? null : Number(inputValue))
                      }}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <Typography variant='body2' color='text.secondary' sx={{ ml: 1, whiteSpace: 'nowrap' }}>
                              تومان
                            </Typography>
                          )
                        }
                      }}
                    />
                  )
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name='payable_amount'
                control={control}
                render={({ field, fieldState }) => {
                  const formattedValue = field.value !== null ? Number(field.value).toLocaleString('en-US') : ''

                  return (
                    <TextField
                      {...field}
                      value={formattedValue}
                      type='text'
                      label='مبلغ قابل پرداخت'
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      slotProps={{
                        input: {
                          readOnly: true,
                          endAdornment: (
                            <Typography variant='body2' color='text.secondary' sx={{ ml: 1, whiteSpace: 'nowrap' }}>
                              تومان
                            </Typography>
                          )
                        }
                      }}
                    />
                  )
                }}
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
                form='repair-edit-form'
                disabled={isPending}
              >
                {isPending ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}
