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
  Typography,
  CardContent,
  CardHeader,
  Divider,
  Autocomplete
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { GeTErrorFetch } from '@/components/elements/errorHandler'
import { useSettings } from '@/@core/hooks/useSettings'
import { useCreateHistoryTeachingTeachingPermission } from '@/hooks/user/useTeachigPermission'
import { toast } from 'react-toastify'
import CustomDatePicker from '@/components/elements/customDatePicker'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import { dateConverter } from '@/helpers/DateHelpers'

export default function CreateHistoryTeachingModal({
  onClose,
  open,
  id,
  teachId,
  upsertData
}: {
  onClose: any
  open: boolean
  id: string
  teachId: string
  upsertData: any
}) {
  const { settings } = useSettings()
  const { control, handleSubmit, setError, reset } = useForm({
    defaultValues: {
      course_name: '',
      executor_name: '',
      duration: '',
      start_date: null,
      end_date: null,
      executor_type_id: null,
      request_level_id: null,
      region_ids: [],
      historyFile: null
    }
  })

  const { mutateAsync, isPending }: any = useCreateHistoryTeachingTeachingPermission()

  async function onSubmit(values: any) {
    try {
      const result: any = {}
      Object.entries(values).forEach(([key, value]) => {
        if (value && typeof value === 'object' && 'id' in value) {
          result[key] = value?.id
        } else if (Array.isArray(value)) {
          result[key] = value.map((item: any) => (typeof item === 'object' && 'id' in item ? item?.id : item))
        } else if (value instanceof Date) {
          result[key] = dateConverter(value)
        } else {
          result[key] = value
        }
      })
      const res: any = await toast.promise(mutateAsync({ data: result, id, teachId }), {
        pending: 'در حال انجام...'
      })
      if (res?.status) {
        onClose()
        reset()
      }
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  return (
    <>
      <Dialog TransitionComponent={Transition} fullWidth open={open} maxWidth='lg' scroll='body'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
            <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
              <Icon icon='mdi:close' />
            </IconButton>
            <CardHeader
              sx={{ textAlign: 'center' }}
              title={
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                  سوابق تدریس
                </Typography>
              }
              subheader={<Typography variant='caption'>می توانید اطلاعات سوابق تدریس خود را وارد کنید</Typography>}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='course_name'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        InputProps={{ readOnly: false }}
                        helperText={error?.message}
                        fullWidth
                        label='نام دوره'
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Controller
                    name='executor_name'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        InputProps={{ readOnly: false }}
                        helperText={error?.message}
                        fullWidth
                        label='نام مجری دوره'
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Controller
                    name='duration'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        InputProps={{ readOnly: false }}
                        helperText={error?.message}
                        fullWidth
                        label='مدت دوره (ساعت)'
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Controller
                    name='request_level_id'
                    control={control}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <Autocomplete
                        readOnly={false}
                        options={upsertData?.requestLevels || []}
                        value={value}
                        onChange={(_, newvalue) => onChange(newvalue)}
                        noOptionsText='هیچ نتیجه ای یافت نشد'
                        getOptionLabel={(options: { name: string }) => options?.name || ''}
                        renderInput={params => (
                          <TextField label='سطح تدریس' {...params} error={!!error} helperText={error?.message} />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Controller
                    control={control}
                    name='start_date'
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <CustomDatePicker
                        error={!!error}
                        helperText={error?.message}
                        label='تاریخ شروع '
                        onChange={onChange}
                        value={value}
                        readOnly={false}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Controller
                    control={control}
                    name='end_date'
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <CustomDatePicker
                        error={!!error}
                        helperText={error?.message}
                        label='تاریخ پایان'
                        onChange={onChange}
                        value={value}
                        readOnly={false}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Controller
                    name='executor_type_id'
                    control={control}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <Autocomplete
                        readOnly={false}
                        options={upsertData?.executorTypes || []}
                        value={value}
                        onChange={(_, newvalue) => onChange(newvalue)}
                        noOptionsText='هیچ نتیجه ای یافت نشد'
                        getOptionLabel={(options: { name: string }) => options?.name || ''}
                        renderInput={params => (
                          <TextField label='نوع مجری دوره' {...params} error={!!error} helperText={error?.message} />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <Controller
                    name='region_ids'
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <CustomAsyncAutocomplete
                        url={`/user/${id}/education/request-teaching-permission/base/select/city`}
                        readOnly={false}
                        onAddValue={newValue => onChange(newValue)}
                        value={value}
                        getOptionLabel={optien => optien?.name}
                        label='شهرستان ها'
                        multiple={true}
                        error={!!error}
                        helperText={error?.message}
                      ></CustomAsyncAutocomplete>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name='historyFile'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Box
                        border={0.3}
                        borderRadius={0.8}
                        overflow='hidden'
                        display='flex'
                        justifyContent='start'
                        height={51}
                        borderColor={settings.mode === 'dark' ? '#57596C' : '#BFBFD5'}
                      >
                        <label htmlFor={`file-input`}>
                          {
                            //@ts-ignore
                            !value?.length && (
                              <Button
                                variant='contained'
                                component='span'
                                style={{
                                  height: '100%',
                                  overflow: 'hidden',
                                  width: '120px',
                                  borderTopRightRadius: 1,
                                  borderBottomRightRadius: 1,
                                  borderTopLeftRadius: 0,
                                  borderBottomLeftRadius: 0
                                }}
                              >
                                <Typography variant='body2' color='white'>
                                  بارگذاری فایل
                                </Typography>
                              </Button>
                            )
                          }
                          {
                            //@ts-ignore
                            value?.length > 0 && (
                              <Button
                                onClick={() => onChange(null)}
                                variant='contained'
                                component='span'
                                style={{
                                  height: '100%',
                                  overflow: 'hidden',
                                  width: '105px',
                                  borderTopRightRadius: 1,
                                  borderBottomRightRadius: 1,
                                  borderTopLeftRadius: 0,
                                  borderBottomLeftRadius: 0
                                }}
                              >
                                <Typography variant='body2' color='white'>
                                  حذف فایل
                                </Typography>
                              </Button>
                            )
                          }
                        </label>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            paddingRight: '18px',
                            paddingLeft: '8px',
                            fontSize: '13px',
                            color: 'grey'
                          }}
                        >
                          {
                            //@ts-ignore
                            value?.length > 0 ? (
                              <p>فایل های موردنظر انتخاب شدند</p>
                            ) : (
                              <p>فایل مورد نظر خود را انتخاب کنید</p>
                            )
                          }
                        </div>
                        <input
                          name='file-e'
                          type='file'
                          id={`file-input`}
                          onChange={(e: any) => {
                            const files = Array.from(e.target.files)
                            onChange(files[0] ? files[0] : null)
                          }}
                          style={{ display: 'none' }}
                        />
                      </Box>
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </DialogContent>
          <DialogActions>
            <Button variant='outlined' sx={{ fontFamily: 'inherit' }} color='error' onClick={onClose}>
              بستن
            </Button>
            <Button
              variant='contained'
              sx={{ fontFamily: 'inherit' }}
              color='primary'
              disabled={isPending}
              type='submit'
            >
              ثبت
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
