import CustomDatePicker from '@/components/elements/customDatePicker'
import CustomDateTimePicker from '@/components/elements/customDateTimePicker'
import { GeTErrorFetch } from '@/components/elements/errorHandler'
import SubmitButton from '@/components/elements/submitButton'
import { dateConverter, dateTimeConverter } from '@/helpers/DateHelpers'
import { Transition } from '@/helpers/DialogsHelper'
import { useCreateSubsidyCredit, useUpdateSubsidyCredit } from '@/hooks/organization/usesubsidyCredit'
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
import { parse } from 'date-fns-jalali'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export default function ModalUpdateSubsidyCredit({
  onClose,
  open,
  title,
  description,
  id,
  action,
  currentRow
}: {
  onClose: any
  open: boolean
  title: string
  description: string
  id: string
  action: any
  currentRow: any
}) {
  console.log(action, 'action')
  const { setError, control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      title: '',
      start_time: null,
      end_time: null,
      final_price: ''
    }
  })

  useEffect(() => {
    if (currentRow) {
      setValue('title', currentRow?.title)

      setValue(
        'start_time',
        //@ts-ignore
        currentRow?.start_time ? parse(currentRow?.start_time, 'yyyy/MM/dd HH:mm', new Date()) : null
      )
      //@ts-ignore
      setValue('end_time', currentRow?.end_time ? parse(currentRow?.end_time, 'yyyy/MM/dd HH:mm', new Date()) : null)
      setValue('final_price', currentRow?.final_price)
    }
  }, [currentRow])

  const { mutateAsync, isPending }: any = useUpdateSubsidyCredit()

  async function onSubmit(values: any) {
    try {
      const result: any = {}
      Object.entries(values).forEach(([key, value]) => {
        if (value && typeof value === 'object' && 'id' in value) {
          result[key] = value?.id
        } else if (Array.isArray(value)) {
          result[key] = value.map((item: any) => (typeof item === 'object' && 'id' in item ? item?.id : item))
        } else if (value instanceof Date) {
          result[key] = dateTimeConverter(value)
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
    <Dialog TransitionComponent={Transition} fullWidth open={open} maxWidth='md' scroll='body'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 9, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 1, lineHeight: '1rem' }}>
              {title}
            </Typography>
            <Typography variant='caption'>{description}</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='title'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    error={!!error}
                    InputProps={{ readOnly: action == 'show' ? true : false }}
                    helperText={error?.message}
                    fullWidth
                    label='عنوان'
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name='start_time'
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomDateTimePicker
                    error={!!error}
                    helperText={error?.message}
                    label='تاریخ شروع '
                    onChange={onChange}
                    value={value}
                    readOnly={action == 'show' ? true : false}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name='end_time'
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomDateTimePicker
                    error={!!error}
                    helperText={error?.message}
                    label='تاریخ پایان '
                    onChange={onChange}
                    value={value}
                    readOnly={action == 'show' ? true : false}
                  />
                )}
              />
            </Grid>

            <Grid item xs={3} sm={6}>
              <Controller
                name='final_price'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => {
                  const formatNumber = (num: string) => num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  const removeCommas = (str: string) => str.replace(/,/g, '')

                  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const raw = removeCommas(e.target.value)
                    if (!/^\d*$/.test(raw)) return

                    onChange(raw)
                  }

                  return (
                    <TextField
                      label='هزینه (ریال)'
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                      value={value ? formatNumber(value.toString()) : ''}
                      onChange={handleChange}
                      InputProps={{ readOnly: action == 'show' ? true : false }}
                    />
                  )
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' sx={{ fontFamily: 'inherit' }} color='error' onClick={onClose}>
            بستن
          </Button>

          {action == 'edit' && <SubmitButton disabled={isPending} />}
        </DialogActions>
      </form>
    </Dialog>
  )
}
