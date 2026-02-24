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
  Autocomplete,
  FormControlLabel,
  Switch,
  Box,
  Chip
} from '@mui/material'
import ReactDraftWysiwyg from '@/@core/components/react-draft-wysiwyg'
import { EditorWrapper } from '@/@core/styles/react-draft-wysiwyg'
import { Controller, useForm } from 'react-hook-form'
import { GeTErrorFetch } from '@/components/elements/errorHandler'
import {
  useCreateExamCourseInstitution,
  useCreateOnlineMeetingCourseInstitution
} from '@/hooks/institution/education/useLessonEducation'
import { CloseRounded } from '@mui/icons-material'
import { toast } from 'react-toastify'
import { dateTimeConverter } from '@/helpers/DateHelpers'
import CustomDateTimePicker from '@/components/elements/customDateTimePicker'
import { EditorState } from 'draft-js'
import { useState } from 'react'
import { convertEditorContent } from '@/helpers/EditorsHelper'

export default function CreateExamModal({
  onClose,
  open,
  id,
  courseId,
  rowSelect,
  upsertData
}: {
  onClose: any
  open: boolean
  id: string
  courseId: string
  rowSelect: any
  upsertData: any
}) {
  const { control, handleSubmit, setError, reset } = useForm({
    defaultValues: {
      start_time: null,
      end_time: null,
      exam_duration: '',
      passing_score: '',
      total_question: '',
      max_attempt: '',
      exam_interval: '',
      exam_nature_id: null,
      exam_delivery_method_id: null,
      exam_type_id: null
    }
  })

  const [instruction, setInstruction] = useState(EditorState.createEmpty())

  const { mutateAsync, isPending }: any = useCreateExamCourseInstitution()

  async function onSubmit(values: any) {
    try {
      // 'instruction'
      const date1 = values?.start_time ? dateTimeConverter(values?.start_time) : null
      const date2 = values?.end_time ? dateTimeConverter(values?.end_time) : null
      const test1 = convertEditorContent(instruction)
      const data = {
        start_time: date1,
        end_time: date2,
        exam_duration: values?.exam_duration,
        passing_score: values?.passing_score,
        total_question: values?.total_question,
        max_attempt: values?.max_attempt,
        exam_interval: values?.exam_interval,
        exam_nature_id: values?.exam_nature_id?.id,
        exam_delivery_method_id: values?.exam_delivery_method_id?.id,
        exam_type_id: values?.exam_type_id?.id,
        instruction: test1
      }
      await toast.promise(mutateAsync({ data: data, id, courseId }), {
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
                  آزمون
                </Typography>
              }
              subheader={<Typography variant='caption'>می توانید آزمون مورد نظر خود را ایجاد کنید</Typography>}
            />
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} md={3}>
                  <Controller
                    control={control}
                    name='start_time'
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <CustomDateTimePicker
                        error={!!error}
                        helperText={error?.message}
                        label='زمان شروع'
                        onChange={onChange}
                        value={value}
                        readOnly={false}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Controller
                    control={control}
                    name='end_time'
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <CustomDateTimePicker
                        error={!!error}
                        helperText={error?.message}
                        label='زمان پایان'
                        onChange={onChange}
                        value={value}
                        readOnly={false}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Controller
                    name='exam_nature_id'
                    control={control}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <Autocomplete
                        readOnly={false}
                        options={upsertData?.examNatures || []}
                        value={value}
                        onChange={(_, newvalue) => onChange(newvalue)}
                        noOptionsText='هیچ نتیجه ای یافت نشد'
                        getOptionLabel={(options: { name: string }) => options?.name || ''}
                        renderInput={params => (
                          <TextField label='ماهیت دوره' {...params} error={!!error} helperText={error?.message} />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Controller
                    name='exam_delivery_method_id'
                    control={control}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <Autocomplete
                        readOnly={false}
                        options={upsertData?.examDeliveryMethods || []}
                        value={value}
                        onChange={(_, newvalue) => onChange(newvalue)}
                        noOptionsText='هیچ نتیجه ای یافت نشد'
                        getOptionLabel={(options: { name: string }) => options?.name || ''}
                        renderInput={params => (
                          <TextField label='نوع برگذاری دوره' {...params} error={!!error} helperText={error?.message} />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Controller
                    name='exam_type_id'
                    control={control}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <Autocomplete
                        readOnly={false}
                        options={upsertData?.examTypes || []}
                        value={value}
                        onChange={(_, newvalue) => onChange(newvalue)}
                        noOptionsText='هیچ نتیجه ای یافت نشد'
                        getOptionLabel={(options: { name: string }) => options?.name || ''}
                        renderInput={params => (
                          <TextField label='نوع آزمون' {...params} error={!!error} helperText={error?.message} />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Controller
                    name='exam_duration'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        InputProps={{ readOnly: false }}
                        helperText={error?.message}
                        fullWidth
                        label='مدت آزمون (دقیقه)'
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Controller
                    name='passing_score'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        InputProps={{ readOnly: false }}
                        helperText={error?.message}
                        fullWidth
                        label='حداقل نمره قبولی'
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Controller
                    name='total_question'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        InputProps={{ readOnly: false }}
                        helperText={error?.message}
                        fullWidth
                        label='تعداد سوالات آزمون'
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Controller
                    name='max_attempt'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        InputProps={{ readOnly: false }}
                        helperText={error?.message}
                        fullWidth
                        label='تعداد دفعات مجاز شرکت در آزمون'
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Controller
                    name='exam_interval'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        InputProps={{ readOnly: false }}
                        helperText={error?.message}
                        fullWidth
                        label='فاصله زمانی بین آزمون ها (ساعت)'
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <EditorWrapper>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <Chip
                        label='راهنمای آزمون'
                        sx={{
                          backgroundColor: '#fef0e0ff',
                          color: '#a18903ff',
                          fontWeight: 600
                        }}
                      />
                    </Box>
                    <ReactDraftWysiwyg
                      toolbar={{
                        fontFamily: {
                          options: [
                            'Arial',
                            'Georgia',
                            'Impact',
                            'Tahoma',
                            'Times New Roman',
                            'Verdana',
                            'b nazanin',
                            'b lotus',
                            'b mitra',
                            'IRANSans'
                          ]
                        }
                      }}
                      editorState={instruction}
                      onEditorStateChange={editorState => {
                        setInstruction(editorState)
                      }}
                    />
                  </EditorWrapper>
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
