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
import { useUpdateHistoryStudyTeachingPermission } from '@/hooks/user/useTeachigPermission'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

export default function UpdateHistoryStudyModal({
  onClose,
  open,
  id,
  teachId,
  upsertData,
  rowSelect,
  disabled
}: {
  onClose: any
  open: boolean
  id: string
  teachId: string
  upsertData: any
  rowSelect: any
  disabled: boolean
}) {
  console.log(disabled, 'disableeeeeeeeeee')
  const { settings } = useSettings()
  const { control, handleSubmit, setError, clearErrors, setValue, reset } = useForm({
    defaultValues: {
      study_level_id: null,
      study_group_id: null,
      study_major_id: null,
      study_university_type_id: null,
      diplomaFile: null
    }
  })

  useEffect(() => {
    if (rowSelect) {
      clearErrors()
      setValue('study_level_id', rowSelect?.studyLevel ? rowSelect?.studyLevel : null)
      setValue('study_group_id', rowSelect?.studyGroup ? rowSelect?.studyGroup : null)
      setValue('study_major_id', rowSelect?.studyMajor ? rowSelect?.studyMajor : null)
      setValue('study_university_type_id', rowSelect?.studyUniversityType ? rowSelect?.studyUniversityType : null)
    }
  }, [rowSelect])

  const { mutateAsync, isPending }: any = useUpdateHistoryStudyTeachingPermission()

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
      const res: any = await toast.promise(mutateAsync({ data: result, id, teachId, rowId: rowSelect?.id }), {
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
                  سوابق تحصیلی
                </Typography>
              }
              subheader={<Typography variant='caption'>می توانید اطلاعات سوابق تحصیلی خود را وارد کنید</Typography>}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name='study_level_id'
                    control={control}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <Autocomplete
                        readOnly={disabled}
                        options={upsertData?.studyLevels || []}
                        value={value}
                        onChange={(_, newvalue) => onChange(newvalue)}
                        noOptionsText='هیچ نتیجه ای یافت نشد'
                        getOptionLabel={(options: { name: string }) => options?.name || ''}
                        renderInput={params => (
                          <TextField label='مقطع تحصیلی' {...params} error={!!error} helperText={error?.message} />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name='study_group_id'
                    control={control}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <Autocomplete
                        readOnly={disabled}
                        options={upsertData?.studyGroups || []}
                        value={value}
                        onChange={(_, newvalue) => onChange(newvalue)}
                        noOptionsText='هیچ نتیجه ای یافت نشد'
                        getOptionLabel={(options: { name: string }) => options?.name || ''}
                        renderInput={params => (
                          <TextField label='گروه تحصیلی' {...params} error={!!error} helperText={error?.message} />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='study_major_id'
                    control={control}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <Autocomplete
                        readOnly={disabled}
                        options={upsertData?.studyMajors || []}
                        value={value}
                        onChange={(_, newvalue) => onChange(newvalue)}
                        noOptionsText='هیچ نتیجه ای یافت نشد'
                        getOptionLabel={(options: { name: string }) => options?.name || ''}
                        renderInput={params => (
                          <TextField label='رشته تحصیلی' {...params} error={!!error} helperText={error?.message} />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='study_university_type_id'
                    control={control}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <Autocomplete
                        readOnly={disabled}
                        options={upsertData?.studyUniversityTypes || []}
                        value={value}
                        onChange={(_, newvalue) => onChange(newvalue)}
                        noOptionsText='هیچ نتیجه ای یافت نشد'
                        getOptionLabel={(options: { name: string }) => options?.name || ''}
                        renderInput={params => (
                          <TextField
                            label='دانشگاه محل تدریس'
                            {...params}
                            error={!!error}
                            helperText={error?.message}
                          />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='diplomaFile'
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
            {!disabled && (
              <Button
                variant='contained'
                sx={{ fontFamily: 'inherit' }}
                color='primary'
                disabled={isPending}
                type='submit'
              >
                ثبت
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
