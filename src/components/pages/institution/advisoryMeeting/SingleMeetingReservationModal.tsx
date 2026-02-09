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
  Divider
} from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useState } from 'react'
import axiosConfig from '@/libs/auth/axios'
import { useReserveMeeting } from '@/hooks/institution/advisoryMeeting/useCalender'
import { GeTErrorFetch } from '@/components/elements/errorHandler'

export default function CreateReservationMeetingSingle({
  onClose,
  open,
  title,
  description,
  id,
  selectedRow,
  date
}: {
  onClose: any
  open: boolean
  title: string
  description: string
  id: string
  selectedRow: any
  date: any
}) {
  const [documentData, setDocumentData] = useState<any>(null)
  const { control, handleSubmit, setError, clearErrors } = useForm({
    defaultValues: {
      number: ''
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
    console.log({ [searchBy]: values?.number })
    clearErrors()
    try {
      const response = await toast.promise(mutateAsync({ [searchBy]: values?.number }), {
        pending: 'در حال انجام...'
      })
      setDocumentData(response.data?.data)
      console.log(response?.data, 'res')
      if (response.data.data) {
        toast.success('عملیات با موفقیت انجام شد')
      } else {
        toast.error('موردی یافت نشد')
      }
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  const [selectedId, setSelectedId] = useState(null)
  const [searchBy, setSearchBy] = useState('')
  console.log(searchBy, 'sejklj')
  const [isLoad, setIsLoad] = useState(true)

  const handleSelect = (data: any) => {
    setSelectedId(data?.id)
  }

  const { mutateAsync: reserve, isPending: isLoading }: any = useReserveMeeting()

  const handleRequest = async (data: any) => {
    try {
      console.log(data, 'data')
      // if (!data) {
      //   toast.error('ابتدا یک پرونده را انتخاب کرده')
      //   return
      // }

      const dataReserve = {
        document_id: data?.document?.id,
        meeting_ids: [selectedRow?.id]
      }
      console.log(dataReserve, 'reserve')

      const res: any = await toast.promise(reserve({ data: dataReserve, id: id, date: date }), {
        pending: 'در حال انجام...'
      })
      console.log(res, 'res')

      if (res?.status) {
        toast.success('با موفقیت انجام شد')
        onClose()
        setSearchBy('')
        setSelectedId(null)
        setDocumentData(null)
      } else {
        toast?.error(res?.message)
        onClose()
        setSearchBy('')
        setSelectedId(null)
        setDocumentData(null)
      }
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  return (
    <>
      <Dialog TransitionComponent={Transition} fullWidth open={open} maxWidth='lg' scroll='body'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
            <IconButton
              size='small'
              onClick={() => {
                onClose()
                setDocumentData(null)
                setSearchBy('')
              }}
              sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            >
              <Icon icon='mdi:close' />
            </IconButton>
            <CardHeader
              sx={{ textAlign: 'center' }}
              title={
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                  درخواست نوبت{' '}
                </Typography>
              }
              subheader={
                <Typography variant='caption'>
                  می توانید با وارد شماره پرونده یا کد ملی پرونده مورد نظر را انتخاب کنید
                </Typography>
              }
            />
            <Divider />
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
                          <TableCell align='center'>عملیات</TableCell>
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
                              {/* <Checkbox checked={selectedId === document.id} onChange={() => handleSelect(document)} /> */}
                              <Button
                                variant='outlined'
                                color='warning'
                                size='small'
                                onClick={() => handleRequest({ selectedId, document })}
                              >
                                انتخاب
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </DialogContent>
        </form>
        <DialogActions>
          <Button
            variant='outlined'
            sx={{ fontFamily: 'inherit' }}
            color='error'
            onClick={() => {
              onClose()
              setDocumentData(null)
              setSearchBy('')
            }}
          >
            بستن
          </Button>

          <Button
            variant='contained'
            sx={{ fontFamily: 'inherit' }}
            color='warning'
            onClick={() => {
              window.open(`/institution/${id}/consultationServices/consultationDocuments/documentList/create`, '_blank')
            }}
          >
            ایجاد پرونده
          </Button>

          {/* <Button
            variant='contained'
            sx={{ fontFamily: 'inherit' }}
            color='primary'
            onClick={() => handleRequest(selectedId)}
            disabled={isLoading}
          >
            درخواست نوبت
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  )
}
