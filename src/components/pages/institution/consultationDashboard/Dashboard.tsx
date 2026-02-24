'use client'

import CustomAvatar from '@/@core/components/mui/Avatar'
import Link from '@/components/Link'
import { Box, Card, CardContent, CardHeader, Grid, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import {
  FcApproval,
  FcCheckmark,
  FcEmptyFilter,
  FcMoneyTransfer,
  FcNext,
  FcProcess,
  FcRedo,
  FcTodoList
} from 'react-icons/fc'
import dynamic from 'next/dynamic'
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useFetchDataDashboardOrganization } from '@/hooks/organization/useDashboardOrganization'
// import ApexLineChart from '@/views/charts/apex-charts/ApexLineChart'
import { useSettings } from '@/@core/hooks/useSettings'
import ApexDonutChart from '@/views/charts/apex-charts/ApexDonutChart'
import TopMeetings from './TopMeetings'
import ApexChartWrapper from '@/components/libs/react-apexcharts'
// import CrmWeeklyOverview from '@/views/charts/apex-charts/ApexLineChart'
// import ChartjsPolarAreaChart from '@/views/charts/chartjs/ChartjsPolarAreaChart'

// Styled Component Imports
const ApexLineChart = dynamic(() => import('@/views/charts/apex-charts/ApexLineChart'), { ssr: false })
const RechartsBarChart = dynamic(() => import('@/views/charts/recharts/RechartsBarChart'), { ssr: false })
const ChartjsPolarAreaChart = dynamic(() => import('@/views/charts/chartjs/ChartjsPolarAreaChart'), { ssr: false })

