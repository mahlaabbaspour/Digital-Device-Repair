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
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useUpdateServiceRecipient } from '@/hooks/admin/base/useServiceRecipient'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import axiosConfig from '@/libs/auth/axios'

export default function ModalUpdateServiceRecipient({
  action,
  currentRow,
  onClose,
  open,
  title,
  description
}: {
  action: any
  currentRow: any
  onClose: any
  open: boolean
  title: string
  description: string
}) {
  const data = {
    id: currentRow?.itemId,
    label: currentRow?.label,
    parent: currentRow?.parent ?? null
  }

  const { setError, control, handleSubmit, reset, setValue, clearErrors } = useForm({
    defaultValues: {
      name: '',
      parent_id: null
    }
  })
  const id = currentRow?.itemId

  // const { data : dataShow , isLoading } = useQuery({
  //             queryKey: ['serviceRecipient'],
  //             queryFn: async () => {
  //                 try {
  //                      const res = await axiosConfig.get(`/admin/base/service-recipient-type/show/${currentRow?.itemId}`)
  //                      const data = await res.data;

  //                      return data

  //                 } catch (error) {
  //                      throw error
  //                 }
  //             },
  //             staleTime: 5 * 60 * 1000,
  //             enabled: true
  //         })

  useEffect(() => {
    if (data) {
      clearErrors()
      setValue('name', data?.label)
      setValue('parent_id', data?.parent)
    }
  }, [data])

  const { mutateAsync, isPending }: any = useUpdateServiceRecipient()

  async function onSubmit(values: any) {
    const result: any = {}
    Object.entries(values).forEach(([key, value]) => {
      if (value && typeof value === 'object' && 'id' in value) {
        result[key] = value?.id
      } else if (Array.isArray(value)) {
        result[key] = value.map((item: any) => (typeof item === 'object' && 'id' in item ? item?.id : item))
      } else {
        result[key] = value
      }
    })
    try {
      const res = await toast.promise(mutateAsync({ data: result, id: id }), {
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
            <Grid item xs={12} md={6}>
              <Controller
                name='name'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    label='نام'
                    InputProps={{ readOnly: false }}
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name='parent_id'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomAsyncAutocomplete
                    url='/admin/base/select/parent'
                    readOnly={false}
                    onAddValue={newValue => onChange(newValue)}
                    value={value}
                    getOptionLabel={optien => optien?.name}
                    label='والد'
                    error={!!error}
                    helperText={error?.message}
                  ></CustomAsyncAutocomplete>
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
