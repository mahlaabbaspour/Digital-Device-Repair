'use client'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { SyntheticEvent, useEffect, useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Tab,
  Typography,
  Button,
  TextField,
  CardActions,
  Grid,
  Autocomplete,
  Chip,
  styled,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Stack
} from '@mui/material'
import { BiLogoTripAdvisor, BiShowAlt, BiSolidInfoSquare } from 'react-icons/bi'
import { IoArrowBack, IoArrowForward, IoOptions, IoTrashOutline } from 'react-icons/io5'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { GeTErrorFetch } from '@/components/elements/errorHandler'
import { useRouter } from 'next/navigation'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import CustomDateTimePicker from '@/components/elements/customDateTimePicker'
import ReactDraftWysiwyg from '@/@core/components/react-draft-wysiwyg'
import { EditorWrapper } from '@/@core/styles/react-draft-wysiwyg'
import { dateTimeConverter } from '@/helpers/DateHelpers'
import {
  useDeleteChapterCourseInstitution,
  useDeleteCourseStudentInstitution,
  useDeleteExamCourseInstitution,
  useDeleteFileCourseStudentInstitution,
  useDeleteInPersonMeetingCourseInstitution,
  useDeleteOnlineMeetingCourseInstitution,
  useDeleteResourceCourseInstitution,
  useFetchChapterCourseInstitution,
  useFetchCourseStudentInstitution,
  useFetchExamCourseInstitution,
  useFetchFileCourseStudentInstitution,
  useFetchInPersonMeetingCourseInstitution,
  useFetchOnlineMeetingCourseInstitution,
  useUpdateLessonEducationInstitution
} from '@/hooks/institution/education/useLessonEducation'
import { MdMeetingRoom, MdQuiz } from 'react-icons/md'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import MuiAccordionDetails, { AccordionDetailsProps } from '@mui/material/AccordionDetails'
import { Icon } from '@iconify/react'
import CreateChaptersModal from './CreateChaptersModal'
import UpdateChaptersModal from './UpdateChaptersModal'
import DialogAlertCourse from './DialogAlertCourse'
import CreateResourceModal from './CreateResourceModal'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import TableResourceCourse from './TableResourceCourse'
import UpdateResourceModal from './UpdateResourceModal'
import DialogAlertResource from './DialogAlertResource'
import TableMeetingsCourse from './TableMeetings'
import CreateInPersonMeetingModal from './CreateInPersonMeeting'
import UpdateInPersonMeetingModal from './UpdateInPersonModal'
import CreateOnlineMeetingModal from './CreateOnlineMeetingModal.'
import UpdateOnlineMeetingModal from './UpdateOnlineMeetingModal'
import { convertEditorContent } from '@/helpers/EditorsHelper'
import { ContentState, convertFromHTML, EditorState } from 'draft-js'
import { parse } from 'date-fns-jalali'
import CreateExamModal from './CreateExamCourseModal'
import UpdateExamModal from './UpdateExamCourseModal'
import CreateCourseStudentModal from './CreateCourseStudentModal'
import UpdateCourseStudentModal from './UpdateCourseStudentModal'
import CreateFileCourseModal from './CreateFileCourseModal'
import { DeleteOutline, DownloadOutlined } from '@mui/icons-material'

// Accordion Component
const Accordion = styled(MuiAccordion)<AccordionProps>(({ theme }) => ({
  boxShadow: 'none',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  '&:not(:last-of-type)': {
    borderBottom: 'none'
  },
  '&:before': {
    display: 'none'
  },
  '&.Mui-expanded': {
    margin: 0
  }
}))

// AccordionSummary Component
const AccordionSummary = styled(MuiAccordionSummary)<AccordionSummaryProps>(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: theme.spacing(10),
  borderRadius: 8,
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.background.paper,
  transition: 'none',

  '& .MuiAccordionSummary-content': {
    margin: 0
  },
  '&.Mui-expanded': {
    minHeight: theme.spacing(10)
  },
  '&.Mui-expanded .MuiAccordionSummary-content': {
    margin: 0
  }
}))

// Styled component for AccordionDetails component
const AccordionDetails = styled(MuiAccordionDetails)<AccordionDetailsProps>(({ theme }) => ({
  padding: `${theme.spacing(4)} !important`
}))

