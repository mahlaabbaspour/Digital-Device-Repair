import { GeTErrorFetch } from '@/components/elements/errorHandler'
import SubmitButton from '@/components/elements/submitButton'
import { Transition } from '@/helpers/DialogsHelper'
import { useUpdateEducation } from '@/hooks/admin/base/useEducation'
import { Icon } from '@iconify/react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material'
import { act, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export default function ModalUpdateEducation({
  onClose,
  open,
  title,
  description,
  action,
  currentRow
}: {
  currentRow: any
  action: any
  onClose: any
  open: boolean
  title: string
  description: string
}) {
  const { setError, control, handleSubmit, setValue, clearErrors, reset } = useForm({
    defaultValues: {
      name: currentRow?.name
    }
  })

  useEffect(() => {
    if (currentRow) {
      clearErrors()
      setValue('name', currentRow?.name)
    } else {
      clearErrors()
      setValue('name', '')
    }
  }, [currentRow])

  const id = currentRow?.id
  const { mutateAsync, isPending }: any = useUpdateEducation()

  async function onSubmit(values: any) {
    try {
      await toast.promise(mutateAsync({ data: values, id: id }), {
        pending: 'در حال انجام ...'
      })
      await onClose()
      reset()
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  return (
    <Dialog TransitionComponent={Transition} fullWidth open={open} maxWidth='md' scroll='body'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 9, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 4, lineHeight: '1rem' }}>
              {title}
            </Typography>
            <Typography variant='caption'>{description}</Typography>
          </Box>
          <Grid container spacing={2} mb={10} mt={2} justifyContent='center'>
            <Grid xs={12}>
              <Controller
                name='name'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    label='نام زبان'
                    InputProps={{ readOnly: action === 'show' }}
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' sx={{ fontFamily: 'inherit' }} color='error' onClick={onClose}>
            انصراف
          </Button>

          {action === 'edit' && <SubmitButton disabled={isPending} />}
        </DialogActions>
      </form>
    </Dialog>
  )
}
