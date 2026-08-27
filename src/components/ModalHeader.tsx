import { Box, IconButton, Typography } from '@mui/material'

import { alpha } from '@mui/material/styles'

import Icon from '@components/icon'

type ModalHeaderProps = {
  title: string
  subtitle?: string
  onClose: () => void
}

const ModalHeader = ({ title, subtitle, onClose }: ModalHeaderProps) => (
  <Box
    sx={theme => ({
      py: 7,
      px: 2,
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      textAlign: 'center',
      position: 'relative'
    })}
  >
    <Typography variant='h6' sx={{ fontWeight: 600 }}>
      {title}
    </Typography>

    {subtitle && <Typography variant='caption'>{subtitle}</Typography>}

    <IconButton
      size='small'
      onClick={onClose}
      sx={{
        position: 'absolute',
        top: 16,
        right: 16
      }}
    >
      <Icon icon='mdi:close' />
    </IconButton>
  </Box>
)

export default ModalHeader
