import { GeTErrorFetch } from '@/components/elements/errorHandler'
import SubmitButton from '@/components/elements/submitButton'
import { Transition } from '@/helpers/DialogsHelper'
import { Icon } from '@iconify/react'
import {
  Autocomplete,
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
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import { useUpdateLessonEducation } from '@/hooks/organization/useLessonEducation'

export default function ModalUpdateLessonEducation({
  onClose,
  open,
  title,
  description,
  action,
  currentRow,
  id,
  data
}: {
  currentRow: any
  action: any
  onClose: any
  open: boolean
  title: string
  description: string
  id: any
  data: any
}) {
  const { setError, control, handleSubmit, setValue, clearErrors, reset } = useForm({
    defaultValues: {
      title: '',
      duration: '',
      activity_field_area_id: null,
      request_level_id: null,
      locality_permission_activity_ids: []
    }
  })

  useEffect(() => {
    if (currentRow) {
      clearErrors()
      setValue('title', currentRow?.title)
      setValue('duration', currentRow?.duration)
      setValue('activity_field_area_id', currentRow?.activityFieldArea)
      setValue('request_level_id', currentRow?.requestLevel)
      setValue('locality_permission_activity_ids', currentRow?.localityPermissionActivities)
    } else {
      clearErrors()
      setValue('title', '')
      setValue('duration', '')
    }
  }, [currentRow])

  const { mutateAsync, isPending }: any = useUpdateLessonEducation()

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

      const res = await toast.promise(mutateAsync({ data: result, id: id, rowId: currentRow?.id }), {
        pending: 'در حال انجام ...'
      })
      await onClose()
      reset()
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  return (
    <Dialog TransitionComponent={Transition} fullWidth open={open} maxWidth='lg' scroll='body'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 9, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ lineHeight: '1rem', fontWeight: 800 }}>
              {title}
            </Typography>
            <Typography variant='caption'>{description}</Typography>
          </Box>
          <Grid container spacing={5}>
            <Grid item xs={12} md={9}>
              <Controller
                name='title'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    label='عنوان دوره'
                    InputProps={{ readOnly: false }}
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Controller
                name='duration'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    label='مدت دوره (ساعت)'
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
                name='activity_field_area_id'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomAsyncAutocomplete
                    url={`/organization/3/education/lesson/base/select/activity-field-area`}
                    readOnly={false}
                    onAddValue={newValue => onChange(newValue)}
                    value={value}
                    getOptionLabel={optien => optien?.name}
                    label='زیرعنوان دوره'
                    error={!!error}
                    helperText={error?.message}
                  ></CustomAsyncAutocomplete>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name='request_level_id'
                control={control}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <Autocomplete
                    readOnly={false}
                    options={data?.requestLevels || []}
                    value={value}
                    onChange={(_, newvalue) => onChange(newvalue)}
                    noOptionsText='هیچ نتیجه ای یافت نشد'
                    getOptionLabel={(options: { name: string }) => options?.name || ''}
                    renderInput={params => (
                      <TextField label='سطح مخاطب دوره' {...params} error={!!error} helperText={error?.message} />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Controller
                name='locality_permission_activity_ids'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomAsyncAutocomplete
                    url={`/organization/${id}/education/lesson/base/select/locality-permission-activity`}
                    readOnly={false}
                    onAddValue={newValue => onChange(newValue)}
                    value={value}
                    multiple={true}
                    getOptionLabel={optien => optien?.name}
                    label='سازمان های مخاطب'
                    error={!!error}
                    helperText={error?.message}
                  ></CustomAsyncAutocomplete>
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' sx={{ fontFamily: 'inherit' }} color='error' onClick={onClose}>
            بستن
          </Button>

          {action === 'edit' && <SubmitButton disabled={isPending} />}
        </DialogActions>
      </form>
    </Dialog>
  )
}
