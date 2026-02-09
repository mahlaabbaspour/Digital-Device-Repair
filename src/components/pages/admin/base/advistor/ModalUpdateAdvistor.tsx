'use client'

import { useEffect } from 'react'

import { Controller, useForm } from 'react-hook-form'

import { useUpdateAdvistor } from '@/hooks/admin/base/useAdvistor'

import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'
import { Transition } from '@/helpers/DialogsHelper'

import { Box, Button, Dialog, DialogActions, DialogContent, Grid, IconButton, Typography } from '@mui/material'
import { GeTErrorFetch } from '@/components/elements/errorHandler'
import SubmitButton from '@/components/elements/submitButton'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'

export default function ModalUpdateAdvistor({
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
      advisor_ids: {},
      activity_field_area_ids: []
    }
  })

  const advistor = {
    id: currentRow?.id,
    first_name: currentRow?.first_name,
    last_name: currentRow?.last_name,
    username: currentRow?.username
  }

  useEffect(() => {
    if (currentRow && advistor) {
      clearErrors()
      setValue('advisor_ids', advistor)
      setValue('activity_field_area_ids', currentRow?.activityFieldAreas)
    } else {
      clearErrors()
      setValue('advisor_ids', '')
    }
  }, [currentRow])

  const id = currentRow?.id
  const { mutateAsync, isPending }: any = useUpdateAdvistor()

  async function onSubmit(values: any) {
    try {
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

      await toast.promise(mutateAsync({ data: result, id: id }), {
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
                name='advisor_ids'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomAsyncAutocomplete
                    url='/admin/base/select/user'
                    readOnly={true}
                    onAddValue={newValue => onChange(newValue)}
                    value={value}
                    getOptionLabel={option => ` ${option?.first_name} ${option?.last_name}- ${option?.username}`}
                    label='مشاوران'
                    error={!!error}
                    helperText={error?.message}
                  ></CustomAsyncAutocomplete>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name='activity_field_area_ids'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomAsyncAutocomplete
                    url='/admin/base/select/consulting-activity-field-area'
                    readOnly={false}
                    onAddValue={newValue => onChange(newValue)}
                    value={value}
                    multiple={true}
                    getOptionLabel={optien => optien?.name}
                    label='حوزه های فعالیت'
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

          {action === 'edit' && <SubmitButton disabled={isPending} />}
        </DialogActions>
      </form>
    </Dialog>
  )
}
