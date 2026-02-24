// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'
import { Icon } from '@iconify/react'
import { format } from 'date-fns-jalali'

type DateType = Date | null | undefined

interface Props {
  direction: 'ltr' | 'rtl'
  title: string
}

interface PickerProps {
  start: Date | number
  end: Date | number
}

const data = [
  {
    name: '7/12',
    Apple: 80
  },
  {
    name: '8/12',
    Apple: 100
  },
  {
    name: '9/12',
    Apple: 80
  },
  {
    name: '10/12',
    Apple: 100
  },
  {
    name: '11/12',
    Apple: 50
  },
  {
    name: '12/12',
    Apple: 125
  },
  {
    name: '13/12',
    Apple: 70
  },
  {
    name: '14/12',
    Apple: 100
  },
  {
    name: '15/12',
    Apple: 80
  },
  {
    name: '16/12',
    Apple: 30
  }
]

const CustomTooltip = (data: TooltipProps<any, any>) => {
  const { active, payload } = data

  if (active && payload) {
    return (
      <div className='recharts-custom-tooltip'>
        <Typography>{data.label}</Typography>
        <Divider />
        {data &&
          data.payload &&
          data.payload.map((i: any) => {
            return (
              <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: i.fill, mr: 2.5 } }} key={i.dataKey}>
                <Icon icon='mdi:circle' fontSize='0.6rem' />
                <Typography variant='body2'>{`${i.dataKey} : ${i.payload[i.dataKey]}`}</Typography>
              </Box>
            )
          })}
      </div>
    )
  }

  return null
}

const RechartsBarChart = ({ direction, title }: Props) => {
  // ** States
  const [endDate, setEndDate] = useState<DateType>(null)
  const [startDate, setStartDate] = useState<DateType>(null)

  const CustomInput = forwardRef((props: PickerProps, ref) => {
    const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return (
      <TextField
        {...props}
        size='small'
        value={value}
        inputRef={ref}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Icon icon='mdi:bell-outline' />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <Icon icon='mdi:chevron-down' />
            </InputAdornment>
          )
        }}
      />
    )
  })

  const handleOnChange = (dates: any) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  return (
    <Card>
      <CardHeader
        title={title}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />
      <CardContent>
        <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap' }}>
          <Box sx={{ mr: 6, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: '#826af9' } }}>
            <Icon icon='mdi:circle' fontSize='0.75rem' />
            <Typography variant='body2'>تشکیل پرونده</Typography>
          </Box>
          {/* <Box sx={{ mr: 6, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: '#9f87ff' } }}>
            <Icon icon='mdi:circle' fontSize='0.75rem' />
            <Typography variant='body2'>Samsung</Typography>
          </Box>
          <Box sx={{ mr: 6, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: '#d2b0ff' } }}>
            <Icon icon='mdi:circle' fontSize='0.75rem' />
            <Typography variant='body2'>Oneplus</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: '#f8d3ff' } }}>
            <Icon icon='mdi:circle' fontSize='0.75rem' />
            <Typography variant='body2'>Motorola</Typography>
          </Box> */}
        </Box>
        <Box sx={{ height: 350 }}>
          <ResponsiveContainer>
            <BarChart height={350} data={data} barSize={15} style={{ direction }} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' reversed={direction === 'rtl'} />
              <YAxis orientation={direction === 'rtl' ? 'right' : 'left'} />
              <Tooltip content={CustomTooltip} />
              <Bar dataKey='Apple' stackId='a' fill='#826af9' radius={[15, 15, 0, 0]} />
              {/* <Bar dataKey='Samsung' stackId='a' fill='#9f87ff' />
              <Bar dataKey='Oneplus' stackId='a' fill='#d2b0ff' />
              <Bar dataKey='Motorola' stackId='a' fill='#f8d3ff' radius={[15, 15, 0, 0]} /> */}
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

export default RechartsBarChart
