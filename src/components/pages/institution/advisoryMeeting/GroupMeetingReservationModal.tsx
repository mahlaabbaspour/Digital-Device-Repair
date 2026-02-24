import { Transition } from '@/helpers/DialogsHelper'
import { Icon } from '@iconify/react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  TextField,
  Typography,
  CardContent,
  CardHeader,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Checkbox,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Divider,
  Autocomplete
} from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useState } from 'react'
import axiosConfig from '@/libs/auth/axios'
import { useReserveMeeting } from '@/hooks/institution/advisoryMeeting/useCalender'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import CustomTimePicker from '@/components/elements/customTimePicker'
import { dateConverter } from '@/helpers/DateHelpers'
import moment from 'moment-jalaali'
import { nlNL } from '@mui/x-date-pickers/locales'

export default function CreateReservationMeetingGroup({
  onClose,
  open,
  title,
  description,
  id,
  upsertData,
  date
}: {
  onClose: any
  open: boolean
  title: string
  description: string
  id: string
  upsertData: any
  date: any
}) {
  const [documentData, setDocumentData] = useState<any>()
  const { control, handleSubmit, setError, clearErrors } = useForm({
    defaultValues: {
      number: ''
    }
  })

  const {
    control: controlFilter,
    handleSubmit: handleSubmitFilter,
    reset
  } = useForm({
    defaultValues: {
      week_days: [],
      advisor_id: null,
      activity_field_areas: [],
      start_time: null,
      end_time: null
    }
  })

  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (formData: any) => {
      const res = await axiosConfig.get(`/institution/${id}/meeting/core/consultation-meeting/search-document`, {
        params: formData
      })

      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar'] })
    }
  })

  async function onSubmit(values: any) {

    clearErrors()
    try {
      const response = await toast.promise(mutateAsync({ [searchBy]: values?.number }), {
        pending: 'در حال انجام...'
      })
      setDocumentData(response.data?.data)
      if (response.data.data) {
        toast.success('عملیات با موفقیت انجام شد')
      } else {
        toast.error('موردی یافت نشد')
      }
    } catch (error) {
      throw error
      // GeTErrorFetch({ error, setError })
    }
  }

  const { mutateAsync: filter, isPending: isLoadingFilter } = useMutation({
    mutationFn: async (formData: any) => {
      const res = await axiosConfig.get(
        `/institution/${id}/meeting/core/consultation-meeting/filter-available-meeting`,
        {
          params: formData
        }
      )

      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar'] })
    }
  })

  async function onSubmitFilter(valuesFilter: any) {
    try {
      const startTime = valuesFilter.start_time ? moment(valuesFilter.start_time).format('HH:mm') : ''
      const endTime = valuesFilter.end_time ? moment(valuesFilter.end_time).format('HH:mm') : ''

      const data = {
        week_days: valuesFilter?.week_days?.map((el: any) => el?.id),
        advisor_id: valuesFilter?.advisor_id?.id,
        activity_field_areas: valuesFilter?.activity_field_areas?.map((el: any) => el?.id),
        start_time: startTime,
        end_time: endTime
      }

      const res = await toast.promise(filter(data), {
        pending: 'در حال انجام...'
      })
      if (res) {
        toast.success('با موفقیت انجام شد')
      }
      setMeeting(res?.data?.data)
    } catch (error) {}
  }

  const [selectedId, setSelectedId] = useState(null)
  const [document, setDocument] = useState<any>(null)
  const [meeting, setMeeting] = useState<any>(null)
  const [searchBy, setSearchBy] = useState('')
  const [isLoad, setIsLoad] = useState(true)

  const [selectedMeetings, setSelectedMeetings] = useState<number[]>([])

  const handleSelectMeetings = (meet: any) => {
    setSelectedMeetings(prev => {
      if (prev.includes(meet.id)) {
        // اگر قبلاً بود → حذف کن
        return prev.filter(id => id !== meet.id)
      } else {
        // اگر نبود → اضافه کن
        return [...prev, meet.id]
      }
    })
  }

  const handleSelect = (data: any) => {
    setSelectedId(data?.id)
    setDocument(data)
  }

  const { mutateAsync: reserve, isPending: isLoading }: any = useReserveMeeting()

  const handleRequest = async (data: any) => {
    try {
      if (!data) {
        toast.error('ابتدا یک پرونده را انتخاب کرده')
        return
      }

      const dataReserve = {
        document_id: data,
        meeting_ids: selectedMeetings
      }

      const res: any = await toast.promise(reserve({ data: dataReserve, id: id, date: date }), {
        pending: 'در حال انجام...'
      })

      if (res) {
        onClose()
        setSearchBy('')
        setSelectedMeetings([])
        setMeeting(null)
      }
    } catch (error) {
      throw error
    }
  }

  const handleClosed = () => {
    onClose()
    setSelectedId(null)
    setDocument(null)
    setMeeting(null)
    reset()
  }

  return (
    <>
      <Dialog TransitionComponent={Transition} fullWidth open={open} maxWidth='lg' scroll='body'>
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={handleClosed} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          <CardHeader
            sx={{ textAlign: 'center' }}
            title={
              <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                {title}{' '}
              </Typography>
            }
            subheader={<Typography variant='caption'>{description}</Typography>}
          />
          <Divider />

          {selectedId ? (
            <form onSubmit={handleSubmitFilter(onSubmitFilter)}>
              <CardContent>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Table
                      sx={{
                        minWidth: 650,
                        overflow: 'hidden'
                      }}
                    >
                      <TableBody>
                        <TableRow key={document?.id} hover>
                          <TableCell align='center'>{document?.document_number}</TableCell>
                          <TableCell align='center'>{document?.username}</TableCell>
                          <TableCell align='center'>{`${document?.first_name} ${document?.last_name}`}</TableCell>
                          <TableCell align='center'>{document?.mobile}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>

                <Grid container spacing={5} mt={5}>
                  {/* week_days */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name='week_days'
                      control={controlFilter}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <Autocomplete
                          readOnly={false}
                          multiple={true}
                          options={upsertData?.weekDays || []}
                          value={value}
                          onChange={(_, newvalue) => onChange(newvalue)}
                          noOptionsText='هیچ نتیجه ای یافت نشد'
                          getOptionLabel={(options: { name: string }) => options?.name || ''}
                          renderInput={params => (
                            <TextField label='ایام هفته' {...params} error={!!error} helperText={error?.message} />
                          )}
                        />
                      )}
                    />
                  </Grid>

                  {/* activity_field_areas */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name='activity_field_areas'
                      control={controlFilter}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAsyncAutocomplete
                          url={`/institution/${id}/meeting/core/consultation-meeting/consultation-document-activity-field-area?consultation_document_id=${selectedId}`}
                          readOnly={false}
                          onAddValue={newValue => onChange(newValue)}
                          value={value}
                          getOptionLabel={optien => optien?.name}
                          label='حوزه های حیطه فعالیت'
                          multiple={true}
                          error={!!error}
                          helperText={error?.message}
                        ></CustomAsyncAutocomplete>
                      )}
                    />
                  </Grid>

                  {/* advisor_id */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name='advisor_id'
                      control={controlFilter}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAsyncAutocomplete
                          url={`/institution/${id}/meeting/core/consultation-meeting/consultation-document-advisor?consultation_document_id=${selectedId}`}
                          readOnly={false}
                          onAddValue={newValue => onChange(newValue)}
                          value={value}
                          getOptionLabel={option => `${option?.first_name} ${option?.last_name} -${option?.username}`}
                          label='مشاور'
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
                      name='start_time'
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomTimePicker size='large' label='شروع بازه' value={value} onChange={onChange} />
                      )}
                    />
                  </Grid>

                  {/* end_time */}
                  <Grid item xs={12} md={3}>
                    <Controller
                      control={controlFilter}
                      name='end_time'
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomTimePicker size='large' label='پایان بازه' value={value} onChange={onChange} />
                      )}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', mt: 10 }}>
                  <Button
                    variant='outlined'
                    sx={{ fontFamily: 'inherit' }}
                    color='primary'
                    disabled={isLoading}
                    type='submit'
                  >
                    جستجو
                  </Button>
                </Box>

                {meeting && (
                  <Grid container spacing={6} mt={6}>
                    <Grid item xs={12}>
                      <Table
                        sx={{
                          minWidth: 650,
                          overflow: 'hidden'
                        }}
                      >
                        <TableHead
                          sx={{
                            '& .MuiTableCell-head': {
                              fontWeight: 500,
                              fontSize: '15px'
                            }
                          }}
                        >
                          <TableRow>
                            <TableCell align='center'>تاریخ</TableCell>
                            <TableCell align='center'>زمان</TableCell>
                            <TableCell align='center'>مشاور</TableCell>
                            <TableCell align='center'>هزینه</TableCell>
                            <TableCell align='center'>انتخاب</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {meeting.map((meet: any) => (
                            <TableRow key={meet?.id} hover>
                              <TableCell align='center'>{meet?.date}</TableCell>
                              <TableCell align='center'>{`${meet?.start_time} تا  ${meet?.end_time}`}</TableCell>
                              <TableCell align='center'>{`${meet?.advisor?.first_name} ${meet?.advisor?.last_name}`}</TableCell>
                              <TableCell align='center'>{meet?.price}</TableCell>
                              <TableCell align='center'>
                                <Checkbox
                                  checked={selectedMeetings.includes(meet.id)}
                                  onChange={() => handleSelectMeetings(meet)}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Grid>
                  </Grid>
                )}
              </CardContent>
            </form>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2
                  }}
                >
                  <FormControl component='fieldset'>
                    <RadioGroup
                      row
                      value={searchBy}
                      onChange={e => {
                        setSearchBy(e.target.value)
                        setIsLoad(false)
                      }}
                    >
                      <FormControlLabel value='document_number' control={<Radio />} label='شماره پرونده' />
                      <FormControlLabel value='username' control={<Radio />} label='کد ملی' />
                    </RadioGroup>
                  </FormControl>

                  <Grid
                    container
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Grid item xs={7} sm={5}>
                      <Controller
                        control={control}
                        name='number'
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            fullWidth
                            size='medium'
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                height: '48px',
                                fontSize: '14px',
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0
                              }
                            }}
                            placeholder={
                              searchBy === 'document_number' ? 'شماره پرونده را وارد کنید...' : 'کد ملی را وارد کنید...'
                            }
                            error={!!error}
                            helperText={error?.message}
                            {...field}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={3} sm={1}>
                      <Button
                        variant='contained'
                        size='medium'
                        sx={{
                          height: '48px',
                          minWidth: '100%',
                          fontSize: '14px',
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0
                        }}
                        disabled={isLoad}
                        type='submit'
                      >
                        جستجو
                      </Button>
                    </Grid>
                  </Grid>
                </Box>

                {documentData && (
                  <Grid container spacing={6} mt={6}>
                    <Grid item xs={12}>
                      <Table
                        sx={{
                          minWidth: 650,
                          overflow: 'hidden'
                        }}
                      >
                        <TableHead
                          sx={{
                            '& .MuiTableCell-head': {
                              fontWeight: 500,
                              fontSize: '15px'
                            }
                          }}
                        >
                          <TableRow>
                            <TableCell align='center'>شماره پرونده</TableCell>
                            <TableCell align='center'>کدملی</TableCell>
                            <TableCell align='center'>نام و نام خانوادگی </TableCell>
                            <TableCell align='center'>موبایل</TableCell>
                            <TableCell align='center'>انتخاب</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {documentData.map((document: any) => (
                            <TableRow key={document?.id} hover>
                              <TableCell align='center'>{document?.document_number}</TableCell>
                              <TableCell align='center'>{document?.username}</TableCell>
                              <TableCell align='center'>{`${document?.first_name} ${document?.last_name}`}</TableCell>
                              <TableCell align='center'>{document?.mobile}</TableCell>
                              <TableCell align='center'>
                                <Checkbox
                                  checked={selectedId === document.id}
                                  onChange={() => handleSelect(document)}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Grid>
                  </Grid>
                )}
              </CardContent>
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            sx={{ fontFamily: 'inherit' }}
            color='warning'
            onClick={() => {
              window.open(`/institution/${id}/consultationServices/consultationDocuments/documentList/create`, '_blank')
            }}
          >
            ایجاد پرونده
          </Button>

          <Button variant='outlined' sx={{ fontFamily: 'inherit' }} color='error' onClick={handleClosed}>
            بستن
          </Button>

          <Button
            variant='contained'
            sx={{ fontFamily: 'inherit' }}
            color='primary'
            onClick={() => handleRequest(selectedId)}
            disabled={isLoading}
          >
            درخواست نوبت
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
