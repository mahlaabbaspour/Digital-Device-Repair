'use client'

import type { ReactElement, Ref } from 'react'
import { forwardRef } from 'react'

import { Controller, useForm } from 'react-hook-form'
import type { FadeProps } from '@mui/material'
import {
  alpha,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fade,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { LuPackageSearch } from 'react-icons/lu'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'

import { useCreateProduct } from '@/hooks/admin/product/useProduct'
import SwitchesBasic from '@/components/SwitchBasic'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type Props = {
  open: boolean
  onClose: () => void
}

type FormValue = {
  name: string
  brand: string
  sale_price: number | null
  stock: number | null
  status: boolean
}

export default function ProductCreate({ open, onClose }: Props) {
  const { mutateAsync: createProduct, isPending } = useCreateProduct()

  const { control, handleSubmit, reset, setError } = useForm<FormValue>({
    defaultValues: {
      name: '',
      brand: '',
      sale_price: null,
      stock: null,
      status: true
    }
  })

  const onSubmit = async (data: FormValue) => {
    try {
      await createProduct(data)

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

  return (
    <Dialog
      scroll='body'
      maxWidth='md'
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
            <LuPackageSearch size={22} />
          </Box>

          <Box>
            <DialogTitle sx={{ p: 0, fontSize: '1.2rem', fontWeight: 700 }}>ایجاد کالا</DialogTitle>

            <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
              اطلاعات کالا را وارد کنید
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
          <Grid item xs={12} md={6}>
            <Controller
              name='name'
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label='نام'
                  fullWidth
                  placeholder='نام کالا را وارد کنید'
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name='brand'
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label='برند'
                  placeholder='برند کالا را وارد کنید'
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name='sale_price'
              control={control}
              render={({ field, fieldState }) => {
                const formattedValue = field.value !== null ? Number(field.value).toLocaleString('en-US') : ''

                return (
                  <TextField
                    {...field}
                    value={formattedValue}
                    type='text'
                    label='قیمت فروش'
                    placeholder='قیمت فروش کالا را وارد کنید'
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

          <Grid item xs={12} md={6}>
            <Controller
              name='stock'
              control={control}
              render={({ field, fieldState }) => {
                const value = field.value ?? 0

                return (
                  <TextField
                    {...field}
                    value={field.value ?? ''}
                    type='number'
                    label='موجودی کالا'
                    placeholder='تعداد موجودی را وارد کنید'
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
          ثبت
        </Button>
      </DialogActions>
    </Dialog>
  )
}