const topDoctorsData = [
  {
    id: 1,
    first_name: 'علی',
    last_name: 'محمدی',
    image: '/images/avatars/1.png',
    receptions_count: 128
  },
  {
    id: 2,
    first_name: 'مریم',
    last_name: 'رضایی',
    image: '/images/avatars/2.png',
    receptions_count: 112
  },
  {
    id: 3,
    first_name: 'حسین',
    last_name: 'کاظمی',
    image: '/images/avatars/3.png',
    receptions_count: 97
  },
  {
    id: 4,
    first_name: 'سارا',
    last_name: 'نوری',
    image: '/images/avatars/4.png',
    receptions_count: 85
  }
]
export default function DashboardConsultation({ id }: any) {
  const { settings } = useSettings()

  // ** Hook
  const theme = useTheme()

  // Vars
  const whiteColor = '#fff'
  const yellowColor = '#ffe802'
  const primaryColor = '#836af9'
  const areaChartBlue = '#2c9aff'
  const barChartYellow = '#ffcf5c'
  const polarChartGrey = '#4f5d70'

  const polarChartInfo = '#299aff'
  const lineChartYellow = '#d4e157'
  const polarChartGreen = '#28dac6'
  const lineChartPrimary = '#787EFF'
  const lineChartWarning = '#ff9800'
  const horizontalBarInfo = '#26c6da'
  const polarChartWarning = '#ff8131'
  const scatterChartGreen = '#28c76f'
  const warningColorShade = '#ffbd1f'
  const areaChartBlueLight = '#84d0ff'
  const areaChartGreyLight = '#edf1f4'
  const scatterChartWarning = '#ff9f43'
  const borderColor = theme.palette.divider
  const labelColor = theme.palette.text.disabled
  const legendColor = theme.palette.text.secondary

  const { control: controlFilter, watch } = useForm({
    defaultValues: {
      province_ids: [],
      city_ids: [],
      institution_ids: []
    }
  })

  const [filters, setFilters] = useState<any>({})
  const { data: show, isLoading }: any = useFetchDataDashboardOrganization({ id: id, params: filters })

  const province_ids = watch('province_ids')
  const provinceQuery = province_ids?.map((p: any, index) => `province_ids[${index}]=${p.id}`).join('&')

  const city_ids = watch('city_ids')
  const institutionQuery = city_ids?.map((p: any, index) => `city_ids[${index}]=${p.id}`).join('&')
  const institution_ids = watch('institution_ids')

  useEffect(() => {
    if (institution_ids?.length) {
      const data = {
        institution_ids: institution_ids?.map((el: any) => el?.id)
      }
      setFilters(data)
    }
  }, [institution_ids])

  const last7DayFiles = {
    '6 روز پیش': 12,
    '5 روز پیش': 18,
    '4 روز پیش': 9,
    '3 روز پیش': 22,
    '2 روز پیش': 15,
    '1 روز پیش': 27,
    امروز: 19
  }

  console.log(show, 'show')
  return (
    <>
      {/* <Card sx={{ mb: 5 }}>
        <CardContent>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <Controller
                  name='province_ids'
                  control={controlFilter}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomAsyncAutocomplete
                      url={`/organization/${id}/cartable/select/province`}
                      readOnly={false}
                      onAddValue={newValue => onChange(newValue)}
                      value={value}
                      multiple={true}
                      getOptionLabel={option => option?.name}
                      label='استان'
                      error={!!error}
                      helperText={error?.message}
                    ></CustomAsyncAutocomplete>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  name='city_ids'
                  control={controlFilter}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomAsyncAutocomplete
                      url={`/organization/${id}/cartable/select/city${provinceQuery ? `?${provinceQuery}` : ``}`}
                      readOnly={false}
                      multiple={true}
                      onAddValue={newValue => onChange(newValue)}
                      value={value}
                      getOptionLabel={option => option?.name}
                      label='شهرستان'
                      error={!!error}
                      helperText={error?.message}
                    ></CustomAsyncAutocomplete>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  name='institution_ids'
                  control={controlFilter}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomAsyncAutocomplete
                      url={`/organization/${id}/cartable/select/institution${institutionQuery ? `?${institutionQuery}` : ``}`}
                      readOnly={false}
                      multiple={true}
                      onAddValue={newValue => onChange(newValue)}
                      value={value}
                      getOptionLabel={option => option?.name}
                      label='مرکز'
                      error={!!error}
                      helperText={error?.message}
                    ></CustomAsyncAutocomplete>
                  )}
                />
              </Grid>
            </Grid>
          </CardContent>
        </CardContent>
      </Card> */}

      <Grid container spacing={6} mb={5}>
        <Grid item xs={3}>
          <Card>
            <CardHeader
              sx={{ pb: 1.25 }}
              title={
                <Typography variant='h5' sx={{ fontWeight: 700 }}>
                  پرونده های مشاوره
                </Typography>
              }
              action={<Image src={'/images/icons/menu/experience.png'} width={45} height={45} alt='image' />}
              subheader={<Typography variant='caption'>تعداد پرونده های مشاوره مرکز</Typography>}
            />
            <CardContent>
              <Grid container spacing={4} mt={2.5}>
                <Grid item xs={12} sm={4}>
                  <Link href={'#'} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        sx={{
                          mr: 2,
                          width: 32,
                          height: 32
                        }}
                      >
                        <FcTodoList size={16} />
                      </CustomAvatar>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ fontWeight: 600, fontSize: 14 }}>
                          256
                        </Typography>
                        <Typography variant='caption' sx={{ fontSize: 12 }}>
                          مفتوح
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Link href={'#'} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        sx={{
                          mr: 2,
                          width: 32,
                          height: 32
                        }}
                      >
                        <FcTodoList size={16} />
                      </CustomAvatar>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ fontWeight: 600, fontSize: 14 }}>
                          100
                        </Typography>
                        <Typography variant='caption' sx={{ fontSize: 12 }}>
                          مختومه
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Link href={'#'} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        sx={{
                          mr: 2,
                          width: 32,
                          height: 32
                        }}
                      >
                        <FcTodoList size={16} />
                      </CustomAvatar>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ fontWeight: 600, fontSize: 14 }}>
                          55
                        </Typography>
                        <Typography variant='caption' sx={{ fontSize: 12 }}>
                          ارجاع
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardHeader
              sx={{ pb: 1.25 }}
              title={
                <Typography variant='h5' sx={{ fontWeight: 700 }}>
                  جلسات مشاوره
                </Typography>
              }
              action={<Image src={'/images/icons/menu/experience.png'} width={45} height={45} alt='image' />}
              subheader={<Typography variant='caption'>تعداد جلسات مشاوره مرکز</Typography>}
            />
            <CardContent>
              <Grid container spacing={4} mt={2.5}>
                <Grid item xs={12} sm={4}>
                  <Link href={'#'} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        sx={{
                          mr: 2,
                          width: 32,
                          height: 32
                        }}
                      >
                        <FcTodoList size={16} />
                      </CustomAvatar>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ fontWeight: 600, fontSize: 14 }}>
                          230
                        </Typography>
                        <Typography variant='caption' sx={{ fontSize: 12 }}>
                          رزرو
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Link href={'#'} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        sx={{
                          mr: 2,
                          width: 32,
                          height: 32
                        }}
                      >
                        <FcTodoList size={16} />
                      </CustomAvatar>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ fontWeight: 600, fontSize: 14 }}>
                          45
                        </Typography>
                        <Typography variant='caption' sx={{ fontSize: 12 }}>
                          قطعی
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Link href={'#'} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        sx={{
                          mr: 2,
                          width: 32,
                          height: 32
                        }}
                      >
                        <FcTodoList size={16} />
                      </CustomAvatar>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ fontWeight: 600, fontSize: 14 }}>
                          61
                        </Typography>
                        <Typography variant='caption' sx={{ fontSize: 12 }}>
                          کنسلی
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardHeader
              sx={{ pb: 1.25 }}
              title={
                <Typography variant='h5' sx={{ fontWeight: 700 }}>
                  تشخیص های مشاور
                </Typography>
              }
              action={<Image src={'/images/icons/menu/experience.png'} width={45} height={45} alt='image' />}
              subheader={<Typography variant='caption'>تعداد تشخیص های مشاور مرکز</Typography>}
            />
            <CardContent>
              <Grid container spacing={4} mt={2.5}>
                <Grid item xs={12} sm={4}>
                  <Link href={'#'} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        sx={{
                          mr: 2,
                          width: 32,
                          height: 32
                        }}
                      >
                        <FcTodoList size={16} />
                      </CustomAvatar>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ fontWeight: 600, fontSize: 14 }}>
                          256
                        </Typography>
                        <Typography variant='caption' sx={{ fontSize: 12 }}>
                          مفتوح
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Link href={'#'} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        sx={{
                          mr: 2,
                          width: 32,
                          height: 32
                        }}
                      >
                        <FcTodoList size={16} />
                      </CustomAvatar>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ fontWeight: 600, fontSize: 14 }}>
                          256
                        </Typography>
                        <Typography variant='caption' sx={{ fontSize: 12 }}>
                          مفتوح
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Link href={'#'} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        sx={{
                          mr: 2,
                          width: 32,
                          height: 32
                        }}
                      >
                        <FcTodoList size={16} />
                      </CustomAvatar>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ fontWeight: 600, fontSize: 14 }}>
                          256
                        </Typography>
                        <Typography variant='caption' sx={{ fontSize: 12 }}>
                          مفتوح
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardHeader
              sx={{ pb: 1.25 }}
              title={
                <Typography variant='h5' sx={{ fontWeight: 700 }}>
                  پرونده های مشاوره
                </Typography>
              }
              action={<Image src={'/images/icons/menu/experience.png'} width={45} height={45} alt='image' />}
              subheader={<Typography variant='caption'>تعداد پرونده های مشاوره مرکز</Typography>}
            />
            <CardContent>
              <Grid container spacing={4} mt={2.5}>
                <Grid item xs={12} sm={4}>
                  <Link href={'#'} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        sx={{
                          mr: 2,
                          width: 32,
                          height: 32
                        }}
                      >
                        <FcTodoList size={16} />
                      </CustomAvatar>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ fontWeight: 600, fontSize: 14 }}>
                          256
                        </Typography>
                        <Typography variant='caption' sx={{ fontSize: 12 }}>
                          مفتوح
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Link href={'#'} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        sx={{
                          mr: 2,
                          width: 32,
                          height: 32
                        }}
                      >
                        <FcTodoList size={16} />
                      </CustomAvatar>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ fontWeight: 600, fontSize: 14 }}>
                          256
                        </Typography>
                        <Typography variant='caption' sx={{ fontSize: 12 }}>
                          مفتوح
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Link href={'#'} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        sx={{
                          mr: 2,
                          width: 32,
                          height: 32
                        }}
                      >
                        <FcTodoList size={16} />
                      </CustomAvatar>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ fontWeight: 600, fontSize: 14 }}>
                          256
                        </Typography>
                        <Typography variant='caption' sx={{ fontSize: 12 }}>
                          مفتوح
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={5} mb={5}>
        <Grid item xs={12} md={9}>
          <RechartsBarChart direction='ltr' title='عملکرد یکساله تعداد تشکیل پرونده' />
        </Grid>
        <Grid item xs={12} md={3}>
          <ApexLineChart />
        </Grid>
      </Grid>

      <Grid container spacing={5} mb={5}>
        <Grid item xs={12} md={3}>
          <ChartjsPolarAreaChart
            yellow={yellowColor}
            info={polarChartInfo}
            grey={polarChartGrey}
            primary={primaryColor}
            green={polarChartGreen}
            legendColor={legendColor}
            warning={polarChartWarning}
            title='پرونده ها بر حسب جنسیت'
            description='می توانید آمار پرونده ها بر حسب جنسیت را مشاهده کنید'
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <ChartjsPolarAreaChart
            yellow={yellowColor}
            info={polarChartInfo}
            grey={polarChartGrey}
            primary={primaryColor}
            green={polarChartGreen}
            legendColor={legendColor}
            warning={polarChartWarning}
            title='پرونده ها بر حسب تاهل'
            description='می توانید آمار پرونده ها بر حسب تاهل را مشاهده کنید'
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <ChartjsPolarAreaChart
            yellow={yellowColor}
            info={polarChartInfo}
            grey={polarChartGrey}
            primary={primaryColor}
            green={polarChartGreen}
            legendColor={legendColor}
            warning={polarChartWarning}
            title='پرونده ها بر حسب اشتغال'
            description='می توانید آمار پرونده ها بر حسب اشتغال را مشاهده کنید'
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <ChartjsPolarAreaChart
            yellow={yellowColor}
            info={polarChartInfo}
            grey={polarChartGrey}
            primary={primaryColor}
            green={polarChartGreen}
            legendColor={legendColor}
            warning={polarChartWarning}
            title='پرونده ها بر حسب دهک'
            description='می توانید آمار پرونده ها بر حسب دهک را مشاهده کنید'
          />
        </Grid>
      </Grid>

      <Grid container spacing={5} mb={5}>
        <Grid item xs={12} md={6}>
          <ApexDonutChart
            title='پرونده ها بر اساس حوزه فعالیت'
            description='می توانید درصد فراونی پرونده ها بر اساس حوزه حیطه فعالیت را مشاهده کنید'
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <ApexDonutChart
            title=' جلسات بر اساس حوزه فعالیت'
            description='می توانید درصد فراونی جلسات بر اساس حوزه حیطه فعالیت را مشاهده کنید'
          />
        </Grid>
      </Grid>

      <Grid container spacing={6} mb={5}>
        <Grid item xs={3}>
          <Card>
            <CardHeader
              sx={{ pb: 1.25 }}
              title={
                <Typography variant='h5' sx={{ fontWeight: 700 }}>
                  پرونده های مشاوره
                </Typography>
              }
              action={<Image src={'/images/icons/menu/experience.png'} width={45} height={45} alt='image' />}
              subheader={<Typography variant='caption'>تعداد پرونده های مشاوره مرکز</Typography>}
            />
            <CardContent>
              <Grid container spacing={4} mt={2.5}>
                <Grid item xs={12} sm={4}>
                  <Link href={'#'} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        sx={{
                          mr: 2,
                          width: 32,
                          height: 32
                        }}
                      >
                        <FcTodoList size={16} />
                      </CustomAvatar>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ fontWeight: 600, fontSize: 14 }}>
                          256
                        </Typography>
                        <Typography variant='caption' sx={{ fontSize: 12 }}>
                          مفتوح
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Link href={'#'} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        sx={{
                          mr: 2,
                          width: 32,
                          height: 32
                        }}
                      >
                        <FcTodoList size={16} />
                      </CustomAvatar>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ fontWeight: 600, fontSize: 14 }}>
                          256
                        </Typography>
                        <Typography variant='caption' sx={{ fontSize: 12 }}>
                          مفتوح
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Link href={'#'} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        sx={{
                          mr: 2,
                          width: 32,
                          height: 32
                        }}
                      >
                        <FcTodoList size={16} />
                      </CustomAvatar>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ fontWeight: 600, fontSize: 14 }}>
                          256
                        </Typography>
                        <Typography variant='caption' sx={{ fontSize: 12 }}>
                          مفتوح
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardHeader
              sx={{ pb: 1.25 }}
              title={
                <Typography variant='h5' sx={{ fontWeight: 700 }}>
                  پرونده های مشاوره
                </Typography>
              }
              action={<Image src={'/images/icons/menu/experience.png'} width={45} height={45} alt='image' />}
              subheader={<Typography variant='caption'>تعداد پرونده های مشاوره مرکز</Typography>}
            />
            <CardContent>
              <Grid container spacing={4} mt={2.5}>
                <Grid item xs={12} sm={4}>
                  <Link href={'#'} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        sx={{
                          mr: 2,
                          width: 32,
                          height: 32
                        }}
                      >
                        <FcTodoList size={16} />
                      </CustomAvatar>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ fontWeight: 600, fontSize: 14 }}>
                          256
                        </Typography>
                        <Typography variant='caption' sx={{ fontSize: 12 }}>
                          مفتوح
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Link href={'#'} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        sx={{
                          mr: 2,
                          width: 32,
                          height: 32
                        }}
                      >
                        <FcTodoList size={16} />
                      </CustomAvatar>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ fontWeight: 600, fontSize: 14 }}>
                          256
                        </Typography>
                        <Typography variant='caption' sx={{ fontSize: 12 }}>
                          مفتوح
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Link href={'#'} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        sx={{
                          mr: 2,
                          width: 32,
                          height: 32
                        }}
                      >
                        <FcTodoList size={16} />
                      </CustomAvatar>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ fontWeight: 600, fontSize: 14 }}>
                          256
                        </Typography>
                        <Typography variant='caption' sx={{ fontSize: 12 }}>
                          مفتوح
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardHeader
              sx={{ pb: 1.25 }}
              title={
                <Typography variant='h5' sx={{ fontWeight: 700 }}>
                  پرونده های مشاوره
                </Typography>
              }
              action={<Image src={'/images/icons/menu/experience.png'} width={45} height={45} alt='image' />}
              subheader={<Typography variant='caption'>تعداد پرونده های مشاوره مرکز</Typography>}
            />
            <CardContent>
              <Grid container spacing={4} mt={2.5}>
                <Grid item xs={12} sm={4}>
                  <Link href={'#'} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        sx={{
                          mr: 2,
                          width: 32,
                          height: 32
                        }}
                      >
                        <FcTodoList size={16} />
                      </CustomAvatar>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ fontWeight: 600, fontSize: 14 }}>
                          256
                        </Typography>
                        <Typography variant='caption' sx={{ fontSize: 12 }}>
                          مفتوح
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Link href={'#'} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        sx={{
                          mr: 2,
                          width: 32,
                          height: 32
                        }}
                      >
                        <FcTodoList size={16} />
                      </CustomAvatar>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ fontWeight: 600, fontSize: 14 }}>
                          256
                        </Typography>
                        <Typography variant='caption' sx={{ fontSize: 12 }}>
                          مفتوح
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Link href={'#'} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        sx={{
                          mr: 2,
                          width: 32,
                          height: 32
                        }}
                      >
                        <FcTodoList size={16} />
                      </CustomAvatar>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ fontWeight: 600, fontSize: 14 }}>
                          256
                        </Typography>
                        <Typography variant='caption' sx={{ fontSize: 12 }}>
                          مفتوح
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardHeader
              sx={{ pb: 1.25 }}
              title={
                <Typography variant='h5' sx={{ fontWeight: 700 }}>
                  پرونده های مشاوره
                </Typography>
              }
              action={<Image src={'/images/icons/menu/experience.png'} width={45} height={45} alt='image' />}
              subheader={<Typography variant='caption'>تعداد پرونده های مشاوره مرکز</Typography>}
            />
            <CardContent>
              <Grid container spacing={4} mt={2.5}>
                <Grid item xs={12} sm={4}>
                  <Link href={'#'} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        sx={{
                          mr: 2,
                          width: 32,
                          height: 32
                        }}
                      >
                        <FcTodoList size={16} />
                      </CustomAvatar>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ fontWeight: 600, fontSize: 14 }}>
                          256
                        </Typography>
                        <Typography variant='caption' sx={{ fontSize: 12 }}>
                          مفتوح
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Link href={'#'} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        sx={{
                          mr: 2,
                          width: 32,
                          height: 32
                        }}
                      >
                        <FcTodoList size={16} />
                      </CustomAvatar>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ fontWeight: 600, fontSize: 14 }}>
                          256
                        </Typography>
                        <Typography variant='caption' sx={{ fontSize: 12 }}>
                          مفتوح
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Link href={'#'} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        sx={{
                          mr: 2,
                          width: 32,
                          height: 32
                        }}
                      >
                        <FcTodoList size={16} />
                      </CustomAvatar>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ fontWeight: 600, fontSize: 14 }}>
                          256
                        </Typography>
                        <Typography variant='caption' sx={{ fontSize: 12 }}>
                          مفتوح
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={5} mb={5}>
        <Grid item xs={12} md={9}>
          <RechartsBarChart direction='ltr' title='عملکرد یکساله تعداد جلسات مشاوره' />
        </Grid>
        <Grid item xs={12} md={3}>
          <ApexLineChart />
        </Grid>
      </Grid>

      <Grid container spacing={5} mb={5}>
        <Grid item xs={12} md={3}>
          <ChartjsPolarAreaChart
            yellow={yellowColor}
            info={polarChartInfo}
            grey={polarChartGrey}
            primary={primaryColor}
            green={polarChartGreen}
            legendColor={legendColor}
            warning={polarChartWarning}
            title='پرونده ها بر حسب جنسیت'
            description='می توانید آمار پرونده ها بر حسب جنسیت را مشاهده کنید'
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <ChartjsPolarAreaChart
            yellow={yellowColor}
            info={polarChartInfo}
            grey={polarChartGrey}
            primary={primaryColor}
            green={polarChartGreen}
            legendColor={legendColor}
            warning={polarChartWarning}
            title='پرونده ها بر حسب جنسیت'
            description='می توانید آمار پرونده ها بر حسب جنسیت را مشاهده کنید'
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <ChartjsPolarAreaChart
            yellow={yellowColor}
            info={polarChartInfo}
            grey={polarChartGrey}
            primary={primaryColor}
            green={polarChartGreen}
            legendColor={legendColor}
            warning={polarChartWarning}
            title='پرونده ها بر حسب جنسیت'
            description='می توانید آمار پرونده ها بر حسب جنسیت را مشاهده کنید'
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <ChartjsPolarAreaChart
            yellow={yellowColor}
            info={polarChartInfo}
            grey={polarChartGrey}
            primary={primaryColor}
            green={polarChartGreen}
            legendColor={legendColor}
            warning={polarChartWarning}
            title='پرونده ها بر حسب جنسیت'
            description='می توانید آمار پرونده ها بر حسب جنسیت را مشاهده کنید'
          />
        </Grid>
      </Grid>

      <Grid container spacing={5} mb={5}>
        <Grid item xs={12} md={3}>
          <TopMeetings data={topDoctorsData} />
        </Grid>
        <Grid item xs={12} md={3}>
          <TopMeetings data={topDoctorsData} />
        </Grid>
        <Grid item xs={12} md={3}>
          <TopMeetings data={topDoctorsData} />
        </Grid>
        <Grid item xs={12} md={3}>
          <TopMeetings data={topDoctorsData} />
        </Grid>
      </Grid>
    </>
  )
}
