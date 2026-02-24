'use client'

import CustomAvatar from '@/@core/components/mui/Avatar'
import Link from '@/components/Link'
import { Box, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import {
  FcApproval,
  FcCheckmark,
  FcEmptyFilter,
  FcInspection,
  FcMoneyTransfer,
  FcNext,
  FcProcess,
  FcRedo,
  FcTodoList
} from 'react-icons/fc'
import dynamic from 'next/dynamic'
import { useTheme } from '@mui/material/styles'
import type { ApexOptions } from 'apexcharts'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

export default function DashboardUserCard({ show }: any) {
  console.log(show, 'show')
  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <Card>
          <CardHeader
            sx={{ pb: 1.25 }}
            title={
              <Typography variant='h5' sx={{ fontWeight: 700 }}>
                پرونده های مشاوره
              </Typography>
            }
            action={<Image src={'/images/icons/menu/experience.png'} width={45} height={45} alt='image' />}
            subheader={<Typography variant='caption'>آمار مربوط به پرونده های مشاوره در مرکز</Typography>}
          />
          <CardContent>
            <Grid container spacing={4} mt={2.5}>
              <Grid item xs={12} sm={4}>
                <Link href={'#'}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4 }}>
                      <FcTodoList size={22} />
                    </CustomAvatar>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant='h6'>{show?.consultationDocuments?.open}</Typography>
                      <Typography variant='body1'>مفتوح</Typography>
                    </Box>
                  </Box>
                </Link>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Link href={'#'}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4 }}>
                      <FcRedo size={22} />
                    </CustomAvatar>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant='h6'>{show?.consultationDocuments?.closed}</Typography>
                      <Typography variant='body1'>مختومه</Typography>
                    </Box>
                  </Box>
                </Link>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Link href={'#'}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4 }}>
                      <FcNext size={24} />
                    </CustomAvatar>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant='h6'>{show?.consultationDocuments?.referred}</Typography>
                      <Typography variant='body1'>ارجاع شده</Typography>
                    </Box>
                  </Box>
                </Link>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      {/* //----------------------------------------------------------------------------------------------- */}
      <Grid item xs={6}>
        <Card>
          <CardHeader
            sx={{ pb: 1.25 }}
            title={
              <Typography variant='h5' sx={{ fontWeight: 700 }}>
                جلسات مشاوره
              </Typography>
            }
            action={<Image src={'/images/icons/menu/track.png'} width={45} height={45} alt='image' />}
            subheader={<Typography variant='caption'>آمار مربوط به جلسات مشاوره در دوره های آموزشی</Typography>}
          />
          <CardContent>
            <Grid container spacing={4} mt={2.5}>
              <Grid item xs={12} sm={4}>
                <Link href={'#'}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4 }}>
                      <FcEmptyFilter size={24} />
                    </CustomAvatar>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant='h6'>{show?.consultationMeetings?.open}</Typography>
                      <Typography variant='body1'>آزاد</Typography>
                    </Box>
                  </Box>
                </Link>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Link href={'#'}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4 }}>
                      <FcCheckmark size={24} />
                    </CustomAvatar>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant='h6'>{show?.consultationMeetings?.reserved}</Typography>
                      <Typography variant='body1'>رزرو شده</Typography>
                    </Box>
                  </Box>
                </Link>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Link href={'#'}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4 }}>
                      <FcApproval size={24} />
                    </CustomAvatar>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant='h6'>{show?.consultationMeetings?.reserved}</Typography>
                      <Typography variant='body1'>قطعی</Typography>
                    </Box>
                  </Box>
                </Link>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card>
          <CardHeader
            sx={{ pb: 1.25 }}
            title={
              <Typography variant='h5' sx={{ fontWeight: 700 }}>
                یارانه مشاوره
              </Typography>
            }
            action={<Image src={'/images/icons/menu/charity.png'} width={45} height={45} alt='image' />}
            subheader={<Typography variant='caption'>آمار مربوط به یارانه مشاوره و اعتبار مانده مرکز</Typography>}
          />
          <CardContent>
            <Grid container spacing={4} mt={2.5}>
              <Grid item xs={12} sm={4}>
                <Link href={'#'}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4 }}>
                      <FcTodoList size={24} />
                    </CustomAvatar>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant='h6'>{show?.consultationSubsides?.approved}</Typography>
                      <Typography variant='body1'>تعداد درخواست ها</Typography>
                    </Box>
                  </Box>
                </Link>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Link href={'#'}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4 }}>
                      <FcProcess size={24} />
                    </CustomAvatar>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant='h6'>{show?.consultationSubsides?.underEvaluation}</Typography>
                      <Typography variant='body1'>در حال ارزیابی</Typography>
                    </Box>
                  </Box>
                </Link>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Link href={'#'}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4 }}>
                      <FcMoneyTransfer size={24} />
                    </CustomAvatar>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant='h6'>37%</Typography>
                      <Typography variant='body1'>مانده اعتبار</Typography>
                    </Box>
                  </Box>
                </Link>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <ApexAreaChart />
      </Grid>
      <Grid item xs={12}>
        <ApexLineChart />
      </Grid>
    </Grid>
  )
}

