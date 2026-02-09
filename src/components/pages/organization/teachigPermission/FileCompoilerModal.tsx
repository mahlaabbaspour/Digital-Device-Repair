import { Transition } from '@/helpers/DialogsHelper'
import { Icon } from '@iconify/react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  TextField,
  Typography,
  CardContent,
  CardHeader,
  Divider,
  Autocomplete
} from '@mui/material'
import Image from 'next/image'

export default function FileCompilerModal({ onClose, open, file }: { onClose: any; open: boolean; file: any }) {
  console.log(file, 'file')
  return (
    <>
      <Dialog TransitionComponent={Transition} fullWidth open={open} maxWidth='md' scroll='body'>
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          <CardHeader
            sx={{ textAlign: 'center' }}
            title={
              <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                محتوای فایل تالیف
              </Typography>
            }
            subheader={<Typography variant='caption'>می توانید محتوای فایل تالیف را مشاهده کنید</Typography>}
          />
          <Divider />
          <CardContent>
            <Image alt={file?.name} src={file?.address} width={20} height={80} />
          </CardContent>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' sx={{ fontFamily: 'inherit' }} color='error' onClick={onClose}>
            بستن
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
