'use client'

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Avatar,
  Divider,
  Autocomplete,
  TextField
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import CustomDatePicker from '@/components/elements/customDatePicker'
import { useFetchCourseInstitutionLanding, useFetchInstitutionLanding } from '@/hooks/landing/useInstitutionLanding'
import { useState } from 'react'
import { dateConverter } from '@/helpers/DateHelpers'
import { useRouter } from 'next/navigation'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import InfoIcon from '@mui/icons-material/Info'

const cardsData = [
  {
    title: 'خدمات مشاوره',
    text1: 'توضیح کوتاه ۱',
    text2: 'توضیح کوتاه ۲',
    gradient: 'linear-gradient(135deg, #fff7ba, #ffecd2)'
  },
  {
    title: 'خدمات آموزشی',
    text1: 'توضیح کوتاه ۱',
    text2: 'توضیح کوتاه ۲',
    gradient: 'linear-gradient(135deg, #fceaff, #fdf0ff)'
  },
  {
    title: 'خدمات حقوقی',
    text1: 'توضیح کوتاه ۱',
    text2: 'توضیح کوتاه ۲',
    gradient: 'linear-gradient(135deg, #d6f0ff, #e0f7ff)'
  },
  {
    title: 'خدمات مالی',
    text1: 'توضیح کوتاه ۱',
    text2: 'توضیح کوتاه ۲',
    gradient: 'linear-gradient(135deg, #d4ffd4, #e6fff2)'
  },
  {
    title: 'خدمات درمانی',
    text1: 'توضیح کوتاه ۱',
    text2: 'توضیح کوتاه ۲',
    gradient: 'linear-gradient(135deg, #ffe6e6, #fff1f1)'
  },
  {
    title: 'خدمات پشتیبانی',
    text1: 'توضیح کوتاه ۱',
    text2: 'توضیح کوتاه ۲',
    gradient: 'linear-gradient(135deg, #e0d4ff, #f2e6ff)'
  }
]

