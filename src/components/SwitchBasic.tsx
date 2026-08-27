import Switch from '@mui/material/Switch'
import { Box, Typography } from '@mui/material'

const SwitchesBasic = ({ checked, onChange, disabled }: any) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 1,
        mt: 5,
        ml: 5
      }}
    >
      <Typography sx={{ fontWeight: 500 }}>وضعیت : </Typography>

      <Switch checked={checked} onChange={e => onChange(e.target.checked)} disabled={disabled} />

      <Typography sx={{ fontWeight: 600, minWidth: '55px' }}>{checked ? 'فعال' : 'غیرفعال'}</Typography>
    </Box>
  )
}

export default SwitchesBasic
