'use client'

import { Box, Fade, Modal, IconButton, Typography, Button, CircularProgress } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
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

export default function DialogAlertDeleteWatingMeeting({
  title,
  description,
  open,
  onClose,
  isLoading,
  deleteFun,
  id,
  selectedRow,
  params,
  datas
}: any) {
  const redirectPath = '/landing/institution'
  const router = useRouter()
  const session: any = useSession()

  const handleClick = () => {
    if (session?.data?.user?.id) {
      router.push(`${redirectPath}`)
    } else {
      router.push(`/auth/login?callbackUrl=${redirectPath}`)
    }
  }

  const handleRequestDelete = async () => {
    try {
      const res: any = await toast.promise(
        deleteFun({ id: id, meetingId: selectedRow?.id, rowId: datas?.data?.meetingWaitingListId }),
        {
          pending: 'در حال انجام...'
        }
      )
      onClose()

      if (res?.status) {
        toast.success('عملیات با موفقیت انجام شد')
        onClose()
      }
    } catch (error) {
      throw error
    }
  }

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
              <Button onClick={() => onClose()} color='error' variant='outlined'>
                انصراف
              </Button>
              {isLoading ? (
                <Button variant='contained'>
                  {' '}
                  <CircularProgress size={20} color='inherit' />
                </Button>
              ) : (
                <Button onClick={() => handleRequestDelete()} variant='contained'>
                  تایید
                </Button>
              )}
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  )
}
