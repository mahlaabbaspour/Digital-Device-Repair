// // ** MUI Imports
// import Card from '@mui/material/Card'
// import { useTheme } from '@mui/material/styles'
// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'

// // ** Third Party Imports
// import { ApexOptions } from 'apexcharts'
// import ReactApexChart from 'react-apexcharts'
// // import ReactApexcharts from '@/components/react-apexcharts'
// // import ReactApexcharts from '@/components/react-apexcharts'

// // import ReactApexcharts from 'src/@core/components/react-apexcharts'

// const ApexLineChart = ({ last10DayFiles }: any) => {
//   const series: any = [
//     {
//       data: Object.values(last10DayFiles)
//     }
//   ]
//   console.log(series, 'series')

//   // ** Hook
//   const theme = useTheme()

//   const options: ApexOptions = {
//     chart: {
//       parentHeightOffset: 0,
//       zoom: { enabled: false },
//       toolbar: { show: false }
//     },
//     colors: ['#ff9f43'],
//     stroke: { curve: 'straight' },
//     dataLabels: { enabled: false },
//     markers: {
//       strokeWidth: 7,
//       strokeOpacity: 1,
//       colors: ['#ff9f43'],
//       strokeColors: ['#fff']
//     },
//     grid: {
//       padding: { top: -10 },
//       borderColor: theme.palette.divider,
//       xaxis: {
//         lines: { show: true }
//       }
//     },
//     tooltip: {
//       custom(data: any) {
//         return `<div class='bar-chart'>
//                           <span>${Object.keys(last10DayFiles)[data.dataPointIndex]} : ${Number(Object.values(last10DayFiles)[data.dataPointIndex])?.toLocaleString()}</span>
//                         </div>`
//       }
//     },
//     yaxis: {
//       labels: {
//         style: { colors: theme.palette.text.disabled, fontFamily: 'IRANSans' },
//         formatter: function (value) {
//           // Convert each value to a locale-specific string representation
//           return Number(value)?.toLocaleString()
//         }
//       }
//     },
//     xaxis: {
//       categories: Object.keys(last10DayFiles),
//       tooltip: { enabled: false },
//       axisBorder: { show: false },
//       axisTicks: { color: theme.palette.divider },
//       crosshairs: {
//         stroke: { color: theme.palette.divider }
//       },
//       labels: {
//         show: true,
//         style: { colors: theme.palette.text.disabled, fontFamily: 'IRANSans' }
//       }
//     }
//     // xaxis: {
//     //   tooltip: {
//     //     enabled: false
//     //   },
//     //   axisBorder: { show: false },
//     //   axisTicks: { color: theme.palette.divider },
//     //   crosshairs: {
//     //     stroke: { color: theme.palette.divider }
//     //   },
//     //   labels: {
//     //     show: true,
//     //     style: { colors: theme.palette.text.disabled, fontFamily: 'IRANSans' }
//     //   }
//     // }
//   }

//   return (
//     <Card>
//       <CardHeader
//         title='فایل‌ها'
//         subheader='فایل‌های بارگذاری شده در 10 روز اخیر'
//         sx={{
//           fontSize: '0.5rem',
//           flexDirection: ['column', 'row'],
//           alignItems: ['flex-start', 'center'],
//           '& .MuiCardHeader-action': { mb: 0 },
//           '& .MuiCardHeader-content': { mb: [2, 0] }
//         }}
//       />
//       <CardContent>
//         <ReactApexChart type='line' height={250} options={options} series={series} />
//       </CardContent>
//     </Card>
//   )
// }

// export default ApexLineChart

'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader } from '@mui/material'

const WeeklySessionsChart = () => {
  const data = [
    { day: 'شنبه', count: 5 },
    { day: 'یکشنبه', count: 12 },
    { day: 'دوشنبه', count: 8 },
    { day: 'سه‌شنبه', count: 15 },
    { day: 'چهارشنبه', count: 10 },
    { day: 'پنجشنبه', count: 18 },
    { day: 'امروز', count: 9 }
  ]

  return (
    <Card>
      <CardHeader title='جلسات' subheader='تعداد جلسات در 7 روز اخیر' />
      <CardContent>
        <div style={{ width: 350, height: 360 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='day' />
              <YAxis />
              <Tooltip />
              <Line
                type='monotone'
                dataKey='count'
                stroke='#1976d2'
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default WeeklySessionsChart
