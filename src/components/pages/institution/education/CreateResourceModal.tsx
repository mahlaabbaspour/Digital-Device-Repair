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
import { useCreateResourceCourseInstitution } from '@/hooks/institution/education/useLessonEducation'
import { CloseRounded } from '@mui/icons-material'
import { toast } from 'react-toastify'
import { useState } from 'react'
import MultiFileUpload from '@/components/elements/MultiFileUpload'

type FileItem = {
  file: File
  preview: string
  type: 'video' | 'audio' | 'image' | 'pdf' | 'other'
}

export default function CreateResourceModal({
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
  const { control, handleSubmit, setError, reset } = useForm({
    defaultValues: {
      title: '',
      price: '',
      is_download: 0
    }
  })

  const [file, setFile] = useState<FileItem | null>(null)

  const { mutateAsync, isPending }: any = useCreateResourceCourseInstitution()

  async function onSubmit(values: any) {
    try {
      const data = {
        ...values,
        file: file?.file
      }
      await toast.promise(mutateAsync({ data: data, id, courseId, chapterId: rowSelect?.id }), {
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
                  ایجاد منبع آموزشی
                </Typography>
              }
              subheader={<Typography variant='caption'>می توانید منبع آموزشی را ایجاد کنید</Typography>}
            />
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={9}>
                  <Controller
                    name='title'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        InputProps={{ readOnly: false }}
                        helperText={error?.message}
                        fullWidth
                        label='عنوان'
                      />
                    )}
                  />
                </Grid>

                {/* price */}
                <Grid item xs={3} sm={3}>
                  <Controller
                    name='price'
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => {
                      const formatNumber = (num: string) => num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      const removeCommas = (str: string) => str.replace(/,/g, '')

                      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                        const raw = removeCommas(e.target.value)
                        if (!/^\d*$/.test(raw)) return

                        onChange(raw)
                      }

                      return (
                        <TextField
                          label='هزینه (ریال)'
                          fullWidth
                          error={!!error}
                          helperText={error?.message}
                          value={value ? formatNumber(value.toString()) : ''}
                          onChange={handleChange}
                          InputProps={{ readOnly: false }}
                        />
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <MultiFileUpload file={file} setFile={setFile} dataFile={[]} disabled={false} />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name='is_download'
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        label='قابل دانلود بودن'
                        control={
                          <Switch checked={field.value === 1} onChange={(_, check) => field.onChange(check ? 1 : 0)} />
                        }
                      />
                    )}
                  />
                </Grid>
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
