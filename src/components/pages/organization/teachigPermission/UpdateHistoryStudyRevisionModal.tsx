'use client'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { Transition } from '@/helpers/DialogsHelper'
import { Icon } from '@iconify/react'
import {
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
  Autocomplete,
  FormControlLabel,
  Switch
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { GeTErrorFetch } from '@/components/elements/errorHandler'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useUpdateHistoryStudyRevisionTeachingPermission } from '@/hooks/organization/useRevisionTeachingPermission'

export default function UpdateHistoryStudyRevisionModal({
  onClose,
  open,
  id,
  revisionId,
  upsertData,
  rowSelect,
  disabled
}: {
  onClose: any
  open: boolean
  id: string
  revisionId: string
  upsertData: any
  rowSelect: any
  disabled: boolean
}) {
  const { control, handleSubmit, setError, clearErrors, setValue, reset, watch } = useForm({
    defaultValues: {
      study_level_id: null,
      study_group_id: null,
      study_major_id: null,
      study_university_type_id: null,
      status: '0',
      objection: ''
    }
  })

  useEffect(() => {
    if (rowSelect) {
      clearErrors()
      setValue('study_level_id', rowSelect?.studyLevel ? rowSelect?.studyLevel : null)
      setValue('study_group_id', rowSelect?.studyGroup ? rowSelect?.studyGroup : null)
      setValue('study_major_id', rowSelect?.studyMajor ? rowSelect?.studyMajor : null)
      setValue('study_university_type_id', rowSelect?.studyUniversityType ? rowSelect?.studyUniversityType : null)
      setValue('objection', rowSelect?.objection ? rowSelect?.objection : [])
      setValue('status', rowSelect?.status ? rowSelect?.status : '0')
    }
  }, [rowSelect])

  const { mutateAsync, isPending }: any = useUpdateHistoryStudyRevisionTeachingPermission()

  async function onSubmit(values: any) {
    try {
      const data = {
        status: values?.status,
        objection: values?.objection
      }
      const res: any = await toast.promise(mutateAsync({ data: data, id, revisionId, rowId: rowSelect?.id }), {
        pending: 'در حال انجام...'
      })
      console.log(res, 'res')
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
                        readOnly={true}
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
                        readOnly={true}
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
                        readOnly={true}
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
                        readOnly={true}
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
                    name='status'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <FormControlLabel
                        label='تایید نهایی'
                        control={
                          <Switch
                            checked={value === '1'}
                            onChange={(_, check) => onChange(check ? '1' : '0')}
                            readOnly={disabled}
                          />
                        }
                      />
                    )}
                  />
                </Grid>

                {watch('status') == '0' && (
                  <Grid item xs={12}>
                    <Controller
                      name='objection'
                      control={control}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <Autocomplete
                          multiple
                          freeSolo
                          options={[]}
                          readOnly={disabled}
                          //@ts-ignore
                          value={value}
                          onChange={(_, newValue) => onChange(newValue)}
                          renderInput={params => (
                            <TextField error={!!error} helperText={error?.message} {...params} label='دلایل رد' />
                          )}
                        />
                      )}
                    />
                  </Grid>
                )}
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
