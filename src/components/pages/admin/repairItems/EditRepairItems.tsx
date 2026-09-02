'use client'

import type { ReactElement, Ref } from 'react'
import { forwardRef, useEffect } from 'react'

import { Controller, useForm } from 'react-hook-form'

import {
  alpha,
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fade,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  type FadeProps
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'
import { LuWrench } from 'react-icons/lu'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'

import { useGetRepairItems, useUpdateRepairItems } from '@/hooks/admin/repairItems/useRepairItems'
import SwitchesBasic from '@/components/SwitchBasic'
import { useGetRepairItemUpsertData } from '@/hooks/admin/upsertData/useUpsertData'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type Props = {
  open: boolean
  onClose: () => void
  repairId: number | string
  repairItemId: number | null
}

type FormValue = {
  type: string
  name: number | null
  serial: string
  expert_id: number | null
  quantity: number | null
  unit_price: number | null
  total_price: number | null
  description: string
  status: boolean
}

type Expert = {
  id: number
  first_name: string
  last_name: string
}

type Item = {
  id: number
  name: string
}

const items: Item[] = [
  { id: 1, name: 'باتری' },
  { id: 2, name: 'صفحه نمایش' },
  { id: 3, name: 'شارژر' },
  { id: 4, name: 'قاب' }
]

export default function RepairItemsEdit({ open, onClose, repairId, repairItemId }: Props) {
  const { mutateAsync: updateRepairItems, isPending } = useUpdateRepairItems()
  const { data: repairItemData } = useGetRepairItems({ repairId, repairItemId })
  const { data: upsertData, isLoading } = useGetRepairItemUpsertData(Number(repairId))

  const { control, handleSubmit, reset, setError, setValue, watch } = useForm<FormValue>({
    defaultValues: {
      type: '',
      name: null,
      serial: '',
      expert_id: null,
      quantity: null,
      unit_price: null,
      total_price: null,
      description: '',
      status: true
    }
  })

  const selectedType = watch('type')
  const quantity = watch('quantity')
  const amount = watch('unit_price')

  const totalAmount = quantity !== null && amount !== null ? quantity * amount : null

  const onSubmit = async (data: FormValue) => {
    if (repairItemId === null) return

    try {
      const payload = {
        ...data,
        total_amount: data.quantity !== null && data.unit_price !== null ? data.quantity * data.unit_price : null
      }

      await updateRepairItems({
        repairId,
        repairItemId,
        payload
      })

      reset()
      onClose()
    } catch (error: any) {
      const backError = error?.response?.data?.errors

      if (!backError) return

      Object.entries(backError).forEach(([field, message]) => {
        setError(field as keyof FormValue, {
          type: 'server',
          message: Array.isArray(message) ? String(message[0]) : String(message)
        })
      })
    }
  }

  useEffect(() => {
    if (repairItemData?.data) {
      const item = repairItemData.data

      reset({
        type: item.type ?? '',
        name: item.name ?? null,
        serial: item.serial ?? '',
        expert_id: item.expert_id ?? null,
        quantity: item.quantity ?? null,
        unit_price: item.unit_price ?? null,
        total_price: item.total_price ?? null,
        description: item.description ?? '',
        status: item.status ?? true
      })
    }
  }, [reset, repairItemData])

  useEffect(() => {
    if (selectedType === 'service') {
      setValue('serial', '')
    }
  }, [selectedType, setValue])

  return (
    <Dialog
      scroll='body'
      maxWidth='sm'
      fullWidth
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      PaperProps={{ component: 'form', onSubmit: handleSubmit(onSubmit) }}
    >
      <IconButton onClick={onClose} sx={{ position: 'absolute', top: 12, right: 12, zIndex: 1 }}>
        <CloseIcon />
      </IconButton>

      <Box
        sx={theme => ({
          px: { xs: 5, sm: 8 },
          pt: 5,
          pb: 4,
          backgroundColor: alpha(theme.palette.primary.main, 0.08)
        })}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              flexShrink: 0
            }}
          >
            <LuWrench size={22} />
          </Box>

          <Box>
            <DialogTitle sx={{ p: 0, fontSize: '1.2rem', fontWeight: 700 }}>ویرایش</DialogTitle>

            <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
              اطلاعات وارد کنید
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      <DialogContent
        sx={{
          pb: 6,
          px: { xs: 5, sm: 10 },
          pt: { xs: 6, sm: 8 },
          position: 'relative'
        }}
      >
        <Grid container spacing={6}>
          <Grid item md={6}>
            <Controller
              name='type'
              control={control}
              render={({ field, fieldState }) => (
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2
                    }}
                  >
                    <Typography
                      variant='body2'
                      sx={{
                        fontWeight: 600,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      نوع :
                    </Typography>

                    <RadioGroup
                      row
                      {...field}
                      sx={{
                        display: 'flex',
                        gap: 2
                      }}
                    >
                      <FormControlLabel value='product' control={<Radio />} label='کالا' />

                      <FormControlLabel value='service' control={<Radio />} label='خدمت' />
                    </RadioGroup>
                  </Box>

                  {fieldState.error && (
                    <Typography variant='caption' color='error' sx={{ mt: 0.5, display: 'block' }}>
                      {fieldState.error.message}
                    </Typography>
                  )}
                </Box>
              )}
            />
          </Grid>

          {selectedType === 'product' && (
            <Grid item md={6}>
              <Controller
                name='serial'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    value={field.value}
                    label='سریال دستگاه'
                    fullWidth
                    placeholder='سریال دستگاه را وارد کنید'
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
          )}

          <Grid item md={12}>
            <Controller
              name='name'
              control={control}
              render={({ field, fieldState }) => (
                <Autocomplete
                  options={items}
                  getOptionLabel={option => option.name}
                  value={items.find(item => item.id === field.value) || null}
                  onChange={(_, newValue) => {
                    field.onChange(newValue?.id ?? null)
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label='نام'
                      placeholder='انتخاب کنید'
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item md={6}>
            <Controller
              name='expert_id'
              control={control}
              render={({ field, fieldState }) => {
                const experts: Expert[] = upsertData?.data ?? []

                return (
                  <Autocomplete
                    options={experts}
                    loading={isLoading}
                    getOptionLabel={option => `${option.first_name} ${option.last_name}`}
                    value={experts.find((expert: any) => expert.id === field.value) ?? null}
                    onChange={(_, newValue) => {
                      field.onChange(newValue?.id ?? null)
                    }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label='کارشناس'
                        placeholder='انتخاب کنید'
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                )
              }}
            />
          </Grid>

          <Grid item md={6}>
            <Controller
              name='quantity'
              control={control}
              render={({ field, fieldState }) => {
                const value = field.value ?? 0

                return (
                  <TextField
                    {...field}
                    value={field.value ?? ''}
                    type='number'
                    label='تعداد'
                    placeholder='تعداد را وارد کنید'
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    onChange={e => {
                      const inputValue = e.target.value

                      field.onChange(inputValue === '' ? null : Number(inputValue))
                    }}
                    sx={{
                      '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                        WebkitAppearance: 'none',
                        margin: 0
                      },
                      '& input[type=number]': {
                        MozAppearance: 'textfield'
                      }
                    }}
                    slotProps={{
                      htmlInput: {
                        min: 0,
                        step: 1
                      },
                      input: {
                        startAdornment: (
                          <IconButton
                            size='small'
                            disabled={value <= 0}
                            onClick={() => field.onChange(Math.max(0, value - 1))}
                            sx={{
                              width: 30,
                              height: 30,
                              borderRadius: 1.5,
                              mr: 1,
                              color: 'text.secondary',
                              '&:hover': {
                                backgroundColor: 'action.hover',
                                color: 'primary.main'
                              }
                            }}
                          >
                            −
                          </IconButton>
                        ),

                        endAdornment: (
                          <IconButton
                            size='small'
                            onClick={() => field.onChange(value + 1)}
                            sx={{
                              width: 30,
                              height: 30,
                              borderRadius: 1.5,
                              ml: 1,
                              color: 'text.secondary',
                              '&:hover': {
                                backgroundColor: 'action.hover',
                                color: 'primary.main'
                              }
                            }}
                          >
                            +
                          </IconButton>
                        )
                      }
                    }}
                  />
                )
              }}
            />
          </Grid>

          <Grid item md={6}>
            <Controller
              name='unit_price'
              control={control}
              render={({ field, fieldState }) => {
                const formattedValue = field.value !== null ? Number(field.value).toLocaleString('en-US') : ''

                return (
                  <TextField
                    {...field}
                    value={formattedValue}
                    type='text'
                    label='مبلغ'
                    placeholder='مبلغ را وارد کنید'
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

          <Grid item md={6}>
            <TextField
              value={totalAmount !== null ? totalAmount.toLocaleString('en-US') : ''}
              type='text'
              label='جمع'
              fullWidth
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
          </Grid>

          <Grid item md={12}>
            <Controller
              name='description'
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label='توضیحات'
                  placeholder='توضیحات را وارد کنید'
                  multiline
                  rows={4}
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <Controller
              name='status'
              control={control}
              render={({ field }) => (
                <SwitchesBasic checked={field.value} onChange={field.onChange} disabled={isPending} />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          px: { xs: 5, sm: 8 },
          py: 4,
          borderTop: '1px solid',
          borderColor: 'divider',
          gap: 2,
          justifyContent: 'end'
        }}
      >
        <Button onClick={onClose} color='inherit' variant='outlined' disabled={isPending} sx={{ mt: 5 }}>
          انصراف
        </Button>

        <Button
          startIcon={<SaveOutlinedIcon />}
          variant='contained'
          color='primary'
          type='submit'
          disabled={isPending}
          sx={{ mt: 5 }}
        >
          ویرایش
        </Button>
      </DialogActions>
    </Dialog>
  )
}
