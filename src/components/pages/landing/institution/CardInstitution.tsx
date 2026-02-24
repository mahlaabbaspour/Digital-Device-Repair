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
import { useSession } from 'next-auth/react'
import DialogAlertLoginLanding from './DialogAlertLoginLanding'
import { getBadgeColors } from '@/configs/darkColor'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'

const cardStyle = (gradient: string) => ({
  minHeight: 100,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  p: 2,
  background: gradient,
  borderRadius: 3,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
  }
})

const CardContentSection = ({ title, text1, text2 }: any) => (
  <Box>
    <Box display='flex' alignItems='center' gap={1} mb={1}>
      <InfoIcon sx={{ color: '#333' }} />
      <Typography variant='h6'>{title}</Typography>
    </Box>

    <Typography variant='body2' color='text.secondary'>
      {text1}
    </Typography>
    <Typography variant='body2' color='text.secondary'>
      {text2}
    </Typography>
  </Box>
)

const CardButton = ({ onClick }: any) => (
  <Box display='flex' justifyContent='flex-end' mt={2}>
    <Button variant='outlined' size='small' onClick={onClick}>
      رزرو نوبت
    </Button>
  </Box>
)

export default function CardInstitution({ data }: any) {
  const session: any = useSession()
  const total = 5
  const filled = 3
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

  const { data: institutionCourse, isLoading: loadingCourse }: any = useFetchCourseInstitutionLanding(
    filters1 ?? filters
  )

  const { data: institution, isLoading: loading }: any = useFetchInstitutionLanding(filters)

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
  const userId = session?.data?.user?.user?.id

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
  const [alertOpen, setAlertOpen] = useState(false)

  return (
    <>
      <DialogAlertLoginLanding
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        title='برای ادامه لطفاً وارد حساب کاربری شوید'
        description='برای رزرو نوبت لازم است ابتدا وارد حساب کاربری خود شوید.
اگر حساب ندارید، می‌توانید به‌راحتی ثبت‌نام کنید.'
      />
      <Box>
        <Container maxWidth={false} sx={{ paddingX: 10 }}>
          <Grid container spacing={3} padding={10}>
            <Grid item xs={12} lg={3}>
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

                          <Grid item xs={12} md={12}>
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

                          <Grid item xs={12} md={12}>
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
                                  url='/landing/education-institution/institution/base/select/city'
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

                          <Grid item xs={12} md={12}>
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

                          <Grid item xs={12} md={12}>
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

                          <Grid item xs={12} sm={12}>
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

                          <Grid item xs={12} md={12}>
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

                          <Grid item xs={12} md={12}>
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

            <Grid item xs={12} lg={9}>
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
                    <Grid item xs={12} sm={6} key={item?.id}>
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
                        <Grid container spacing={5}>
                          <Grid item xs={12} lg={3}>
                            <CardMedia
                              component='img'
                              height='160'
                              image={item?.banner?.address ?? '/images/images.jpg'}
                              alt='institution'
                              sx={{
                                objectFit: 'cover'
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} lg={9}>
                            <Box sx={{ p: 5 }}>
                              <Typography variant='h6' component='div' sx={{ fontWeight: 900, fontSize: '1.25rem' }}>
                                {item?.name}
                              </Typography>

                              <Box sx={{ mt: 2 }}>
                                <Typography variant='caption' color='text.secondary'>
                                  مدیریت :{' '}
                                  {`${item?.manager?.first_name} ${item?.manager?.last_name} (${item?.manager?.username})`}
                                </Typography>
                              </Box>

                              {item?.activityFieldAreas?.length > 0 && (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 }}>
                                  <Typography variant='caption' color='text.secondary' sx={{ mt: 0.5 }}>
                                    حوزه های فعالیت :
                                  </Typography>

                                  {item?.activityFieldAreas?.map((el: any, index: number) => {
                                    const { bg, text } = getBadgeColors(index)

                                    return (
                                      <Box
                                        key={el?.id || index}
                                        sx={{
                                          px: 1.5,
                                          py: 1,
                                          borderRadius: '12px',
                                          fontSize: '0.75rem',
                                          bgcolor: bg,
                                          color: text,
                                          whiteSpace: 'nowrap',
                                          display: 'flex',
                                          alignItems: 'center'
                                        }}
                                      >
                                        <Typography variant='caption' sx={{ color: text }}>
                                          {el?.name}
                                        </Typography>
                                      </Box>
                                    )
                                  })}
                                </Box>
                              )}
                            </Box>
                          </Grid>
                        </Grid>

                        <CardContent sx={{ flexGrow: 1, pt: 5 }}>
                          <Grid container spacing={5}>
                            <Grid item xs={12} lg={12}>
                              <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} lg={6}>
                                  <Card sx={cardStyle('linear-gradient(135deg, #fff7ba, #ffecd2)')}>
                                    <CardContentSection
                                      title='خدمات مشاوره'
                                      text1='جلسات مشاوره'
                                      text2='جلسه مشاوره خود را رزرو کنید'
                                    />

                                    <CardButton
                                      onClick={
                                        session?.data
                                          ? () =>
                                              router.push(
                                                `/user/${userId}/institution/calendarMeetings?institutionId=${item?.id}`
                                              )
                                          : () => setAlertOpen(true)
                                      }
                                    />
                                  </Card>
                                </Grid>

                                <Grid item xs={12} sm={6} lg={6}>
                                  <Card sx={cardStyle('linear-gradient(135deg, #fceaff, #fdf0ff)')}>
                                    <CardContentSection
                                      title='خدمات آموزشی'
                                      text1='دوره های آموزشی'
                                      text2='دوره آموزشی مورد نظر خود را انتخاب کنید'
                                    />

                                    <CardButton
                                      onClick={
                                        session?.data
                                          ? () =>
                                              router.push(
                                                `/user/${userId}/education/allEducationalCourse?institutionId=${item?.id}`
                                              )
                                          : () => setAlertOpen(true)
                                      }
                                    />
                                  </Card>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={12} lg={12}>
                              <Grid container spacing={5}>
                                <Grid item xs={12} lg={9}>
                                  <>
                                    <Box sx={{ display: 'flex', justifyItems: 'stretch', gap: 20 }}>
                                      <Typography variant='caption' color='text.secondary'>
                                        استان : خراسان جنوبی
                                      </Typography>
                                      <Typography variant='caption' color='text.secondary'>
                                        شهرستان : {item?.region?.name}
                                      </Typography>
                                    </Box>
                                    <Box sx={{ mt: 2 }}>
                                      <Typography variant='caption' color='text.secondary'>
                                        نشانی : {item?.address}
                                      </Typography>
                                    </Box>
                                  </>
                                </Grid>
                                <Grid item xs={12} lg={3}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                                    {Array.from({ length: total }).map((_, i) =>
                                      i < filled ? (
                                        <StarIcon key={i} sx={{ color: '#FFC107', fontSize: 20 }} />
                                      ) : (
                                        <StarBorderIcon key={i} sx={{ color: '#FFC107', fontSize: 20 }} />
                                      )
                                    )}
                                  </Box>
                                  <Box sx={{ mt: 1 }}>
                                    <Typography>4.6 از 186 رای</Typography>
                                  </Box>
                                </Grid>
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
