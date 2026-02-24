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
  Autocomplete
} from '@mui/material'
import { BiFile, BiLogoTripAdvisor, BiShowAlt, BiSolidInfoSquare } from 'react-icons/bi'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5'
import TableRequestsRevision from './TableRequestRevision'
import FileCompilerModal from './FileCompoilerModal'
import {
  useFetchHistoryComposingRevisionTeachingPermission,
  useFetchHistoryEducationRevisionTeachingPermission,
  useFetchHistoryStudyRevisionTeachingPermission,
  useFetchHistoryTeachingRevisionTeachingPermission,
  useUpdateTeachingPermissionRevision
} from '@/hooks/organization/useRevisionTeachingPermission'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import UpdateHistoryStudyRevisionModal from './UpdateHistoryStudyRevisionModal'
import UpdateHistoryEducationRevisionModal from './UpdateHistoryEducationRevisionModal'
import UpdateHistoryTeachingRevisionModal from './UpdateHistoryTeachingRevisionModal'
import UpdateHistoryComposingRevisionModal from './UpdateHistoryComposingRevisionModal'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { GeTErrorFetch } from '@/components/elements/errorHandler'
import { useRouter } from 'next/navigation'

export default function RevisionForm({ id, revisionId, upsertData = [], show }: any) {
  const { control, handleSubmit, setError, reset, watch } = useForm({
    defaultValues: {
      request_teaching_permission_status_id: 0,
      objection: ''
    }
  })

  const { mutateAsync, isPending }: any = useUpdateTeachingPermissionRevision()
  const router = useRouter()

  async function onSubmit(values: any) {
    try {
      const data = {
        request_teaching_permission_status_id: values?.request_teaching_permission_status_id,
        objection: values?.objection
      }
      const res: any = await toast.promise(mutateAsync({ data: data, id, revisionId }), {
        pending: 'در حال انجام...'
      })
      router.push(`/organization/${id}/teachigPermission/requestListRevision`)
      reset()
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  const [value, setTabValue] = useState<string>('info')
  const handleTabsChange = (event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue)
  }
  const [openFile, setOpenFile] = useState(false)

  const [rowSelect, setRowSelect] = useState()
  const [disabled, setDisabled] = useState<boolean>(false)
  const [historyStudyUpdate, setHistoryStudyUpdate] = useState(false)
  const { data: dataHistoryStudy, isPending: isLoadStaduy }: any = useFetchHistoryStudyRevisionTeachingPermission({
    id: id,
    revisionId: revisionId
  })

  const [historyEducationUpdate, setHistoryEducationUpdate] = useState(false)
  const { data: dataHistoryEducation, isPending: isLoadEducation }: any =
    useFetchHistoryEducationRevisionTeachingPermission({
      id: id,
      revisionId: revisionId
    })

  const [historyTeachingUpdate, setHistoryTeachingUpdate] = useState(false)
  const { data: dataHistoryTeaching, isPending: isLoadTeaching }: any =
    useFetchHistoryTeachingRevisionTeachingPermission({
      id: id,
      revisionId: revisionId
    })

  const [historyCompsingUpdate, setHistoryComposingUpdate] = useState(false)
  const { data: dataHistoryComposing, isPending: isLoadComposing }: any =
    useFetchHistoryComposingRevisionTeachingPermission({
      id: id,
      revisionId: revisionId
    })

  return (
    <>
      <FileCompilerModal open={openFile} onClose={() => setOpenFile(false)} file={show?.compilationFile} />
      <UpdateHistoryStudyRevisionModal
        open={historyStudyUpdate}
        onClose={() => setHistoryStudyUpdate(false)}
        id={id}
        revisionId={revisionId}
        rowSelect={rowSelect}
        disabled={disabled}
        upsertData={[]}
      />
      <UpdateHistoryEducationRevisionModal
        open={historyEducationUpdate}
        onClose={() => setHistoryEducationUpdate(false)}
        id={id}
        revisionId={revisionId}
        rowSelect={rowSelect}
        disabled={disabled}
        upsertData={[]}
      />
      <UpdateHistoryTeachingRevisionModal
        open={historyTeachingUpdate}
        onClose={() => setHistoryTeachingUpdate(false)}
        id={id}
        revisionId={revisionId}
        rowSelect={rowSelect}
        disabled={disabled}
        upsertData={[]}
      />
      <UpdateHistoryComposingRevisionModal
        open={historyCompsingUpdate}
        onClose={() => setHistoryComposingUpdate(false)}
        id={id}
        revisionId={revisionId}
        rowSelect={rowSelect}
        disabled={disabled}
        upsertData={[]}
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
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} md={9}>
                  <TextField
                    value={show?.regions ? show?.regions?.map((el: any) => el?.name) : ''}
                    InputProps={{ readOnly: true }}
                    fullWidth
                    label='شهرستان های محل سکونت'
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    value={show?.postal_code ? show?.postal_code : ''}
                    InputProps={{ readOnly: true }}
                    fullWidth
                    label='کد پستی'
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    value={show?.employmentStatus?.name ? show?.employmentStatus?.name : ''}
                    InputProps={{ readOnly: true }}
                    fullWidth
                    label='وضعیت اشتغال'
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    value={show?.employmentLocalityType?.name ? show?.employmentLocalityType?.name : ''}
                    InputProps={{ readOnly: true }}
                    fullWidth
                    label='نوع محل اشتغال'
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    value={show?.employment_locality_name ? show?.employment_locality_name : ''}
                    InputProps={{ readOnly: true }}
                    fullWidth
                    label='نام محل اشتغال'
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    value={show?.activityFieldTeaching?.name ? show?.activityFieldTeaching?.name : ''}
                    InputProps={{ readOnly: true }}
                    fullWidth
                    label='حیطه های درخواست تدریس'
                  />
                </Grid>

                <Grid item xs={12} md={9}>
                  <TextField
                    value={
                      show?.teachingActivityFieldAreas
                        ? show?.teachingActivityFieldAreas?.map((el: any) => el?.name).join(' _ ')
                        : ''
                    }
                    InputProps={{ readOnly: true }}
                    fullWidth
                    label='حوزه های حیطه تدریس'
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    value={show?.teachingGroupWork?.name ? show?.teachingGroupWork?.name : ''}
                    InputProps={{ readOnly: true }}
                    fullWidth
                    label='کار گروه تدریس'
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    value={show?.rankScientificCouncil?.name ? show?.rankScientificCouncil?.name : ''}
                    InputProps={{ readOnly: true }}
                    fullWidth
                    label='سطح درخواست تدریس'
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <FormControlLabel
                    label='هیئت عملی دانشگاه'
                    control={
                      <Switch
                        checked={show?.scientific_council ? (show?.scientific_council == '1' ? true : false) : false}
                      />
                    }
                  />
                </Grid>

                {show?.scientific_council == '1' && (
                  <Grid item xs={12} md={12}>
                    <TextField
                      value={show?.rankScientificCouncil?.name ? show?.rankScientificCouncil?.name : ''}
                      InputProps={{ readOnly: true }}
                      fullWidth
                      label='رتبه هئیت علمی'
                    />
                  </Grid>
                )}

                <Grid item xs={12} md={12}>
                  <FormControlLabel
                    label='مجوز فعالیت / پروانه اشتغال'
                    control={
                      <Switch
                        checked={show?.activity_permission ? (show?.activity_permission == '1' ? true : false) : false}
                      />
                    }
                  />
                </Grid>

                {show?.activity_permission == '1' && (
                  <>
                    <Grid item xs={12} md={3}>
                      <TextField
                        value={
                          show?.issuanceLocalityPermissionActivity?.name
                            ? show?.issuanceLocalityPermissionActivity?.name
                            : ''
                        }
                        InputProps={{ readOnly: true }}
                        fullWidth
                        label='محل صدرو مجوز فعالیت'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        value={show?.number_permission_activity ? show?.number_permission_activity : ''}
                        InputProps={{ readOnly: true }}
                        fullWidth
                        label='شماره مجوز فعالیت'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        value={show?.activity_permission_date ? show?.activity_permission_date : ''}
                        InputProps={{ readOnly: true }}
                        fullWidth
                        label='تاریخ مجوز فعالیت'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        value={show?.activity_expiration_date ? show?.activity_expiration_date : ''}
                        InputProps={{ readOnly: true }}
                        fullWidth
                        label='تاریخ انقضا مجوز فعالیت'
                      />
                    </Grid>
                  </>
                )}

                <Grid item xs={12} md={3}>
                  <FormControlLabel
                    label='مولف و محتوای فایل تالیف'
                    control={<Switch checked={show?.compiler ? (show?.compiler == '1' ? true : false) : false} />}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Tooltip title='مشاهده محتوای فایل تالیف'>
                    <IconButton onClick={() => setOpenFile(true)}>
                      <BiFile color='#47d5f8ff' />
                    </IconButton>
                  </Tooltip>
                </Grid>

                <Grid item xs={12} md={12}>
                  <TextField
                    value={show?.address ?? ''}
                    rows={3}
                    multiline
                    InputProps={{ readOnly: true }}
                    fullWidth
                    label='آدرس'
                  />
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
              <Button variant='contained' endIcon={<IoArrowBack />} onClick={() => setTabValue('historyStudy')}>
                بعدی
              </Button>
            </CardActions>
          </Card>
        </TabPanel>

        <TabPanel sx={{ padding: 0 }} value='historyStudy'>
          <Card>
            <CardHeader
              title={<Typography variant='h6'>سوابق تحصیلی</Typography>}
              subheader={<Typography variant='caption'>می توانید سوابق تحصیلی را مشاهده نمایید</Typography>}
            />
            <CardContent>
              <TableRequestsRevision
                columns={[
                  { label: 'مقطع تحصیلی', key: 'studyLevel.name' },
                  { label: 'گروه تحصیلی', key: 'studyGroup.name' },
                  { label: 'رشته تحصیلی', key: 'studyMajor.name' },
                  { label: 'دانشگاه محل تدریس', key: 'studyUniversityType.name' },
                  { label: 'وضعیت', key: 'status' }
                ]}
                title='فهرست سوابق تحصیلی'
                description='می توانید فهرست سوابق تحصیلی را مشاهده کنید'
                rows={dataHistoryStudy}
                isLoading={isLoadStaduy}
                id={id}
                upsertData={upsertData}
                disabled={false}
                actions={(row: any) => (
                  <>
                    {(row?.status == '0' || row?.status == '1') && (
                      <IconButton
                        color='warning'
                        onClick={() => {
                          setHistoryStudyUpdate(true)
                          setRowSelect(row)
                          setDisabled(true)
                        }}
                      >
                        <BiShowAlt size={19} />
                      </IconButton>
                    )}

                    {row?.status == null && (
                      <IconButton
                        color='primary'
                        onClick={() => {
                          setHistoryStudyUpdate(true)
                          setRowSelect(row)
                          setDisabled(false)
                        }}
                      >
                        <HiOutlinePencilAlt size={18} />
                      </IconButton>
                    )}
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

        <TabPanel sx={{ padding: 0 }} value='historyEducation'>
          <Card>
            <CardHeader
              title={<Typography variant='h6'>سوابق آموزشی</Typography>}
              subheader={<Typography variant='caption'>می توانید سوابق آموزشی را مشاهده نمایید</Typography>}
            />
            <CardContent>
              <TableRequestsRevision
                columns={[
                  { label: 'نام دوره', key: 'course_name' },
                  { label: 'مجری دوره', key: 'executor_name' },
                  { label: 'تاریخ شروع', key: 'start_date' },
                  { label: 'تاریخ پایان', key: 'end_date' },
                  { label: 'وضعیت', key: 'status' }
                ]}
                title='فهرست سوابق تحصیلی'
                description='می توانید فهرست سوابق تحصیلی را مشاهده کنید'
                rows={dataHistoryEducation}
                isLoading={isLoadEducation}
                id={id}
                upsertData={upsertData}
                disabled={false}
                actions={(row: any) => (
                  <>
                    {(row?.status == '0' || row?.status == '1') && (
                      <IconButton
                        color='warning'
                        onClick={() => {
                          setHistoryEducationUpdate(true)
                          setRowSelect(row)
                          setDisabled(true)
                        }}
                      >
                        <BiShowAlt size={19} />
                      </IconButton>
                    )}
                    {row?.status == null && (
                      <IconButton
                        color='primary'
                        onClick={() => {
                          setHistoryEducationUpdate(true)
                          setRowSelect(row)
                          setDisabled(false)
                        }}
                      >
                        <HiOutlinePencilAlt size={18} />
                      </IconButton>
                    )}
                  </>
                )}
              />
            </CardContent>

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
            <CardContent>
              <TableRequestsRevision
                columns={[
                  { label: 'نام دوره', key: 'course_name' },
                  { label: 'مجری دوره', key: 'executor_name' },
                  { label: 'تاریخ شروع', key: 'start_date' },
                  { label: 'تاریخ پایان', key: 'end_date' },
                  { label: 'وضعیت', key: 'status' }
                ]}
                title='فهرست سوابق تحصیلی'
                description='می توانید فهرست سوابق تحصیلی را مشاهده کنید'
                rows={dataHistoryTeaching}
                isLoading={isLoadTeaching}
                id={id}
                upsertData={upsertData}
                disabled={false}
                actions={(row: any) => (
                  <>
                    {(row?.status == '0' || row?.status == '1') && (
                      <IconButton
                        color='warning'
                        onClick={() => {
                          setHistoryTeachingUpdate(true)
                          setRowSelect(row)
                          setDisabled(true)
                        }}
                      >
                        <BiShowAlt size={19} />
                      </IconButton>
                    )}
                    {row?.status == null && (
                      <IconButton
                        color='primary'
                        onClick={() => {
                          setHistoryTeachingUpdate(true)
                          setRowSelect(row)
                          setDisabled(false)
                        }}
                      >
                        <HiOutlinePencilAlt size={18} />
                      </IconButton>
                    )}
                  </>
                )}
              />
            </CardContent>

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
            <CardContent>
              <TableRequestsRevision
                columns={[
                  { label: 'نام کتاب', key: 'book_name' },
                  { label: 'نوع تالیف / ترجمه', key: 'composingType.name' },
                  { label: 'انتشارات', key: 'publication_name' },
                  { label: 'سال انتشار', key: 'print_year' },
                  { label: 'وضعیت', key: 'status' }
                ]}
                title='فهرست سوابق تحصیلی'
                description='می توانید فهرست سوابق تحصیلی را مشاهده کنید'
                rows={dataHistoryComposing}
                isLoading={isLoadComposing}
                id={id}
                upsertData={upsertData}
                disabled={false}
                actions={(row: any) => (
                  <>
                    {(row?.status == '0' || row?.status == '1') && (
                      <IconButton
                        color='warning'
                        onClick={() => {
                          setHistoryComposingUpdate(true)
                          setRowSelect(row)
                          setDisabled(true)
                        }}
                      >
                        <BiShowAlt size={19} />
                      </IconButton>
                    )}
                    {row?.status == null && (
                      <IconButton
                        color='primary'
                        onClick={() => {
                          setHistoryComposingUpdate(true)
                          setRowSelect(row)
                          setDisabled(false)
                        }}
                      >
                        <HiOutlinePencilAlt size={18} />
                      </IconButton>
                    )}
                  </>
                )}
              />
            </CardContent>
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Controller
                        name='request_teaching_permission_status_id'
                        control={control}
                        render={({ field }) => (
                          <RadioGroup
                            row
                            {...field}
                            sx={{
                              justifyContent: 'center',
                              gap: 2
                            }}
                          >
                            <FormControlLabel
                              value={4}
                              control={<Radio sx={{ display: 'none' }} />}
                              label={
                                <Box
                                  sx={{
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 999,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    cursor: 'pointer',
                                    fontWeight: 700,
                                    color: field.value == 4 ? '#fff' : '#4caf50',
                                    background:
                                      field.value == 4 ? 'linear-gradient(135deg,#22c55e,#16a34a)' : '#e8f5e9',
                                    boxShadow: field.value == 4 ? '0 8px 24px rgba(34,197,94,.4)' : 'none'
                                  }}
                                >
                                  ✔ تأیید درخواست
                                </Box>
                              }
                            />

                            <FormControlLabel
                              value={2}
                              control={<Radio sx={{ display: 'none' }} />}
                              label={
                                <Box
                                  sx={{
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 999,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    cursor: 'pointer',
                                    fontWeight: 700,
                                    color: field.value == 2 ? '#fff' : '#d0d17aff',
                                    background:
                                      field.value == 2 ? 'linear-gradient(135deg,#d0d17aff,#d0d17aff)' : '#f5f3e8ff',
                                    boxShadow: field.value == 2 ? '0 8px 24px rgba(218, 228, 81, 0.4)' : 'none'
                                  }}
                                >
                                  عودت برای اصلاح
                                </Box>
                              }
                            />

                            <FormControlLabel
                              value={5}
                              control={<Radio sx={{ display: 'none' }} />}
                              label={
                                <Box
                                  sx={{
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 999,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    cursor: 'pointer',
                                    fontWeight: 700,
                                    color: field.value == 5 ? '#fff' : '#ef4444',
                                    background:
                                      field.value == 5 ? 'linear-gradient(135deg,#ef4444,#dc2626)' : '#fdecec',
                                    boxShadow: field.value == 5 ? '0 8px 24px rgba(239,68,68,.4)' : 'none'
                                  }}
                                >
                                  ✖ رد درخواست
                                </Box>
                              }
                            />
                          </RadioGroup>
                        )}
                      />
                    </FormControl>
                  </Grid>

                  {watch('request_teaching_permission_status_id') == 2 && (
                    <Grid item xs={12}>
                      <Controller
                        name='objection'
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                          <Autocomplete
                            multiple
                            freeSolo
                            options={[]}
                            readOnly={disabled}
                            //@ts-ignore
                            value={value}
                            onChange={(_, newValue) => onChange(newValue)}
                            renderInput={params => (
                              <TextField error={!!error} helperText={error?.message} {...params} label='دلایل عودت' />
                            )}
                          />
                        )}
                      />
                    </Grid>
                  )}

                  {watch('request_teaching_permission_status_id') == 5 && (
                    <Grid item xs={12}>
                      <Controller
                        name='objection'
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                          <Autocomplete
                            multiple
                            freeSolo
                            options={[]}
                            readOnly={disabled}
                            //@ts-ignore
                            value={value}
                            onChange={(_, newValue) => onChange(newValue)}
                            renderInput={params => (
                              <TextField error={!!error} helperText={error?.message} {...params} label='دلایل رد' />
                            )}
                          />
                        )}
                      />
                    </Grid>
                  )}
                </Grid>
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
            </form>
          </Card>
        </TabPanel>
      </TabContext>
    </>
  )
}
