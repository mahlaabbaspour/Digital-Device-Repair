'use client'

import CustomDatePicker from '@/components/elements/customDatePicker'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  styled,
  Tab,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Divider,
  IconButton,
  Skeleton,
  Tooltip,
  Chip
} from '@mui/material'
import { SyntheticEvent, useEffect, useState } from 'react'
import { BiCreditCard, BiListUl, BiSolidInfoSquare, BiXCircle } from 'react-icons/bi'
import { BiCalendarCheck } from 'react-icons/bi'
import ModalSingleMeeting from './SingleMeetingModal'
import {
  useCancelMeeting,
  useDeleteSingleMeeting,
  useFetchCalender
} from '@/hooks/institution/advisoryMeeting/useCalender'
import { parse } from 'date-fns-jalali'
import ModalGroupMeeting from './GroupMeetingModal'
import { BiEdit, BiTrash } from 'react-icons/bi'
import ModalSingleUpdateMeeting from './SingleMeetingUpdateModal'
import DialogAlert from '@/components/elements/DialogAlert'
import { dateConverter } from '@/helpers/DateHelpers'
import CreateReservationMeetingSingle from './SingleMeetingReservationModal'
import ModalPaymentMeeting from './MeetingPaymentModal'
import CreateReservationMeetingGroup from './GroupMeetingReservationModal'
import CreateWatingListMeeting from './WatinigListMeetingModal'
import Link from 'next/link'

const StatusColors: any = {
  '1': '#E7E7E7',
  '2': '#f5e9a8ff',
  '3': '#9af1a8ff'
}

const StyledButton = styled(Button)(({ theme }) => ({
  transition: 'background-color 0.3s ease, transform 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(93, 135, 255, 0.1)',
    transform: 'translateY(-2px)'
  },
  '&.active': {
    backgroundColor: 'rgba(93, 135, 255, 0.15)',
    '& .MuiTypography-root': {
      color: theme.palette.primary.main
    }
  }
}))

