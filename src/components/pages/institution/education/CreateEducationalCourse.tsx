'use client'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { SyntheticEvent, useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Tab,
  Typography,
  IconButton,
  Button,
  TextField,
  CardActions,
  Switch,
  FormControlLabel,
  Grid,
  Tooltip,
  FormControl,
  Radio,
  RadioGroup,
  Autocomplete,
  Chip
} from '@mui/material'
import { BiFile, BiLogoTripAdvisor, BiShowAlt, BiSolidInfoSquare } from 'react-icons/bi'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5'
import { useUpdateTeachingPermissionRevision } from '@/hooks/organization/useRevisionTeachingPermission'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { GeTErrorFetch } from '@/components/elements/errorHandler'
import { useRouter } from 'next/navigation'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import CustomDateTimePicker from '@/components/elements/customDateTimePicker'
import { convertEditorContent } from '@/helpers/EditorsHelper'
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import ReactDraftWysiwyg from '@/@core/components/react-draft-wysiwyg'
import { EditorWrapper } from '@/@core/styles/react-draft-wysiwyg'
import { dateTimeConverter } from '@/helpers/DateHelpers'
import { useCreateLessonEducation } from '@/hooks/institution/education/useLessonEducation'

export default function CreateEducationalCourse({ id, revisionId, upsertData, show }: any) {
  const { control, handleSubmit, setError, reset, watch } = useForm({
    defaultValues: {
      lesson_id: null,
      title: '',
      administrative_division_id: null,
      request_level_id: null,
      teacher_ids: [],
      event_type_id: null,
      course_type_id: null,
      duration: '',
      course_capacity: '',
      registration_start_at: null,
      registration_end_at: null,
      course_start_at: null,
      course_end_at: null,
      course_fee: '',
      general_discount_percent: null,
      final_course_fee: '',
      region_ids: [],
      locality_permission_activity_ids: [],
      course_outline: ''
    }
  })

  const { mutateAsync, isPending }: any = useCreateLessonEducation()
  const router = useRouter()

  async function onSubmit(values: any) {
    try {
      const test1 = convertEditorContent(course)
      const result: any = {}
      Object.entries(values).forEach(([key, value]) => {
        if (value && typeof value === 'object' && 'id' in value) {
          result[key] = value?.id
        } else if (Array.isArray(value)) {
          result[key] = value.map((item: any) => (typeof item === 'object' && 'id' in item ? item?.id : item))
        } else if (value instanceof Date) {
          result[key] = dateTimeConverter(value)
        } else {
          result[key] = value
        }
      })
      const data = {
        ...result,
        course_outline: test1
      }
      await toast.promise(mutateAsync({ data: data, id }), {
        pending: 'در حال انجام...'
      })
      router.back()
      reset()
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  const [course, setCourse] = useState(EditorState.createEmpty())

  const [value, setTabValue] = useState<string>('info')
  const handleTabsChange = (event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue)
  }

  return (
    <>
      <TabContext value={value}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12}>
            <Card sx={{ mb: 5 }}>
              <TabList
                variant='scrollable'
                scrollButtons={false}
                onChange={handleTabsChange}
                sx={{
                  borderBottom: theme => `1px solid ${theme.palette.divider}`,
                  width: '100%',
                  display: 'flex',
                  '& .MuiTab-root': {
                    flex: 1,
                    minWidth: 0,
                    maxWidth: 'none',
                    '&:not(:last-child)': {
                      marginRight: 1
                    }
                  }
                }}
              >
                <Tab
                  icon={<BiSolidInfoSquare size={20} />}
                  value='info'
                  label='اطلاعات درخواست'
                  sx={{
                    fontFamily: 'inherit',
                    width: '100%'
                  }}
                />
                <Tab
                  icon={<BiLogoTripAdvisor size={20} />}
                  value='historyStudy'
                  label='سوابق تحصیلی'
                  sx={{
                    fontFamily: 'inherit',
                    width: '100%'
                  }}
                />
                <Tab
                  icon={<BiLogoTripAdvisor size={20} />}
                  value='historyEducation'
                  label='سوابق آموزشی'
                  sx={{
                    fontFamily: 'inherit',
                    width: '100%'
                  }}
                />
                <Tab
                  icon={<BiLogoTripAdvisor size={20} />}
                  value='historyTeaching'
                  label='سوابق تدریس'
                  sx={{
                    fontFamily: 'inherit',
                    width: '100%'
                  }}
                />
                <Tab
                  icon={<BiLogoTripAdvisor size={20} />}
                  value='historyComposing'
                  label='سوابق تالیف و ترجمه'
                  sx={{
                    fontFamily: 'inherit',
                    width: '100%'
                  }}
                />

                <Tab
                  icon={<BiLogoTripAdvisor size={20} />}
                  value='approval'
                  label='تایید نهایی'
                  sx={{
                    fontFamily: 'inherit',
                    width: '100%'
                  }}
                />
              </TabList>
            </Card>
          </Grid>
        </Grid>

        <TabPanel sx={{ padding: 0 }} value='info'>
          <Card>
            <CardHeader
              title={<Typography variant='h6'>اطلاعات درخواست</Typography>}
              subheader={<Typography variant='caption'>می توانید اطلاعات کلی درخواست را مشاهده نمایید</Typography>}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent>
                <Grid container spacing={5}>
                  {/* lesson_id */}
                  <Grid item xs={12} md={4}>
                    <Controller
                      name='lesson_id'
                      control={control}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAsyncAutocomplete
                          url={`/institution/${id}/education/course/base/select/lesson`}
                          readOnly={false}
                          onAddValue={newValue => onChange(newValue)}
                          value={value}
                          getOptionLabel={optien => optien?.title}
                          label='درس'
                          error={!!error}
                          helperText={error?.message}
                        ></CustomAsyncAutocomplete>
                      )}
                    />
                  </Grid>

                  {/* title */}
                  <Grid item xs={12} sm={8}>
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
                          label='عنوان نمایشی'
                        />
                      )}
                    />
                  </Grid>

                  {/* administrative_division_id */}
                  <Grid item xs={12} md={3}>
                    <Controller
                      name='administrative_division_id'
                      control={control}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <Autocomplete
                          readOnly={false}
                          options={upsertData?.administrativeDivisions || []}
                          value={value}
                          onChange={(_, newvalue) => onChange(newvalue)}
                          noOptionsText='هیچ نتیجه ای یافت نشد'
                          getOptionLabel={(options: { name: string }) => options?.name || ''}
                          renderInput={params => (
                            <TextField
                              label='سطح تقسیمات کشوری'
                              {...params}
                              error={!!error}
                              helperText={error?.message}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>

                  {/* request_level_id */}
                  <Grid item xs={12} md={3}>
                    <Controller
                      name='request_level_id'
                      control={control}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <Autocomplete
                          readOnly={false}
                          options={upsertData?.requestLevels || []}
                          value={value}
                          onChange={(_, newvalue) => onChange(newvalue)}
                          noOptionsText='هیچ نتیجه ای یافت نشد'
                          getOptionLabel={(options: { name: string }) => options?.name || ''}
                          renderInput={params => (
                            <TextField label='سطح مخاطبان' {...params} error={!!error} helperText={error?.message} />
                          )}
                        />
                      )}
                    />
                  </Grid>

                  {/* teacher_ids */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name='teacher_ids'
                      control={control}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAsyncAutocomplete
                          url={`/institution/${id}/education/course/base/select/teacher`}
                          readOnly={false}
                          onAddValue={newValue => onChange(newValue)}
                          value={value}
                          multiple={true}
                          getOptionLabel={optien => optien?.name}
                          label='مدرسان'
                          error={!!error}
                          helperText={error?.message}
                        ></CustomAsyncAutocomplete>
                      )}
                    />
                  </Grid>

                  {/* event_type_id */}
                  <Grid item xs={12} md={3}>
                    <Controller
                      name='event_type_id'
                      control={control}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <Autocomplete
                          readOnly={false}
                          options={upsertData?.eventTypes || []}
                          value={value}
                          onChange={(_, newvalue) => onChange(newvalue)}
                          noOptionsText='هیچ نتیجه ای یافت نشد'
                          getOptionLabel={(options: { name: string }) => options?.name || ''}
                          renderInput={params => (
                            <TextField
                              label='نوع برگذاری دوره'
                              {...params}
                              error={!!error}
                              helperText={error?.message}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>

                  {/* course_type_id */}
                  <Grid item xs={12} md={3}>
                    <Controller
                      name='course_type_id'
                      control={control}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <Autocomplete
                          readOnly={false}
                          options={upsertData?.courseTypes || []}
                          value={value}
                          onChange={(_, newvalue) => onChange(newvalue)}
                          noOptionsText='هیچ نتیجه ای یافت نشد'
                          getOptionLabel={(options: { name: string }) => options?.name || ''}
                          renderInput={params => (
                            <TextField label='نوع دوره' {...params} error={!!error} helperText={error?.message} />
                          )}
                        />
                      )}
                    />
                  </Grid>

                  {/* duration */}
                  <Grid item xs={12} sm={3}>
                    <Controller
                      name='duration'
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          error={!!error}
                          InputProps={{ readOnly: false }}
                          helperText={error?.message}
                          fullWidth
                          label='مدت دوره (ساعت)'
                        />
                      )}
                    />
                  </Grid>

                  {/* course_capacity */}
                  <Grid item xs={12} sm={3}>
                    <Controller
                      name='course_capacity'
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          error={!!error}
                          InputProps={{ readOnly: false }}
                          helperText={error?.message}
                          fullWidth
                          label='ظرفیت دوره (نفر)'
                        />
                      )}
                    />
                  </Grid>

                  {/* registration_start_at */}
                  <Grid item xs={12} md={3}>
                    <Controller
                      control={control}
                      name='registration_start_at'
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomDateTimePicker
                          error={!!error}
                          helperText={error?.message}
                          label='زمان شروع ثبت نام'
                          onChange={onChange}
                          value={value}
                          readOnly={false}
                        />
                      )}
                    />
                  </Grid>

                  {/* registration_end_at */}
                  <Grid item xs={12} md={3}>
                    <Controller
                      control={control}
                      name='registration_end_at'
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomDateTimePicker
                          error={!!error}
                          helperText={error?.message}
                          label='زمان پایان ثبت نام'
                          onChange={onChange}
                          value={value}
                          readOnly={false}
                        />
                      )}
                    />
                  </Grid>

                  {/* course_start_at */}
                  <Grid item xs={12} md={3}>
                    <Controller
                      control={control}
                      name='course_start_at'
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomDateTimePicker
                          error={!!error}
                          helperText={error?.message}
                          label='زمان شروع دوره'
                          onChange={onChange}
                          value={value}
                          readOnly={false}
                        />
                      )}
                    />
                  </Grid>

                  {/* course_end_at */}
                  <Grid item xs={12} md={3}>
                    <Controller
                      control={control}
                      name='course_end_at'
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomDateTimePicker
                          error={!!error}
                          helperText={error?.message}
                          label='زمان پایان دوره'
                          onChange={onChange}
                          value={value}
                          readOnly={false}
                        />
                      )}
                    />
                  </Grid>

                  {/* course_fee */}
                  <Grid item xs={3} sm={4}>
                    <Controller
                      name='course_fee'
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
                            label='هزینه دوره (ریال)'
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

                  {/* general_discount_percent */}
                  {/* course_capacity */}
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name='general_discount_percent'
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          error={!!error}
                          InputProps={{ readOnly: false }}
                          helperText={error?.message}
                          fullWidth
                          label='درصد تخفیف عمومی'
                        />
                      )}
                    />
                  </Grid>

                  {/* course_fee */}
                  <Grid item xs={3} sm={4}>
                    <Controller
                      name='final_course_fee'
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
                            label='هزینه نهایی دوره (ریال)'
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

                  {/* region_ids */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name='region_ids'
                      control={control}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAsyncAutocomplete
                          url={`/institution/${id}/education/course/base/select/region`}
                          readOnly={false}
                          multiple={true}
                          onAddValue={newValue => onChange(newValue)}
                          value={value}
                          getOptionLabel={optien => optien?.name}
                          label='شهرستان های محل برگذاری'
                          error={!!error}
                          helperText={error?.message}
                        ></CustomAsyncAutocomplete>
                      )}
                    />
                  </Grid>

                  {/* locality_permission_activity_ids */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name='locality_permission_activity_ids'
                      control={control}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAsyncAutocomplete
                          url={`/institution/${id}/education/course/base/select/locality-permission-activity`}
                          readOnly={false}
                          multiple={true}
                          onAddValue={newValue => onChange(newValue)}
                          value={value}
                          getOptionLabel={optien => optien?.name}
                          label='سازمان های مخاطب'
                          error={!!error}
                          helperText={error?.message}
                        ></CustomAsyncAutocomplete>
                      )}
                    />
                  </Grid>

                  {/* course_outline */}
                  <Grid item xs={12}>
                    <EditorWrapper>
                      <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <Chip
                          label='سرفصل دوره'
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
                        editorState={course}
                        onEditorStateChange={editorState => {
                          setCourse(editorState)
                        }}
                      />
                    </EditorWrapper>
                  </Grid>
                </Grid>
              </CardContent>

              <CardActions
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end'
                }}
              >
                <Button variant='contained' type='submit' disabled={isPending}>
                  ثبت
                </Button>
              </CardActions>
            </form>
          </Card>
        </TabPanel>

        <TabPanel sx={{ padding: 0 }} value='historyStudy'>
          <Card>
            <CardHeader
              title={<Typography variant='h6'>سوابق تحصیلی</Typography>}
              subheader={<Typography variant='caption'>می توانید سوابق تحصیلی را مشاهده نمایید</Typography>}
            />
            <CardContent></CardContent>

            <CardActions sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant='contained' startIcon={<IoArrowForward />} onClick={() => setTabValue('info')}>
                قبلی
              </Button>
              <Button variant='contained' endIcon={<IoArrowBack />} onClick={() => setTabValue('historyEducation')}>
                بعدی
              </Button>
            </CardActions>
          </Card>
        </TabPanel>

        <TabPanel sx={{ padding: 0 }} value='historyEducation'>
          <Card>
            <CardHeader
              title={<Typography variant='h6'>سوابق آموزشی</Typography>}
              subheader={<Typography variant='caption'>می توانید سوابق آموزشی را مشاهده نمایید</Typography>}
            />
            <CardContent></CardContent>

            <CardActions sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant='contained' startIcon={<IoArrowForward />} onClick={() => setTabValue('historyStudy')}>
                قبلی
              </Button>
              <Button variant='contained' endIcon={<IoArrowBack />} onClick={() => setTabValue('historyTeaching')}>
                بعدی
              </Button>
            </CardActions>
          </Card>
        </TabPanel>

        <TabPanel sx={{ padding: 0 }} value='historyTeaching'>
          <Card>
            <CardHeader
              title={<Typography variant='h6'>سوابق تدریس</Typography>}
              subheader={<Typography variant='caption'>می توانید سوابق تدریس را مشاهده نمایید</Typography>}
            />
            <CardContent></CardContent>

            <CardActions sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant='contained'
                startIcon={<IoArrowForward />}
                onClick={() => setTabValue('historyEducation')}
              >
                قبلی
              </Button>
              <Button variant='contained' endIcon={<IoArrowBack />} onClick={() => setTabValue('historyComposing')}>
                بعدی
              </Button>
            </CardActions>
          </Card>
        </TabPanel>

        <TabPanel sx={{ padding: 0 }} value='historyComposing'>
          <Card>
            <CardHeader
              title={<Typography variant='h6'>سوابق تالیف و ترجمه</Typography>}
              subheader={<Typography variant='caption'>می توانید سوابق تالیف و ترجمه را مشاهده نمایید</Typography>}
            />
            <CardContent></CardContent>
            <CardActions sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant='contained' startIcon={<IoArrowForward />} onClick={() => setTabValue('historyTeaching')}>
                قبلی
              </Button>
              <Button variant='contained' endIcon={<IoArrowBack />} onClick={() => setTabValue('approval')}>
                بعدی
              </Button>
            </CardActions>
          </Card>
        </TabPanel>

        <TabPanel sx={{ padding: 0 }} value='approval'>
          <Card>
            <CardHeader
              title={<Typography variant='h6'>سوابق تالیف و ترجمه</Typography>}
              subheader={<Typography variant='caption'>می توانید سوابق تالیف و ترجمه را مشاهده نمایید</Typography>}
            />

            <CardContent>
              <Grid container spacing={5}></Grid>
            </CardContent>
            <CardActions sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant='contained'
                startIcon={<IoArrowForward />}
                onClick={() => setTabValue('historyComposing')}
              >
                قبلی
              </Button>
              <Button variant='contained' disabled={isPending} type='submit'>
                ثبت
              </Button>
            </CardActions>
          </Card>
        </TabPanel>
      </TabContext>
    </>
  )
}
