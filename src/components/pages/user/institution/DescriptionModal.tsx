'use client'

import { Box, Fade, Modal, IconButton, Typography, Button } from '@mui/material'
import { AiOutlineClose } from 'react-icons/ai'
import { FiAlertCircle } from 'react-icons/fi'

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

export default function DescritpionModal({ title, description, open, onClose, selectedRow }: any) {
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
          <Typography id='transition-modal-description' variant='subtitle1' className='text-center' sx={{ mt: 1 }}>
            {' '}
            خدمت گیرنده گرامی ، آقای / خانم{' '}
            {`${selectedRow?.consultationDocument?.first_name} ${selectedRow?.consultationDocument?.last_name}`}{' '}
            خواهشمند است حداکثر تا 24 ساعت قبل از جلسه مشاوره نسبت به پرداخت واریز مبلغ {selectedRow?.price} ریال به
            {/* خط دوم: اطلاعات کارت */}
            <Box component='span' sx={{ display: 'block', fontWeight: 'bold', mt: 1 }}>
              شماره کارت: 1234-5678-9012-3456
              <br />
              شماره شبا: IR00 0000 0000 0000 0000 0000 00
            </Box>
            {/* خط سوم: ادامه متن */}
            <Box component='span' sx={{ display: 'block', mt: 1 }}>
              اقدام فرمایید. و به شماره تماس 02123254569 اطلاع رسانی نمایید
            </Box>
          </Typography>

          <div className='mt-8 flex w-full justify-end'>
            <div className='flex gap-3'>
              <Button onClick={() => onClose()} color='error' variant='outlined'>
                بستن
              </Button>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  )
}
