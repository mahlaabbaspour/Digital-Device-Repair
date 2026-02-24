'use client'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Transition } from '@/helpers/DialogsHelper'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  FormControlLabel,
  Switch,
  Box
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { GeTErrorFetch } from '@/components/elements/errorHandler'
import { useUpdateCourseStudentInstitution } from '@/hooks/institution/education/useLessonEducation'
import { CloseRounded } from '@mui/icons-material'
import { toast } from 'react-toastify'
import { dateConverter } from '@/helpers/DateHelpers'
import { useEffect, useState } from 'react'
import CustomDatePicker from '@/components/elements/customDatePicker'
import { useSettings } from '@/@core/hooks/useSettings'
import validateExcel from '@/helpers/ValidateExcel'
import { uploadExcelToServer } from '@/libs/institution/education/lessonEducation'
import { parse } from 'date-fns-jalali'

export default function UpdateCourseStudentModal({
  onClose,
  open,
  id,
  courseId,
  rowSelect,
  upsertData,
  disabled
}: {
  onClose: any
  open: boolean
  id: string
  courseId: string
  rowSelect: any
  upsertData: any
  disabled: any
}) {
  const { settings } = useSettings()
  const { control, handleSubmit, setError, reset, watch, setValue } = useForm({
    defaultValues: {
      payment_status: 0,
      price: '',
      bankDocumentFile: null,
      bank_document_number: '',
      bank_document_date: null,
      description: '',
      student_ids: []
    }
  })

  useEffect(() => {
    if (rowSelect) {
      setValue('payment_status', Number(rowSelect?.payment_status))
      setValue('price', rowSelect?.price)
      setValue('bank_document_number', rowSelect?.bank_document_number)
      setValue(
        'bank_document_date',
        //@ts-ignore
        rowSelect?.bank_document_date ? parse(rowSelect?.bank_document_date, 'yyyy/MM/dd', new Date()) : null
      )
      setValue('description', rowSelect?.description)
    }
  }, [rowSelect])

  const [errorExcel, setErrorExcel] = useState<any>(null)

  const { mutateAsync, isPending }: any = useUpdateCourseStudentInstitution()

  async function onSubmit(values: any) {
    try {
      const date1 = values?.bank_document_date ? dateConverter(values?.bank_document_date) : null
      const data = {
        bank_document_date: date1,
        payment_status: values?.payment_status,
        price: values?.price,
        bankDocumentFile: values?.bankDocumentFile,
        bank_document_number: values?.bank_document_number,
        description: values?.description
      }
      await toast.promise(mutateAsync({ data: data, id, courseId, rowId: rowSelect?.id }), {
        pending: 'در حال انجام...'
      })
      onClose()
      reset()
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  const [value, setValue1] = useState<'group' | 'file'>('group')

  const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: 'group' | 'file' | null) => {
    if (newValue !== null) setValue1(newValue)
  }

  const [file, setFile]: any = useState(null)

  const handleFileUpload = async (event: any) => {
    const selectedFile = event.target.files[0]

    if (!selectedFile) {
      setFile(null)
      return
    }

    setFile(selectedFile)

    const errors = await validateExcel(selectedFile)
    setErrorExcel(errors)

    if (errors.length === 0) {
      try {
        await uploadExcelToServer(selectedFile)
      } catch (error) {
        throw error
      }
    }
  }

  return (
    <>
      <Dialog TransitionComponent={Transition} fullWidth open={open} maxWidth='lg' scroll='body'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
            <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
              <CloseRounded />
            </IconButton>
            <CardHeader
              sx={{ textAlign: 'center' }}
              title={
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                  ویرایش فراگیر
                </Typography>
              }
              subheader={<Typography variant='caption'>می توانید فراگیر مورد نظر خود را ویرایش کنید</Typography>}
            />
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Controller
                    name='payment_status'
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        label='اطلاعات پرداخت'
                        control={
                          <Switch checked={field.value === 1} onChange={(_, check) => field.onChange(check ? 1 : 0)} />
                        }
                      />
                    )}
                  />
                </Grid>

                {watch('payment_status') == 1 && (
                  <>
                    <Grid item xs={3} sm={4}>
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

                    <Grid item xs={12} sm={4}>
                      <Controller
                        name='bank_document_number'
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            error={!!error}
                            InputProps={{ readOnly: false }}
                            helperText={error?.message}
                            fullWidth
                            label='شماره سند بانکی'
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Controller
                        control={control}
                        name='bank_document_date'
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                          <CustomDatePicker
                            error={!!error}
                            helperText={error?.message}
                            label='تاریخ سند بانکی'
                            onChange={onChange}
                            value={value}
                            readOnly={false}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Controller
                        name='bankDocumentFile'
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Box
                            border={0.3}
                            borderRadius={0.8}
                            overflow='hidden'
                            display='flex'
                            height={51}
                            borderColor={settings.mode === 'dark' ? '#57596C' : '#BFBFD5'}
                          >
                            <label htmlFor='file-input-bank'>
                              {!value && (
                                <Button
                                  variant='contained'
                                  component='span'
                                  sx={{
                                    height: '100%',
                                    width: 120,
                                    borderRadius: '0 4px 4px 0'
                                  }}
                                >
                                  <Typography variant='body2' color='white'>
                                    بارگذاری فایل
                                  </Typography>
                                </Button>
                              )}

                              {value && (
                                <Button
                                  onClick={() => onChange(null)}
                                  variant='contained'
                                  component='span'
                                  sx={{
                                    height: '100%',
                                    width: 105,
                                    borderRadius: '0 4px 4px 0'
                                  }}
                                >
                                  <Typography variant='body2' color='white'>
                                    حذف فایل
                                  </Typography>
                                </Button>
                              )}
                            </label>

                            <Box display='flex' alignItems='center' px={2} fontSize={13} color='grey'>
                              {value ? (
                                //@ts-ignore
                                <p>{value.name}</p>
                              ) : (
                                <p>فایل مورد نظر خود را انتخاب کنید</p>
                              )}
                            </Box>

                            <input
                              type='file'
                              id='file-input-bank'
                              style={{ display: 'none' }}
                              onChange={(e: any) => {
                                const file = e.target.files[0] ?? null
                                onChange(file)
                              }}
                            />
                          </Box>
                        )}
                      />
                    </Grid>
                  </>
                )}

                <Grid item xs={12} sm={12}>
                  <Controller
                    name='description'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        InputProps={{ readOnly: false }}
                        helperText={error?.message}
                        multiline
                        rows={3}
                        fullWidth
                        label='توضیحات'
                      />
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
