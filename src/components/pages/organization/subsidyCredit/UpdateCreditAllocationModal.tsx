import CustomDateTimePicker from '@/components/elements/customDateTimePicker'
import { GeTErrorFetch } from '@/components/elements/errorHandler'
import SubmitButton from '@/components/elements/submitButton'
import { dateTimeConverter } from '@/helpers/DateHelpers'
import { Transition } from '@/helpers/DialogsHelper'
import { useCreateCreditAllocation, useUpdateCreditAllocation } from '@/hooks/organization/usesubsidyCredit'
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
  Typography,
  Divider
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import { useEffect } from 'react'
import { parse } from 'date-fns-jalali'

export default function ModalUpdateCreditAllocation({
  onClose,
  open,
  title,
  description,
  id,
  creditId,
  action,
  currentRow
}: {
  onClose: any
  open: boolean
  title: string
  description: string
  id: string
  creditId: string
  action: any
  currentRow: any
}) {
  const { setError, control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      price: '',
      // allocatee_ids: [],
      allocated_at: null,
      description: ''
    }
  })
  console.log(currentRow, 'currentRow')

  useEffect(() => {
    if (currentRow) {
      setValue('price', currentRow?.price)
      setValue('description', currentRow?.description)
      setValue(
        'allocated_at',
        //@ts-ignore
        currentRow?.allocated_at ? parse(currentRow?.allocated_at, 'yyyy/MM/dd HH:mm', new Date()) : null
      )
    }
  }, [currentRow])

  const { mutateAsync, isPending }: any = useUpdateCreditAllocation()

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
      const res = await toast.promise(
        mutateAsync({ data: result, id: id, creditId: creditId, rowId: currentRow?.id }),
        {
          pending: 'در حال انجام ...'
        }
      )

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
            <Typography variant='h5' sx={{ mb: 1, lineHeight: '1rem', fontWeight: 700 }}>
              {title}
            </Typography>
            <Typography variant='caption'>{description}</Typography>
          </Box>
          <Divider sx={{ mt: 3, mb: 7 }} />
          <Grid container spacing={5}>
            {/* <Grid item xs={12} md={12}>
              <Controller
                name='allocatee_ids'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomAsyncAutocomplete
                    url={`/organization/${id}/credit/base/select/allocatee`}
                    readOnly={false}
                    onAddValue={newValue => onChange(newValue)}
                    value={value}
                    multiple={true}
                    getOptionLabel={optien => optien?.name}
                    label='تخصیص گیرنده'
                    error={!!error}
                    helperText={error?.message}
                  ></CustomAsyncAutocomplete>
                )}
              />
            </Grid> */}
            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name='allocated_at'
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomDateTimePicker
                    error={!!error}
                    helperText={error?.message}
                    label='زمان تخصیص '
                    onChange={onChange}
                    value={value}
                    readOnly={false}
                  />
                )}
              />
            </Grid>

            <Grid item xs={3} sm={6}>
              <Controller
                name='price'
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
                      InputProps={{ readOnly: false }}
                    />
                  )
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name='description'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    error={!!error}
                    multiline
                    rows={3}
                    InputProps={{ readOnly: false }}
                    helperText={error?.message}
                    fullWidth
                    label='توضیحات'
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
  )
}
