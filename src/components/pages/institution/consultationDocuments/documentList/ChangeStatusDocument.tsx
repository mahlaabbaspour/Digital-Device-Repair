'use client'

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
  Typography,
  CardContent,
  CardHeader,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Divider,
  selectClasses,
  TextField
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { GeTErrorFetch } from '@/components/elements/errorHandler'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import { toast } from 'react-toastify'
import { useChangeDocument } from '@/hooks/institution/consultationDocuments/useDocumentList'
import { useEffect, useState } from 'react'

export default function CreateReservationMeetingSingle({
  onClose,
  open,
  id,
  selectedRow
}: {
  onClose: any
  open: boolean
  id: string
  selectedRow: any
}) {
  const { control, handleSubmit, setError, clearErrors, setValue, watch } = useForm({
    defaultValues: {
      consultation_document_status_id: null,
      target_institution_id: null,
      referral_description: ''
    }
  })

  useEffect(() => {
    if (selectedRow) {
      setValue('consultation_document_status_id', selectedRow?.consultationDocumentStatus?.id)
    }
  }, [selectedRow])

  const { mutateAsync, isPending }: any = useChangeDocument()

  async function onSubmit(values: any) {
    try {
      if (!values?.consultation_document_status_id) {
        toast.error('ایتدا وضعیت پرونده را انتخاب کنید')
      }

      const data = {
        consultation_document_status_id: Number(values?.consultation_document_status_id),
        target_institution_id: values?.target_institution_id?.id ?? null,
        referral_description: values?.referral_description
      }

      const res: any = await toast.promise(mutateAsync({ data: data, id: id, rowId: selectedRow?.id }), {
        pending: ' در حال انجام ...'
      })
      onClose()
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  return (
    <>
      <Dialog TransitionComponent={Transition} fullWidth open={open} maxWidth='md' scroll='body'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
            <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
              <Icon icon='mdi:close' />
            </IconButton>
            <CardHeader
              sx={{ textAlign: 'center' }}
              title={
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                  تغییر وضعیت پرونده{' '}
                </Typography>
              }
              subheader={
                <Typography variant='caption'>
                  می توانید پرونده با شماره پرونده {selectedRow?.document_number} را وضعیت ان را تغییر دهید
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2
                }}
              >
                <FormControl component='fieldset'>
                  <Controller
                    name='consultation_document_status_id'
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <RadioGroup
                        row
                        value={value}
                        onChange={e => {
                          onChange(e?.target?.value)
                        }}
                      >
                        <FormControlLabel
                          value='1'
                          control={<Radio disabled={selectedRow?.consultationDocumentStatus?.id === 1} />}
                          label='مفتوح'
                        />
                        <FormControlLabel
                          value='2'
                          control={<Radio disabled={selectedRow?.consultationDocumentStatus?.id === 3} />}
                          label='مختومه'
                        />
                        <FormControlLabel value='3' control={<Radio />} label='ارجاع شده' />
                      </RadioGroup>
                    )}
                  />
                </FormControl>

                {watch('consultation_document_status_id') == 3 && (
                  <Grid container spacing={5} justifyContent='center'>
                    <Grid item xs={12} md={9}>
                      <Controller
                        name='target_institution_id'
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                          <CustomAsyncAutocomplete
                            url={`/institution/${id}/consultation-document/base/select/institution`}
                            readOnly={false}
                            onAddValue={newValue => onChange(newValue)}
                            value={value}
                            getOptionLabel={optien => optien?.name}
                            label='مرکز'
                            error={!!error}
                            helperText={error?.message}
                          ></CustomAsyncAutocomplete>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={9}>
                      <Controller
                        name='referral_description'
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            multiline
                            rows={3}
                            InputProps={{ readOnly: false }}
                            error={!!error}
                            helperText={error?.message}
                            {...field}
                            value={field.value ?? ''}
                            fullWidth
                            label='توضیحات ارجاع'
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                )}
              </Box>
            </CardContent>
          </DialogContent>
          <DialogActions>
            <Button variant='outlined' sx={{ fontFamily: 'inherit' }} color='error' onClick={onClose}>
              بستن
            </Button>

            <Button variant='contained' sx={{ fontFamily: 'inherit' }} type='submit' color='primary' disabled={false}>
              ثبت
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
