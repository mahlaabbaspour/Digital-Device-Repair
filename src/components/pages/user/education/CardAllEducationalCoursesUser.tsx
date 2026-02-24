'use client'

import { dateConverter } from '@/helpers/DateHelpers'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  TextField,
  Autocomplete,
  IconButton,
  Avatar,
  CardMedia,
  Pagination,
  Skeleton
} from '@mui/material'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import CustomDatePicker from '@/components/elements/customDatePicker'
import { CheckCircleOutline, LocalOfferOutlined, PlayCircleOutline } from '@mui/icons-material'
import { BiCheck, BiUser } from 'react-icons/bi'
import { useFetchAllCoursEducational } from '@/hooks/user/useEducationCourse'

export default function CardAllEducationalCoursesUser({ id, institutionId, upsertData, show }: any) {
  const [filters1, setFilters1] = useState<any>({})
  const [currentPage, setCurrentPage] = useState(1)

  function handlePageChange(_: any, page: number) {
    setCurrentPage(page)
  }

  const { data: dataEducationalCourse, isLoading: loadingCourse }: any = useFetchAllCoursEducational({
    params: filters1,
    id: id
  })

  const {
    handleSubmit: handleSubmitCourse,
    control: controlCourse,
    reset
  }: any = useForm({
    defaultValues: {
      title: '',
      course_start_at: null,
      course_end_at: null,
      administrative_division_id: null,
      region_ids: [],
      request_level_id: null,
      event_type_id: null,
      course_type_id: null,
      teacher_ids: []
    }
  })

  const onSubmitCoursFilter = async (values: any) => {
    try {
      const course_start_at = dateConverter(values?.course_start_at)
      const course_end_at = dateConverter(values?.course_end_at)
      const data = {
        title: values?.title,
        course_start_at,
        course_end_at,
        administrative_division_id: values?.administrative_division_id?.id,
        region_ids: values?.region_ids?.map((el: any) => el?.id),
        teacher_ids: values?.teacher_ids?.map((el: any) => el?.id),
        request_level_id: values?.request_level_id?.id ?? null,
        event_type_id: values?.event_type_id?.id ?? null,
        course_type_id: values?.course_type_id?.id ?? null,
        institution_id: institutionId
      }
      setFilters1(data)
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <Card sx={{ margin: 'auto', p: 2, borderRadius: 2, mb: 5 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} lg={4}>
            <Box
              position='relative'
              display='flex'
              justifyContent='center'
              alignItems='center'
              height='100%'
              minHeight={250}
            >
              <img
                src={show?.banner?.address}
                alt='banner'
                style={{
                  width: '80%',
                  borderRadius: 12,
                  objectFit: 'contain'
                }}
              />

              <Avatar
                src={show?.logo?.address}
                sx={{
                  width: 80,
                  height: 80,
                  position: 'absolute',
                  right: '10%',
                  top: '85%',
                  transform: 'translate(50%, -50%)',
                  border: '3px solid #fff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  bgcolor: '#eee'
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} lg={8}>
            <>
              <Grid container spacing={5}>
                <Grid item xs={12} lg={7}>
                  <Box display='flex' flexDirection='column' gap={1} mb={2} mt={10}>
                    <Typography variant='h4' sx={{ fontWeight: 900 }}>
                      {show?.name}
                    </Typography>
                    <Box display='flex' alignItems='center' gap={1}>
                      <IconButton
                        sx={{
                          bgcolor: '#EDEAFF',
                          width: 32,
                          height: 32,
                          '&:hover': { bgcolor: '#DAD4FF' }
                        }}
                      >
                        <BiUser color='#7367F0' />
                      </IconButton>
                      <Typography variant='body2'>
                        مدیر مرکز : {`${show?.manager?.first_name} ${show?.manager?.last_name}`}
                      </Typography>
                    </Box>

                    <Box display='flex' alignItems='center' gap={1}>
                      <IconButton
                        sx={{
                          bgcolor: '#EDEAFF',
                          width: 32,
                          height: 32,
                          '&:hover': { bgcolor: '#DAD4FF' }
                        }}
                      >
                        <BiCheck color='#7367F0' />
                      </IconButton>
                      <Typography variant='body2'>
                        {' '}
                        حوزه های فعالیت : {show?.activityFieldAreas?.map((el: any) => el?.name).join(' - ')}
                      </Typography>
                    </Box>

                    <Box display='flex' alignItems='center' gap={1}>
                      <IconButton
                        sx={{
                          bgcolor: '#EDEAFF',
                          width: 32,
                          height: 32,
                          '&:hover': { bgcolor: '#DAD4FF' }
                        }}
                      >
                        <BiCheck color='#7367F0' />
                      </IconButton>
                      <Typography variant='body2'>
                        {' '}
                        مشاوران : {show?.advisors?.map((el: any) => `${el?.first_name} ${el?.last_name}`).join(' - ')}
                      </Typography>
                    </Box>

                    <Box display='flex' alignItems='center' gap={1}>
                      <IconButton
                        sx={{
                          bgcolor: '#EDEAFF',
                          width: 32,
                          height: 32,
                          '&:hover': { bgcolor: '#DAD4FF' }
                        }}
                      >
                        <BiCheck color='#7367F0' />
                      </IconButton>
                      <Typography variant='body2'> آدرس : {show?.address}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={5}>
                  <Box display='flex' flexDirection='column' gap={1} mb={2} mt={10}>
                    <Box display='flex' alignItems='flex-start' gap={2}>
                      <PlayCircleOutline sx={{ color: '#7367F0', fontSize: 40, mt: '4px' }} />

                      <Typography variant='body1' sx={{ fontWeight: 700, mt: 3 }}>
                        دوره آموزشی مرکز
                      </Typography>
                    </Box>
                    <Box display='flex' alignItems='flex-start' gap={2}>
                      <CheckCircleOutline sx={{ color: '#7367F0', fontSize: 40, mt: '4px' }} />
                      <Typography variant='body1' sx={{ fontWeight: 700, mt: 3 }}>
                        دسترسی به تمام دوره ها
                      </Typography>
                    </Box>

                    <Box display='flex' alignItems='flex-start' gap={2}>
                      <LocalOfferOutlined sx={{ color: '#7367F0', fontSize: 40 }} />

                      <Typography variant='body1' sx={{ fontWeight: 700, mt: 3 }}>
                        گواهینامه دوره
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </>
          </Grid>
        </Grid>
      </Card>

      <Box
        sx={{
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Grid container spacing={5} sx={{ height: '100%' }}>
          <Grid
            item
            xs={12}
            sm={3}
            sx={{
              height: '100%'
            }}
          >
            <Card>
              <Box sx={{ textAlign: 'center', mb: 4, backgroundColor: '#e6e4fc', p: 4, borderRadius: 4, margin: 5 }}>
                <Typography variant='body1' fontWeight={700}>
                  فیلتر مراکز آموزشی
                </Typography>
                <Typography variant='caption'>می توانید مراکز آموزشی مورد نظر را فیلتر کنید</Typography>
              </Box>
              <form onSubmit={handleSubmitCourse(onSubmitCoursFilter)}>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <Controller
                        name='title'
                        control={controlCourse}
                        render={({ field: { onChange, value }, fieldState: { error } }) => {
                          return (
                            <TextField
                              label='عنوان دوره'
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
                    <Grid item xs={12}>
                      <Controller
                        name='region_ids'
                        control={controlCourse}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                          <CustomAsyncAutocomplete
                            url={`/user/${id}/education/course/base/select/city`}
                            onAddValue={onChange}
                            value={value}
                            multiple={true}
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

                    <Grid item xs={12} md={12}>
                      <Controller
                        name='request_level_id'
                        control={controlCourse}
                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                          <Autocomplete
                            readOnly={false}
                            options={upsertData?.requestLevels}
                            value={value}
                            onChange={(_, newvalue) => onChange(newvalue)}
                            noOptionsText='هیچ نتیجه ای یافت نشد'
                            getOptionLabel={(options: { name: string }) => options?.name || ''}
                            renderInput={params => (
                              <TextField
                                label='سطح تدریس دوره'
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
                        name='administrative_division_id'
                        control={controlCourse}
                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                          <Autocomplete
                            readOnly={false}
                            options={upsertData?.administrativeDivisions}
                            value={value}
                            onChange={(_, newvalue) => onChange(newvalue)}
                            noOptionsText='هیچ نتیجه ای یافت نشد'
                            getOptionLabel={(options: { name: string }) => options?.name || ''}
                            renderInput={params => (
                              <TextField
                                label='سطح تقسیمات کشوری'
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
                        name='course_type_id'
                        control={controlCourse}
                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                          <Autocomplete
                            readOnly={false}
                            options={upsertData?.courseTypes}
                            value={value}
                            onChange={(_, newvalue) => onChange(newvalue)}
                            noOptionsText='هیچ نتیجه ای یافت نشد'
                            getOptionLabel={(options: { name: string }) => options?.name || ''}
                            renderInput={params => (
                              <TextField label='نوع دوره' {...params} error={!!error} helperText={error?.message} />
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
                            options={upsertData?.eventTypes}
                            value={value}
                            onChange={(_, newvalue) => onChange(newvalue)}
                            noOptionsText='هیچ نتیجه ای یافت نشد'
                            getOptionLabel={(options: { name: string }) => options?.name || ''}
                            renderInput={params => (
                              <TextField label='نوع برگذاری' {...params} error={!!error} helperText={error?.message} />
                            )}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Controller
                        name='activity_field_area_ids'
                        control={controlCourse}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                          <CustomAsyncAutocomplete
                            url={`/user/${id}/education/course/base/select/teacher`}
                            onAddValue={onChange}
                            multiple={true}
                            value={value}
                            getOptionLabel={option => option?.name}
                            label='مدرس'
                            error={!!error}
                            helperText={error?.message}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                    <Button variant='outlined' disabled={false} color='primary' type='submit'>
                      جستجو
                    </Button>
                  </Box>
                </CardContent>
              </form>
            </Card>
          </Grid>

          <Grid item xs={12} sm={9} sx={{ height: '100%' }}>
            {loadingCourse ? (
              <Grid container spacing={5}>
                <Grid item xs={12} lg={4}>
                  <Skeleton height={300} />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Skeleton height={300} />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Skeleton height={300} />
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={5}>
                {dataEducationalCourse?.map((item: any) => (
                  <Grid item xs={12} sm={4} key={item?.id}>
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
                        image={'/images/images.jpg'}
                        alt='institution'
                        sx={{
                          objectFit: 'cover'
                        }}
                      />

                      <Avatar
                        alt='avatar institution'
                        src='/'
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
                            {item?.title}
                          </Typography>
                        </Box>

                        <>
                          <Box sx={{ mt: 3 }}>
                            <Typography variant='caption' color='text.secondary'>
                              شروع دوره : {item?.course_start_at}
                            </Typography>
                          </Box>
                          <Box sx={{ mt: 1 }}>
                            <Typography variant='caption' color='text.secondary'>
                              پایان دوره : {item?.course_end_at}
                            </Typography>
                          </Box>

                          {item?.teachers?.length > 0 && (
                            <Box sx={{ mt: 1 }}>
                              <Typography variant='caption' color='text.secondary'>
                                مدرسان :{' '}
                                {item?.teachers?.map((el: any) => `${el?.first_name} ${el?.last_name}`).join(' - ')}
                              </Typography>
                            </Box>
                          )}

                          {item?.regions?.length > 0 && (
                            <Box sx={{ mt: 1 }}>
                              <Typography variant='caption' color='text.secondary'>
                                شهرستان های برگذاری کننده : {item?.regions?.map((el: any) => el?.name).join(' - ')}
                              </Typography>
                            </Box>
                          )}

                          <Box sx={{ mt: 1 }}>
                            <Typography variant='caption' color='text.secondary'></Typography>
                          </Box>

                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              alignItems: 'center',
                              gap: 1,
                              mt: 2
                            }}
                          >
                            {/* قیمت اصلی خط‌خورده */}
                            <Typography
                              sx={{
                                fontSize: 20,
                                fontWeight: 700,
                                color: 'text.secondary',
                                textDecoration: 'line-through'
                              }}
                            >
                              {item?.course_fee}تومان
                            </Typography>

                            {/* درصد تخفیف */}
                            <Typography
                              sx={{
                                fontSize: 14,
                                fontWeight: 700,
                                color: '#E53935'
                              }}
                            >
                              ۳۰٪-
                            </Typography>
                          </Box>
                        </>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
                <Grid item xs={12} display='flex' justifyContent='flex-end' mt={20}>
                  <Pagination
                    page={currentPage}
                    onChange={handlePageChange}
                    count={1}
                    variant='text'
                    shape='rounded'
                    color='primary'
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
