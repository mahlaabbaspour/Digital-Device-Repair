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

import SwitchesBasic from '@/components/SwitchBasic'
import { useCreateExpert } from '@/hooks/admin/expert/useExpert'

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
  first_name: string
  last_name: string
  national_code: string
  mobile: string
  status: boolean
}

export default function ExpertCreate({ open, onClose }: Props) {
  const { mutateAsync: createExpert, isPending } = useCreateExpert()

  const { control, handleSubmit, reset, setError } = useForm<FormValue>({
    defaultValues: {
      first_name: '',
      last_name: '',
      national_code: '',
      mobile: '',
      status: true
    }
  })

  const onSubmit = async (data: FormValue) => {
    try {
      await createExpert(data)

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
            <DialogTitle sx={{ p: 0, fontSize: '1.2rem', fontWeight: 700 }}>ایجاد کارشناس</DialogTitle>

            <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
              اطلاعات کارشناس را وارد کنید
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
              name='first_name'
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label='نام'
                  fullWidth
                  placeholder='نام کارشناس را وارد کنید'
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name='last_name'
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label='نام خانوادگی'
                  placeholder='نام خانوادگی کارشناس را وارد کنید'
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name='national_code'
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label='کدملی'
                  placeholder='مثال: 0123456789'
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name='mobile'
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label='موبایل'
                  placeholder='مثال: 09153456789'
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
          ثبت
        </Button>
      </DialogActions>
    </Dialog>
  )
}
