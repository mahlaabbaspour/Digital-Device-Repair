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
import { GeTErrorFetch } from '@/components/elements/errorHandler'
import { useUpdateResourceCourseInstitution } from '@/hooks/institution/education/useLessonEducation'
import { CloseRounded } from '@mui/icons-material'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import VideoPlayer from '@/components/elements/VideoPlayer'
import MultiFileViewer from '@/components/elements/MultiFileUpload'

type FileItem = {
  file: File // ← خود فایل واقعی برای آپلود
  preview: string // ← فقط برای نمایش
  type: 'video' | 'audio' | 'image' | 'pdf' | 'other'
}

export default function UpdateResourceModal({
  onClose,
  open,
  id,
  courseId,
  chapterId,
  rowSelect,
  selectedResource,
  disabled
}: {
  onClose: any
  open: boolean
  id: string
  courseId: string
  chapterId: string
  rowSelect: any
  selectedResource: any
  disabled: any
}) {
  const { control, handleSubmit, setError, reset, setValue } = useForm({
    defaultValues: {
      title: '',
      price: '',
      file: null,
      is_download: 0
    }
  })

  const [files, setFiles] = useState<FileItem[]>([])

  type Mode = 'show' | 'update'
  const mode = disabled ? 'show' : 'update'
  console.log(mode, 'mode')

  useEffect(() => {
    if (selectedResource) {
      setValue('title', selectedResource?.title)
      setValue('price', selectedResource?.price)
      setValue('is_download', Number(selectedResource?.priority))
    }

    if (selectedResource?.file) {
      setServerFile(selectedResource.file)
      setPreviewUrl(selectedResource.file.address)
    }
  }, [selectedResource])

  console.log(selectedResource, 'selectedResource')

  const [file, setFile] = useState<File | null>(null)
  const [dataFiles, setDataFiles] = useState(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [serverFile, setServerFile] = useState<any>(null)
  const theme = useTheme()

  useEffect(() => {
    if (selectedResource?.files) {
      setDataFiles(selectedResource?.files)
    }
  }, [selectedResource])

  const { mutateAsync, isPending }: any = useUpdateResourceCourseInstitution()

  async function onSubmit(values: any) {
    try {
      console.log(values, 'values')
      await toast.promise(
        mutateAsync({ data: values, id, courseId, chapterId: chapterId, rowId: selectedResource?.id }),
        {
          pending: 'در حال انجام...'
        }
      )
      onClose()
      reset()
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  return (
    <>
      <Dialog TransitionComponent={Transition} fullWidth open={open} maxWidth='lg' scroll='body'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
            <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
              <CloseRounded />
            </IconButton>
            <CardHeader
              sx={{ textAlign: 'center' }}
              title={
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                  {disabled ? 'نمایش منبع آموزشی' : 'ویرایش منبع آموزشی'}
                </Typography>
              }
              subheader={
                <Typography variant='caption'>
                  {disabled
                    ? 'می توانید منبع آموزشی مورد نظر را مشاهده کنید'
                    : 'می توانید منبع آموزشی مورد نظر را ویرایش کنید'}
                </Typography>
              }
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
                        InputProps={{ readOnly: disabled }}
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
                          InputProps={{ readOnly: disabled }}
                        />
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <MultiFileViewer
                    files={files}
                    setFiles={setFiles}
                    dataFiles={selectedResource?.files}
                    disabled={disabled}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name='is_download'
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        label='قابل دانلود بودن'
                        control={
                          <Switch
                            checked={field.value === 1}
                            onChange={(_, check) => field.onChange(check ? 1 : 0)}
                            readOnly={disabled}
                          />
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
            {!disabled && (
              <Button
                variant='contained'
                sx={{ fontFamily: 'inherit' }}
                color='primary'
                disabled={isPending}
                type='submit'
              >
                ثبت
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
