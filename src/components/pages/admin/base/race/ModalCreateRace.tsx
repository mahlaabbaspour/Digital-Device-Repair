import { GeTErrorFetch } from '@/components/elements/errorHandler'
import SubmitButton from '@/components/elements/submitButton'
import { Transition } from '@/helpers/DialogsHelper'
import { useCreateRace } from '@/hooks/admin/base/useRace'
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
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export default function ModalLCreateRace({
  onClose,
  open,
  title,
  description
}: {
  onClose: any
  open: boolean
  title: string
  description: string
}) {
  const { setError, control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: ''
    }
  })

  const { mutateAsync, isPending }: any = useCreateRace()

  async function onSubmit(values: any) {
    try {
      const res = await toast.promise(mutateAsync(values), {
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
                    InputProps={{ readOnly: false }}
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
          <SubmitButton disabled={isPending} />
        </DialogActions>
      </form>
    </Dialog>
  )
}
