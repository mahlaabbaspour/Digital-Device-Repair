'use client'

import { Box, Card, CardContent, Divider, IconButton, Typography } from '@mui/material'
import { BiEdit, BiEnvelope, BiMaleSign, BiMedal, BiTrafficCone, BiTrash } from 'react-icons/bi'

export default function CardMeeting() {
  return (
    <Card sx={{ backgroundColor: '#00b894', maxWidth: 300 }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Typography variant='h6'>مشاوره کودکان و نوجوانان</Typography>
          <Typography>محمد محمدی</Typography>
          <Typography>8:00 تا 9:00</Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 3
          }}
        >
          <Typography>هادی عرفانی راد</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'space-between', mt: 1 }}>
          <Typography>09118812581</Typography>
          <Typography>پرداخت شده</Typography>
        </Box>
        <Divider />
        <Box>
          <IconButton>
            <BiTrafficCone />
          </IconButton>
          <IconButton>
            <BiTrash />
          </IconButton>
          <IconButton>
            <BiEdit />
          </IconButton>
          <IconButton>
            <BiMedal />
          </IconButton>
          <IconButton>
            <BiEnvelope />
          </IconButton>
          <IconButton>
            <BiMaleSign />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  )
}
