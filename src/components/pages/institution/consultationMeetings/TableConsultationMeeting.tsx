'use client'

import { useState } from 'react'
import {
  Box,
  Typography,
  Divider,
  Button,
  Grid,
  Autocomplete,
  TextField,
  CardContent,
  IconButton,
  Tooltip,
  Card
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { dateConverter } from '@/helpers/DateHelpers'
import CustomDatePicker from '@/components/elements/customDatePicker'
import CustomTable from '@/components/elements/customTable/CustomTable'
import CustomChip from '@/@core/components/mui/chip/index'
import { BiCalendarCheck, BiCreditCard, BiEdit, BiListUl, BiShowAlt, BiTrash, BiXCircle } from 'react-icons/bi'
import {
  useCancelMeetingConsultation,
  useDeleteSingleMeetingConsultation,
  useFetchMeetingConsultation
} from '@/hooks/institution/advisoryMeeting/useMeetingConsultation'
import ModalSingleMeeting from '../meetingConsultation/SingleMeetingModalConsultation'
import ModalGroupMeeting from '../meetingConsultation/GroupMeetingModalConsultation'
import CreateReservationMeetingSingle from '../meetingConsultation/SingleMeetingReservationModalConsultation'
import CreateReservationMeetingGroup from '../meetingConsultation/GroupMeetingReservationModalConsultation'
import CreateWatingListMeeting from '../meetingConsultation/WatinigListMeetingModalConsultation'
import DialogAlertMeeting from '../meetingConsultation/DialogAlertMeeting'
import ModalPaymentMeeting from '../meetingConsultation/MeetingPaymentModalConsultation'
import TableMeetingsConsultation from '../meetingConsultation/MeetingTable'

const dataStruct = {
  title: ['تاریخ / زمان', 'پرونده', 'هزینه / وضعیت پرداخت', 'وضعیت جلسه'],
  name: [
    ['date', 'start_time', 'end_time'],
    [
      'consultationDocument.document_number',
      'consultationDocument.first_name',
      'consultationDocument.last_name',
      'consultationDocument.username'
    ],
    ['price', 'payment_status'],
    ['consultationStatus']
  ],
  align: ['', 'center', 'center', 'center'],
  filter: [true, true, true, true, true],
  sort: ['document_number', 'last_name', 'username', 'status'],
  rowId: ['id'],
  customCol: [
    ([e, c, v]: any) => {
      return (
        <>
          <Typography>{e}</Typography>
          <Typography>{`${c} تا  ${v}`}</Typography>
        </>
      )
    },
    ([e, c, v, d]: any) => {
      return (
        <>
          <Typography>{e ?? ''}</Typography>
          <Typography>{c ? `${d} - ${c} ${v}` : ''}</Typography>
        </>
      )
    },
    ([e, c]: any) => {
      return (
        <>
          <Typography>{`${e ? Number(e).toLocaleString('fa-IR') : ''} ریال`}</Typography>
          <CustomChip
            label={c == '0' ? 'پرداخت نشده' : 'پرداخت شده'}
            color={c == '0' ? 'error' : 'success'}
            skin='light'
            variant='outlined'
          />
        </>
      )
    },
    ([e]: any) => {
      return (
        <CustomChip
          label={e?.name}
          color={
            e?.id === 1
              ? 'info'
              : e?.id === 2
                ? 'warning'
                : e?.id === 3
                  ? 'success'
                  : e?.id === 4
                    ? 'error'
                    : e?.id === 5
                      ? 'default'
                      : 'primary'
          }
          skin='light'
          variant='outlined'
        />
      )
    }
  ]
}

const TableConsultationMeeting = ({ id, upsertData, date = null }: any) => {
  const {
    control: controlFilter,
    handleSubmit: handleSubmitFilter,
    reset
  } = useForm({
    defaultValues: {
      start_date: null,
      end_date: null,
      consultation_status_ids: [],
      advisor_ids: [],
      activity_field_area_ids: [],
      consultation_document_id: null,
      username: '',
      mobile: '',
      full_name: ''
    }
  })

  const [filters, setFilters] = useState<any>({})
  const [open, setOpen] = useState(false)
  const { data: meetings, isLoading }: any = useFetchMeetingConsultation({ id: id })
  console.log(meetings, isLoading, 'meetingsmeetingsmeetingsmeetingsmeetings')

  async function onSubmitFilter(values: any) {
    try {
      const start_date = dateConverter(values?.start_date)
      const end_date = dateConverter(values?.end_date)
      const data = {
        start_date,
        end_date,
        consultation_status_ids: values?.consultation_status_ids.map((el: any) => el?.id),
        advisor_ids: values?.advisor_ids?.map((el: any) => el?.id),
        activity_field_area_ids: values?.activity_field_area_ids?.map((el: any) => el?.id),
        consultation_document_id: values?.consultation_document_id?.id,
        username: values?.username,
        mobile: values?.mobile,
        full_name: values?.full_name
      }
      console.log(data, 'data')
      setFilters(data)
    } catch (error) {
      throw error
    }
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

  const { mutateAsync: deleteFun, isPending }: any = useDeleteSingleMeetingConsultation()
  const { mutateAsync: cancelFun, isPendingCancel }: any = useCancelMeetingConsultation()

  const openPaymentModal = (row: any) => {
    setModalPaymentOpen(true)
    setSelectedRow(row)
  }

  return (
    <>
      <ModalPaymentMeeting
        id={id}
        title='پرداخت / تخصیص یاری برگ'
        description='می توانید جلسه مورد نظر را پرداخت کنید و یارانه مورد نظر را می توانید تخصیص دهید و جلسه مورد نظر را قطعی کنید'
        open={modalPaymentOpen}
        onClose={() => setModalPaymentOpen(false)}
        selectedRow={selectedRow}
      />
      <DialogAlertMeeting
        id={id}
        title='حذف جلسه تکی'
        description='می توانید جلسه تکی مورد نظر را حذف کنید'
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        deleteFun={deleteFun}
        isLoading={isPending}
        selectedRow={selectedRow}
        params={filters}
      />
      <DialogAlertMeeting
        id={id}
        title='کنسل کردن جلسه'
        description='می توانید جلسه مورد نظر را کنسل کنید'
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        deleteFun={cancelFun}
        isLoading={isPendingCancel}
        selectedRow={selectedRow}
        params={filters}
      />
      <CreateWatingListMeeting
        id={id}
        title='درخواست نوبت در صف انتظار'
        description='می توانید نوبت خود را در صف انتظار ایجاد کنید'
        open={modalWaitingListOpen}
        onClose={() => setModalWatingListOpen(false)}
        params={filters}
        selectedRow={selectedRow}
      />
      <CreateReservationMeetingGroup
        id={id}
        title='درخواست نوبت گروهی'
        description='می توانید درخواست نوبت به صورت  گروهی را ایجاد کنید'
        open={modalReservationGroupOpen}
        onClose={() => setModalReservationGroupOpen(false)}
        upsertData={upsertData}
        params={filters}
      />
      <CreateReservationMeetingSingle
        id={id}
        title='درخواست نوبت'
        description=' می توانید با وارد شماره پرونده یا کد ملی پرونده مورد نظر را انتخاب کنید'
        open={modalReservationOpen}
        onClose={() => setModalReservationOpen(false)}
        selectedRow={selectedRow}
        date={date}
        params={filters}
      />
      <ModalGroupMeeting
        title='ایجاد جلسه گروهی'
        description='می توانید جلسات را به صورت گروهی انتخاب کنید'
        open={modalGroupOpen}
        onClose={() => setModalGroupOpen(false)}
        id={id}
        params={filters}
      />
      <ModalSingleMeeting
        id={id}
        title='ایجاد جلسه'
        description='می توانید جلسه را به صورت تکی ایجاد کنید'
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        params={filters}
      />
      <Accordion expanded={open} onChange={() => setOpen(prev => !prev)} elevation={0}>
        <AccordionSummary
          expandIcon={open ? <ExpandLessIcon sx={{ fontSize: 30 }} /> : <ExpandMoreIcon sx={{ fontSize: 30 }} />}
          sx={{
            minHeight: '100px',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            '& .MuiAccordionSummary-expandIconWrapper': {
              order: 0,
              marginBottom: 1
            },
            '& .MuiAccordionSummary-content': {
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }
          }}
        >
          <Typography variant='h6' fontWeight='bold'>
            فیلترهای پیشرفته
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            می توانید فهرست پرونده های مورد نظر را فیلتر کنید
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Box>
            <form onSubmit={handleSubmitFilter(onSubmitFilter)}>
              <CardContent>
                <Grid container spacing={5}>
                  {/* start_time */}
                  <Grid item xs={12} md={3}>
                    <Controller
                      control={controlFilter}
                      name='start_date'
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomDatePicker label='شروع بازه' value={value} onChange={onChange} />
                      )}
                    />
                  </Grid>

                  {/* end_time */}
                  <Grid item xs={12} md={3}>
                    <Controller
                      control={controlFilter}
                      name='end_date'
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomDatePicker label='پایان بازه' value={value} onChange={onChange} />
                      )}
                    />
                  </Grid>

                  {/* status_meeting */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name='consultation_status_ids'
                      control={controlFilter}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <Autocomplete
                          readOnly={false}
                          options={upsertData?.MeetingConsultationStatuses}
                          value={value}
                          multiple={true}
                          onChange={(_, newvalue) => onChange(newvalue)}
                          noOptionsText='هیچ نتیجه ای یافت نشد'
                          getOptionLabel={(options: { name: string }) => options?.name || ''}
                          renderInput={params => (
                            <TextField label='وضعیت جلسه' {...params} error={!!error} helperText={error?.message} />
                          )}
                        />
                      )}
                    />
                  </Grid>

                  {/* advisor_ids */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name='advisor_ids'
                      control={controlFilter}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAsyncAutocomplete
                          url={`/institution/${id}/meeting/base/select/advisor`}
                          readOnly={false}
                          onAddValue={newValue => onChange(newValue)}
                          value={value}
                          getOptionLabel={optien => `${optien?.first_name} ${optien?.last_name} (${optien?.username})`}
                          label='مشاوران'
                          multiple={true}
                          error={!!error}
                          helperText={error?.message}
                        ></CustomAsyncAutocomplete>
                      )}
                    />
                  </Grid>

                  {/* activity_field_area_ids */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name='activity_field_area_ids'
                      control={controlFilter}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAsyncAutocomplete
                          url={`/institution/${id}/meeting/base/select/consulting-activity-field-area`}
                          readOnly={false}
                          onAddValue={newValue => onChange(newValue)}
                          value={value}
                          getOptionLabel={optien => optien?.name}
                          label='حیطه های فعالیت'
                          multiple={true}
                          error={!!error}
                          helperText={error?.message}
                        ></CustomAsyncAutocomplete>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Divider />
                  </Grid>

                  {/* document_id */}
                  <Grid item xs={12} md={3}>
                    <Controller
                      name='consultation_document_id'
                      control={controlFilter}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAsyncAutocomplete
                          url={`/institution/${id}/meeting/base/select/consultation-document`}
                          readOnly={false}
                          onAddValue={newValue => onChange(newValue)}
                          value={value}
                          getOptionLabel={option =>
                            `${option?.first_name} ${option?.last_name} ( شماره پرونده (${option?.document_number}))`
                          }
                          label='پرونده های مرکز'
                          error={!!error}
                          helperText={error?.message}
                        ></CustomAsyncAutocomplete>
                      )}
                    />
                  </Grid>

                  {/* username */}
                  <Grid item xs={12} sm={3}>
                    <Controller
                      name='username'
                      control={controlFilter}
                      render={({ field: { onChange, value }, fieldState: { error } }) => {
                        return (
                          <TextField
                            label='کدملی'
                            fullWidth
                            error={!!error}
                            helperText={error?.message}
                            value={value}
                            onChange={onChange}
                            InputProps={{ readOnly: false }}
                          />
                        )
                      }}
                    />
                  </Grid>

                  {/* mobile */}
                  <Grid item xs={12} sm={3}>
                    <Controller
                      name='mobile'
                      control={controlFilter}
                      render={({ field: { onChange, value }, fieldState: { error } }) => {
                        return (
                          <TextField
                            label='شماره  موبایل'
                            fullWidth
                            error={!!error}
                            helperText={error?.message}
                            value={value}
                            onChange={onChange}
                            InputProps={{ readOnly: false }}
                          />
                        )
                      }}
                    />
                  </Grid>

                  {/* full_name */}
                  <Grid item xs={12} sm={3}>
                    <Controller
                      name='full_name'
                      control={controlFilter}
                      render={({ field: { onChange, value }, fieldState: { error } }) => {
                        return (
                          <TextField
                            label='نام و نام خانوادگی'
                            fullWidth
                            error={!!error}
                            helperText={error?.message}
                            value={value}
                            onChange={onChange}
                            InputProps={{ readOnly: false }}
                          />
                        )
                      }}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', mt: 10 }}>
                  <Button
                    variant='outlined'
                    sx={{ fontFamily: 'inherit' }}
                    color='primary'
                    disabled={false}
                    type='submit'
                  >
                    جستجو
                  </Button>
                </Box>
              </CardContent>
            </form>
          </Box>
        </AccordionDetails>
      </Accordion>

      <TableMeetingsConsultation
        id={id}
        filters={filters}
        btnShow={false}
        dataStruct={dataStruct}
        previousData={[]}
        checkboxEnabled={false}
        titleTable={{ title: 'جلسات مشاوره', description: 'می توانید فهرست جلسات مشاوره را مشاهده کنید' }}
        btnOperation={{
          status: () => true,
          delete: () => false,
          edit: () => false,
          show: () => false
        }}
        customOperation={[
          {
            icon: <BiTrash />,
            onClick: (row: any) => {
              setDeleteOpen(true)
              setSelectedRow(row)
            },
            if: () => true,
            color: 'error',
            title: 'حذف جلسه'
          },
          {
            icon: <BiEdit />,
            onClick: (row: any) => {
              setModalUpdateOpen(true)
              setSelectedRow(row)
            },
            if: () => true,
            color: 'primary',
            title: 'ویرایش جلسه'
          },
          {
            icon: <BiCalendarCheck />,
            onClick: (row: any) => {
              setModalReservationOpen(true)
              setSelectedRow(row)
            },
            if: () => true,
            color: 'warning',
            title: 'رزرو'
          },
          {
            icon: <BiCreditCard />,
            onClick: (row: any) => openPaymentModal(row),
            if: () => true,
            color: 'success',
            title: 'پرداخت'
          },
          {
            icon: <BiXCircle />,
            onClick: (row: any) => {
              setCancelOpen(true)
              setSelectedRow(row)
            },
            if: () => true,
            color: 'error',
            title: 'کنسل کردن'
          },
          {
            icon: <BiListUl />,
            onClick: (row: any) => {
              setModalWatingListOpen(true)
              setSelectedRow(row)
            },
            if: () => true,
            color: 'info',
            title: 'صف انتظار'
          }
        ]}
        cardHeader={{
          status: true,
          btn: (
            <>
              <Button variant='contained' color='primary' sx={{ mr: 3 }} onClick={() => openEditModal()}>
                ایجاد جلسه
              </Button>

              <Button variant='contained' color='primary' sx={{ mr: 3 }} onClick={() => setModalGroupOpen(true)}>
                ایجاد جلسه گروهی
              </Button>

              <Button
                variant='contained'
                color='warning'
                sx={{ mr: 3 }}
                onClick={() => setModalReservationGroupOpen(true)}
              >
                رزرو گروهی
              </Button>
            </>
          )
        }}
      />
    </>
  )
}

