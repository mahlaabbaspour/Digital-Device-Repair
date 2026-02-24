'use client'

import CustomChip from '@/@core/components/mui/chip/index'
import CustomTable from '@/components/elements/customTable/CustomTable'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { Box, Typography, Button, Grid, Autocomplete, TextField, CardContent } from '@mui/material'
import { dateConverter } from '@/helpers/DateHelpers'
import CustomDatePicker from '@/components/elements/customDatePicker'
import { useFetchMeetingConsultationOrganiation } from '@/hooks/organization/useConsultationSubsidyOrganization'

const dataStruct = {
  title: ['تاریخ / زمان', 'پرونده', 'هزینه / وضعیت پرداخت', 'وضعیت پرونده'],
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

export default function ConsultationMeetingTable({ id, upsertData }: any) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [currunt, setCurrent] = useState<any>(null)

  const handleClosed = (row: any) => {
    setOpen(true)
    setCurrent(row)
  }

  const {
    control: controlFilter,
    handleSubmit: handleSubmitFilter,
    reset,
    watch
  } = useForm({
    defaultValues: {
      start_date: null,
      end_date: null,
      consultation_document_id: null,
      consultation_status_ids: [],
      advisor_ids: [],
      activity_field_area_ids: [],
      username: '',
      mobile: '',
      full_name: '',
      province_ids: [],
      city_ids: [],
      institution_ids: []
    }
  })

  const [filters, setFilters] = useState<any>({})
  const { data: meetings, isLoading }: any = useFetchMeetingConsultationOrganiation({ id: id, params: filters })

  async function onSubmitFilter(values: any) {
    try {
      const start_date = dateConverter(values?.start_date)
      const end_date = dateConverter(values?.end_date)
      const data = {
        start_date,
        end_date,
        consultation_document_id: values?.consultation_document_id?.id ?? null,
        consultation_status_ids: values?.consultation_status_ids.map((el: any) => el?.id),
        advisor_ids: values?.advisor_ids?.map((el: any) => el?.id),
        activity_field_area_ids: values?.activity_field_area_ids?.map((el: any) => el?.id),
        username: values?.username,
        mobile: values?.mobile,
        fullName: values?.fullName,
        institution_ids: values?.institution_ids?.map((el: any) => el?.id)
      }
      setFilters(data)
    } catch (error) {
      throw error
    }
  }

  const province_ids = watch('province_ids')
  const provinceQuery = province_ids?.map((p: any, index) => `province_ids[${index}]=${p.id}`).join('&')

  const institution_ids = watch('city_ids')
  const institutionQuery = institution_ids?.map((p: any, index) => `city_ids[${index}]=${p.id}`).join('&')

  const document_ids = watch('institution_ids')
  const documentQuery = document_ids?.map((p: any, index) => `institution_ids[${index}]=${p.id}`).join('&')

  return (
    <>
      {/* <ChangeStatusDocument open={open} onClose={() => setOpen(false)} selectedRow={currunt} id={id} /> */}
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
            می توانید فهرست جلسات مورد نظر را فیلتر کنید
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Box>
            <form onSubmit={handleSubmitFilter(onSubmitFilter)}>
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12} md={4}>
                    <Controller
                      name='province_ids'
                      control={controlFilter}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAsyncAutocomplete
                          url={`/organization/${id}/meeting/base/select/province`}
                          readOnly={false}
                          onAddValue={newValue => onChange(newValue)}
                          value={value}
                          multiple={true}
                          getOptionLabel={option => option?.name}
                          label='استان'
                          error={!!error}
                          helperText={error?.message}
                        ></CustomAsyncAutocomplete>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Controller
                      name='city_ids'
                      control={controlFilter}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAsyncAutocomplete
                          url={`/organization/${id}/meeting/base/select/city${provinceQuery ? `?${provinceQuery}` : ``}`}
                          readOnly={false}
                          multiple={true}
                          onAddValue={newValue => onChange(newValue)}
                          value={value}
                          getOptionLabel={option =>
                            `${option?.first_name} ${option?.last_name} (${option?.document_number})`
                          }
                          label='شهرستان'
                          error={!!error}
                          helperText={error?.message}
                        ></CustomAsyncAutocomplete>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Controller
                      name='institution_ids'
                      control={controlFilter}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAsyncAutocomplete
                          url={`/organization/${id}/meeting/base/select/institution${institutionQuery ? `?${institutionQuery}` : ``}`}
                          readOnly={false}
                          multiple={true}
                          onAddValue={newValue => onChange(newValue)}
                          value={value}
                          getOptionLabel={option =>
                            `${option?.first_name} ${option?.last_name} (${option?.document_number})`
                          }
                          label='مرکز'
                          error={!!error}
                          helperText={error?.message}
                        ></CustomAsyncAutocomplete>
                      )}
                    />
                  </Grid>

                  {/* document_id */}
                  <Grid item xs={12} md={3}>
                    <Controller
                      name='consultation_document_id'
                      control={controlFilter}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAsyncAutocomplete
                          url={`/organization/${id}/meeting/base/select/inPerson-consultation${documentQuery ? `?${documentQuery}` : ``}`}
                          readOnly={false}
                          onAddValue={newValue => onChange(newValue)}
                          value={value}
                          getOptionLabel={option =>
                            `${option?.first_name} ${option?.last_name} (${option?.document_number})`
                          }
                          label='پرونده های مرکز'
                          error={!!error}
                          helperText={error?.message}
                        ></CustomAsyncAutocomplete>
                      )}
                    />
                  </Grid>

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
                  <Grid item xs={12} md={3}>
                    <Controller
                      name='consultation_status_ids'
                      control={controlFilter}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <Autocomplete
                          readOnly={false}
                          options={upsertData?.meetingConsultationStatuses}
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
                          url={`/organization/${id}/meeting/base/select/advisor${documentQuery ? `?${documentQuery}` : ``}`}
                          readOnly={false}
                          onAddValue={newValue => onChange(newValue)}
                          value={value}
                          getOptionLabel={optien => optien?.name}
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
                          url={`/organization/${id}/meeting/base/select/consulting-activity-field-area${documentQuery ? `?${documentQuery}` : ``}`}
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
                            label='شماره موبایل'
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
      <CustomTable
        baseUrl={`/`}
        queryKey='documentUser'
        textBtn=''
        btnShow={false}
        dataStruct={dataStruct}
        previousData={meetings}
        checkboxEnabled={false}
        titleTable={{ title: 'جلسات مشاوره', description: 'می توانید فهرست جلسات مشاوره را مشاهده کنید' }}
        btnOperation={{
          status: () => true,
          delete: () => false,
          edit: () => false,
          show: () => true
        }}
      />
    </>
  )
}