const areaColors = {
  series1: '#ab7efd',
  series2: '#b992fe',
  series3: '#e0cffe'
}

const series = [
  {
    name: 'بازدیدها',
    data: [100, 120, 90, 170, 130, 160, 140, 240, 220, 180, 270, 280, 375]
  },
  {
    name: 'کلیک‌ها',
    data: [60, 80, 70, 110, 80, 100, 90, 180, 160, 140, 200, 220, 275]
  },
  {
    name: 'فروش',
    data: [20, 40, 30, 70, 40, 60, 50, 140, 120, 100, 140, 180, 220]
  }
]

const ApexAreaChart = () => {
  // Hooks
  const theme = useTheme()

  // Vars
  const divider = 'var(--mui-palette-divider)'
  const textDisabled = 'var(--mui-palette-text-disabled)'

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: { shared: false },
    dataLabels: { enabled: false },
    stroke: {
      show: false,
      curve: 'straight'
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      labels: { colors: 'var(--mui-palette-text-secondary)' },
      fontSize: '13px',
      markers: {
        offsetY: 2,
        offsetX: theme.direction === 'rtl' ? 7 : -4
      },
      itemMargin: { horizontal: 9 }
    },
    colors: [areaColors.series3, areaColors.series2, areaColors.series1],
    fill: {
      opacity: 1,
      type: 'solid'
    },
    grid: {
      show: true,
      borderColor: divider,
      xaxis: {
        lines: { show: true }
      }
    },
    yaxis: {
      labels: {
        style: { colors: textDisabled, fontSize: '13px' }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: divider },
      crosshairs: {
        stroke: { color: divider }
      },
      labels: {
        style: { colors: textDisabled, fontSize: '13px' }
      },
      categories: [
        '7/12',
        '8/12',
        '9/12',
        '10/12',
        '11/12',
        '12/12',
        '13/12',
        '14/12',
        '15/12',
        '16/12',
        '17/12',
        '18/12',
        '19/12'
      ]
    }
  }

  return (
    <Card>
      <CardHeader
        title='نمودار خطی'
        subheader='شبکه‌های تجاری'
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />
      <CardContent>
        <AppReactApexCharts type='area' width='100%' height={400} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

const ApexLineChart = () => {
  // Vars
  const divider = 'var(--mui-palette-divider)'
  const disabledText = 'var(--mui-palette-text-disabled)'

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: false }
    },
    colors: ['#ff9f43'],
    stroke: { curve: 'straight' },
    dataLabels: { enabled: false },
    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      colors: ['#ff9f43'],
      strokeColors: ['#fff']
    },
    grid: {
      padding: { top: -10 },
      borderColor: divider,
      xaxis: {
        lines: { show: true }
      }
    },
    tooltip: {
      custom(data: any) {
        return `<div class='bar-chart'>
          <span>${data.series[data.seriesIndex][data.dataPointIndex]}%</span>
        </div>`
      }
    },
    yaxis: {
      labels: {
        style: { colors: disabledText, fontSize: '13px' }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: divider },
      crosshairs: {
        stroke: { color: divider }
      },
      labels: {
        style: { colors: disabledText, fontSize: '13px' }
      },
      categories: [
        '7/12',
        '8/12',
        '9/12',
        '10/12',
        '11/12',
        '12/12',
        '13/12',
        '14/12',
        '15/12',
        '16/12',
        '17/12',
        '18/12',
        '19/12',
        '20/12',
        '21/12'
      ]
    }
  }

  return (
    <Card>
      <CardHeader
        title='تعادل'
        subheader='شبکه‌ها و شرکت‌های تجاری'
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />
      <CardContent>
        <AppReactApexCharts type='line' width='100%' height={400} options={options} series={series} />
      </CardContent>
    </Card>
  )
}