export default TableConsultationMeeting

{
  /* <Card>
        <CardContent>
          <TableMeetingsConsultation
            columns={[
              { label: 'تاریخ / زمان', key: ['date', 'start_time', 'end_time'] },
              {
                label: 'پرونده',
                key: [
                  'consultationDocument.document_number',
                  'consultationDocument.first_name',
                  'consultationDocument.last_name',
                  'consultationDocument.username'
                ]
              },
              { label: 'هزینه / وضعیت پرداخت', key: ['price', 'payment_status'] },
              { label: 'وضعیت جلسه', key: ['trainingMeetingType.name'] }
            ]}
            title='فهرست جلسات حضوری'
            description='می توانید فهرست جلسات حضوری را مشاهده کنید'
            rows={meetings}
            isLoading={isLoading}
            id={id}
            onOpen={() => true}
            upsertData={upsertData}
            disabled={false}
            actions={(row: any) => (
              <>
                <Tooltip arrow title='ویرایش'>
                  <IconButton
                    color='primary'
                    onClick={() => {
                      setModalReservationOpen(true)
                      setSelectedRow(row)
                    }}
                  >
                    <HiOutlinePencilAlt size={18} />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow title='حذف جلسه'>
                  <IconButton
                    color='error'
                    onClick={() => {
                      setDeleteOpen(true)
                      setSelectedRow(row)
                    }}
                  >
                    <BiTrash />
                  </IconButton>
                </Tooltip>

                <Tooltip arrow title='رزرو جلسه'>
                  <IconButton
                    color='warning'
                    onClick={() => {
                      setModalReservationOpen(true)
                      setSelectedRow(row)
                    }}
                  >
                    <BiCalendarCheck />
                  </IconButton>
                </Tooltip>

                <Tooltip arrow title='پرداخت'>
                  <IconButton
                    color='success'
                    onClick={() => {
                      setModalPaymentOpen(true)
                      setSelectedRow(row)
                    }}
                  >
                    <BiCreditCard />
                  </IconButton>
                </Tooltip>

                <Tooltip arrow title='کنسل کردن'>
                  <IconButton
                    color='error'
                    onClick={() => {
                      setCancelOpen(true)
                      setSelectedRow(row)
                    }}
                  >
                    <BiXCircle />
                  </IconButton>
                </Tooltip>

                <Tooltip arrow title='صف انتظار'>
                  <IconButton
                    color='info'
                    onClick={() => {
                      setModalWatingListOpen(true)
                      setSelectedRow(row)
                    }}
                  >
                    <BiListUl />
                  </IconButton>
                </Tooltip>
              </>
            )}
          />
        </CardContent>
      </Card> */
}