export default function CalendarCard({ id, show, upsertData, tomorrowDate, yesterdayDate, todayDate }: any) {
  const [datas, setDatas] = useState<any>()
  console.log(datas, 'datas')
  const shifts = datas ? datas : show

  const formateNowDate = todayDate ? parse(todayDate, 'yyyy/MM/dd', new Date()) : null
  const formateExtDate = tomorrowDate ? parse(tomorrowDate, 'yyyy/MM/dd', new Date()) : null
  const formatePrevDate = yesterdayDate ? parse(yesterdayDate, 'yyyy/MM/dd', new Date()) : null
  const [valueDate, setValueDate] = useState<any>(formateNowDate ?? null)
  const handleChangeDate = (newDate: Date | null) => {
    if (newDate) {
      setValueDate(newDate)
    }
  }

  const date = dateConverter(valueDate)
  const { data, isLoading } = useFetchCalender({
    id,
    date: date,
    enabled: !!date
  })

  useEffect(() => {
    setDatas(data ?? [])
  }, [data])

  const [activeButton, setActiveButton] = useState('day')
  const [value, setTabValue] = useState<string>('tab_1')
  const handleTabsChange = (event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue)
  }

  const [modalOpen, setModalOpen] = useState(false)
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false)
  const [modalReservationOpen, setModalReservationOpen] = useState(false)
  const [modalReservationGroupOpen, setModalReservationGroupOpen] = useState(false)
  const [modalWaitingListOpen, setModalWatingListOpen] = useState(false)
  const [modalPaymentOpen, setModalPaymentOpen] = useState(false)
  const [cancelOpen, setCancelOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [modalGroupOpen, setModalGroupOpen] = useState(false)
  const openEditModal = () => {
    setModalOpen(true)
  }

  const handleQuickDate = (type: 'yesterday' | 'day' | 'tomorrow') => {
    if (type === 'day') {
      setActiveButton('day')
      setValueDate(formateNowDate)
    } else if (type === 'yesterday') {
      setActiveButton('yesterday')
      setValueDate(formatePrevDate)
    } else if (type === 'tomorrow') {
      setActiveButton('tomorrow')
      setValueDate(formateExtDate)
    }
  }

  const { mutateAsync: deleteFun, isPending }: any = useDeleteSingleMeeting()
  const { mutateAsync: cancelFun, isPendingCancel }: any = useCancelMeeting()

  return (
    <>
      <DialogAlert
        id={id}
        title='حذف جلسه تکی'
        description='می توانید جلسه تکی مورد نظر را حذف کنید'
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        deleteFun={deleteFun}
        isLoading={isPending}
        selectedRow={selectedRow}
      />
      <DialogAlert
        id={id}
        title='کنسل کردن جلسه'
        description='می توانید جلسه مورد نظر را کنسل کنید'
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        deleteFun={cancelFun}
        isLoading={isPendingCancel}
        selectedRow={selectedRow}
        date={date}
      />
      <ModalPaymentMeeting
        id={id}
        title='پرداخت / تخصیص یاری برگ'
        description='می توانید جلسه مورد نظر را پرداخت کنید و یارانه مورد نظر را می توانید تخصیص دهید و جلسه مورد نظر را قطعی کنید'
        open={modalPaymentOpen}
        onClose={() => setModalPaymentOpen(false)}
        selectedRow={selectedRow}
        date={date}
      />
      <CreateReservationMeetingGroup
        id={id}
        title='درخواست نوبت گروهی'
        description='می توانید درخواست نوبت به صورت  گروهی را ایجاد کنید'
        open={modalReservationGroupOpen}
        onClose={() => setModalReservationGroupOpen(false)}
        upsertData={upsertData}
        date={date}
      />
      <CreateWatingListMeeting
        id={id}
        title='درخواست نوبت در صف انتظار'
        description='می توانید نوبت خود را در صف انتظار ایجاد کنید'
        open={modalWaitingListOpen}
        onClose={() => setModalWatingListOpen(false)}
        date={date}
        selectedRow={selectedRow}
      />
      <CreateReservationMeetingSingle
        id={id}
        title='درخواست نوبت'
        description='می توانید درخواست نوبت به صورت تکی را ایجاد کنید'
        open={modalReservationOpen}
        onClose={() => setModalReservationOpen(false)}
        selectedRow={selectedRow}
        date={date}
      />
      <ModalSingleMeeting
        id={id}
        title='ایجاد جلسه'
        description='می توانید جلسه را به صورت تکی ایجاد کنید'
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <ModalSingleUpdateMeeting
        id={id}
        title='ویرایش جلسه'
        description='می توانید اطلاعات جلسه را ویرایش کنید'
        open={modalUpdateOpen}
        onClose={() => setModalUpdateOpen(false)}
        selectedRow={selectedRow}
      />
      <ModalGroupMeeting
        title='ایجاد جلسه گروهی'
        description='می توانید جلسات را به صورت گروهی انتخاب کنید'
        open={modalGroupOpen}
        onClose={() => setModalGroupOpen(false)}
        id={id}
      />
      <Button onClick={() => openEditModal()} sx={{ mt: 5, mb: 2 }} variant='contained'>
        ایجاد جلسه
      </Button>
      <Button sx={{ mt: 5, ml: 3, mb: 2 }} onClick={() => setModalGroupOpen(true)} variant='contained'>
        ایجاد جلسه گروهی
      </Button>

      <Button
        sx={{ mt: 5, ml: 3, mb: 2 }}
        color='warning'
        onClick={() => setModalReservationGroupOpen(true)}
        variant='contained'
      >
        رزرو گروهی
      </Button>
      <Card sx={{ mb: 7 }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
                width: '30rem'
              }}
            >
              <CustomDatePicker value={valueDate} onChange={handleChangeDate} label='تاریخ' readOnly={false} />
              <Typography variant='h6' fontWeight='bold' color='text.primary'>
                {datas?.day?.name ?? show?.day?.name}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2
              }}
            >
              <StyledButton
                color='inherit'
                onClick={() => handleQuickDate('yesterday')}
                className={activeButton === 'yesterday' ? 'active' : ''}
                variant='text'
              >
                <Typography variant='body1' color='black'>
                  دیروز
                </Typography>
              </StyledButton>

              <StyledButton
                color='inherit'
                onClick={() => handleQuickDate('day')}
                className={activeButton === 'day' ? 'active' : ''}
                variant='text'
              >
                <Typography variant='body1' color='black'>
                  امروز
                </Typography>
              </StyledButton>

              <StyledButton
                color='inherit'
                onClick={() => handleQuickDate('tomorrow')}
                className={activeButton === 'tomorrow' ? 'active' : ''}
                variant='text'
              >
                <Typography variant='body1' color='black'>
                  فردا
                </Typography>
              </StyledButton>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {shifts?.shifts?.length === 0 ? (
        <Card sx={{ height: '20rem' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyItems: 'center', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant='caption'>در این تاریخ هیچ شیفت فعالی وجود ندارد</Typography>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <TabContext value={value}>
          {isLoading ? (
            <>
              <Skeleton variant='rounded' height={70} sx={{ mb: 5 }} />
              <Skeleton variant='rounded' height={500} />
            </>
          ) : (
            <>
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
                      {shifts?.shifts?.map((el: any, tabIndex: number) => (
                        <Tab
                          key={el?.id}
                          icon={<BiSolidInfoSquare size={20} />}
                          value={`tab_${tabIndex + 1}`}
                          label={`${el?.title}(${el?.start_time.slice(0, 5)} - ${el?.end_time.slice(0, 5)})`}
                          sx={{
                            fontFamily: 'inherit',
                            width: '100%'
                          }}
                        />
                      ))}
                    </TabList>
                  </Card>
                </Grid>
              </Grid>

              {shifts?.shifts?.map((el: any, tabIndex: number) => {
                const tabKey = el?.id ? `tab-${String(el.id)}` : `tab-index-${tabIndex}-${String(el?.title ?? '')}`

                return (
                  <div key={tabKey}>
                    <TabPanel sx={{ padding: 0 }} value={`tab_${tabIndex + 1}`}>
                      <Grid container spacing={5}>
                        <Grid item xs={12}>
                          <Card>
                            <CardHeader
                              title={
                                <Typography variant='h6' sx={{ fontWeight: 900, ml: 15 }}>
                                  {el?.title}
                                </Typography>
                              }
                              subheader={
                                <Typography
                                  sx={{ ml: 15 }}
                                  variant='caption'
                                >{`می توانید اطلاعات ${el?.title} را مشاهده کنید`}</Typography>
                              }
                            />

                            <Box sx={{ position: 'relative', overflowX: 'auto', px: 10, pt: 0 }}>
                              <Box
                                sx={{
                                  position: 'relative',
                                  minWidth: Math.max(900, el.meetings.length * 250)
                                }}
                              >
                                <Table
                                  sx={{
                                    mb: 30,
                                    minWidth: 900,
                                    borderRadius: 2,
                                    borderCollapse: 'collapse',
                                    position: 'relative',
                                    '& th, & td': { border: 'none' },
                                    pt: 0
                                  }}
                                >
                                  <TableBody>
                                    {(() => {
                                      const start = Number(el.start_time.split(':')[0])
                                      const end = Number(el.end_time.split(':')[0])
                                      const totalHourHeight = 200
                                      const subRowHeight = totalHourHeight / 4
                                      const minutes = ['00', '15', '30', '45']
                                      const rows: JSX.Element[] = []
                                      const rowHeights: number[] = []

                                      for (let h = start; h <= end; h++) {
                                        const hourStr = String(h).padStart(2, '0')
                                        minutes.forEach((min, idx) => {
                                          if (h === end && min !== '00') return
                                          const timeLabel = `${hourStr}:${min}`
                                          rowHeights.push(subRowHeight)
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
                                  const totalHourHeight = 200
                                  const subRowHeight = totalHourHeight / 4
                                  const tableStartMinutes = Number(el.start_time.split(':')[0]) * 60
                                  const topPx = ((startMin - tableStartMinutes) / 15) * subRowHeight
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
                                        backgroundColor: StatusColors[m?.consultationStatus?.id],
                                        color: '#fff',
                                        borderRadius: '16px',
                                        padding: 2,
                                        boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        overflow: 'visible', // مهم: باید visible باشه
                                        mt: 7,
                                        zIndex: 1
                                      }}
                                    >
                                      {m?.supervisor_status === '1' && (
                                        <Tooltip title={m?.supervisor_description} arrow>
                                          <Box
                                            sx={{
                                              position: 'absolute',
                                              top: -6,
                                              left: -7,
                                              width: 20,
                                              height: 20,
                                              bgcolor: '#4caf50',
                                              borderRadius: '50%',
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                                              zIndex: 10
                                            }}
                                          >
                                            <svg
                                              xmlns='http://www.w3.org/2000/svg'
                                              width='12'
                                              height='12'
                                              viewBox='0 0 24 24'
                                              fill='none'
                                              stroke='white'
                                              strokeWidth='3'
                                              strokeLinecap='round'
                                              strokeLinejoin='round'
                                            >
                                              <path d='M20 6L9 17l-5-5' />
                                            </svg>
                                          </Box>
                                        </Tooltip>
                                      )}

                                      <Box
                                        sx={{
                                          display: 'flex',
                                          flexDirection: 'column',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          gap: 1.2,
                                          mt: 1,
                                          textAlign: 'center'
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            px: 1
                                          }}
                                        >
                                          <Typography sx={{ fontWeight: 700, fontSize: '13px' }}>
                                            {`${m?.advisor?.first_name} ${m?.advisor?.last_name}`}
                                          </Typography>

                                          <Chip
                                            label={`${m?.start_time} تا ${m?.end_time}`}
                                            sx={{
                                              fontSize: '11px',
                                              height: '22px',
                                              bgcolor: '#E7EDFF',
                                              color: '#675CD8',
                                              borderRadius: '6px',
                                              fontWeight: 600
                                            }}
                                          />
                                        </Box>
                                        <Typography
                                          sx={{
                                            fontSize: '12px',
                                            opacity: 0.9,
                                            maxWidth: '140px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                          }}
                                        >
                                          {m?.activityFieldAreas
                                            ?.map((el: any) => el?.name)
                                            .join(' - ')
                                            .slice(0, 30)}
                                        </Typography>
                                      </Box>

                                      {m?.consultationDocument && (
                                        <>
                                          <Divider sx={{ my: 1, borderColor: 'rgba(82, 82, 82, 0.4)' }} />
                                          <Box
                                            sx={{
                                              display: 'flex',
                                              flexDirection: 'column',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              gap: 1
                                            }}
                                          >
                                            <Typography
                                              sx={{
                                                fontWeight: 700,
                                                fontSize: '13px',
                                                cursor: 'pointer',
                                                '&:hover': { color: '#629debff' }
                                              }}
                                            >
                                              {/* /institution/4/consultationDocuments/documentList/24/diagnosisAndMeeting */}
                                              <Link
                                                href={`/institution/${id}/consultationDocuments/documentList/${m?.consultationDocument?.id}/diagnosisAndMeeting`}
                                                passHref
                                              >
                                                {`${m?.consultationDocument?.first_name} ${m?.consultationDocument?.last_name}`}
                                              </Link>
                                            </Typography>

                                            <Box
                                              sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                width: '100%',
                                                px: 1,
                                                opacity: 0.9
                                              }}
                                            >
                                              <Typography sx={{ fontSize: '12px' }}>
                                                {m?.consultationDocument?.mobile}
                                              </Typography>
                                              <Chip
                                                label={`${m?.payment_status === '0' ? 'پرداخت نشده' : 'پرداخت شده'}`}
                                                size='small'
                                                sx={{
                                                  fontSize: '11px',
                                                  height: '22px',
                                                  bgcolor: `${m?.payment_status === '0' ? '#eca5a5ff' : 'rgba(122, 238, 174, 1)'}`,
                                                  color: `${m?.payment_status === '0' ? '#f03131ff' : '#009242ff'}`,
                                                  borderRadius: '6px',
                                                  fontWeight: 600
                                                }}
                                              />
                                            </Box>
                                          </Box>
                                        </>
                                      )}
                                      <Divider sx={{ my: 1, borderColor: 'rgba(83, 82, 82, 0.4)' }} />

                                      <Box
                                        sx={{
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          alignItems: 'center',
                                          px: 1,
                                          pb: 1,
                                          gap: 0.5
                                        }}
                                      >
                                        <Tooltip title='حذف' arrow>
                                          <IconButton
                                            onClick={() => {
                                              setDeleteOpen(true)
                                              setSelectedRow(m)
                                            }}
                                            sx={{
                                              padding: '4px',
                                              fontSize: '16px',
                                              transition: '.2s',
                                              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                                            }}
                                          >
                                            <BiTrash color='#f75353ff' size={18} />
                                          </IconButton>
                                        </Tooltip>

                                        <Tooltip title='ویرایش' arrow>
                                          <IconButton
                                            onClick={() => {
                                              setModalUpdateOpen(true)
                                              setSelectedRow(m)
                                            }}
                                            sx={{
                                              padding: '4px',
                                              fontSize: '16px',
                                              transition: '.2s',
                                              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                                            }}
                                          >
                                            <BiEdit color='#2284d4ff' size={18} />
                                          </IconButton>
                                        </Tooltip>

                                        <Tooltip title='رزرو' arrow>
                                          <IconButton
                                            onClick={() => {
                                              setModalReservationOpen(true)
                                              setSelectedRow(m)
                                            }}
                                            sx={{
                                              padding: '4px',
                                              fontSize: '16px',
                                              transition: '.2s',
                                              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                                            }}
                                          >
                                            <BiCalendarCheck color='#dac139ff' size={18} />
                                          </IconButton>
                                        </Tooltip>

                                        <Tooltip title='پرداخت' arrow>
                                          <IconButton
                                            onClick={() => {
                                              setModalPaymentOpen(true)
                                              setSelectedRow(m)
                                            }}
                                            sx={{
                                              padding: '4px',
                                              fontSize: '16px',
                                              transition: '.2s',
                                              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                                            }}
                                          >
                                            <BiCreditCard color='#009242ff' size={18} />
                                          </IconButton>
                                        </Tooltip>

                                        <Tooltip title='کنسل کردن' arrow>
                                          <IconButton
                                            onClick={() => {
                                              setCancelOpen(true)
                                              setSelectedRow(m)
                                            }}
                                            sx={{
                                              padding: '4px',
                                              fontSize: '16px',
                                              transition: '.2s',
                                              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                                            }}
                                          >
                                            <BiXCircle color='#f07d20ff' size={18} />
                                          </IconButton>
                                        </Tooltip>

                                        <Tooltip title='صف انتظار'>
                                          <IconButton
                                            onClick={() => {
                                              setModalWatingListOpen(true)
                                              setSelectedRow(m)
                                            }}
                                            sx={{
                                              padding: '4px',
                                              fontSize: '16px',
                                              transition: '.2s',
                                              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                                            }}
                                          >
                                            <BiListUl color='#eb37c4ff' size={18} />
                                          </IconButton>
                                        </Tooltip>
                                      </Box>
                                    </Box>
                                  )
                                })}
                              </Box>
                            </Box>
                          </Card>
                        </Grid>
                        <Grid item xs={12} sx={{ mb: 10 }}></Grid>
                      </Grid>
                    </TabPanel>
                  </div>
                )
              })}
            </>
          )}
        </TabContext>
      )}
    </>
  )
}