export default function CardInstitution({ data }: any) {
  console.log(data, 'data')
  const router = useRouter()
  const {
    handleSubmit,
    control,
    formState: { errors }
  }: any = useForm({
    defaultValues: {
      activity_field_area_ids: [],
      region_id: null,
      start_date: null,
      end_date: null
    }
  })

  const { handleSubmit: handleSubmitCourse, control: controlCourse }: any = useForm({
    defaultValues: {
      course_region_ids: [],
      course_start_at: null,
      course_end_at: null,
      course_title: '',
      request_level_id: null,
      event_type_id: null
    }
  })

  const [filters, setFilters] = useState<any>([])
  const [filters1, setFilters1] = useState<any>({})

  const { data: institutionCourse, isLoading: loadingCourse }: any = useFetchCourseInstitutionLanding(filters1)

  const { data: institution, isLoading: loading }: any = useFetchInstitutionLanding(filters)
  console.log(institution, 'inssjdfjldsjf')

  const onSubmit = async (values: any) => {
    try {
      const start_date = dateConverter(values?.start_date)
      const end_date = dateConverter(values?.end_date)
      const data = {
        start_date,
        end_date,
        region_id: values?.region_id?.id,
        activity_field_area_ids: values?.activity_field_area_ids?.map((el: any) => el?.id)
      }
      setFilters(data)
    } catch (error) {
      throw error
    }
  }

  const onSubmitCoursFilter = async (values: any) => {
    try {
      const course_start_at = dateConverter(values?.course_start_at)
      const course_end_at = dateConverter(values?.course_end_at)
      const data = {
        course_start_at,
        course_end_at,
        course_region_ids: values?.course_region_ids?.map((el: any) => el?.id),
        course_title: values?.course_title,
        request_level_id: values?.request_level_id?.id,
        event_type_id: values?.event_type_id?.id
      }
      setFilters1(data)
    } catch (error) {
      throw error
    }
  }

  const [open, setOpen] = useState(true)
  const [open1, setOpen1] = useState(true)

  return (
    <>
      <Box>
        <Container maxWidth={false} sx={{ px: 15, py: 16, padding: 10 }}>
          <Grid container spacing={3} padding={10}>
            <Grid item xs={12} lg={4}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  height: '100%'
                }}
              >
                <Box sx={{ textAlign: 'center', mb: 4, backgroundColor: '#efefefef', p: 4, borderRadius: 4 }}>
                  <Typography variant='body1' fontWeight={700}>
                    فیلتر مراکز
                  </Typography>
                  <Typography variant='caption'>می توانید مراکز مورد نظر را فیلتر کنید</Typography>
                </Box>

                <Divider sx={{ mb: 4 }} />

                <Accordion
                  expanded={open}
                  onChange={() => setOpen(prev => !prev)}
                  elevation={0}
                  sx={{
                    '&::before': { display: 'none' }
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      open ? <ExpandLessIcon sx={{ fontSize: 30 }} /> : <ExpandMoreIcon sx={{ fontSize: 30 }} />
                    }
                    sx={{
                      minHeight: 'auto',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      '& .MuiAccordionSummary-expandIconWrapper': { order: 0, marginBottom: 1 },
                      '& .MuiAccordionSummary-content': {
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }
                    }}
                  >
                    <Typography variant='h6' fontWeight='bold'>
                      فیلترهای مراکز مشاوره
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails sx={{ p: 0, mt: 2 }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <CardContent>
                        <Grid container spacing={3}>
                          {/* فیلدهای فرم */}
                          <Grid item xs={12}>
                            <Controller
                              name='activity_field_area_ids'
                              control={control}
                              render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <CustomAsyncAutocomplete
                                  url='/landing/consulting-institution/base/select/consulting-activity-field-area'
                                  onAddValue={onChange}
                                  value={value}
                                  getOptionLabel={option => option?.name}
                                  label='حوزه های حیطه فعالیت'
                                  multiple
                                  error={!!error}
                                  helperText={error?.message}
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <Controller
                              name='region_id'
                              control={control}
                              render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <CustomAsyncAutocomplete
                                  url='/landing/consulting-institution/base/select/city'
                                  onAddValue={onChange}
                                  value={value}
                                  getOptionLabel={option => option?.name}
                                  label='شهرستان'
                                  error={!!error}
                                  helperText={error?.message}
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Controller
                              name='start_date'
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <CustomDatePicker
                                  {...field}
                                  label='تاریخ شروع بازه'
                                  error={!!error}
                                  helperText={error?.message}
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Controller
                              name='end_date'
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <CustomDatePicker
                                  {...field}
                                  label='تاریخ پایان بازه'
                                  error={!!error}
                                  helperText={error?.message}
                                />
                              )}
                            />
                          </Grid>
                        </Grid>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                          <Button variant='outlined' disabled={loading} color='primary' type='submit'>
                            جستجو
                          </Button>
                        </Box>
                      </CardContent>
                    </form>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  expanded={open1}
                  onChange={() => setOpen1(prev => !prev)}
                  elevation={0}
                  sx={{
                    '&::before': { display: 'none' },
                    mt: 10
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      open1 ? <ExpandLessIcon sx={{ fontSize: 30 }} /> : <ExpandMoreIcon sx={{ fontSize: 30 }} />
                    }
                    sx={{
                      minHeight: 'auto',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      '& .MuiAccordionSummary-expandIconWrapper': { order: 0, marginBottom: 1 },
                      '& .MuiAccordionSummary-content': {
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }
                    }}
                  >
                    <Typography variant='h6' fontWeight='bold'>
                      فیلترهای مراکز آموزش
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails sx={{ p: 0, mt: 2 }}>
                    <form onSubmit={handleSubmitCourse(onSubmitCoursFilter)}>
                      <CardContent>
                        <Grid container spacing={3}>
                          {/* فیلدهای فرم */}
                          <Grid item xs={12}>
                            <Controller
                              name='activity_field_area_ids'
                              control={controlCourse}
                              render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <CustomAsyncAutocomplete
                                  url='/landing/education-institution/base/select/cityl'
                                  onAddValue={onChange}
                                  value={value}
                                  getOptionLabel={option => option?.name}
                                  label='شهرستان های برگذار کننده دوره'
                                  error={!!error}
                                  helperText={error?.message}
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Controller
                              name='course_start_at'
                              control={controlCourse}
                              render={({ field, fieldState: { error } }) => (
                                <CustomDatePicker
                                  {...field}
                                  label='تاریخ شروع دوره'
                                  error={!!error}
                                  helperText={error?.message}
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Controller
                              name='course_end_at'
                              control={controlCourse}
                              render={({ field, fieldState: { error } }) => (
                                <CustomDatePicker
                                  {...field}
                                  label='تاریخ پایان دوره'
                                  error={!!error}
                                  helperText={error?.message}
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12} sm={3}>
                            <Controller
                              name='course_title'
                              control={controlCourse}
                              render={({ field: { onChange, value }, fieldState: { error } }) => {
                                return (
                                  <TextField
                                    label='نام دوره'
                                    fullWidth
                                    error={!!error}
                                    helperText={error?.message}
                                    value={value}
                                    onChange={onChange}
                                    InputProps={{ readOnly: false }}
                                  />
                                )
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Controller
                              name='request_level_id'
                              control={controlCourse}
                              render={({ field: { value, onChange }, fieldState: { error } }) => (
                                <Autocomplete
                                  readOnly={false}
                                  options={data?.requestLevels}
                                  value={value}
                                  onChange={(_, newvalue) => onChange(newvalue)}
                                  noOptionsText='هیچ نتیجه ای یافت نشد'
                                  getOptionLabel={(options: { name: string }) => options?.name || ''}
                                  renderInput={params => (
                                    <TextField
                                      label='سطح دوره'
                                      {...params}
                                      error={!!error}
                                      helperText={error?.message}
                                    />
                                  )}
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Controller
                              name='event_type_id'
                              control={controlCourse}
                              render={({ field: { value, onChange }, fieldState: { error } }) => (
                                <Autocomplete
                                  readOnly={false}
                                  options={data?.eventType}
                                  value={value}
                                  onChange={(_, newvalue) => onChange(newvalue)}
                                  noOptionsText='هیچ نتیجه ای یافت نشد'
                                  getOptionLabel={(options: { name: string }) => options?.name || ''}
                                  renderInput={params => (
                                    <TextField
                                      label='نوع دوره'
                                      {...params}
                                      error={!!error}
                                      helperText={error?.message}
                                    />
                                  )}
                                />
                              )}
                            />
                          </Grid>
                        </Grid>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                          <Button variant='outlined' disabled={loadingCourse} color='primary' type='submit'>
                            جستجو
                          </Button>
                        </Box>
                      </CardContent>
                    </form>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Grid>

            <Grid item xs={12} lg={8}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  height: '100%'
                }}
              >
                <Box sx={{ textAlign: 'center', mb: 4, backgroundColor: '#efefefef', p: 4, borderRadius: 4 }}>
                  <Typography variant='body1' fontWeight={700}>
                    فهرست مراکز خدماتی
                  </Typography>
                  <Typography variant='caption'>می توانید فهرست مراکز خدماتی را مشاهده کنید</Typography>
                </Box>
                <Divider sx={{ mb: 4 }} />

                <Grid container spacing={5}>
                  {institution?.map((item: any) => (
                    <Grid item xs={12} sm={12} key={item?.id}>
                      <Card
                        sx={{
                          height: '100%',
                          borderRadius: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          overflow: 'hidden',
                          position: 'relative'
                        }}
                      >
                        <CardMedia
                          component='img'
                          height='160'
                          image={item?.banner?.address ?? '/images/images.jpg'}
                          alt='institution'
                          sx={{
                            objectFit: 'cover'
                          }}
                        />

                        <Avatar
                          alt='avatar institution'
                          src={item?.logo?.address}
                          sx={{
                            width: 60,
                            height: 60,
                            position: 'absolute',
                            top: 130,
                            left: 16,
                            border: '3px solid #d3cfcfff',
                            boxSizing: 'border-box',
                            backgroundColor: 'white'
                          }}
                        />

                        <CardContent sx={{ flexGrow: 1, pt: 5 }}>
                          <Box display='flex' justifyContent='center' alignItems='center' gap={2}>
                            <Typography variant='h6' component='div'>
                              {item?.name}
                            </Typography>
                          </Box>

                          <Grid container spacing={5}>
                            <Grid item xs={12} lg={4}>
                              <>
                                <Box sx={{ mt: 3, ml: '72px' }}>
                                  <Typography variant='caption' color='text.secondary'>
                                    مدیر مرکز :{' '}
                                    {`${item?.manager?.first_name} ${item?.manager?.last_name} (${item?.manager?.username})`}
                                  </Typography>
                                </Box>
                                <Box sx={{ mt: 1, ml: '72px' }}>
                                  <Typography variant='caption' color='text.secondary'>
                                    نشانی : {item?.address}
                                  </Typography>
                                </Box>

                                <Box sx={{ mt: 1, ml: '72px' }}>
                                  <Typography variant='caption' color='text.secondary'>
                                    حوزه های حیطه فعالیت :{' '}
                                    {item?.activityFieldAreas?.map((el: any) => el?.name).join(' - ')}
                                  </Typography>
                                </Box>

                                <Box sx={{ mt: 1, ml: '72px' }}>
                                  <Typography variant='caption' color='text.secondary'>
                                    نمره 4.6 از 187 رای
                                  </Typography>
                                </Box>
                              </>
                            </Grid>
                            <Grid item xs={12} lg={8}>
                              <Grid container spacing={3}>
                                {cardsData.map((el, index) => (
                                  <Grid item xs={12} sm={6} lg={4} key={index}>
                                    <Card
                                      sx={{
                                        minHeight: 100,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        p: 2,
                                        background: el.gradient,
                                        borderRadius: 3,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        transition: 'transform 0.3s, box-shadow 0.3s',
                                        '&:hover': {
                                          transform: 'translateY(-5px)',
                                          boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
                                        }
                                      }}
                                    >
                                      <Box>
                                        <Box display='flex' alignItems='center' gap={1} mb={1}>
                                          <InfoIcon sx={{ color: '#333' }} />
                                          <Typography variant='h6'>{el.title}</Typography>
                                        </Box>
                                        <Typography variant='body2' color='text.secondary'>
                                          {el.text1}
                                        </Typography>
                                        <Typography variant='body2' color='text.secondary'>
                                          {el.text2}
                                        </Typography>
                                      </Box>

                                      <Box display='flex' justifyContent='flex-end' mt={2}>
                                        <Button
                                          variant='contained'
                                          color='primary'
                                          size='small'
                                          onClick={() => router.push(`/user/${item?.id}/institution/calendarMeetings`)}
                                        >
                                          رزرو نوبت
                                        </Button>
                                      </Box>
                                    </Card>
                                  </Grid>
                                ))}
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}
