'use client'

import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material'
import { Stepper, Step, StepLabel, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import { Button, Grid, IconButton, Tooltip, Stack } from '@mui/material'
import { BiShowAlt, BiCheck } from 'react-icons/bi'
import { IoTrashOutline } from 'react-icons/io5'
import { MdFavorite } from 'react-icons/md'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import MuiAccordionDetails, { AccordionDetailsProps } from '@mui/material/AccordionDetails'
import { Icon } from '@iconify/react'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import {
  CheckCircleOutline,
  ConstructionOutlined,
  DownloadOutlined,
  LocalOfferOutlined,
  PlayCircleOutline,
  ShoppingCart
} from '@mui/icons-material'
import TableCustomCourse from './TableCustomCourse'
import { RiStarFill, RiStarSLine } from 'react-icons/ri'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import { useRouter } from 'next/navigation'
import { loginOnlineTrainingMeetingsCourseUser } from '@/libs/user/educationCourse'
import { toast } from 'react-toastify'
import axiosConfig from '@/libs/auth/axios'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SchoolIcon from '@mui/icons-material/School'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import AssignmentIcon from '@mui/icons-material/Assignment'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'

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

const steps = [
  { title: 'ثبت‌نام', icon: <SchoolIcon sx={{ fontSize: 40 }} /> },
  { title: 'شروع دوره', icon: <PlayCircleIcon sx={{ fontSize: 40 }} /> },
  { title: 'مطالعه', icon: <AssignmentIcon sx={{ fontSize: 40 }} /> },
  { title: 'آزمون', icon: <CheckCircleIcon sx={{ fontSize: 40 }} /> },
  { title: 'دریافت گواهی', icon: <EmojiEventsIcon sx={{ fontSize: 40 }} /> }
]

const StepIconWrapper = styled('div')<{ active?: boolean }>(({ theme, active }) => ({
  width: 42,
  height: 42,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: active ? theme.palette.primary.main : '#e0e0e0',
  color: active ? '#fff' : '#9e9e9e',
  transition: '0.3s'
}))

export default function ({ isLoading, id, courseId, show }: any) {

  const [activeStep] = useState(1)
  const router = useRouter()

  const handleLoginOnlineMeeting = async (rowId: any) => {
    try {
      const data = await toast.promise(loginOnlineTrainingMeetingsCourseUser({ id, courseId, rowId }), {
        pending: 'در حال ورود...'
      })

      if (data?.status) {
        window.open(data?.data?.login_url, '_blank')
        toast.success('وارد کلاس شدید')
      } else {
        toast.error(data?.message)
      }
    } catch (error) {
      throw error
    }
  }

  const downloadFileById = async (fileId: number, filename?: string) => {
    try {
      const response = await axiosConfig.get(
        `/user/${id}/education/course/core/course/${courseId}/file/download/${fileId}`,
        {
          responseType: 'blob'
        }
      )
      const blob = new Blob([response.data])

      const contentDisposition = response.headers['content-disposition']
      let finalName = filename || 'download'

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+?)"?$/)
        if (match?.[1]) finalName = match[1]
      }

      const objectUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')

      link.href = objectUrl
      link.download = finalName
      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
      window.URL.revokeObjectURL(objectUrl)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  return (
    <>
      <Card sx={{ margin: 'auto', p: 2, borderRadius: 2 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} lg={4}>
            <>
              <Box display='flex' justifyContent='center'>
                <img
                  src='/images/Banner1.png'
                  alt='مدیریت اخلاق حرفه ای و سازمانی'
                  style={{ maxWidth: '80%', maxHeight: '70%', borderRadius: 8 }}
                />
              </Box>

              <Box display='flex' justifyContent='center' mt={1} mb={1}>
                <RiStarFill color='warning' />
                <RiStarFill color='warning' />
                <RiStarFill color='warning' />
                <RiStarFill color='warning' />
                <RiStarFill color='warning' />
              </Box>
            </>
          </Grid>
          <Grid item xs={12} lg={8}>
            <>
              <Grid container spacing={5}>
                <Grid item xs={12} lg={7}>
                  <Box display='flex' flexDirection='column' gap={1} mb={2} mt={10}>
                    <Typography variant='h4' sx={{ fontWeight: 900 }}>
                      {show?.title}
                    </Typography>
                    <Box display='flex' alignItems='center' gap={1}>
                      <IconButton
                        sx={{
                          bgcolor: '#EDEAFF',
                          width: 32,
                          height: 32,
                          '&:hover': { bgcolor: '#DAD4FF' }
                        }}
                      >
                        <BiCheck color='#7367F0' />
                      </IconButton>
                      <Typography variant='body2'>مدت دوره : {show?.duration} ساعت</Typography>
                    </Box>

                    <Box display='flex' alignItems='center' gap={1}>
                      <IconButton
                        sx={{
                          bgcolor: '#EDEAFF',
                          width: 32,
                          height: 32,
                          '&:hover': { bgcolor: '#DAD4FF' }
                        }}
                      >
                        <BiCheck color='#7367F0' />
                      </IconButton>
                      <Typography variant='body2'> مرکز آموزش : {show?.executingInstitution?.name}</Typography>
                    </Box>

                    <Box display='flex' alignItems='center' gap={1}>
                      <IconButton
                        sx={{
                          bgcolor: '#EDEAFF',
                          width: 32,
                          height: 32,
                          '&:hover': { bgcolor: '#DAD4FF' }
                        }}
                      >
                        <BiCheck color='#7367F0' />
                      </IconButton>
                      <Typography variant='body2'>
                        {' '}
                        مدرسان :{' '}
                        {show?.teachers
                          ?.map((el: any) => `${el?.first_name} ${el?.last_name}(${el?.username})`)
                          .join(' - ')}
                      </Typography>
                    </Box>

                    <Box display='flex' alignItems='center' gap={1}>
                      <IconButton
                        sx={{
                          bgcolor: '#EDEAFF',
                          width: 32,
                          height: 32,
                          '&:hover': { bgcolor: '#DAD4FF' }
                        }}
                      >
                        <BiCheck color='#7367F0' />
                      </IconButton>
                      <Typography variant='body2'> نوع دوره : {show?.courseType?.name}</Typography>
                    </Box>

                    <Box display='flex' alignItems='center' gap={1}>
                      <IconButton
                        sx={{
                          bgcolor: '#EDEAFF',
                          width: 32,
                          height: 32,
                          '&:hover': { bgcolor: '#DAD4FF' }
                        }}
                      >
                        <BiCheck color='#7367F0' />
                      </IconButton>
                      <Typography variant='body2'> نوع برگذاری : {show?.eventType?.name}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={5}>
                  <Box display='flex' flexDirection='column' gap={1} mb={2} mt={10}>
                    <Box display='flex' alignItems='flex-start' gap={2}>
                      <PlayCircleOutline sx={{ color: '#7367F0', fontSize: 40, mt: '4px' }} />

                      <Typography variant='body1' sx={{ fontWeight: 700, mt: 3 }}>
                        زمان شروع دوره {show?.course_start_at}
                      </Typography>
                    </Box>
                    <Box display='flex' alignItems='flex-start' gap={2}>
                      <CheckCircleOutline sx={{ color: '#7367F0', fontSize: 40, mt: '4px' }} />
                      <Typography variant='body1' sx={{ fontWeight: 700, mt: 3 }}>
                        زمان پایان دوره {show?.course_end_at}
                      </Typography>
                    </Box>

                    <Box display='flex' alignItems='flex-start' gap={2}>
                      <LocalOfferOutlined sx={{ color: '#7367F0', fontSize: 40 }} />

                      <Typography variant='body1' sx={{ fontWeight: 700, mt: 3 }}>
                        درصد تخفیف عمومی دوره {show?.general_discount_percent}%
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Divider sx={{ p: 3 }} />
            </>
          </Grid>
        </Grid>

        <Box display='flex' justifyContent='center' gap={2} sx={{ mb: 10 }}>
          <Button variant='contained' color='primary' startIcon={<ShoppingCart />}>
            افزودن به سبد خرید
          </Button>
          <Button variant='outlined' color='error' startIcon={<MdFavorite />}>
            علاقه‌مندی
          </Button>
        </Box>
      </Card>

      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            flexWrap: 'wrap',
            width: '100%',
            mt: 3
          }}
        >
          {steps.map((step, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: 240
                }}
              >
                {step.icon}
                <Typography variant='body2' sx={{ mt: 1, textAlign: 'center' }}>
                  {step.title}
                </Typography>
              </Box>

              {index !== steps.length - 1 && (
                <Typography sx={{ mx: 1, fontSize: 20, fontWeight: 'bold' }}>{'>'}</Typography>
              )}
            </Box>
          ))}
        </Box>
      </Box>

      {show?.chapters && (
        <Card sx={{ mt: 5 }}>
          <CardHeader
            title={
              <Box textAlign='center'>
                <Typography variant='h6'>فصل ها / منابع </Typography>
              </Box>
            }
            subheader={
              <Box textAlign='center'>
                <Typography variant='caption'>می توانید اطلاعات فصل ها / منابع را مشاهده نمایید</Typography>
              </Box>
            }
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          />
          <CardContent>
            {isLoading ? (
              <Box>
                <Typography>lsjdfljsdlfj</Typography>
              </Box>
            ) : (
              show?.chapters?.map((el: any) => (
                <Box sx={{ display: 'flex' }} key={el?.id}>
                  <Accordion defaultExpanded sx={{ width: 1330 }} key={el?.id}>
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
                        </Box>
                      </AccordionSummary>
                    </Tooltip>

                    <AccordionDetails sx={{ p: 0 }}>
                      {el?.resources?.map((item: any, index: number) => (
                        <Box
                          key={item.id}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            px: 2,
                            py: 2.5,
                            minHeight: 64,
                            borderBottom: index !== el.resources.length - 1 ? '1px solid #E5E7EB' : 'none'
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Icon icon='mdi:play-circle-outline' width={25} />

                            <Typography variant='body2' sx={{ fontWeight: 600, fontSize: 14 }}>
                              {item.title}
                            </Typography>

                            {item.is_free && (
                              <Box
                                sx={{
                                  backgroundColor: '#c0f5d4',
                                  color: '#17af3d',
                                  px: 2,
                                  py: 1,
                                  borderRadius: 999,
                                  fontSize: 13,
                                  fontWeight: 500
                                }}
                              >
                                رایگان
                              </Box>
                            )}

                            {item.watched && (
                              <Box
                                sx={{
                                  backgroundColor: '#e7e9ec',
                                  color: '#7a7a7a',
                                  px: 2,
                                  py: 1,
                                  borderRadius: 999,
                                  fontSize: 15,
                                  fontWeight: 500
                                }}
                              >
                                مشاهده شده
                              </Box>
                            )}
                          </Box>

                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Typography variant='caption' sx={{ fontWeight: 400 }} color='text.secondary'>
                              {item.size}
                            </Typography>

                            <Box
                              sx={{
                                border: '1px solid #7C3AED',
                                color: '#7C3AED',
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 999,
                                fontSize: 12,
                                cursor: 'pointer'
                              }}
                              onClick={() =>
                                router.push(
                                  `/user/${id}/education/educationalCourse/${courseId}/show/${item?.id}/showResource`
                                )
                              }
                            >
                              مشاهده
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                </Box>
              ))
            )}
          </CardContent>
        </Card>
      )}

      {show?.files && (
        <Card sx={{ mt: 5 }}>
          <CardHeader
            title={
              <Box textAlign='center'>
                <Typography variant='h6'>فایل ها</Typography>
              </Box>
            }
            subheader={
              <Box textAlign='center'>
                <Typography variant='caption'>می توانید فایل ها را مشاهده نمایید</Typography>
              </Box>
            }
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          />
          <CardContent>
            {isLoading ? (
              <Box>
                <Typography>lsjdfljsdlfj</Typography>
              </Box>
            ) : (
              <Stack spacing={1} width='100%'>
                {show?.files.map((file: any) => (
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
                      <IconButton
                        size='small'
                        color='primary'
                        onClick={() => downloadFileById(file.id, file.original_name)}
                      >
                        <DownloadOutlined fontSize='small' />
                      </IconButton>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            )}
          </CardContent>
        </Card>
      )}

      {show?.inPersonTrainingMeetings && (
        <Card sx={{ mt: 5 }}>
          <CardHeader
            title={
              <Box textAlign='center'>
                <Typography variant='h6'>جلسات حضوری</Typography>
              </Box>
            }
            subheader={
              <Box textAlign='center'>
                <Typography variant='caption'>می توانید جلسات حضوری را مشاهده نمایید</Typography>
              </Box>
            }
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          />
          <CardContent>
            <TableCustomCourse
              columns={[
                { label: 'تاریخ جلسه', key: ['date'] },
                { label: 'ساعت شروع و پایان', key: ['start_time', 'end_time'] },
                { label: ' مدرس', key: ['teacher.first_name', 'teacher.last_name'] },
                { label: 'نوع جلسه', key: ['trainingMeetingType.name'] }
              ]}
              title='فهرست جلسات حضوری'
              description='می توانید فهرست جلسات حضوری را مشاهده کنید'
              rows={show?.inPersonTrainingMeetings}
              isLoading={false}
              id={id}
              disabled={false}
              // actions={(row: any) => (
              //   <>
              //     <IconButton color='warning'>
              //       <BiShowAlt size={19} />
              //     </IconButton>
              //     <IconButton color='primary'>
              //       <HiOutlinePencilAlt size={18} />
              //     </IconButton>
              //     <IconButton color='error'>
              //       <IoTrashOutline size={18} />
              //     </IconButton>
              //   </>
              // )}
            />
          </CardContent>
        </Card>
      )}

      {show?.onlineTrainingMeetings && (
        <Card sx={{ mt: 5 }}>
          <CardHeader
            title={
              <Box textAlign='center'>
                <Typography variant='h6'>جلسات آنلاین</Typography>
              </Box>
            }
            subheader={
              <Box textAlign='center'>
                <Typography variant='caption'>می توانید جلسات آنلاین را مشاهده نمایید</Typography>
              </Box>
            }
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          />
          <CardContent>
            <TableCustomCourse
              columns={[
                { label: 'تاریخ جلسه', key: ['date'] },
                { label: 'ساعت شروع و پایان', key: ['start_time', 'end_time'] },
                { label: ' مدرس', key: ['teacher.first_name', 'teacher.last_name'] },
                { label: 'نوع جلسه', key: ['trainingMeetingType.name'] }
              ]}
              title='فهرست جلسات آنلاین'
              description='می توانید فهرست جلسات آنلاین را مشاهده کنید'
              rows={show?.onlineTrainingMeetings}
              isLoading={false}
              id={id}
              disabled={false}
              actions={(row: any) => (
                <>
                  <Button variant='outlined' size='small' onClick={() => handleLoginOnlineMeeting(row?.id)}>
                    ورود به کلاس
                  </Button>
                </>
              )}
            />
          </CardContent>
        </Card>
      )}

      <>
        <Grid container spacing={5} alignItems='stretch'>
          <Grid item xs={12} lg={8} sx={{ display: 'flex' }}>
            <Card sx={{ mt: 5, flex: 1, display: 'flex', flexDirection: 'column' }}>
              <CardHeader
                title={
                  <Box textAlign='center'>
                    <Typography variant='h6'>آزمون ها</Typography>
                  </Box>
                }
                subheader={
                  <Box textAlign='center'>
                    <Typography variant='caption'>می توانید آزمون ها را مشاهده نمایید</Typography>
                  </Box>
                }
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              />
              <CardContent>
                <TableCustomCourse
                  columns={[
                    { label: 'ساعت شروع و پایان', key: ['start_time', 'end_time'] },
                    { label: 'تعداد سوالات', key: ['total_question'] },
                    { label: 'نمره قبولی', key: ['passing_score'] },
                    { label: 'تعداد دفعات ازمون', key: ['exam_duration'] }
                  ]}
                  rows={show?.exams}
                  isLoading={false}
                  id={id}
                  disabled={false}
                  // actions={(row: any) => (
                  //   <>
                  //     <IconButton color='warning'>
                  //       <BiShowAlt size={19} />
                  //     </IconButton>
                  //     <IconButton color='primary'>
                  //       <HiOutlinePencilAlt size={18} />
                  //     </IconButton>
                  //     <IconButton color='error'>
                  //       <IoTrashOutline size={18} />
                  //     </IconButton>
                  //   </>
                  // )}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            lg={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mt: 5,
              gap: 5
            }}
          >
            <>
              <Card sx={{ flex: 1 }}>
                <CardHeader
                  title={
                    <Box textAlign='center'>
                      <Typography variant='h6'>ارزیابی اثربخشی</Typography>
                    </Box>
                  }
                  subheader={
                    <Box textAlign='center'>
                      <Typography variant='caption'>ارزیابی اثربخشی را تکمیل کنید</Typography>
                    </Box>
                  }
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                />
                <CardContent>LSJFLS</CardContent>
              </Card>

              <Card sx={{ flex: 1 }}>
                <CardHeader
                  title={
                    <Box textAlign='center'>
                      <Typography variant='h6'>گواهینامه</Typography>
                    </Box>
                  }
                  subheader={
                    <Box textAlign='center'>
                      <Typography variant='caption'>می توانید گواهینامه دوره را تکمیل کنید</Typography>
                    </Box>
                  }
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                />
                <CardContent>LSJFLS</CardContent>
              </Card>
            </>
          </Grid>
        </Grid>
      </>

      <>
        <Grid container spacing={5}>
          <Grid item xs={12} lg={7}>
            <Card sx={{ mt: 5 }}>
              <CardHeader
                title={
                  <Box textAlign='center'>
                    <Typography variant='h6'>ثبت نظر</Typography>
                  </Box>
                }
                subheader={
                  <Box textAlign='center'>
                    <Typography variant='caption'>می توانید جلسات آنلاین را مشاهده نمایید</Typography>
                  </Box>
                }
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              />
              <CardContent>LSJFLS</CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={5}>
            <Card sx={{ mt: 5 }}>
              <CardHeader
                title={
                  <Box textAlign='center'>
                    <Typography variant='h6'>ثبت رای</Typography>
                  </Box>
                }
                subheader={
                  <Box textAlign='center'>
                    <Typography variant='caption'>می توانید جلسات آنلاین را مشاهده نمایید</Typography>
                  </Box>
                }
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              />
              <CardContent>LSJFLS</CardContent>
            </Card>
          </Grid>
        </Grid>
      </>

      <Card sx={{ mt: 5 }}>
        <CardHeader
          title={
            <Box textAlign='center'>
              <Typography variant='h6'>نظرات</Typography>
            </Box>
          }
          subheader={
            <Box textAlign='center'>
              <Typography variant='caption'>می توانید جلسات آنلاین را مشاهده نمایید</Typography>
            </Box>
          }
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        />
        <CardContent>LSJFLS</CardContent>
      </Card>
    </>
  )
}
