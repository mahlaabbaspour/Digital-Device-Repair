import { GeTErrorFetch } from '@/components/elements/errorHandler'
import SubmitButton from '@/components/elements/submitButton'
import { Transition } from '@/helpers/DialogsHelper'
import { Icon } from '@iconify/react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useStatusCancelMeeting } from '@/hooks/institution/advisoryMeeting/useCalender'
import { dateTimeConverter } from '@/helpers/DateHelpers'
import CustomDateTimePicker from '@/components/elements/customDateTimePicker'

export default function MeetingStatusModal({
  onClose,
  open,
  title,
  description,
  id,
  currunt
}: {
  onClose: any
  open: boolean
  title: string
  description: string
  id: string
  currunt: any
}) {
  const { setError, control, handleSubmit, setValue, clearErrors, reset } = useForm({
    defaultValues: {
      status: '0',
      decided_at: null,
      description: ''
    }
  })

  const { mutateAsync, isPending }: any = useStatusCancelMeeting()

  async function onSubmit(values: any) {
    try {
      const time = values?.decided_at ? dateTimeConverter(values?.decided_at) : null
      const data = {
        status: values?.status,
        decided_at: time,
        description: values?.description
      }
      await toast.promise(mutateAsync({ data: data, id: id, rowId: currunt?.id }), {
        pending: 'در حال انجام...'
      })
      onClose()
      reset()
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  return (
    <>
      <Dialog TransitionComponent={Transition} fullWidth open={open} maxWidth='md' scroll='body'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
            <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
              <Icon icon='mdi:close' />
            </IconButton>
            <Box sx={{ mb: 9, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ lineHeight: '1rem', fontWeight: 700 }}>
                {title}
              </Typography>
              <Typography variant='caption'>{description}</Typography>
            </Box>
            <Divider />
            <Grid container spacing={5} mb={10} mt={5}>
              <Grid item xs={12}>
                <Controller
                  name='description'
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
                      label='توضیحات'
                    />
                  )}
                />
              </Grid>
              {/* date */}
              <Grid item xs={12} md={6}>
                <Controller
                  control={control}
                  name='decided_at'
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomDateTimePicker
                      error={!!error}
                      helperText={error?.message}
                      label='زمان'
                      onChange={onChange}
                      value={value}
                      readOnly={false}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}></Grid>

              {/* sun */}
              <Grid item xs={3}>
                <Controller
                  name='status'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      label='تایید'
                      control={<Switch checked={value === '1'} onChange={(_, check) => onChange(check ? '1' : '0')} />}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant='outlined' sx={{ fontFamily: 'inherit' }} color='error' onClick={onClose}>
              بستن
            </Button>

            <SubmitButton disabled={isPending} />
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