export default function UpdateEducationalCourse({ id, courseId, upsertData, show }: any) {
  const { control, handleSubmit, setError, reset, watch, setValue } = useForm({
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
      general_discount_percent: '',
      final_course_fee: '',
      region_ids: [],
      locality_permission_activity_ids: [],
      course_outline: ''
    }
  })

  const htmlToEditorState = (html?: string | null) => {
    if (!html) return EditorState.createEmpty()

    const blocksFromHTML = convertFromHTML(html)
    const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)

    return EditorState.createWithContent(contentState)
  }

  useEffect(() => {
    if (show) {
      setValue('lesson_id', show?.lesson)
      setValue('title', show?.title)
      setValue('administrative_division_id', show?.administrativeDivision)
      setValue('request_level_id', show?.requestLevel)
      setValue('teacher_ids', show?.teachers)
      setValue('event_type_id', show?.eventType)
      setValue('course_type_id', show?.courseType)
      setValue('duration', show?.duration)
      setValue('course_capacity', show?.course_capacity)
      setValue('course_fee', show?.course_fee)
      setValue('general_discount_percent', show?.general_discount_percent)
      setValue('final_course_fee', show?.final_course_fee)
      setValue('region_ids', show?.regions)
      setValue('locality_permission_activity_ids', show?.localityPermissionActivities)
      setValue('course_outline', show?.course_outline)
      setValue(
        'registration_start_at',
        //@ts-ignore
        show?.registration_start_at ? parse(show?.registration_start_at, 'yyyy/MM/dd HH:mm', new Date()) : null
      )
      setValue(
        'registration_end_at',
        //@ts-ignore
        show?.registration_end_at ? parse(show?.registration_end_at, 'yyyy/MM/dd HH:mm', new Date()) : null
      )
      setValue(
        'course_start_at',
        //@ts-ignore
        show?.course_start_at ? parse(show?.course_start_at, 'yyyy/MM/dd HH:mm', new Date()) : null
      )
      setValue(
        'course_end_at',
        //@ts-ignore
        show?.course_end_at ? parse(show?.course_end_at, 'yyyy/MM/dd HH:mm', new Date()) : null
      )
      setCourse(show?.course_outline ? htmlToEditorState(show?.course_outline) : EditorState.createEmpty())
    }
  }, [show])

  const { mutateAsync, isPending }: any = useUpdateLessonEducationInstitution()
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
      await toast.promise(mutateAsync({ data: data, id, courseId }), {
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

  const RowOptions = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const rowOptionsOpen = Boolean(anchorEl)

    const handleRowOptionsClick = (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation()
      setAnchorEl(event.currentTarget)
    }

    const handleRowOptionsClose = () => {
      setAnchorEl(null)
    }

    return (
      <>
        <IconButton component='span' size='small' onClick={handleRowOptionsClick}>
          <IoOptions />
        </IconButton>

        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          PaperProps={{ style: { minWidth: '8rem' } }}
        >
          <MenuItem onClick={() => setResourceOpen(true)}>
            <Icon icon='mdi:eye-outline' fontSize={20} />
            ایجاد منبع آموزشی
          </MenuItem>

          <MenuItem onClick={() => setChapterUpdateOpen(true)}>
            <Icon icon='mdi:pencil-outline' fontSize={20} />
            ویرایش سرفصل آموزشی
          </MenuItem>

          <MenuItem onClick={() => setChapterDeleteOpen(prev => !prev)}>
            <Icon icon='mdi:trash-outline' fontSize={20} />
            حذف سرفصل آموزشی
          </MenuItem>
        </Menu>
      </>
    )
  }

  const [rowSelect, setRowSelect] = useState(null)
  const [disabled, setDisabled] = useState<boolean | null>(null)
  const [selectedId, setSelectedId] = useState('')
  const [chapterOpen, setChapterOpen] = useState(false)
  const [chapterUpdateOpen, setChapterUpdateOpen] = useState(false)
  const [chapterDeleteOpen, setChapterDeleteOpen] = useState(false)
  const { data: dataChapters, isPending: isLoadingChapter }: any = useFetchChapterCourseInstitution({
    id: id,
    courseId: courseId
  })
  const { mutateAsync: deleteChapter, isPending: loadDeleteChapter }: any = useDeleteChapterCourseInstitution()

  const [selectedResource, setSelectedResource] = useState(null)
  const [resourceOpen, setResourceOpen] = useState(false)
  const [resourceUpdateOpen, setResourceUpdateOpen] = useState(false)
  const [resourceDeleteOpen, setResourceDeleteOpen] = useState(false)
  const { mutateAsync: deleteResource, isPending: loadDeleteResource }: any = useDeleteResourceCourseInstitution()

  const [inPersonMeetingOpen, setInPersonMeetingOpen] = useState(false)
  const [inPersonMeetingUpdateOpen, setInPersonMeetingUpdateOpen] = useState(false)
  const [inPersonMeetingDeleteOpen, setInPersonMeetingDeleteOpen] = useState(false)
  const { mutateAsync: deleteInPersonMeeting, isPending: loadDeleteInPersonMeeting }: any =
    useDeleteInPersonMeetingCourseInstitution()
  const { data: dataInPersonMeeting, isPending: isLoadingInPersonMeeting }: any =
    useFetchInPersonMeetingCourseInstitution({
      id: id,
      courseId: courseId
    })

  const [onlineMeetingOpen, setOnlineMeetingOpen] = useState(false)
  const [onlineMeetingUpdateOpen, setOnlineMeetingUpdateOpen] = useState(false)
  const [onlinenMeetingDeleteOpen, setOnlineMeetingDeleteOpen] = useState(false)
  const { mutateAsync: deleteOnlineMeeting, isPending: loadDeleteOnlineMeeting }: any =
    useDeleteOnlineMeetingCourseInstitution()
  const { data: dataOnlineMeeting, isPending: isLoadingOnlineMeeting }: any = useFetchOnlineMeetingCourseInstitution({
    id: id,
    courseId: courseId
  })

  const [examOpen, setExamOpen] = useState(false)
  const [examUpdateOpen, setExamUpdateOpen] = useState(false)
  const [examDeleteOpen, setExamDeleteOpen] = useState(false)
  const { mutateAsync: deleteExam, isPending: loadDeleteExam }: any = useDeleteExamCourseInstitution()
  const { data: dataExam, isPending: isLoadingExam }: any = useFetchExamCourseInstitution({
    id: id,
    courseId: courseId
  })

  const [courseStudentOpen, setCourseStudentOpen] = useState(false)
  const [courseStudentUpdateOpen, setCourseStudentUpdateOpen] = useState(false)
  const [courseStudentDeleteOpen, setCourseStudentDeleteOpen] = useState(false)
  const { mutateAsync: deleteCourseStudent, isPending: loadDeleteCourseStudent }: any =
    useDeleteCourseStudentInstitution()
  const { data: dataCourseStudent, isPending: isLoadingCourseStudent }: any = useFetchCourseStudentInstitution({
    id: id,
    courseId: courseId
  })

  const [fileOpen, setFileOpen] = useState(false)
  const [fileDeleteOpen, setFileDeleteOpen] = useState(false)
  const { mutateAsync: deleteFile, isPending: loadDeleteFile }: any = useDeleteFileCourseStudentInstitution()
  const { data: dataFile, isPending: isLoadingFile }: any = useFetchFileCourseStudentInstitution({
    id: id,
    courseId: courseId
  })

  return (
    <>
      <CreateChaptersModal
        open={chapterOpen}
        onClose={() => setChapterOpen(false)}
        rowSelect={rowSelect}
        id={id}
        courseId={courseId}
      />
      <UpdateChaptersModal
        open={chapterUpdateOpen}
        onClose={() => setChapterUpdateOpen(false)}
        rowSelect={rowSelect}
        id={id}
        courseId={courseId}
      />
      <DialogAlertCourse
        description='آیا از حذف این سر فصل آموزشی اطمینان دارید ؟'
        title='حذف سرفصل'
        open={chapterDeleteOpen}
        onClose={() => setChapterDeleteOpen(prev => !prev)}
        deleteFun={deleteChapter}
        isLoading={loadDeleteChapter}
        rowSelect={rowSelect}
        id={id}
        courseId={courseId}
      />
      <CreateResourceModal
        open={resourceOpen}
        onClose={() => setResourceOpen(false)}
        rowSelect={rowSelect}
        id={id}
        courseId={courseId}
        chapterId={selectedId}
      />
      <UpdateResourceModal
        open={resourceUpdateOpen}
        onClose={() => setResourceUpdateOpen(false)}
        rowSelect={rowSelect}
        id={id}
        courseId={courseId}
        chapterId={selectedId}
        selectedResource={selectedResource}
        disabled={disabled}
      />
      <DialogAlertResource
        description='آیا از حذف این منبع اطمینان دارید ؟'
        title='حذف منبع'
        open={resourceDeleteOpen}
        onClose={() => setResourceDeleteOpen(prev => !prev)}
        deleteFun={deleteResource}
        isLoading={loadDeleteResource}
        rowSelect={selectedResource}
        id={id}
        courseId={courseId}
        chapterId={selectedId}
      />
      <CreateInPersonMeetingModal
        open={inPersonMeetingOpen}
        onClose={() => setInPersonMeetingOpen(false)}
        rowSelect={rowSelect}
        id={id}
        courseId={courseId}
        upsertData={upsertData}
      />
      <UpdateInPersonMeetingModal
        open={inPersonMeetingUpdateOpen}
        onClose={() => setInPersonMeetingUpdateOpen(false)}
        rowSelect={rowSelect}
        id={id}
        courseId={courseId}
        upsertData={upsertData}
        disabled={disabled}
      />
      <DialogAlertCourse
        description='آیا از حذف این جلسه حضوری اطمینان دارید ؟'
        title='حذف جلسه حضوری'
        open={inPersonMeetingDeleteOpen}
        onClose={() => setInPersonMeetingDeleteOpen(prev => !prev)}
        deleteFun={deleteInPersonMeeting}
        isLoading={loadDeleteInPersonMeeting}
        rowSelect={rowSelect}
        id={id}
        courseId={courseId}
      />
      <CreateOnlineMeetingModal
        open={onlineMeetingOpen}
        onClose={() => setOnlineMeetingOpen(false)}
        rowSelect={rowSelect}
        id={id}
        courseId={courseId}
        upsertData={upsertData}
      />
      <UpdateOnlineMeetingModal
        open={onlineMeetingUpdateOpen}
        onClose={() => setOnlineMeetingUpdateOpen(false)}
        rowSelect={rowSelect}
        id={id}
        courseId={courseId}
        upsertData={upsertData}
        disabled={disabled}
      />
      <DialogAlertCourse
        description='آیا از حذف این جلسه آنلاین اطمینان دارید ؟'
        title='حذف جلسه آنلاین'
        open={onlinenMeetingDeleteOpen}
        onClose={() => setOnlineMeetingDeleteOpen(prev => !prev)}
        deleteFun={deleteOnlineMeeting}
        isLoading={loadDeleteOnlineMeeting}
        rowSelect={rowSelect}
        id={id}
        courseId={courseId}
      />
      <CreateExamModal
        open={examOpen}
        onClose={() => setExamOpen(false)}
        rowSelect={rowSelect}
        id={id}
        courseId={courseId}
        upsertData={upsertData}
      />
      <UpdateExamModal
        open={examUpdateOpen}
        onClose={() => setExamUpdateOpen(false)}
        rowSelect={rowSelect}
        id={id}
        courseId={courseId}
        upsertData={upsertData}
        disabled={disabled}
      />
      <DialogAlertCourse
        description='آیا از حذف این آزمون اطمینان دارید ؟'
        title='حذف آزمون'
        open={examDeleteOpen}
        onClose={() => setExamDeleteOpen(prev => !prev)}
        deleteFun={deleteExam}
        isLoading={loadDeleteExam}
        rowSelect={rowSelect}
        id={id}
        courseId={courseId}
      />
      <CreateCourseStudentModal
        open={courseStudentOpen}
        onClose={() => setCourseStudentOpen(false)}
        id={id}
        courseId={courseId}
      />
      <UpdateCourseStudentModal
        open={courseStudentUpdateOpen}
        onClose={() => setCourseStudentUpdateOpen(false)}
        rowSelect={rowSelect}
        id={id}
        courseId={courseId}
        upsertData={upsertData}
        disabled={disabled}
      />
      <DialogAlertCourse
        description='آیا از حذف این فراگیر اطمینان دارید ؟'
        title='حذف فراگیر'
        open={courseStudentDeleteOpen}
        onClose={() => setCourseStudentDeleteOpen(prev => !prev)}
        deleteFun={deleteCourseStudent}
        isLoading={loadDeleteCourseStudent}
        rowSelect={rowSelect}
        id={id}
        courseId={courseId}
      />
      <CreateFileCourseModal
        open={fileOpen}
        onClose={() => setFileOpen(false)}
        rowSelect={rowSelect}
        id={id}
        courseId={courseId}
        chapterId={selectedId}
      />
      <DialogAlertCourse
        description='آیا از حذف این فایل اطمینان دارید ؟'
        title='حذف فایل'
        open={fileDeleteOpen}
        onClose={() => setFileDeleteOpen(prev => !prev)}
        deleteFun={deleteFile}
        isLoading={loadDeleteFile}
        rowSelect={rowSelect}
        id={id}
        courseId={courseId}
      />
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
                  label='اطلاعات پایه'
                  sx={{
                    fontFamily: 'inherit',
                    width: '100%'
                  }}
                />
                <Tab
                  icon={<MdMeetingRoom size={20} />}
                  value='historyStudy'
                  label='منابع / جلسات'
                  sx={{
                    fontFamily: 'inherit',
                    width: '100%'
                  }}
                />
                <Tab
                  icon={<MdQuiz size={20} />}
                  value='historyTeaching'
                  label='آزمون ها'
                  sx={{
                    fontFamily: 'inherit',
                    width: '100%'
                  }}
                />
                <Tab
                  icon={<BiLogoTripAdvisor size={20} />}
                  value='historyComposing'
                  label='فراگیران'
                  sx={{
                    fontFamily: 'inherit',
                    width: '100%'
                  }}
                />

                <Tab
                  icon={<BiLogoTripAdvisor size={20} />}
                  value='approval'
                  label='...'
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
                          getOptionLabel={optien => `${optien?.first_name} ${optien?.last_name} (${optien?.username})`}
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
              title={<Typography variant='h6'>منابع</Typography>}
              subheader={<Typography variant='caption'>می توانید منابع دوره را مشاهده نمایید</Typography>}
            />
            <CardContent>
              <Button onClick={() => setChapterOpen(true)} variant='contained' sx={{ mt: 5, mb: 3 }}>
                ایجادفصل های دوره
              </Button>
              {isLoadingChapter ? (
                <Box>
                  <Typography>lsjdfljsdlfj</Typography>
                </Box>
              ) : (
                dataChapters?.map((el: any) => (
                  <Box sx={{ display: 'flex' }} key={el?.id}>
                    <Accordion sx={{ width: 1330 }} key={el?.id}>
                      <Tooltip title={el?.description}>
                        <AccordionSummary
                          id='panel-header-1'
                          aria-controls='panel-content-1'
                          expandIcon={<Icon icon='mdi:chevron-down' />}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              width: '100%'
                            }}
                          >
                            <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary', m: 2 }}>
                              {el?.title}
                            </Typography>
                            <Box
                              component='span'
                              onClick={e => {
                                e.stopPropagation()
                                setRowSelect(el)
                                setSelectedId(el?.id)
                              }}
                              sx={{ cursor: 'pointer' }}
                            >
                              <RowOptions />
                            </Box>
                          </Box>
                        </AccordionSummary>
                      </Tooltip>

                      <AccordionDetails>
                        <TableResourceCourse
                          columns={[
                            { label: 'عنوان', key: 'title' },
                            { label: 'هزینه', key: 'price' }
                          ]}
                          rows={el?.resources}
                          isLoading={isLoadingChapter}
                          id={id}
                          upsertData={upsertData}
                          disabled={false}
                          actions={(row: any) => (
                            <>
                              <IconButton
                                color='warning'
                                onClick={() => {
                                  setResourceUpdateOpen(true)
                                  setSelectedResource(row)
                                  setSelectedId(el?.id)
                                  setDisabled(true)
                                }}
                              >
                                <BiShowAlt size={19} />
                              </IconButton>
                              <IconButton
                                color='primary'
                                onClick={() => {
                                  setResourceUpdateOpen(true)
                                  setSelectedResource(row)
                                  setSelectedId(el?.id)
                                  setDisabled(false)
                                }}
                              >
                                <HiOutlinePencilAlt size={18} />
                              </IconButton>
                              <IconButton
                                color='error'
                                onClick={() => {
                                  setResourceDeleteOpen(true)
                                  setSelectedResource(row)
                                  setSelectedId(el?.id)
                                  setDisabled(true)
                                }}
                              >
                                <IoTrashOutline size={18} />
                              </IconButton>
                            </>
                          )}
                        />
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                ))
              )}
            </CardContent>
          </Card>

          <Card sx={{ mt: 5 }}>
            <CardHeader
              title={<Typography variant='h6'>فایل ها</Typography>}
              subheader={<Typography variant='caption'>می توانید فایل های دوره را مشاهده نمایید</Typography>}
            />
            <CardContent>
              <Button onClick={() => setFileOpen(true)} variant='contained' sx={{ mt: 5, mb: 3 }}>
                افزدون فایل
              </Button>

              {isLoadingFile ? (
                <Box>
                  <Typography>lsjdfljsdlfj</Typography>
                </Box>
              ) : (
                <Stack spacing={1} width='100%'>
                  {dataFile.map((file: any) => (
                    <Box
                      key={file.id}
                      sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        bgcolor: '#f5f5f5',
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                        minHeight: 48
                      }}
                    >
                      {/* File Name */}
                      <Typography
                        variant='body2'
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '70%'
                        }}
                      >
                        {file.name}
                      </Typography>

                      {/* Actions */}
                      <Stack direction='row' spacing={0.5}>
                        <IconButton size='small' color='info'>
                          <DownloadOutlined fontSize='small' />
                        </IconButton>

                        <IconButton
                          size='small'
                          color='error'
                          onClick={() => {
                            setFileDeleteOpen(true)
                            setRowSelect(file)
                          }}
                        >
                          <DeleteOutline fontSize='small' />
                        </IconButton>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              )}
            </CardContent>
          </Card>

          <Card sx={{ mt: 5 }}>
            <CardHeader
              title={<Typography variant='h6'>جلسات حضوری</Typography>}
              subheader={<Typography variant='caption'>می توانید جلسات حضوری را ایجاد کنید</Typography>}
            />
            <CardContent>
              <TableMeetingsCourse
                columns={[
                  { label: 'تاریخ جلسه', key: ['date'] },
                  { label: 'ساعت شروع و پایان', key: ['start_time', 'end_time'] },
                  { label: ' مدرس', key: ['teacher.first_name', 'teacher.last_name'] },
                  { label: 'نوع جلسه', key: ['trainingMeetingType.name'] }
                ]}
                title='فهرست جلسات حضوری'
                description='می توانید فهرست جلسات حضوری را مشاهده کنید'
                rows={dataInPersonMeeting}
                isLoading={isLoadingInPersonMeeting}
                id={id}
                onOpen={() => setInPersonMeetingOpen(true)}
                upsertData={upsertData}
                disabled={false}
                actions={(row: any) => (
                  <>
                    <IconButton
                      color='warning'
                      onClick={() => {
                        setInPersonMeetingUpdateOpen(true)
                        setRowSelect(row)
                        setDisabled(true)
                      }}
                    >
                      <BiShowAlt size={19} />
                    </IconButton>
                    <IconButton
                      color='primary'
                      onClick={() => {
                        setInPersonMeetingUpdateOpen(true)
                        setRowSelect(row)
                        setDisabled(false)
                      }}
                    >
                      <HiOutlinePencilAlt size={18} />
                    </IconButton>
                    <IconButton
                      color='error'
                      onClick={() => {
                        setInPersonMeetingDeleteOpen(true)
                        setRowSelect(row)
                      }}
                    >
                      <IoTrashOutline size={18} />
                    </IconButton>
                  </>
                )}
              />
            </CardContent>
          </Card>

          <Card sx={{ mt: 5 }}>
            <CardHeader
              title={<Typography variant='h6'>جلسات آنلاین</Typography>}
              subheader={<Typography variant='caption'>می توانید جلسات آنلاین را ایجاد کنید</Typography>}
            />
            <CardContent>
              <TableMeetingsCourse
                columns={[
                  { label: 'تاریخ جلسه', key: ['date'] },
                  { label: 'ساعت شروع و پایان', key: ['start_time', 'end_time'] },
                  { label: ' مدرس', key: ['teacher.first_name', 'teacher.last_name'] },
                  { label: 'نوع جلسه', key: ['trainingMeetingType.name'] }
                ]}
                title='فهرست جلسات حضوری'
                description='می توانید فهرست جلسات حضوری را مشاهده کنید'
                rows={dataOnlineMeeting}
                isLoading={isLoadingOnlineMeeting}
                id={id}
                onOpen={() => setOnlineMeetingOpen(true)}
                upsertData={upsertData}
                disabled={false}
                actions={(row: any) => (
                  <>
                    <IconButton
                      color='warning'
                      onClick={() => {
                        setOnlineMeetingUpdateOpen(true)
                        setRowSelect(row)
                        setDisabled(true)
                      }}
                    >
                      <BiShowAlt size={19} />
                    </IconButton>
                    <IconButton
                      color='primary'
                      onClick={() => {
                        setOnlineMeetingUpdateOpen(true)
                        setRowSelect(row)
                        setDisabled(false)
                      }}
                    >
                      <HiOutlinePencilAlt size={18} />
                    </IconButton>
                    <IconButton
                      color='error'
                      onClick={() => {
                        setOnlineMeetingDeleteOpen(true)
                        setRowSelect(row)
                      }}
                    >
                      <IoTrashOutline size={18} />
                    </IconButton>
                  </>
                )}
              />
            </CardContent>

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

        <TabPanel sx={{ padding: 0 }} value='historyTeaching'>
          <Card sx={{ mt: 5 }}>
            <CardHeader
              title={<Typography variant='h6'>آزمون</Typography>}
              subheader={<Typography variant='caption'>می توانید آزمون را ایجاد کنید</Typography>}
            />
            <CardContent>
              <TableMeetingsCourse
                columns={[
                  { label: 'ماهیت آزمون', key: ['examNature.name'] },
                  { label: 'زمان شروع و پایان', key: ['start_time', 'end_time'] },
                  { label: 'شیوه برگذاری آزمون', key: ['examDeliveryMethod.name'] },
                  { label: 'زمان آزمون', key: ['exam_duration'] }
                ]}
                title='فهرست جلسات حضوری'
                description='می توانید فهرست جلسات حضوری را مشاهده کنید'
                rows={dataExam}
                isLoading={isLoadingExam}
                id={id}
                onOpen={() => setExamOpen(true)}
                upsertData={upsertData}
                disabled={false}
                actions={(row: any) => (
                  <>
                    <IconButton
                      color='warning'
                      onClick={() => {
                        setExamUpdateOpen(true)
                        setRowSelect(row)
                        setDisabled(true)
                      }}
                    >
                      <BiShowAlt size={19} />
                    </IconButton>
                    <IconButton
                      color='primary'
                      onClick={() => {
                        setExamUpdateOpen(true)
                        setRowSelect(row)
                        setDisabled(false)
                      }}
                    >
                      <HiOutlinePencilAlt size={18} />
                    </IconButton>
                    <IconButton
                      color='error'
                      onClick={() => {
                        setExamDeleteOpen(true)
                        setRowSelect(row)
                      }}
                    >
                      <IoTrashOutline size={18} />
                    </IconButton>
                  </>
                )}
              />
            </CardContent>

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

        <TabPanel sx={{ padding: 0 }} value='historyComposing'>
          <Card sx={{ mt: 5 }}>
            <CardHeader
              title={<Typography variant='h6'>فراگیران</Typography>}
              subheader={<Typography variant='caption'>می توانید فراگیران را ایجاد کنید</Typography>}
            />
            <CardContent>
              <TableMeetingsCourse
                columns={[
                  { label: 'فراگیر', key: ['student.first_name', 'student.last_name'] },
                  { label: 'تاریخ سند بانکی', key: ['bank_document_date'] },
                  { label: 'شماره سند بانکی', key: ['bank_document_number'] },
                  { label: 'هزینه', key: ['price'] }
                ]}
                title='فهرست جلسات حضوری'
                description='می توانید فهرست جلسات حضوری را مشاهده کنید'
                rows={dataCourseStudent}
                isLoading={isLoadingCourseStudent}
                id={id}
                onOpen={() => setCourseStudentOpen(true)}
                upsertData={upsertData}
                disabled={false}
                actions={(row: any) => (
                  <>
                    <IconButton
                      color='warning'
                      onClick={() => {
                        setCourseStudentUpdateOpen(true)
                        setRowSelect(row)
                        setDisabled(true)
                      }}
                    >
                      <BiShowAlt size={19} />
                    </IconButton>
                    <IconButton
                      color='primary'
                      onClick={() => {
                        setCourseStudentUpdateOpen(true)
                        setRowSelect(row)
                        setDisabled(false)
                      }}
                    >
                      <HiOutlinePencilAlt size={18} />
                    </IconButton>
                    <IconButton
                      color='error'
                      onClick={() => {
                        setCourseStudentDeleteOpen(true)
                        setRowSelect(row)
                      }}
                    >
                      <IoTrashOutline size={18} />
                    </IconButton>
                  </>
                )}
              />
            </CardContent>

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
