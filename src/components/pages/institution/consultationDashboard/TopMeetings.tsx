// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Components
// import CustomChip from 'src/@core/components/mui/chip'
import { CardHeader, Divider } from '@mui/material'
import CustomChip from '@/@core/components/mui/chip/index'

const TopMeetings = ({ data = [] }: any) => {
  return (
    <Card>
      <CardHeader
        title='خدمت گیرنده گان'
        subheader='خدمت گیرنده گان دارای بیشترین جلسه مشاوره'
        action={<img alt='پزشکان' height={45} width={45} src='/images/icons/nurse.png' />}
      />
      <Divider />
      <CardContent>
        {data?.map((item: any, index: number) => {
          return (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: index !== data.length - 1 ? 6.5 : undefined
              }}
            >
              <Avatar src={item?.image} variant='rounded' sx={{ mr: 3, width: 38, height: 38 }} />
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ mr: 2, display: 'flex', mb: 0.4, flexDirection: 'column' }}>
                  <Typography variant='body1' sx={{ mb: 0.5, fontWeight: 500, color: 'text.primary' }}>
                    {item.first_name} {item?.last_name}
                  </Typography>
                </Box>
                <CustomChip
                  skin='light'
                  size='medium'
                  label={Number(item?.receptions_count)?.toLocaleString() + ' پذیرش '}
                  color={'primary'}
                  sx={{ height: 23, fontSize: '0.85rem', fontWeight: 500 }}
                />
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default TopMeetings
