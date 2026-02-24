'use client'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
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
  Autocomplete,
  Chip,
  FormControlLabel,
  Switch
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { GeTErrorFetch } from '@/components/elements/errorHandler'
import { useSettings } from '@/@core/hooks/useSettings'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { convertEditorContent } from '@/helpers/EditorsHelper'
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import { useUpdateHistoryComposingRevisionTeachingPermission } from '@/hooks/organization/useRevisionTeachingPermission'

export default function UpdateHistoryComposingRevisionModal({
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
  const { settings } = useSettings()
  const { control, handleSubmit, setError, clearErrors, reset, setValue, watch } = useForm({
    defaultValues: {
      book_name: '',
      print_year: '',
      publication_name: '',
      composing_type_id: null,
      bookFile: null,
      status: '0',
      objection: ''
    }
  })

  useEffect(() => {
    if (rowSelect) {
      setValue('book_name', rowSelect?.book_name ? rowSelect?.book_name : '')
      setValue('print_year', rowSelect?.print_year ? rowSelect?.print_year : '')
      setValue('composing_type_id', rowSelect?.composingType ? rowSelect?.composingType : null)
      setValue('publication_name', rowSelect?.publication_name ? rowSelect?.publication_name : '')
      setValue('objection', rowSelect?.objection ? rowSelect?.objection : [])
      setValue('status', rowSelect?.status ? rowSelect?.status : '0')
    }
  }, [rowSelect])

  const { mutateAsync, isPending }: any = useUpdateHistoryComposingRevisionTeachingPermission()

  async function onSubmit(values: any) {
    try {
      const data = {
        status: values?.status,
        objection: values?.objection
      }
      const res: any = await toast.promise(mutateAsync({ data: data, id, revisionId, rowId: rowSelect?.id }), {
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
                  سوابق تالیف و ترجمه
                </Typography>
              }
              subheader={
                <Typography variant='caption'>می توانید اطلاعات سوابق تالیف و ترجمه خود را وارد کنید</Typography>
              }
            />
            <Divider />
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='book_name'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        InputProps={{ readOnly: disabled }}
                        helperText={error?.message}
                        fullWidth
                        label='نام کتاب / مقاله'
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='composing_type_id'
                    control={control}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <Autocomplete
                        readOnly={disabled}
                        options={upsertData?.composingTypes || []}
                        value={value}
                        onChange={(_, newvalue) => onChange(newvalue)}
                        noOptionsText='هیچ نتیجه ای یافت نشد'
                        getOptionLabel={(options: { name: string }) => options?.name || ''}
                        renderInput={params => (
                          <TextField
                            label='نوع تالیف / ترجمه'
                            {...params}
                            error={!!error}
                            helperText={error?.message}
                          />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='print_year'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        InputProps={{ readOnly: disabled }}
                        helperText={error?.message}
                        fullWidth
                        label='سال چاپ'
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='publication_name'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        InputProps={{ readOnly: disabled }}
                        helperText={error?.message}
                        fullWidth
                        label='نام انتشارات'
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
