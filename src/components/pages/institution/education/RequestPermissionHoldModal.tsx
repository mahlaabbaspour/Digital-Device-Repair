'use client'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Transition } from '@/helpers/DialogsHelper'
import { Button, Dialog, DialogActions, DialogContent, IconButton, Typography, CardHeader } from '@mui/material'
import { useForm } from 'react-hook-form'
import { GeTErrorFetch } from '@/components/elements/errorHandler'
import { toast } from 'react-toastify'
import { useRequestPermissionHoldCourse } from '@/hooks/institution/education/useLessonEducation'
import { CloseRounded } from '@mui/icons-material'

export default function RequestPermissionHoldModal({
  onClose,
  open,
  id,
  rowSelect
}: {
  onClose: any
  open: boolean
  id: string
  rowSelect: any
}) {
  const { control, handleSubmit, setError, reset } = useForm({
    defaultValues: {
      course_status_id: null,
      objection: ''
    }
  })

  const { mutateAsync, isPending }: any = useRequestPermissionHoldCourse()

  async function onSubmit() {
    try {
      await toast.promise(mutateAsync({ id, rowId: rowSelect?.id }), {
        pending: 'در حال انجام...'
      })
      onClose()
      reset()
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  return (
    <>
      <Dialog TransitionComponent={Transition} fullWidth open={open} maxWidth='sm' scroll='body'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
            <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
              <CloseRounded />
            </IconButton>
            <CardHeader
              sx={{ textAlign: 'center' }}
              title={
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                  درخواست مجوز برگذاری دوره
                </Typography>
              }
              subheader={<Typography variant='caption'>آیا از درخواست مجوز برگذاری دوره اطمینان دارید ؟</Typography>}
            />
          </DialogContent>
          <DialogActions>
            <Button variant='outlined' sx={{ fontFamily: 'inherit' }} color='error' onClick={onClose}>
              بستن
            </Button>
            <Button
              variant='contained'
              sx={{ fontFamily: 'inherit' }}
              color='primary'
              disabled={isPending}
              type='submit'
            >
              ثبت
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
