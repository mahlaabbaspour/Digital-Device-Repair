// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { PolarArea } from 'react-chartjs-2'
import { ChartData, ChartOptions, Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js'
import OptionsMenu from '@/components/option-menu'
import { Typography } from '@mui/material'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

// ** Custom Components Imports
// import OptionsMenu from 'src/@core/components/option-menu'

interface PolarAreaProps {
  info: string
  grey: string
  green: string
  yellow: string
  primary: string
  warning: string
  legendColor: string
  title: string
  description: string
}

const ChartjsPolarAreaChart = (props: PolarAreaProps) => {
  // ** Props
  const { info, grey, green, yellow, primary, warning, legendColor, title, description } = props

  const options: ChartOptions<'polarArea'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    layout: {
      padding: {
        top: -5,
        bottom: -45
      }
    },
    scales: {
      r: {
        grid: { display: false },
        ticks: { display: false }
      }
    },
    plugins: {
      legend: {
        position: 'right',
        maxWidth: 100,
        labels: {
          padding: 15,
          boxWidth: 9,
          color: legendColor,
          usePointStyle: true,
          font: {
            size: 11
          }
        }
      }
    }
  }

  const data: ChartData<'polarArea'> = {
    labels: ['Africa', 'Asia', 'Europe', 'America', 'Antarctica', 'Australia'],
    datasets: [
      {
        borderWidth: 0,
        label: 'Population (millions)',
        data: [19, 17.5, 15, 13.5, 11, 9],
        backgroundColor: [primary, yellow, warning, info, grey, green]
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        sx={{ textAlign: 'center', pb: 0 }}
        title={
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
        }
        subheader={<Typography variant='caption'>{description}</Typography>}
      />
      <CardContent>
        <PolarArea data={data} height={300} options={options} />
      </CardContent>
    </Card>
  )
}

export default ChartjsPolarAreaChart
