'use client'

import { SyntheticEvent, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  styled,
  Tab,
  Typography,
  TypographyProps,
  IconButton,
  Button,
  TextField,
  CardActions,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  Switch,
  FormControlLabel
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { BiLogoTripAdvisor, BiSolidInfoSquare, BiSolidMessageSquareDetail } from 'react-icons/bi'
import DropzoneWrapper from '@/views/react-dropzone/index'

import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import CustomTimePicker from '@/components/elements/customTimePicker'
import moment from 'moment-jalaali'
import { useUpdateProfileInstitution } from '@/hooks/institution/base/profile'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CloseIcon from '@mui/icons-material/Close'
import { GeTErrorFetch } from '@/components/elements/errorHandler'
moment.loadPersian({ dialect: 'persian-modern' })

interface Shift {
  id: string
  title: string
  start_time: Date | null
  end_time: Date | null
  editing: boolean
  saved_start_time?: string
  saved_end_time?: string
  active: boolean
}

type DayRow = {
  dayId: number
  name: string
  shifts: Shift[]
}

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 250
  }
}))

const HeadingTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    // marginBottom: theme.spacing(1)
  }
}))

export default function ProfileInstitutionShow({ id, show }: any) {
  console.log(show, 'show')
  const [value, setTabValue] = useState<string>('info')
  const handleTabsChange = (event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue)
  }

  const [value1, setTabValue1] = useState<string>('infoAdditional')
  const handleTabsChange1 = (event: SyntheticEvent, newValue: string) => {
    setTabValue1(newValue)
  }

  const [value2, setTabValue2] = useState<string>('advisorAdditional')
  const handleTabsChange2 = (event: SyntheticEvent, newValue: string) => {
    setTabValue2(newValue)
  }

  const handleLinkClickImg = (event: SyntheticEvent) => {
    event.preventDefault()
  }

  const roomsShow = show?.rooms?.map((el: any) => el?.title)
  const [fields, setFields] = useState<string[]>(roomsShow ?? [])
  const handleAddField = () => {
    setFields(prev => [...prev, ''])
  }

  const handleChange = (index: number, value: string) => {
    setFields(prev => prev.map((f, i) => (i === index ? value : f)))
  }

  ////Repeater for Shift
  const WEEK_DAYS: DayRow[] = [
    { dayId: 1, name: 'شنبه', shifts: [] },
    { dayId: 2, name: 'یکشنبه', shifts: [] },
    { dayId: 3, name: 'دوشنبه', shifts: [] },
    { dayId: 4, name: 'سه‌شنبه', shifts: [] },
    { dayId: 5, name: 'چهارشنبه', shifts: [] },
    { dayId: 6, name: 'پنجشنبه', shifts: [] },
    { dayId: 7, name: 'جمعه', shifts: [] }
  ]

  useEffect(() => {
    if (!show?.workShifts?.length) return

    const filledDays = WEEK_DAYS.map(day => {
      const dayShifts = show?.workShifts
        .filter((ws: any) => ws.weekDay?.id === day.dayId)
        .map((ws: any) => ({
          id: ws.id.toString(),
          title: ws.title,
          start_time: moment(ws.start_time, 'HH:mm:ss').toDate(),
          end_time: moment(ws.end_time, 'HH:mm:ss').toDate(),
          saved_start_time: moment(ws.start_time, 'HH:mm:ss').format('HH:mm'),
          saved_end_time: moment(ws.end_time, 'HH:mm:ss').format('HH:mm'),
          editing: false,
          active: ws.status === '1'
        }))

      return {
        ...day,
        shifts: dayShifts
      }
    })

    setRows(filledDays)
  }, [show?.workShifts])

  const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID()
    }
    // fallback
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 8)
  }

  const [rows, setRows] = useState<DayRow[]>(WEEK_DAYS)
  const handleAddShift = (dayId: number) => {
    setRows(prev =>
      prev.map(day => {
        if (day.dayId !== dayId) return day

        const hasUnSaved = day.shifts.some(s => s.editing === true)
        if (hasUnSaved) {
          toast.error('لطفا ابتدا شیفت قبلی را ذخیره کنید')
          return day
        }

        const newShift: Shift = {
          id: generateId(),
          title: '',
          start_time: null,
          end_time: null,
          saved_start_time: '',
          saved_end_time: '',
          editing: true,
          active: true
        }

        return {
          ...day,
          shifts: [...day.shifts, newShift]
        }
      })
    )
  }

  const updateShift = (dayId: number, shiftId: string, updated: Partial<Shift>) => {
    setRows(prev =>
      prev.map(day =>
        day.dayId === dayId
          ? {
              ...day,
              shifts: day.shifts.map(shift => (shift.id === shiftId ? { ...shift, ...updated } : shift))
            }
          : day
      )
    )
  }

  const saveShift = (dayId: number, shiftId: string) => {
    setRows(prev =>
      prev.map(day =>
        day.dayId === dayId
          ? {
              ...day,
              shifts: day.shifts.map(shift =>
                shift.id === shiftId
                  ? {
                      ...shift,
                      saved_start_time: shift.start_time ? moment(shift.start_time).format('HH:mm') : '',
                      saved_end_time: shift.end_time ? moment(shift.end_time).format('HH:mm') : '',
                      editing: false,
                      active: shift.active ?? true
                    }
                  : shift
              )
            }
          : day
      )
    )
  }

  const deleteShift = (dayId: number, shiftId: string) => {
    setRows(prev =>
      prev.map(day => (day.dayId === dayId ? { ...day, shifts: day.shifts.filter(s => s.id !== shiftId) } : day))
    )
  }
  /////////////////////////////////////////

  const { control, handleSubmit, setError, clearErrors, setValue } = useForm({
    defaultValues: {
      banner: null,
      logo: null,
      seal: null,
      mangerSignature: null,
      mediaGallery: [],
      session_duration: '',
      break_duration: '',
      supervisor_ids: [],
      advisor_ids: [],
      is_holiday: '0',
      activityFieldAreas: [],
      consultation_fee: '',
      is_consultation_subsidy_evaluator: '0'
    }
  })

  useEffect(() => {
    if (show) {
      clearErrors()
      setValue('supervisor_ids', show?.supervisors)
      setValue('advisor_ids', show?.advisors)
      setValue('session_duration', show?.session_duration)
      setValue('break_duration', show?.break_duration)
      setValue('activityFieldAreas', show?.activityFieldAreas)
      setValue('consultation_fee', show?.consultation_fee),
        setValue('is_consultation_subsidy_evaluator', show?.is_consultation_subsidy_evaluator)
    }
  }, [show])

  const formattedData = rows
    .filter(day => day.shifts && day.shifts.length > 0)
    .map((day: any) => ({
      week_day_id: day.dayId,
      shifts: day.shifts.map((shift: any) => ({
        title: shift.title,
        start_time: shift.saved_start_time,
        end_time: shift.saved_end_time,
        status: shift.status ?? 1
      }))
    }))
  const rooms = fields.map((room: any) => ({ title: room }))

  const { mutateAsync, isPending }: any = useUpdateProfileInstitution()

  const onSubmit = async (values: any) => {
    try {
      const data = {
        ...values,
        advisor_ids: values?.advisor_ids?.map((el: any) => el?.id) ?? [],
        supervisor_ids: values?.supervisor_ids?.map((el: any) => el?.id) ?? [],
        banner: values?.banner ?? null,
        logo: values?.logo ?? null,
        mangerSignature: values?.mangerSignature ?? null,
        seal: values?.seal ?? null,
        rooms: rooms,
        work_shifts: formattedData
      }

      const res = await toast.promise(mutateAsync({ data: data, id: id }), {
        pending: 'در حال انجام...'
      })
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TabContext value={value}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <Card sx={{ mb: 5 }}>
                <TabList
                  variant='scrollable'
                  scrollButtons={false}
                  onChange={handleTabsChange}
                  sx={{
                    borderBottom: theme => `1px solid ${theme.palette.divider}`,
                    width: '100%',
                    display: 'flex',
                    '& .MuiTab-root': {
                      flex: 1,
                      minWidth: 0,
                      maxWidth: 'none',
                      '&:not(:last-child)': {
                        marginRight: 1
                      }
                    }
                  }}
                >
                  <Tab
                    icon={<BiSolidInfoSquare size={20} />}
                    value='info'
                    label='اطلاعات مرکز'
                    sx={{
                      fontFamily: 'inherit',
                      width: '100%'
                    }}
                  />
                  <Tab
                    icon={<BiLogoTripAdvisor size={20} />}
                    value='advisor'
                    label='مشاوره'
                    sx={{
                      fontFamily: 'inherit',
                      width: '100%'
                    }}
                  />
                </TabList>
              </Card>
            </Grid>
          </Grid>

          <TabPanel sx={{ padding: 0 }} value='info'>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TabContext value={value1}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={12}>
                      <Card sx={{ mb: 5 }}>
                        <TabList
                          variant='scrollable'
                          scrollButtons={false}
                          onChange={handleTabsChange1}
                          sx={{
                            borderBottom: theme => `1px solid ${theme.palette.divider}`,
                            width: '100%',
                            display: 'flex',
                            '& .MuiTab-root': {
                              flex: 1,
                              minWidth: 0,
                              maxWidth: 'none',
                              '&:not(:last-child)': {
                                marginRight: 1
                              }
                            }
                          }}
                        >
                          <Tab
                            icon={<BiSolidInfoSquare size={20} />}
                            value='infoAdditional'
                            label='اطلاعات اولیه مرکز'
                            sx={{
                              fontFamily: 'inherit',
                              width: '100%'
                            }}
                          />

                          <Tab
                            icon={<BiSolidMessageSquareDetail size={20} />}
                            value='mediaGallery'
                            label='گالری تصاویر'
                            sx={{
                              fontFamily: 'inherit',
                              width: '100%'
                            }}
                          />
                        </TabList>

                        <TabPanel sx={{ padding: 0 }} value='infoAdditional'>
                          <CardHeader
                            title={<Typography variant='h6'>اطلاعات مرکز</Typography>}
                            subheader={
                              <Typography variant='caption'>می توانید اطلاعات کلی مرکز را مشاهده نمایید</Typography>
                            }
                          />
                          <CardContent>
                            <Grid container spacing={5}>
                              {/* name */}
                              <Grid item xs={4}>
                                <TextField
                                  InputProps={{ readOnly: true }}
                                  value={show?.name ?? ''}
                                  fullWidth
                                  label='نام مرکز'
                                />
                              </Grid>
                              {/* manager */}
                              <Grid item xs={4}>
                                <TextField
                                  InputProps={{ readOnly: true }}
                                  value={`${show?.manager?.first_name} ${show?.manager?.last_name} - ${show?.manager?.username}`}
                                  fullWidth
                                  label='مدیر'
                                />
                              </Grid>

                              {/* postal_code */}
                              <Grid item xs={4}>
                                <TextField
                                  InputProps={{ readOnly: true }}
                                  value={show?.postal_code ?? ''}
                                  fullWidth
                                  label='کد پستی'
                                />
                              </Grid>

                              {/* activityFieldAreas */}
                              <Grid item xs={12}>
                                <Controller
                                  name='activityFieldAreas'
                                  control={control}
                                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <CustomAsyncAutocomplete
                                      url={`/institution/${id}/membership/core/profile/institution-activity-field-area`}
                                      readOnly={true}
                                      onAddValue={newValue => onChange(newValue)}
                                      value={value}
                                      getOptionLabel={option => option?.name}
                                      label='حوزه های حیطه فعالیت'
                                      multiple={true}
                                      error={!!error}
                                      helperText={error?.message}
                                    ></CustomAsyncAutocomplete>
                                  )}
                                />
                              </Grid>

                              {/* address */}
                              <Grid item xs={12}>
                                <TextField
                                  InputProps={{ readOnly: false }}
                                  value={show?.address ?? ''}
                                  fullWidth
                                  label='آدرس'
                                />
                              </Grid>

                              {/* banner */}
                              <Grid item xs={4.5}>
                                <Controller
                                  name='banner'
                                  control={control}
                                  defaultValue={null}
                                  render={({ field: { onChange, value } }) => {
                                    //@ts-ignore
                                    const file = value instanceof File ? value : null

                                    // preview فقط برای نمایش
                                    const previewUrl = file ? URL.createObjectURL(file) : show?.banner?.address || null

                                    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                                      const selectedFile = e.target.files?.[0]
                                      if (!selectedFile) return

                                      if (!['image/jpeg', 'image/jpg'].includes(selectedFile.type)) {
                                        alert('فقط JPG قابل انتخاب است')
                                        return
                                      }

                                      onChange(selectedFile)
                                    }

                                    const handleRemove = (e: React.MouseEvent) => {
                                      e.stopPropagation()
                                      onChange(null)
                                    }

                                    return (
                                      <Box
                                        sx={{
                                          width: '100%',
                                          border: '1px solid #e8e6f9',
                                          borderRadius: 2,
                                          overflow: 'hidden',
                                          bgcolor: '#fafafa'
                                        }}
                                      >
                                        {/* Header */}
                                        <Box
                                          sx={{
                                            p: 1.5,
                                            bgcolor: '#e8e6f9',
                                            borderBottom: '1px solid #ddd',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center'
                                          }}
                                        >
                                          <Typography color='#7367F0' variant='subtitle1'>
                                            آپلود بنر مرکز
                                          </Typography>
                                          <Typography color='#7367F0' variant='caption'>
                                            اینجا می‌توانید تصویر بنر مرکز را انتخاب و مشاهده کنید
                                          </Typography>
                                        </Box>

                                        {/* Upload Area */}
                                        <Box
                                          component='label'
                                          sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: 150,
                                            cursor: 'pointer',
                                            position: 'relative',
                                            bgcolor: '#f2f2f2',
                                            borderRadius: '0 0 12px 12px',
                                            overflow: 'hidden',
                                            borderTop: '1px solid #ddd'
                                          }}
                                        >
                                          {previewUrl ? (
                                            <>
                                              <img
                                                src={previewUrl}
                                                alt='banner'
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                              />

                                              <Box
                                                onClick={handleRemove}
                                                sx={{
                                                  position: 'absolute',
                                                  top: 8,
                                                  right: 8,
                                                  width: 28,
                                                  height: 28,
                                                  bgcolor: 'rgba(255,255,255,0.8)',
                                                  borderRadius: '50%',
                                                  display: 'flex',
                                                  justifyContent: 'center',
                                                  alignItems: 'center',
                                                  cursor: 'pointer',
                                                  '&:hover': { bgcolor: 'rgba(255,255,255,1)' }
                                                }}
                                              >
                                                <CloseIcon sx={{ fontSize: 20, color: '#d32f2f' }} />
                                              </Box>
                                            </>
                                          ) : (
                                            <Box sx={{ textAlign: 'center' }}>
                                              <CloudUploadIcon sx={{ fontSize: 40, color: '#888' }} />
                                              <Typography color='primary' sx={{ mt: 1 }}>
                                                کلیک کنید یا تصویر را بکشید
                                              </Typography>
                                            </Box>
                                          )}

                                          <input
                                            type='file'
                                            accept='image/jpeg,image/jpg'
                                            hidden
                                            onChange={handleFileChange}
                                          />
                                        </Box>
                                      </Box>
                                    )
                                  }}
                                />
                              </Grid>

                              {/* logo */}
                              <Grid item xs={2.5}>
                                <Controller
                                  name='logo'
                                  control={control}
                                  render={({ field: { onChange, value } }) => {
                                    //@ts-ignore
                                    const file = value instanceof File ? value : null
                                    const localPreviewUrl = file ? URL.createObjectURL(file) : null
                                    const previewUrl = localPreviewUrl || show?.logo?.address

                                    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                                      const selectedFile = e.target.files?.[0]
                                      if (!selectedFile) return

                                      if (selectedFile.type !== 'image/png') {
                                        alert('فقط فایل PNG قابل انتخاب است')
                                        e.target.value = ''
                                        return
                                      }

                                      onChange(selectedFile)
                                    }

                                    return (
                                      <Box
                                        sx={{
                                          width: '100%',
                                          border: '1px solid #e8e6f9',
                                          borderRadius: 2,
                                          overflow: 'hidden',
                                          bgcolor: '#fafafa'
                                        }}
                                      >
                                        {/* Header بالای باکس */}
                                        <Box
                                          sx={{
                                            p: 1.5,
                                            bgcolor: '#e8e6f9',
                                            borderBottom: '1px solid #ddd',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center'
                                          }}
                                        >
                                          <Typography color='#7367F0' variant='subtitle1'>
                                            آپلود لوگو مرکز
                                          </Typography>
                                          <Typography color='#7367F0' variant='caption'>
                                            فقط فایل PNG قابل انتخاب است
                                          </Typography>
                                        </Box>

                                        {/* باکس آپلود + پیش‌نمایش */}
                                        <Box
                                          component='label'
                                          sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: 150,
                                            cursor: 'pointer',
                                            position: 'relative',
                                            bgcolor: '#f2f2f2',
                                            borderRadius: '0 0 12px 12px',
                                            overflow: 'hidden',
                                            borderTop: '1px solid #ddd'
                                          }}
                                        >
                                          {previewUrl ? (
                                            <>
                                              <img
                                                src={previewUrl}
                                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                              />
                                              <Box
                                                onClick={e => {
                                                  e.stopPropagation()
                                                  onChange([])
                                                }}
                                                sx={{
                                                  position: 'absolute',
                                                  top: 8,
                                                  right: 8,
                                                  width: 28,
                                                  height: 28,
                                                  bgcolor: 'rgba(255,255,255,0.8)',
                                                  borderRadius: '50%',
                                                  display: 'flex',
                                                  justifyContent: 'center',
                                                  alignItems: 'center',
                                                  cursor: 'pointer',
                                                  '&:hover': { bgcolor: 'rgba(255,255,255,1)' }
                                                }}
                                              >
                                                <CloseIcon sx={{ fontSize: 20, color: '#d32f2f' }} />
                                              </Box>
                                            </>
                                          ) : (
                                            <Box sx={{ textAlign: 'center' }}>
                                              <CloudUploadIcon sx={{ fontSize: 40, color: '#888' }} />
                                              <Typography color='primary' sx={{ mt: 1 }}>
                                                کلیک کنید یا تصویر را بکشید
                                              </Typography>
                                            </Box>
                                          )}
                                          <input type='file' accept='image/png' hidden onChange={handleFileChange} />
                                        </Box>
                                      </Box>
                                    )
                                  }}
                                />
                              </Grid>

                              {/* seal */}
                              <Grid item xs={2.5}>
                                <Controller
                                  name='seal'
                                  control={control}
                                  render={({ field: { onChange, value } }) => {
                                    //@ts-ignore
                                    const file = value instanceof File ? value : null
                                    const localPreviewUrl = file ? URL.createObjectURL(file) : null
                                    const previewUrl = localPreviewUrl || show?.seal?.address

                                    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                                      const selectedFile = e.target.files?.[0]
                                      if (!selectedFile) return

                                      if (selectedFile.type !== 'image/png') {
                                        alert('فقط فایل PNG قابل انتخاب است')
                                        e.target.value = ''
                                        return
                                      }

                                      onChange(selectedFile)
                                    }

                                    return (
                                      <Box
                                        sx={{
                                          width: '100%',
                                          border: '1px solid #e8e6f9',
                                          borderRadius: 2,
                                          overflow: 'hidden',
                                          bgcolor: '#fafafa'
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            p: 1.5,
                                            bgcolor: '#e8e6f9',
                                            borderBottom: '1px solid #e8e6f9',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center'
                                          }}
                                        >
                                          <Typography color='#7367F0' variant='subtitle1'>
                                            آپلود مهر مرکز
                                          </Typography>
                                          <Typography color='#7367F0' variant='caption'>
                                            فقط فایل PNG قابل انتخاب است
                                          </Typography>
                                        </Box>

                                        <Box
                                          component='label'
                                          sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: 150,
                                            cursor: 'pointer',
                                            position: 'relative',
                                            bgcolor: '#f2f2f2',
                                            borderRadius: '0 0 12px 12px',
                                            overflow: 'hidden',
                                            borderTop: '1px solid #ddd'
                                          }}
                                        >
                                          {previewUrl ? (
                                            <>
                                              <img
                                                src={previewUrl}
                                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                              />
                                              <Box
                                                onClick={e => {
                                                  e.stopPropagation()
                                                  onChange([])
                                                }}
                                                sx={{
                                                  position: 'absolute',
                                                  top: 8,
                                                  right: 8,
                                                  width: 28,
                                                  height: 28,
                                                  bgcolor: 'rgba(255,255,255,0.8)',
                                                  borderRadius: '50%',
                                                  display: 'flex',
                                                  justifyContent: 'center',
                                                  alignItems: 'center',
                                                  cursor: 'pointer',
                                                  '&:hover': { bgcolor: 'rgba(255,255,255,1)' }
                                                }}
                                              >
                                                <CloseIcon sx={{ fontSize: 20, color: '#d32f2f' }} />
                                              </Box>
                                            </>
                                          ) : (
                                            <Box sx={{ textAlign: 'center' }}>
                                              <CloudUploadIcon sx={{ fontSize: 40, color: '#888' }} />
                                              <Typography color='primary' sx={{ mt: 1 }}>
                                                کلیک کنید یا تصویر را بکشید
                                              </Typography>
                                            </Box>
                                          )}
                                          <input type='file' accept='image/png' hidden onChange={handleFileChange} />
                                        </Box>
                                      </Box>
                                    )
                                  }}
                                />
                              </Grid>

                              {/* mangerSignature */}
                              <Grid item xs={2.5}>
                                <Controller
                                  name='mangerSignature'
                                  control={control}
                                  render={({ field: { onChange, value } }) => {
                                    //@ts-ignore
                                    const file = value instanceof File ? value : null
                                    const localPreviewUrl = file ? URL.createObjectURL(file) : null
                                    const previewUrl = localPreviewUrl || show?.mangerSignature?.address

                                    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                                      const selectedFile = e.target.files?.[0]
                                      if (!selectedFile) return

                                      if (selectedFile.type !== 'image/png') {
                                        alert('فقط فایل PNG قابل انتخاب است')
                                        e.target.value = ''
                                        return
                                      }

                                      onChange(selectedFile)
                                    }

                                    return (
                                      <Box
                                        sx={{
                                          width: '100%',
                                          border: '1px solid #e8e6f9',
                                          borderRadius: 2,
                                          overflow: 'hidden',
                                          bgcolor: '#fafafa'
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            p: 1.5,
                                            bgcolor: '#e8e6f9',
                                            borderBottom: '1px solid #e8e6f9',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center'
                                          }}
                                        >
                                          <Typography color='#7367F0' variant='subtitle1'>
                                            آپلود امضای مدیر مرکز
                                          </Typography>
                                          <Typography color='#7367F0' variant='caption'>
                                            فقط فایل PNG قابل انتخاب است
                                          </Typography>
                                        </Box>

                                        <Box
                                          component='label'
                                          sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: 150,
                                            cursor: 'pointer',
                                            position: 'relative',
                                            bgcolor: '#f2f2f2',
                                            borderRadius: '0 0 12px 12px',
                                            overflow: 'hidden',
                                            borderTop: '1px solid #ddd'
                                          }}
                                        >
                                          {previewUrl ? (
                                            <>
                                              <img
                                                src={previewUrl}
                                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                              />
                                              <Box
                                                onClick={e => {
                                                  e.stopPropagation()
                                                  onChange([])
                                                }}
                                                sx={{
                                                  position: 'absolute',
                                                  top: 8,
                                                  right: 8,
                                                  width: 28,
                                                  height: 28,
                                                  bgcolor: 'rgba(255,255,255,0.8)',
                                                  borderRadius: '50%',
                                                  display: 'flex',
                                                  justifyContent: 'center',
                                                  alignItems: 'center',
                                                  cursor: 'pointer',
                                                  '&:hover': { bgcolor: 'rgba(255,255,255,1)' }
                                                }}
                                              >
                                                <CloseIcon sx={{ fontSize: 20, color: '#d32f2f' }} />
                                              </Box>
                                            </>
                                          ) : (
                                            <Box sx={{ textAlign: 'center' }}>
                                              <CloudUploadIcon sx={{ fontSize: 40, color: '#888' }} />
                                              <Typography color='primary' sx={{ mt: 1 }}>
                                                کلیک کنید یا تصویر را بکشید
                                              </Typography>
                                            </Box>
                                          )}
                                          <input type='file' accept='image/png' hidden onChange={handleFileChange} />
                                        </Box>
                                      </Box>
                                    )
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </CardContent>

                          <CardActions
                            sx={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              alignItems: 'flex-end'
                            }}
                          >
                            <Button
                              variant='contained'
                              endIcon={<IoArrowBack />}
                              onClick={() => setTabValue1('mediaGallery')}
                            >
                              بعدی
                            </Button>
                          </CardActions>
                        </TabPanel>

                        <TabPanel sx={{ padding: 0 }} value='mediaGallery'>
                          <Grid container spacing={5}>
                            <Grid item xs={12}>
                              <CardHeader
                                title={<Typography variant='h6'>گالری تصاویر</Typography>}
                                subheader={
                                  <Typography variant='caption'>
                                    می توانید گالری تصاویر مرکز را مشاهده نمایید
                                  </Typography>
                                }
                              />

                              <CardContent>
                                {/* mediaGallery */}
                                <Grid item xs={12}>
                                  <Controller
                                    name='mediaGallery'
                                    control={control}
                                    render={({ field: { onChange, value }, fieldState }) => {
                                      const { getRootProps, getInputProps } = useDropzone({
                                        onDrop: (acceptedFiles: File[]) => {
                                          onChange([...(value || []), ...acceptedFiles])
                                        },
                                        accept: {
                                          'image/*': [],
                                          'video/*': []
                                        }
                                      })

                                      const renderFilePreview = (file: File) => {
                                        if (file.type.startsWith('image/')) {
                                          return (
                                            <img
                                              src={URL.createObjectURL(file)}
                                              alt={file.name}
                                              style={{ maxWidth: '100%', maxHeight: 70 }}
                                            />
                                          )
                                        } else if (file.type.startsWith('video/')) {
                                          return (
                                            <video width={100} height={70} controls>
                                              <source src={URL.createObjectURL(file)} type={file.type} />
                                            </video>
                                          )
                                        }
                                        return null
                                      }

                                      return (
                                        <DropzoneWrapper>
                                          <div {...getRootProps({ className: 'dropzone' })}>
                                            <input {...getInputProps()} />
                                            <Box
                                              sx={{
                                                display: 'flex',
                                                flexDirection: ['column', 'row'],
                                                gap: 3,
                                                alignItems: 'stretch',
                                                width: '100%',
                                                p: 1.5
                                              }}
                                            >
                                              <Box
                                                sx={{
                                                  flex: 2,
                                                  display: 'flex',
                                                  flexDirection: 'column',
                                                  alignItems: 'center',
                                                  justifyContent: 'center',
                                                  p: 2,
                                                  minHeight: 140,
                                                  borderRadius: 2,
                                                  backgroundColor: 'transparent'
                                                }}
                                              >
                                                <Img width={180} alt='Upload img' src='/images/misc/image-upload.png' />
                                                <HeadingTypography variant='h6'>
                                                  آپلودر گالری تصاویر و ویدیو
                                                </HeadingTypography>
                                                <Typography
                                                  variant='caption'
                                                  color='textSecondary'
                                                  sx={{ textAlign: ['center', 'center', 'left'] }}
                                                >
                                                  فایل‌ها را بکشید یا کلیک کنید بر{' '}
                                                  <Link href='/' onClick={handleLinkClickImg}>
                                                    مرورگر
                                                  </Link>{' '}
                                                  تا آپلود شوند
                                                </Typography>
                                              </Box>

                                              <Box
                                                sx={{
                                                  flex: 1,
                                                  p: 1.5,
                                                  display: 'grid',
                                                  gridTemplateColumns: 'repeat(2, 1fr)',
                                                  gap: 2,
                                                  alignContent: 'start',
                                                  borderRadius: 2
                                                }}
                                              >
                                                {value?.length ? (
                                                  (() => {
                                                    const visible = value.slice(0, 6)
                                                    const remaining = value.length - 6

                                                    return visible.map((file: File, i: number) => {
                                                      const isLastVisible = i === 5

                                                      return (
                                                        <Box
                                                          key={file.name + i}
                                                          sx={{
                                                            position: 'relative',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            p: 0.5,
                                                            borderRadius: 1,
                                                            bgcolor: 'background.paper',
                                                            minHeight: 70
                                                          }}
                                                        >
                                                          <Box
                                                            sx={{
                                                              width: '100%',
                                                              display: 'flex',
                                                              justifyContent: 'center',
                                                              mb: 1
                                                            }}
                                                          >
                                                            {renderFilePreview(file)}
                                                          </Box>

                                                          <Typography
                                                            variant='body2'
                                                            noWrap
                                                            sx={{ width: '100%', textAlign: 'center' }}
                                                          >
                                                            {file.name}
                                                          </Typography>

                                                          <IconButton
                                                            onClick={() => {
                                                              const newFiles = value.filter(
                                                                (f: File, idx: number) => idx !== i
                                                              )
                                                              onChange(newFiles)
                                                            }}
                                                            size='small'
                                                            sx={{ position: 'absolute', top: 6, right: 6 }}
                                                          >
                                                            <Icon icon='mdi:close' fontSize={16} />
                                                          </IconButton>

                                                          {isLastVisible && remaining > 0 && (
                                                            <Box
                                                              sx={{
                                                                position: 'absolute',
                                                                inset: 0,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                bgcolor: 'rgba(0,0,0,0.45)',
                                                                color: '#fff',
                                                                fontWeight: 600,
                                                                fontSize: 18,
                                                                borderRadius: 1
                                                              }}
                                                            >
                                                              +{remaining}
                                                            </Box>
                                                          )}
                                                        </Box>
                                                      )
                                                    })
                                                  })()
                                                ) : (
                                                  <Box sx={{ gridColumn: '1 / -1', textAlign: 'center', p: 2 }}>
                                                    <Typography variant='body2' color='textSecondary'>
                                                      هیچ فایلی آپلود نشده
                                                    </Typography>
                                                  </Box>
                                                )}
                                              </Box>
                                            </Box>

                                            {value?.length ? (
                                              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 5 }}>
                                                <Button
                                                  size='small'
                                                  color='error'
                                                  variant='outlined'
                                                  onClick={() => onChange([])}
                                                >
                                                  حذف همه فایل‌ها
                                                </Button>
                                                <Button size='small' variant='contained'>
                                                  بارگذاری فایل‌ها
                                                </Button>
                                              </Box>
                                            ) : null}
                                          </div>
                                        </DropzoneWrapper>
                                      )
                                    }}
                                  />
                                </Grid>
                              </CardContent>

                              <CardActions
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                                }}
                              >
                                <Button
                                  variant='contained'
                                  startIcon={<IoArrowForward />}
                                  onClick={() => setTabValue1('infoAdditional')}
                                >
                                  قبلی
                                </Button>
                                <Button
                                  variant='contained'
                                  endIcon={<IoArrowBack />}
                                  onClick={() => setTabValue('advisor')}
                                >
                                  بعدی
                                </Button>
                              </CardActions>
                            </Grid>
                          </Grid>
                        </TabPanel>
                      </Card>
                    </Grid>
                  </Grid>
                </TabContext>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel sx={{ padding: 0 }} value='advisor'>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TabContext value={value2}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={12}>
                      <Card sx={{ mb: 5 }}>
                        <TabList
                          variant='scrollable'
                          scrollButtons={false}
                          onChange={handleTabsChange2}
                          sx={{
                            borderBottom: theme => `1px solid ${theme.palette.divider}`,
                            width: '100%',
                            display: 'flex',
                            '& .MuiTab-root': {
                              flex: 1,
                              minWidth: 0,
                              maxWidth: 'none',
                              '&:not(:last-child)': {
                                marginRight: 1
                              }
                            }
                          }}
                        >
                          <Tab
                            icon={<BiSolidInfoSquare size={20} />}
                            value='advisorAdditional'
                            label='اطلاعات اولیه مشاوره'
                            sx={{
                              fontFamily: 'inherit',
                              width: '100%'
                            }}
                          />

                          <Tab
                            icon={<BiSolidMessageSquareDetail size={20} />}
                            value='advisorShift'
                            label='شیفت های مشاوره'
                            sx={{
                              fontFamily: 'inherit',
                              width: '100%'
                            }}
                          />
                        </TabList>

                        <TabPanel sx={{ padding: 0 }} value='advisorAdditional'>
                          <CardHeader
                            title={<Typography variant='h6'>اطلاعات اولیه مشاوره</Typography>}
                            subheader={
                              <Typography variant='caption'>می توانید اطلاعات اولیه مشاوره را تکمیل نمایید</Typography>
                            }
                          />
                          <CardContent>
                            <Grid container spacing={5}>
                              {/* supervisor_ids */}
                              <Grid item xs={12}>
                                <Controller
                                  name='supervisor_ids'
                                  control={control}
                                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <CustomAsyncAutocomplete
                                      url={`/institution/${id}/membership/base/select/supervisor`}
                                      readOnly={false}
                                      onAddValue={newValue => onChange(newValue)}
                                      value={value}
                                      getOptionLabel={option =>
                                        ` ${option?.first_name} ${option?.last_name}- ${option?.username}`
                                      }
                                      label='سوپروایزر'
                                      multiple={true}
                                      error={!!error}
                                      helperText={error?.message}
                                    ></CustomAsyncAutocomplete>
                                  )}
                                />
                              </Grid>

                              {/* advisors_ids */}
                              <Grid item xs={12}>
                                <Controller
                                  name='advisor_ids'
                                  control={control}
                                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <CustomAsyncAutocomplete
                                      url={`/institution/${id}/membership/base/select/advisor`}
                                      readOnly={false}
                                      onAddValue={newValue => onChange(newValue)}
                                      value={value}
                                      getOptionLabel={option =>
                                        ` ${option?.first_name} ${option?.last_name}- ${option?.username}`
                                      }
                                      label='مشاوران'
                                      multiple={true}
                                      error={!!error}
                                      helperText={error?.message}
                                    ></CustomAsyncAutocomplete>
                                  )}
                                />
                              </Grid>

                              {/* session_duration */}
                              <Grid item xs={2}>
                                <Controller
                                  name='session_duration'
                                  control={control}
                                  render={({ field, fieldState: { error } }) => (
                                    <TextField
                                      error={!!error}
                                      helperText={error?.message}
                                      InputProps={{ readOnly: false }}
                                      {...field}
                                      value={field.value ?? ''}
                                      fullWidth
                                      label='مدت جلسات (دقیقه)'
                                    />
                                  )}
                                />
                              </Grid>

                              {/* break_duration */}
                              <Grid item xs={2}>
                                <Controller
                                  name='break_duration'
                                  control={control}
                                  render={({ field, fieldState: { error } }) => (
                                    <TextField
                                      error={!!error}
                                      helperText={error?.message}
                                      InputProps={{ readOnly: false }}
                                      {...field}
                                      value={field.value ?? ''}
                                      fullWidth
                                      label=' فاصله بین جلسات (دقیقه)'
                                    />
                                  )}
                                />
                              </Grid>

                              {/* consultation_fee */}
                              <Grid item xs={6} sm={4}>
                                <Controller
                                  name='consultation_fee'
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
                                        label='هزینه جلسه مشاوره (ریال)'
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

                              {/* is_consultation_subsidy_evaluator */}
                              <Grid item xs={4}>
                                <Controller
                                  name='is_consultation_subsidy_evaluator'
                                  control={control}
                                  render={({ field: { value, onChange } }) => (
                                    <FormControlLabel
                                      label='این مرکز ارزیابی کننده درخواست یارانه مشاوره هم می باشد'
                                      control={
                                        <Switch
                                          checked={value === '1'}
                                          onChange={(_, check) => onChange(check ? '1' : '0')}
                                        />
                                      }
                                    />
                                  )}
                                />
                              </Grid>

                              {/* is_holiday */}
                              <Grid item xs={4}>
                                <Controller
                                  name='is_holiday'
                                  control={control}
                                  render={({ field: { value, onChange } }) => (
                                    <FormControlLabel
                                      label='ایام تعطیل'
                                      control={
                                        <Switch
                                          checked={value === '1'}
                                          onChange={(_, check) => onChange(check ? '1' : '0')}
                                        />
                                      }
                                    />
                                  )}
                                />
                              </Grid>

                              {/* rooms */}
                              <Grid item xs={12}>
                                <Box sx={{ mt: 4 }}>
                                  <Button startIcon={<Icon icon='mdi:plus' />} color='primary' onClick={handleAddField}>
                                    افزودن اتاق جدید
                                  </Button>

                                  <Grid container spacing={4} sx={{ mt: 2 }}>
                                    {fields.map((value, index) => (
                                      <Grid item xs={12} sm={6} md={3} key={index}>
                                        <TextField
                                          fullWidth
                                          value={value}
                                          onChange={e => handleChange(index, e.target.value)}
                                          label={`اتاق${index + 1}`}
                                        />
                                      </Grid>
                                    ))}
                                  </Grid>
                                </Box>
                              </Grid>
                            </Grid>
                          </CardContent>

                          <CardActions
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <Button
                              variant='contained'
                              startIcon={<IoArrowForward />}
                              onClick={() => {
                                setTabValue('info')
                                setTabValue1('mediaGallery')
                              }}
                            >
                              قبلی
                            </Button>
                            <Button
                              variant='contained'
                              endIcon={<IoArrowBack />}
                              onClick={() => setTabValue2('advisorShift')}
                            >
                              بعدی
                            </Button>
                          </CardActions>
                        </TabPanel>

                        <TabPanel sx={{ padding: 0 }} value='advisorShift'>
                          <CardHeader
                            title={<Typography variant='h6'>شیفت های مشاوره</Typography>}
                            subheader={
                              <Typography variant='caption'>
                                می توانید اطلاعات شیفت های مشاوره را تکمیل نمایید
                              </Typography>
                            }
                          />
                          <CardContent>
                            <Grid container spacing={5}>
                              {rows.map(day => (
                                <Grid item xs={12} key={day.dayId}>
                                  <Paper sx={{ p: 2, borderRadius: 2, border: '1px solid #ddd' }}>
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        mb: 2
                                      }}
                                    >
                                      <Typography variant='h6'>{day.name}</Typography>
                                      <Button
                                        startIcon={<Icon icon='mdi:plus' />}
                                        onClick={() => handleAddShift(day.dayId)}
                                      >
                                        افزودن شیفت
                                      </Button>
                                    </Box>

                                    {/* جدول شیفت‌ها */}
                                    <Table size='small'>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell align='center'>عنوان</TableCell>
                                          <TableCell align='center'>ساعت شروع</TableCell>
                                          <TableCell align='center'>ساعت پایان</TableCell>
                                          <TableCell align='center'>وضعیت</TableCell>
                                          <TableCell align='center'>عملیات</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {day.shifts.map(shift => (
                                          <TableRow key={shift.id}>
                                            <TableCell align='center'>
                                              {shift.editing ? (
                                                <TextField
                                                  label='عنوان'
                                                  size='small'
                                                  value={shift.title}
                                                  onChange={e =>
                                                    updateShift(day.dayId, shift.id, { title: e.target.value })
                                                  }
                                                />
                                              ) : (
                                                shift.title
                                              )}
                                            </TableCell>

                                            <TableCell align='center'>
                                              {shift.editing ? (
                                                <CustomTimePicker
                                                  label='ساعت شروع'
                                                  size='small'
                                                  value={shift.start_time}
                                                  onChange={v => updateShift(day.dayId, shift.id, { start_time: v })}
                                                />
                                              ) : (
                                                shift.saved_start_time || ''
                                              )}
                                            </TableCell>

                                            <TableCell align='center'>
                                              {shift.editing ? (
                                                <CustomTimePicker
                                                  label='ساعت پایان'
                                                  size='small'
                                                  value={shift.end_time}
                                                  onChange={v => updateShift(day.dayId, shift.id, { end_time: v })}
                                                />
                                              ) : (
                                                shift.saved_end_time || ''
                                              )}
                                            </TableCell>

                                            <TableCell align='center'>
                                              {shift.editing ? (
                                                <Switch
                                                  checked={shift.active}
                                                  onChange={e =>
                                                    updateShift(day.dayId, shift.id, { active: e.target.checked })
                                                  }
                                                />
                                              ) : shift.active ? (
                                                'فعال'
                                              ) : (
                                                'غیرفعال'
                                              )}
                                            </TableCell>

                                            <TableCell align='center'>
                                              {shift.editing ? (
                                                <>
                                                  <IconButton
                                                    color='success'
                                                    onClick={() => saveShift(day.dayId, shift.id)}
                                                  >
                                                    <Icon icon='mdi:check-circle' />
                                                  </IconButton>
                                                  <IconButton
                                                    color='error'
                                                    onClick={() => deleteShift(day.dayId, shift.id)}
                                                  >
                                                    <Icon icon='mdi:close-circle' />
                                                  </IconButton>
                                                </>
                                              ) : (
                                                <>
                                                  <IconButton
                                                    color='primary'
                                                    onClick={() => updateShift(day.dayId, shift.id, { editing: true })}
                                                  >
                                                    <Icon icon='mdi:pencil' />
                                                  </IconButton>
                                                  <IconButton
                                                    color='error'
                                                    onClick={() => deleteShift(day.dayId, shift.id)}
                                                  >
                                                    <Icon icon='mdi:delete' />
                                                  </IconButton>
                                                </>
                                              )}
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </Paper>
                                </Grid>
                              ))}
                            </Grid>
                          </CardContent>

                          <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Button
                              variant='contained'
                              startIcon={<IoArrowForward />}
                              onClick={() => setTabValue2('advisorAdditional')}
                            >
                              قبلی
                            </Button>
                            <Button variant='contained' type='submit'>
                              ثبت
                            </Button>
                          </CardActions>
                        </TabPanel>
                      </Card>
                    </Grid>
                  </Grid>
                </TabContext>
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
      </form>
    </>
  )
}
