'use client'

import { dateConverter } from '@/helpers/DateHelpers'
// import { useFetchInstitutionDocument } from '@/hooks/landing/useInstitutionLanding'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
  FormGroup,
  Checkbox,
  Skeleton,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  CardActions,
  CardHeader,
  CardMedia,
  TextField
} from '@mui/material'
import { DateCalendar, DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {
  useDeleteReserveMeetingConsultationUser,
  useDeleteWatingListMeetingConsultationUser,
  useFetchDocumentConsultationUser,
  useFetchInstitutionCalenderUser
} from '@/hooks/user/useCalenderMeeting'
import CreateReservationMeetingsConsultationModal from './ReserveMeetingsConsultationModal'
import CreateWatingListMeetingsConsultationModal from './WatingListMeetingsConsultationModal'
import { fetchPersonWatingListMeetingConsultationUser } from '@/libs/user/calendarMeeting'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import InfoIcon from '@mui/icons-material/Info'
import { getBadgeColors } from '@/configs/darkColor'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import DialogAlertDeleteReserverMeeting from './DialogAlertDeleteReserverMeeting'
import DialogAlertDeleteWatingMeeting from './DialogAlertDeleteWatingMeeting'
import { endOfYear, startOfYear } from 'date-fns-jalali'
import DescritpionModal from './DescriptionModal'

const cardStyle = (gradient: string) => ({
  minHeight: 100,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  p: 2,
  background: gradient,
  borderRadius: 3,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
  }
})

const CardContentSection = ({ title, text1, text2 }: any) => (
  <Box>
    <Box display='flex' alignItems='center' gap={1} mb={1}>
      <InfoIcon sx={{ color: '#333' }} />
      <Typography variant='h6'>{title}</Typography>
    </Box>

    <Typography variant='body2' color='text.secondary'>
      {text1}
    </Typography>
    <Typography variant='body2' color='text.secondary'>
      {text2}
    </Typography>
  </Box>
)

const CardButton = ({ onClick }: any) => (
  <Box display='flex' justifyContent='flex-end' mt={2}>
    <Button variant='outlined' size='small' onClick={onClick}>
      رزرو نوبت
    </Button>
  </Box>
)

const getBackground = (m: any, userAuthId: number, userId: number, HashUserWatingList: boolean) => {
  const status = m?.consultationStatus?.id

  // 1️⃣ رزرو جلسه
  if (status === 1 && !userId) {
    return 'linear-gradient(135deg, #FFF9C4, #FFFDE7)' // زرد خیلی روشن
  }

  // 2️⃣ حذف رزرو
  if (status === 2 && userId && userAuthId == userId) {
    return 'linear-gradient(135deg, #C8E6C9, #E8F5E9)'
  }

  // 3️⃣ ثبت در صف انتظار
  if (status === 2 && userAuthId !== userId && !HashUserWatingList) {
    return 'linear-gradient(135deg, #FFE082, #FFF3C4)' // زرد
  }

  // 4️⃣ حذف از صف انتظار
  if (status === 2 && userAuthId !== userId && HashUserWatingList) {
    return 'linear-gradient(135deg, #E1BEE7, #F3E5F5)' // بنفش ملایم
  }

  return 'linear-gradient(135deg, #E8F0FF, #F6FAFF)'
}

const getButtonBackground = (m: any, userAuthId: number, userId: number, HashUserWatingList: boolean) => {
  const status = m?.consultationStatus?.id

  // رزرو جلسه
  if (status === 1 && !userId) {
    return 'linear-gradient(135deg, #FDD835, #FBC02D)'
  }

  // حذف رزرو
  if (status === 2 && userId && userAuthId == userId) {
    return 'linear-gradient(135deg, #EF5350, #E53935)'
  }

  // ثبت در صف انتظار
  if (status === 2 && userAuthId !== userId && !HashUserWatingList) {
    return 'linear-gradient(135deg, #FFC107, #FFB300)'
  }

  // حذف از صف انتظار
  if (status === 2 && userAuthId !== userId && HashUserWatingList) {
    return 'linear-gradient(135deg, #AB47BC, #8E24AA)'
  }

  return 'linear-gradient(135deg, #90AFFF, #AEC6FF)'
}

