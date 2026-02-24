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
import { useCreateCourseStudentInstitution } from '@/hooks/institution/education/useLessonEducation'
import { CloseRounded } from '@mui/icons-material'
import { toast } from 'react-toastify'
import { dateConverter } from '@/helpers/DateHelpers'
import { useState } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import CustomDatePicker from '@/components/elements/customDatePicker'
import { useSettings } from '@/@core/hooks/useSettings'
import { Icon } from '@iconify/react'
import FileList from './FileList'
import validateExcel from '@/helpers/ValidateExcel'
import ExcelErrorsTable from './ExcelErrorsTable'
import { uploadExcelToServer } from '@/libs/institution/education/lessonEducation'

export default function CreateCourseStudentModal({
  onClose,
  open,
  id,
  courseId
}: {
  onClose: any
  open: boolean
  id: string
  courseId: string
}) {
  const { settings } = useSettings()
  const { control, handleSubmit, setError, reset, watch } = useForm({
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

  const [errorExcel, setErrorExcel] = useState<any>(null)
  const [user, setUser] = useState(null)

  const { mutateAsync, isPending }: any = useCreateCourseStudentInstitution()

  async function onSubmit(values: any) {
    try {
      const date1 = values?.bank_document_date ? dateConverter(values?.bank_document_date) : null
      const data = {
        bank_document_date: date1,
        payment_status: values?.payment_status,
        price: values?.price,
        bankDocumentFile: values?.bankDocumentFile,
        bank_document_number: values?.bank_document_number,
        description: values?.description,
        student_ids: values?.student_ids.length > 0 ? values?.student_ids?.map((el: any) => el?.id) : user
      }
      await toast.promise(mutateAsync({ data: data, id, courseId }), {
        pending: 'در حال انجام...'
      })
      onClose()
      reset()
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  const [value, setValue] = useState<'group' | 'file'>('group')

  const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: 'group' | 'file' | null) => {
    if (newValue !== null) setValue(newValue)
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
        const res = await uploadExcelToServer({ data: selectedFile, id: id, courseId: courseId })
        if (!res?.status) {
          setErrorExcel(res?.message?.errors)
        } else if (res?.status) {
          setUser(res?.data?.user_ids)
        }
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
                  فراگیران
                </Typography>
              }
              subheader={<Typography variant='caption'>می توانید فراگیر مورد نظر خود را ایجاد کنید</Typography>}
            />
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} md={12} display='flex' justifyContent='center' alignItems='center'>
                  <ToggleButtonGroup
                    value={value}
                    exclusive
                    onChange={handleChange}
                    sx={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      backgroundColor: '#d7d4f8ff',
                      '& .MuiToggleButton-root': {
                        minWidth: 140,
                        height: 56,
                        fontSize: '16px',
                        fontWeight: 500,
                        border: 'none',
                        color: '#4b44b3',
                        backgroundColor: '#d7d4f8ff',
                        transition: 'all 0.25s ease',

                        '&:hover': {
                          backgroundColor: '#c9c5f5'
                        },

                        '&.Mui-selected': {
                          backgroundColor: '#675DD8',
                          color: '#fff',
                          fontWeight: 700,

                          '&:hover': {
                            backgroundColor: '#5a50cc'
                          }
                        }
                      }
                    }}
                  >
                    <ToggleButton value='group'>گروهی</ToggleButton>
                    <ToggleButton value='file'>فایل</ToggleButton>
                  </ToggleButtonGroup>
                </Grid>

                {value == 'group' && (
                  <>
                    <Grid item xs={12} md={12}>
                      <Controller
                        name='student_ids'
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                          <CustomAsyncAutocomplete
                            url={`/institution/${id}/education/course/core/course/${courseId}/course-student/student`}
                            readOnly={false}
                            onAddValue={newValue => onChange(newValue)}
                            value={value}
                            multiple={true}
                            getOptionLabel={optien =>
                              `${optien?.first_name} ${optien?.last_name} (${optien?.username})`
                            }
                            label='فراگیران'
                            error={!!error}
                            helperText={error?.message}
                          ></CustomAsyncAutocomplete>
                        )}
                      />
                    </Grid>
                  </>
                )}

                {value == 'file' && (
                  <>
                    <Grid container spacing={4} alignItems='end'>
                      <Grid item xs={12} sm={6}>
                        <div style={{ display: 'flex', marginTop: '1px', alignItems: 'start' }}>
                          <div>
                            <Icon width={25} icon='mdi:lightbulb-on-90' color='yellow' />
                          </div>
                          <Typography ml={1} variant='h6'>
                            راهنما
                          </Typography>
                        </div>
                        <FileList id={id} courseId={courseId} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant='body2'>فرمت فایل باید XLSX باشد</Typography>
                        <Box
                          border={0.3}
                          borderRadius={0.8}
                          overflow='hidden'
                          display='flex'
                          justifyContent='start'
                          height={61}
                          borderColor={settings.mode === 'dark' ? '#57596C' : '#BFBFD5'}
                        >
                          <label htmlFor='file-input'>
                            {!file && (
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
                                <Typography variant='body1' color='white'>
                                  بارگذاری فایل
                                </Typography>
                              </Button>
                            )}
                            {file && (
                              <Button
                                onClick={() => {
                                  setFile(null)
                                  setErrorExcel(null)
                                }}
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
                                <Typography color='white'>حذف فایل</Typography>
                              </Button>
                            )}
                          </label>
                          <span
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'start',
                              paddingRight: '18px',
                              paddingLeft: '8px',
                              fontSize: '13px',
                              color: 'grey'
                            }}
                          >
                            {file ? file['name'] : 'یک فایل انتخاب کنید'}
                          </span>
                          {!file && (
                            <input
                              name='file'
                              type='file'
                              accept='.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                              id='file-input'
                              onChange={handleFileUpload}
                              style={{ display: 'none' }}
                            />
                          )}
                          {file && <input style={{ display: 'none' }} />}
                        </Box>
                      </Grid>
                    </Grid>
                  </>
                )}

                {errorExcel?.length > 0 && (
                  <Grid item xs={12} sm={12}>
                    <ExcelErrorsTable errors={errorExcel} />
                  </Grid>
                )}

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
