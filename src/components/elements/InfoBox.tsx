import { Box, Typography } from '@mui/material'

function InfoBox({ icon, title, value, subValue, bg }: any) {
  return (
    <Box
      sx={{
        backgroundColor: bg,
        borderRadius: 3,
        p: 3,
        height: '100%',
        textAlign: 'center',
        transition: '0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
        }
      }}
    >
      <Box mb={1}>{icon}</Box>

      <Typography variant='body2' color='text.secondary' mb={1}>
        {title}
      </Typography>

      <Typography variant='h6' fontWeight='bold'>
        {value}
      </Typography>

      {subValue && (
        <Typography variant='caption' color='text.secondary'>
          {subValue}
        </Typography>
      )}
    </Box>
  )
}

export default InfoBox