const getButtonText = (m: any, userAuthId: number, userId: number, HashUserWatingList: boolean) => {
  const status = m?.consultationStatus?.id

  if (status === 1 && !userId) return 'ثبت رزرو'

  if (status === 2 && userId && userAuthId == userId) return 'حذف رزرو'

  if (status === 2 && userAuthId !== userId && !HashUserWatingList) return 'ثبت در صف انتظار'

  if (status === 2 && userAuthId !== userId && HashUserWatingList) return 'حذف از صف انتظار'

  return ''
}

export default function CalendarMeetingsCard({ id, institutionId, upsertData, show, data }: any) {
  const total = 5
  const filled = 3
  const today = new Date()
  const session: any = useSession()
  const userAuthId = session?.data?.user?.user?.username
  const [selectedDate, setSelectedDate] = useState<any>(null)
  const [selectedActivities, setSelectedActivities] = useState<any>([])
  const [openReserve, setOpenReserve] = useState(false)
  const [openWating, setOpenWating] = useState(false)
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const [selectedIds, setSelectedIds] = useState<any>([])
  const [params, setParams] = useState({})

  useEffect(() => {
    setParams({
      date: selectedDate ? dateConverter(selectedDate) : null,
      activity_field_area_ids: selectedActivities,
      advisor_ids: selectedIds,
      institution_id: institutionId
    })
  }, [selectedDate, selectedActivities, selectedIds])

  const toggleActivity = (id: any) => {
    setSelectedActivities((prev: any) => (prev.includes(id) ? prev.filter((x: any) => x !== id) : [...prev, id]))
  }

  const toggleSelect = (id: any) => {
    setSelectedIds((prev: any) => (prev.includes(id) ? prev.filter((x: any) => x !== id) : [...prev, id]))
  }

  const { data: calendar, isLoading }: any = useFetchInstitutionCalenderUser({
    id: id,
    params: params
  })

  const { data: document, isLoading: documentLoad }: any = useFetchDocumentConsultationUser({
    id: id,
    institutionId: institutionId,
    enabled: Boolean(openReserve) || Boolean(openWating)
  })

  const [datas, setDatas] = useState(null)
  const handleWaitingList = async (data: any) => {
    try {
      const res = await fetchPersonWatingListMeetingConsultationUser({ id, rowId: data?.id })
      setDatas(res)
    } catch (error) {
      throw error
    }
  }

  const [openModal, setOpenModal] = useState(false)

  const [deleteReserveDelete, setDeleteResrveDelete] = useState(false)
  const { mutateAsync: reserveDelete, isPending: isLoadingDeleteReserve }: any =
    useDeleteReserveMeetingConsultationUser()

  const [deleteWatingDelete, setDeleteWatingDelete] = useState(false)
  const { mutateAsync: watingDelete, isPending: isLoadingDeleteWating }: any =
    useDeleteWatingListMeetingConsultationUser()

  return (
    <>
      <CreateReservationMeetingsConsultationModal
        id={id}
        institutionId={institutionId}
        open={openReserve}
        onClose={() => setOpenReserve(false)}
        selectedRow={selectedRow}
        document={document}
        params={params}
      />
      <CreateWatingListMeetingsConsultationModal
        id={id}
        institutionId={institutionId}
        open={openWating}
        onClose={() => setOpenWating(false)}
        selectedRow={selectedRow}
        document={document}
        params={params}
        datas={datas}
      />
      <DialogAlertDeleteReserverMeeting
        title='حذف رزرو'
        description='آیا از حذف رزرو این جلسه خود اطمینان دارید؟'
        open={deleteReserveDelete}
        onClose={() => setDeleteResrveDelete(false)}
        deleteFun={reserveDelete}
        isLoading={isLoadingDeleteReserve}
        selectedRow={selectedRow}
        id={id}
        params={params}
      />
      <DialogAlertDeleteWatingMeeting
        title='حذف صف انتظار'
        description='می توانید صف انتظار جلسه خود را حذف کنید'
        open={deleteWatingDelete}
        onClose={() => setDeleteWatingDelete(false)}
        deleteFun={watingDelete}
        isLoading={isLoadingDeleteWating}
        selectedRow={selectedRow}
        id={id}
        params={params}
        datas={datas}
      />
      <DescritpionModal title='توجه' open={openModal} onClose={() => setOpenModal(false)} selectedRow={selectedRow} />

      <Card
        sx={{
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <Grid container spacing={5}>
          <Grid item xs={12} lg={3}>
            <CardMedia
              component='img'
              height='160'
              image={show?.banner?.address ?? '/images/images.jpg'}
              alt='institution'
              sx={{
                objectFit: 'cover'
              }}
            />
          </Grid>
          <Grid xs={12} lg={9}>
            <Box sx={{ p: 5, mt: 5 }}>
              <Typography variant='h6' component='div' sx={{ fontWeight: 900, fontSize: '1.25rem' }}>
                {show?.name}
              </Typography>

              <Box sx={{ mt: 3 }}>
                <Typography variant='caption' color='text.secondary'>
                  مدیریت : {`${show?.manager?.first_name} ${show?.manager?.last_name} (${show?.manager?.username})`}
                </Typography>
              </Box>

              {show?.activityFieldAreas?.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 }}>
                  <Typography variant='caption' color='text.secondary' sx={{ mt: 0.5 }}>
                    حوزه های فعالیت :
                  </Typography>

                  {show?.activityFieldAreas?.map((el: any, index: number) => {
                    const { bg, text } = getBadgeColors(index)

                    return (
                      <Box
                        key={el?.id || index}
                        sx={{
                          px: 1.5,
                          py: 1,
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          bgcolor: bg,
                          color: text,
                          whiteSpace: 'nowrap',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Typography variant='caption' sx={{ color: text }}>
                          {el?.name}
                        </Typography>
                      </Box>
                    )
                  })}
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>

        <CardContent sx={{ flexGrow: 1, pt: 5 }}>
          <Grid container spacing={5}>
            <Grid item xs={12} lg={9}>
              <>
                <Box sx={{ display: 'flex', justifyItems: 'stretch', gap: 20 }}>
                  <Typography variant='caption' color='text.secondary'>
                    استان : خراسان جنوبی
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    شهرستان : {show?.region?.name}
                  </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant='caption' color='text.secondary'>
                    نشانی : {show?.address}
                  </Typography>
                </Box>
              </>
            </Grid>
            <Grid item xs={12} lg={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                {Array.from({ length: total }).map((_, i) =>
                  i < filled ? (
                    <StarIcon key={i} sx={{ color: '#FFC107', fontSize: 20 }} />
                  ) : (
                    <StarBorderIcon key={i} sx={{ color: '#FFC107', fontSize: 20 }} />
                  )
                )}
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography>4.6 از 186 رای</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box>
        <Card
          sx={{
            mt: 6,
            p: 4,
            boxShadow: 4,
            textAlign: 'center'
          }}
        >
          <Typography variant='h5' fontWeight='bold' mb={2}>
            تقویم جلسات مشاوره مرکز
          </Typography>

          <Typography variant='body1'>
            در این بخش می توانید تقویم جلسات مرکز مشاوره را مشاهده کنید و جلسات مورد نظر خود را رزرو کنید
          </Typography>

          <CardContent>
            <Box
              sx={{
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                height: '100%',
                overflow: 'hidden'
              }}
            >
              <Grid container sx={{ height: '100%' }}>
                <Grid
                  item
                  xs={12}
                  sm={2.5}
                  sx={{
                    height: '100%',
                    borderRight: '1px solid #e0e0e0'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%'
                    }}
                  >
                    <Box sx={{ p: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                          mt: 2
                        }}
                      >
                        <Typography variant='h6' fontWeight='bold' mb={1}>
                          تقویم ماهانه
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          می توانید با انتخاب تاریخ مورد نظر جلسات را مشاهده کنید
                        </Typography>
                      </Box>

                      <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
                        <DateCalendar
                          value={selectedDate}
                          onChange={(newValue: any) => setSelectedDate(newValue)}
                          disablePast
                          minDate={startOfYear(today)}
                          maxDate={endOfYear(today)}
                          sx={{
                            width: 250,
                            '& .MuiPickersCalendarHeader-root': {
                              fontSize: '0.9rem'
                            },
                            '& .MuiPickersDay-root': {
                              width: 32,
                              height: 32,
                              fontSize: '0.8rem'
                            }
                          }}
                        />
                      </LocalizationProvider>
                    </Box>

                    <Divider />

                    <Box sx={{ p: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                          mt: 2,
                          mb: 2
                        }}
                      >
                        <Typography variant='h6' fontWeight='bold' mb={1}>
                          حوزه های فعالیت
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          می توانید با انتخاب حوزه فعالیت مورد نظر جلسات را مشاهده کنید
                        </Typography>
                      </Box>
                      <FormGroup>
                        {upsertData?.activityFieldAreas.map((item: any) => (
                          <FormControlLabel
                            key={item.id}
                            control={
                              <Checkbox
                                checked={selectedActivities.includes(item.id)}
                                onChange={() => toggleActivity(item.id)}
                              />
                            }
                            label={<Typography variant='body2'>{item?.name}</Typography>}
                          />
                        ))}
                      </FormGroup>
                    </Box>

                    <Divider />

                    <Box sx={{ p: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                          mt: 2,
                          mb: 5
                        }}
                      >
                        <Typography variant='h6' fontWeight='bold' mb={1}>
                          مشاوران
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          می توانید با انتخاب مشاوران مورد نظر جلسات را مشاهده کنید
                        </Typography>
                      </Box>
                      <Grid container spacing={2}>
                        {upsertData?.advisors.map((item: any) => {
                          const selected = selectedIds.includes(item.id)

                          return (
                            <Grid item xs={3} key={item.id}>
                              <Box
                                onClick={() => toggleSelect(item.id)}
                                sx={{
                                  cursor: 'pointer',
                                  textAlign: 'center',
                                  position: 'relative'
                                }}
                              >
                                {selected && (
                                  <Box
                                    sx={{
                                      position: 'absolute',
                                      top: 2,
                                      left: 2,
                                      bgcolor: 'primary.main',
                                      color: '#fff',
                                      borderRadius: '70%',
                                      width: 20,
                                      height: 20,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      zIndex: 2
                                    }}
                                  >
                                    ✓
                                  </Box>
                                )}

                                <Avatar
                                  src={item.avatar?.address}
                                  sx={{
                                    width: 40,
                                    height: 40,
                                    margin: '0 auto',
                                    border: selected ? '2px solid' : '2px solid transparent'
                                  }}
                                />
                                <Typography variant='caption' sx={{ mt: 0.5, display: 'block' }}>
                                  {`${item.first_name} ${item?.last_name}`}
                                </Typography>
                              </Box>
                            </Grid>
                          )
                        })}
                      </Grid>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={9.5} sx={{ height: '100%' }}>
                  <Box sx={{ p: 2, height: '100%' }}>
                    <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, height: '100%', overflowY: 'auto' }}>
                      {calendar?.shifts?.length === 0 ? (
                        <Card sx={{ height: '20rem' }}>
                          <CardContent>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyItems: 'center',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Typography variant='caption'>در این تاریخ هیچ شیفت فعالی وجود ندارد</Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      ) : isLoading ? (
                        <>
                          <Skeleton variant='rounded' height={70} sx={{ mb: 5 }} />
                          <Skeleton variant='rounded' height={500} />
                        </>
                      ) : (
                        calendar?.shifts?.map((el: any) => {
                          const start = Number(el.start_time.split(':')[0])
                          const end = Number(el.end_time.split(':')[0])
                          const totalHourHeight = 200
                          const subRowHeight = totalHourHeight / 4
                          const minutes = ['00', '15', '30', '45']

                          return (
                            <Box key={el.id} sx={{ mb: 5 }}>
                              <Box sx={{ position: 'relative', overflowX: 'auto', px: 2 }}>
                                <Box sx={{ position: 'relative', minWidth: Math.max(900, el.meetings.length * 250) }}>
                                  <Table
                                    sx={{
                                      mb: 5,
                                      minWidth: 900,
                                      borderCollapse: 'collapse',
                                      '& th, & td': { border: 'none' }
                                    }}
                                  >
                                    <TableBody>
                                      {(() => {
                                        const rows: JSX.Element[] = []
                                        const tableStartMinutes = Number(el.start_time.split(':')[0]) * 60

                                        for (let h = start; h <= end; h++) {
                                          const hourStr = String(h).padStart(2, '0')
                                          minutes.forEach((min, idx) => {
                                            if (h === end && min !== '00') return
                                            const timeLabel = `${hourStr}:${min}`
                                            rows.push(
                                              <TableRow
                                                key={`${el.id}-${timeLabel}`}
                                                sx={{ height: `${subRowHeight}px` }}
                                              >
                                                <TableCell
                                                  sx={{
                                                    width: 120,
                                                    fontWeight: idx === 0 ? 600 : 400,
                                                    fontSize: idx === 0 ? 14 : 12,
                                                    textAlign: 'center',
                                                    whiteSpace: 'nowrap'
                                                  }}
                                                >
                                                  {timeLabel}
                                                </TableCell>
                                                <TableCell sx={{ padding: 0, position: 'relative' }}>
                                                  <Box
                                                    sx={{
                                                      borderBottom: '1px dashed #d0d0d0',
                                                      width: '100%',
                                                      height: '100%'
                                                    }}
                                                  />
                                                </TableCell>
                                              </TableRow>
                                            )
                                          })
                                        }

                                        return rows
                                      })()}
                                    </TableBody>
                                  </Table>

                                  {el.meetings?.map((m: any, index: number) => {
                                    const toMinutes = (t: string) =>
                                      t
                                        .split(':')
                                        .map(Number)
                                        .reduce((h, m) => h * 60 + m)
                                    const startMin = toMinutes(m.start_time)
                                    const endMin = toMinutes(m.end_time)
                                    const durationMin = endMin - startMin
                                    const topPx =
                                      ((startMin - Number(el.start_time.split(':')[0]) * 60) / 15) * subRowHeight
                                    const heightPx = (durationMin / 60) * totalHourHeight
                                    const userId = m?.consultationDocument?.username
                                    const HashUserWatingList = m?.meetingWaitingLists.some(
                                      (user: any) => user?.consultationDocument?.username == userAuthId
                                    )
                                    return (
                                      <Box
                                        key={m.id}
                                        sx={{
                                          position: 'absolute',
                                          left: 150 + index * (200 + 12),
                                          top: `${topPx}px`,
                                          height: `${heightPx}px`,
                                          width: '200px',
                                          overflow: 'hidden',
                                          zIndex: 1,
                                          mt: 7
                                        }}
                                      >
                                        <Card
                                          sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            overflow: 'hidden',
                                            borderRadius: '16px',
                                            background: getBackground(m, userAuthId, userId, HashUserWatingList),
                                            boxShadow: '0 12px 30px rgba(0,0,0,0.08)'
                                          }}
                                        >
                                          {/* Header */}
                                          <CardHeader
                                            sx={{ p: 2 }}
                                            title={
                                              <Box display='flex' justifyContent='space-between' alignItems='center'>
                                                <Typography
                                                  sx={{ fontWeight: 600, fontSize: '11px', color: '#2f2f2f' }}
                                                >
                                                  {calendar?.selected_date}
                                                </Typography>

                                                <Chip
                                                  label={`${m?.start_time} تا ${m?.end_time}`}
                                                  sx={{
                                                    fontSize: '10px',
                                                    height: '20px',
                                                    bgcolor: '#EEF2FF',
                                                    color: '#4F46E5',
                                                    borderRadius: '6px',
                                                    fontWeight: 600
                                                  }}
                                                />
                                              </Box>
                                            }
                                          />

                                          <Divider sx={{ borderColor: 'rgba(0,0,0,0.08)' }} />

                                          {/* Content */}
                                          <CardContent sx={{ flexGrow: 1, p: 1.2 }}>
                                            <Box display='flex' alignItems='center' gap={1} mt={0.5}>
                                              <Avatar
                                                alt='advisor avatar'
                                                src={m?.advisor?.logo?.address}
                                                sx={{ width: 28, height: 28 }}
                                              />

                                              <Typography sx={{ fontSize: '12px', fontWeight: 700 }}>
                                                {`${m?.advisor?.first_name} ${m?.advisor?.last_name}`}
                                              </Typography>
                                            </Box>

                                            {m?.activityFieldAreas?.length > 0 && (
                                              <>
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                  <Typography variant='caption' color='text.secondary' sx={{ mt: 0.5 }}>
                                                    حوزه فعالیت:
                                                  </Typography>
                                                  {m?.activityFieldAreas?.map((el: any, index: number) => {
                                                    const { bg, text } = getBadgeColors(index)

                                                    return (
                                                      <Box
                                                        key={el?.id || index}
                                                        sx={{
                                                          px: 1,
                                                          py: 0.5,
                                                          borderRadius: '12px',
                                                          fontSize: '0.25rem',
                                                          bgcolor: bg,
                                                          color: text,
                                                          whiteSpace: 'nowrap',
                                                          display: 'flex',
                                                          alignItems: 'center'
                                                        }}
                                                      >
                                                        <Typography
                                                          variant='caption'
                                                          sx={{ color: text, fontSize: '0.7rem' }}
                                                        >
                                                          {el?.name}
                                                        </Typography>
                                                      </Box>
                                                    )
                                                  })}
                                                </Box>
                                              </>
                                            )}

                                            {m?.consultationStatus?.id == 2 && userId && userAuthId == userId && (
                                              <Box
                                                sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}
                                                onClick={() => setOpenModal(true)}
                                              >
                                                <Typography
                                                  variant='caption'
                                                  sx={{
                                                    color: 'red',
                                                    fontWeight: 'bold',
                                                    animation: 'blink 1s infinite',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                      opacity: 0.7
                                                    }
                                                  }}
                                                >
                                                  در انتظار پرداخت
                                                </Typography>

                                                <style>
                                                  {`
                                                 @keyframes blink {
                                                 0% { opacity: 1; }
                                                 50% { opacity: 0; }
                                                 100% { opacity: 1; }
                                                   }
                                                  `}
                                                </style>
                                              </Box>
                                            )}
                                          </CardContent>

                                          {/* Actions */}
                                          <CardActions sx={{ p: 0 }}>
                                            <Button
                                              fullWidth
                                              variant='contained'
                                              onClick={() => {
                                                handleWaitingList(m)

                                                if (m?.consultationStatus?.id == 1 && !userId) {
                                                  setOpenReserve(true)
                                                  setSelectedRow(m)
                                                } else if (
                                                  m?.consultationStatus?.id == 2 &&
                                                  userId &&
                                                  userAuthId == userId
                                                ) {
                                                  setDeleteResrveDelete(true)
                                                  setSelectedRow(m)
                                                } else if (
                                                  m?.consultationStatus?.id == 2 &&
                                                  userAuthId !== userId &&
                                                  !HashUserWatingList
                                                ) {
                                                  setOpenWating(true)
                                                  setSelectedRow(m)
                                                } else if (
                                                  m?.consultationStatus?.id == 2 &&
                                                  userAuthId !== userId &&
                                                  HashUserWatingList
                                                ) {
                                                  setDeleteWatingDelete(true)
                                                  setSelectedRow(m)
                                                }
                                              }}
                                              sx={{
                                                borderRadius: 0,
                                                py: 1.4,
                                                fontSize: '12px',
                                                fontWeight: 700,
                                                background: getButtonBackground(
                                                  m,
                                                  userAuthId,
                                                  userId,
                                                  HashUserWatingList
                                                )
                                              }}
                                            >
                                              {getButtonText(m, userAuthId, userId, HashUserWatingList)}
                                            </Button>
                                          </CardActions>
                                        </Card>
                                      </Box>
                                    )
                                  })}
                                </Box>
                              </Box>
                            </Box>
                          )
                        })
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}
