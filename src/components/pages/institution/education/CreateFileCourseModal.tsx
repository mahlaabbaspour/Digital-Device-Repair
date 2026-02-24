'use client'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Transition } from '@/helpers/DialogsHelper'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  Box,
  useTheme,
  FormControlLabel,
  Switch
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import {
  useCreateFileCourseStudentInstitution,
  useCreateResourceCourseInstitution
} from '@/hooks/institution/education/useLessonEducation'
import { CloseRounded } from '@mui/icons-material'
import { toast } from 'react-toastify'
import { useState } from 'react'
import MultiFileUpload from '@/components/elements/MultiFileUpload'

type FileItem = {
  file: File // ← خود فایل واقعی برای آپلود
  preview: string // ← فقط برای نمایش
  type: 'video' | 'audio' | 'image' | 'pdf' | 'other'
}

export default function CreateFileCourseModal({
  onClose,
  open,
  id,
  courseId,
  chapterId,
  rowSelect
}: {
  onClose: any
  open: boolean
  id: string
  courseId: string
  chapterId: string
  rowSelect: any
}) {
  const { control, handleSubmit, setError, reset } = useForm({})

  const [files, setFiles] = useState<FileItem[]>([])
  const { mutateAsync, isPending }: any = useCreateFileCourseStudentInstitution()

  async function onSubmit() {
    try {
      const data = {
        files: files?.map((el: any) => el?.file)
      }
      await toast.promise(mutateAsync({ data: data, id, courseId }), {
        pending: 'در حال انجام...'
      })
      onClose()
      reset()
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <Dialog TransitionComponent={Transition} fullWidth open={open} maxWidth='md' scroll='body'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
            <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
              <CloseRounded />
            </IconButton>
            <CardHeader
              sx={{ textAlign: 'center' }}
              title={
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                  فایل
                </Typography>
              }
              subheader={<Typography variant='caption'>می توانید فایل های مورد نظر خود را ایجاد کنید</Typography>}
            />
            <CardContent>
              <Grid container spacing={5}>
                {/* <Grid item xs={12} sm={12}>
                  <MultiFileUpload file={file} setFile={setFile} dataFiles={[]} disabled={false} />
                </Grid> */}
              </Grid>
            </CardContent>
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
