'use client'

import { Box, Fade, Modal, IconButton, Typography, Button, CircularProgress } from '@mui/material'
import { AiOutlineClose } from 'react-icons/ai'
import { FiAlertCircle } from 'react-icons/fi'
import { toast } from 'react-toastify'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 5,
  borderRadius: 2
}

export default function DialogAlert({
  title,
  description,
  open,
  onClose,
  isLoading,
  deleteFun,
  selectedRow,
  id,
  date
}: any) {
  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      onClose={onClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <Fade in={open} className='relative'>
        <Box sx={{ ...style }}>
          <div className='absolute  end-3 top-3'>
            <IconButton onClick={() => onClose()}>
              <AiOutlineClose />
            </IconButton>
          </div>
          <div className='w-full flex justify-center'>
            <IconButton color='error'>
              <FiAlertCircle className='size-[60px]' />
            </IconButton>
          </div>

          <Typography id='transition-modal-title' className='text-center' variant='h5' component='h5' sx={{ mt: 3 }}>
            {title}
          </Typography>
          <Typography id='transition-modal-description' variant='subtitle1' className='text-center' sx={{ mt: 3 }}>
            {description}
          </Typography>

          <div className='mt-8 flex w-full justify-end'>
            <div className='flex gap-3'>
              <Button onClick={() => onClose()} variant='contained'>
                انصراف
              </Button>
              {isLoading ? (
                <Button color='error' variant='contained'>
                  {' '}
                  <CircularProgress size={20} color='inherit' />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    toast.promise(deleteFun({ id: id, rowId: selectedRow?.id, date: date }), {
                      pending: 'در حال انجام...'
                    })
                    onClose()
                  }}
                  color='error'
                  variant='contained'
                >
                  بله
                </Button>
              )}
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  )
}
