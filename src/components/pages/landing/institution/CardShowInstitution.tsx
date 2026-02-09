'use client'

import { dateConverter } from '@/helpers/DateHelpers'
import { useFetchInstitutionCalender, useFetchInstitutionDocument } from '@/hooks/landing/useInstitutionLanding'
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
  CardHeader
} from '@mui/material'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali'
import { useState } from 'react'
import CreateReservationMeetingInstitution from './ModalReserveMeeting'
import CreateWatingListMeetingInstitution from './ModalWatingListMeeting'
import { fetchWatingListInstitution } from '@/libs/landing/institutionLanding'

const services = [
  {
    id: 1,
    title: 'مشاوره',
    description: 'ارائه راهنمایی تخصصی برای حل مسائل فردی، خانوادگی و روان‌شناختی.'
  },
  {
    id: 2,
    title: 'غربالگری',
    description: 'ارزیابی اولیه جهت شناسایی زودهنگام مشکلات و نیازهای روانی.'
  },
  {
    id: 3,
    title: 'مهارت‌های زندگی',
    description: 'آموزش مهارت‌هایی مانند مدیریت استرس، ارتباط مؤثر و تصمیم‌گیری.'
  },
  {
    id: 4,
    title: 'آموزش',
    description: 'برگزاری دوره‌ها و کارگاه‌های آموزشی در حوزه سلامت روان و رشد فردی.'
  }
]

const StatusColors: any = {
  '1': '#E7E7E7',
  '2': '#f5e9a8ff',
  '3': '#9af1a8ff'
}

export default function ShowInstitutionCard({ id, show, data, advisor, activity }: any) {
  console.log(data, advisor, activity, 'data')
  const [selectedService, setSelectedService] = useState<any>(services[0]?.id)
  const [selectedDate, setSelectedDate] = useState<any>(null)
  const [selectedActivities, setSelectedActivities] = useState<any>([])
  const [openReserve, setOpenReserve] = useState(false)
  const [openWating, setOpenWating] = useState(false)
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const [selectedIds, setSelectedIds] = useState<any>([])

  const toggleActivity = (id: any) => {
    setSelectedActivities((prev: any) => (prev.includes(id) ? prev.filter((x: any) => x !== id) : [...prev, id]))
  }

  const toggleSelect = (id: any) => {
    setSelectedIds((prev: any) => (prev.includes(id) ? prev.filter((x: any) => x !== id) : [...prev, id]))
  }

  const { data: calendar, isLoading }: any = useFetchInstitutionCalender({
    id: id,
    params: {
      date: selectedDate ? dateConverter(selectedDate) : null,
      activity_field_area_ids: selectedActivities,
      advisor_ids: selectedIds
    }
  })

  console.log(calendar, 'calendar')

  const { data: document, isLoading: documentLoad }: any = useFetchInstitutionDocument({
    id: id,
    enabled: Boolean(openReserve) || Boolean(openWating)
  })
  const [datas, setDatas] = useState(null)
  const handleWaitingList = async (data: any) => {
    try {
      const res = await fetchWatingListInstitution({ id, rowId: data?.id })
      setDatas(res)
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <CreateReservationMeetingInstitution
        id={id}
        open={openReserve}
        onClose={() => setOpenReserve(false)}
        selectedRow={selectedRow}
        document={document}
      />
      <CreateWatingListMeetingInstitution
        id={id}
        open={openWating}
        onClose={() => setOpenWating(false)}
        selectedRow={selectedRow}
        document={document}
        datas={datas}
      />
      <Box bgcolor='#ecf2ff' borderRadius={0} textAlign='center' py='90px' position='relative' sx={{ mb: 10 }}>
        <Box
          bgcolor='#faf6f6'
          borderRadius='50px'
          boxShadow='0 20px 60px rgba(0,0,0,0.12)'
          sx={{
            minHeight: '100px',
            width: '80%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 0,
            mx: 'auto',
            position: 'relative'
          }}
        >
          <img
            src={show?.banner?.address}
            alt='Banner'
            style={{
              width: '100%',
              height: '10rem',
              borderRadius: '50px',
              objectFit: 'cover'
            }}
          />
        </Box>
      </Box>

      <Box>
        <Container maxWidth='lg'>
          <Box display='flex' alignItems='center' gap={2}>
            <Avatar alt='avatar institution' src={show?.logo?.address} sx={{ width: 64, height: 64 }} />
            <Box>
              <Typography variant='h5' component='div'>
                {show?.name}
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                مدیر مرکز : {`${show?.manager?.first_name} ${show?.manager?.last_name}`}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 4,
              mt: 10
            }}
          >
            {services.map((service: any) => (
              <Card
                key={service.id}
                onClick={() => setSelectedService(service?.id)}
                sx={{
                  cursor: 'pointer',
                  p: 3,
                  borderRadius: 4,
                  transition: '0.3s',
                  border: selectedService === service.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
                  boxShadow: selectedService === service.id ? 6 : 1,
                  '&:hover': {
                    boxShadow: 4
                  }
                }}
              >
                <Typography variant='h6' fontWeight='bold' mb={1}>
                  {service.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {service.description}
                </Typography>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {selectedService && (
        <Box paddingX={15}>
          <Card
            sx={{
              mt: 6,
              p: 4,
              boxShadow: 4
            }}
          >
            <Typography variant='h5' fontWeight='bold' mb={2}>
              {selectedService.title}
            </Typography>

            <Typography variant='body1'>
              این بخش مربوط به {selectedService.title} است و می‌توانید اطلاعات تکمیلی، فرم ثبت‌نام یا توضیحات بیشتر را
              اینجا قرار دهید.
            </Typography>

            {selectedService === 1 && (
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
                            {show?.activityFieldAreas.map((item: any) => (
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
                            {show?.advisors.map((item: any) => {
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
                        <Box
                          sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, height: '100%', overflowY: 'auto' }}
                        >
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
                                    <Box
                                      sx={{ position: 'relative', minWidth: Math.max(900, el.meetings.length * 250) }}
                                    >
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
                                                background: 'linear-gradient(135deg, #E8F0FF, #F6FAFF)',
                                                boxShadow: '0 12px 30px rgba(0,0,0,0.08)'
                                              }}
                                            >
                                              {/* Header */}
                                              <CardHeader
                                                sx={{ p: 2 }}
                                                title={
                                                  <Box
                                                    display='flex'
                                                    justifyContent='space-between'
                                                    alignItems='center'
                                                  >
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

                                                <Box sx={{ pt: 1, px: 0.5 }}>
                                                  <Typography
                                                    sx={{ fontSize: '10px', color: 'text.secondary', lineHeight: 1.6 }}
                                                  >
                                                    حیطه‌های فعالیت:{' '}
                                                    {m?.activityFieldAreas?.map((el: any) => el.name).join(' • ')}
                                                  </Typography>
                                                </Box>
                                              </CardContent>

                                              {/* Actions */}
                                              <CardActions sx={{ p: 0 }}>
                                                <Button
                                                  fullWidth
                                                  variant='contained'
                                                  sx={{
                                                    borderRadius: 0,
                                                    py: 1.4,
                                                    fontSize: '12px',
                                                    fontWeight: 700,
                                                    background: '#7367F0',
                                                    boxShadow: '0 6px 18px rgba(115,103,240,0.4)',
                                                    '&:hover': {
                                                      background: '#5F57D8'
                                                    }
                                                  }}
                                                >
                                                  رزرو نوبت
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
            )}
          </Card>
        </Box>
      )}
    </>
  )
}
