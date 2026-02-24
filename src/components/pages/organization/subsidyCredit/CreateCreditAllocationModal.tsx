import CustomDateTimePicker from '@/components/elements/customDateTimePicker'
import { GeTErrorFetch } from '@/components/elements/errorHandler'
import SubmitButton from '@/components/elements/submitButton'
import { dateTimeConverter } from '@/helpers/DateHelpers'
import { Transition } from '@/helpers/DialogsHelper'
import { useCreateCreditAllocation } from '@/hooks/organization/usesubsidyCredit'
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
  Divider,
  DialogTitle
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import { useMemo, useState } from 'react'

export default function ModalCreateCreditAllocation({
  onClose,
  open,
  title,
  description,
  id,
  creditId,
  show
}: {
  onClose: any
  open: boolean
  title: string
  description: string
  id: string
  creditId: string
  show: any
}) {
  const { setError, control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      price: '',
      allocatee_ids: [],
      allocated_at: null,
      description: ''
    }
  })

  const countAllocatee = watch('allocatee_ids').length
  const totalBudget = Number(show?.remaining_credit)

  const [allocated, setAllocated] = useState<number>(0)
  const [priceMount, setPriceMount] = useState<any>(null)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [resolver, setResolver] = useState<any>(null)

  const confirmBudget = () => {
    return new Promise<boolean>(resolve => {
      setResolver(() => resolve)
      setOpenConfirm(true)
    })
  }

  console.log(Number(show?.remaining_credit), 'sjflsjdlfjls')

  const { mutateAsync, isPending }: any = useCreateCreditAllocation()

  async function onSubmit(values: any) {
    try {
      if (Number(priceMount) < 0 || Number(show?.final_price) < Number(priceMount)) {
        const confirmed = await confirmBudget()

        if (!confirmed) return
      }

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
      const res = await toast.promise(mutateAsync({ data: result, id: id, creditId: creditId }), {
        pending: 'در حال انجام ...'
      })

      await onClose()
      reset()
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  const remaining = useMemo(() => {
    const value = totalBudget - allocated * countAllocatee
    setPriceMount(value)
    return value
  }, [allocated, countAllocatee])

  const formatPrice = (num: number) => num.toLocaleString('fa-IR')

  return (
    <>
      <Dialog open={openConfirm} onClose={() => resolver?.(false)} hideBackdrop>
        <DialogTitle sx={{ fontWeight: 700, color: '#D32F2F' }}>هشدار بودجه</DialogTitle>

        <DialogContent>
          <Typography>
            بودجه تخصیص داده شده بیشتر از بودجه کل می‌باشد. آیا مطمئن هستید که می‌خواهید ادامه دهید؟
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setOpenConfirm(false)
              resolver?.(false)
            }}
            variant='outlined'
          >
            انصراف
          </Button>

          <Button
            onClick={() => {
              setOpenConfirm(false)
              resolver?.(true)
            }}
            variant='contained'
            color='error'
          >
            تایید و ادامه
          </Button>
        </DialogActions>
      </Dialog>

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

            <Box
              sx={{
                background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
                borderRadius: 4,
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                boxShadow: '0 8px 20px rgba(255,152,0,0.15)',
                border: '1px solid #FFE0B2'
              }}
            >
              {/* بودجه کل */}
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography
                  variant='h6'
                  sx={{
                    fontWeight: 500,
                    color: '#E65100'
                  }}
                >
                  بودجه کل
                </Typography>

                <Typography
                  variant='h4'
                  sx={{
                    fontWeight: 800,
                    color: '#BF360C',
                    textDecoration: 'line-through'
                  }}
                >
                  {formatPrice(show?.remaining_credit || 0)} تومان
                </Typography>
              </Box>

              {/* مانده بودجه */}
              <Box display='flex' justifyContent='flex-end'>
                <Typography
                  variant='body2'
                  sx={{
                    color: remaining === 0 ? '#D32F2F' : '#2E7D32',
                    fontWeight: 600
                  }}
                >
                  مانده بودجه: {formatPrice(remaining)} تومان
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={5} mt={8}>
              <Grid item xs={12} md={12}>
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
              </Grid>
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
                      setAllocated(Number(raw))
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
    </>
  )
}
