'use client'

import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
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
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Divider
} from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'
import axiosConfig from '@/libs/auth/axios'
import {
  useCreateWatingList,
  useDeleteWatingList,
  useFetchShowWatingList
} from '@/hooks/institution/advisoryMeeting/useCalender'
import { BiArea, BiData, BiMoney, BiTime, BiTrash, BiUser } from 'react-icons/bi'
import { GeTErrorFetch } from '@/components/elements/errorHandler'
import {
  useCreateWatingListConsultation,
  useDeleteWatingListConsultation,
  useFetchShowWatingListConsultationConsultation
} from '@/hooks/institution/advisoryMeeting/useMeetingConsultation'

export default function CreateWatingListMeeting({
  onClose,
  open,
  title,
  description,
  id,
  selectedRow,
  params
}: {
  onClose: any
  open: boolean
  title: string
  description: string
  id: string
  selectedRow: any
  params: any
}) {
  const [documentData, setDocumentData] = useState<any>(null)

  const { control, handleSubmit, setError, clearErrors, reset } = useForm({
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
    clearErrors()
    try {
      const response = await toast.promise(mutateAsync({ [searchBy]: values?.number }), {
        pending: 'در حال انجام...'
      })
      setDocumentData(response?.data?.data)
      if (response.status) {
        toast.success('عملیات با موفقیت انجام شد')
        reset()
      } else {
        toast.error(response?.data?.message)
        reset()
      }
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  const [actionType, setActionType] = useState<'index' | 'create'>('index')
  const [listWating, setListWating] = useState<[]>([])
  const [searchBy, setSearchBy] = useState('')

  const { data, isLoading: loadingData } = useFetchShowWatingListConsultationConsultation({
    params: params,
    id: id,
    rowId: selectedRow?.id
  })

  useEffect(() => {
    if (data) {
      setListWating(data ?? [])
    }
  }, [data])

  const { mutateAsync: waitingList, isPending: isLoading }: any = useCreateWatingListConsultation()

  const handleRequest = async (data: any) => {
    try {
      if (!data) {
        toast.error('ابتدا یک پرونده را انتخاب کرده')
        return
      }

      const dataWating = {
        consultation_document_id: data?.id
      }

      const res: any = await toast.promise(waitingList({ data: dataWating, id: id, rowId: selectedRow?.id, params }), {
        pending: 'در حال انجام...'
      })

      if (res?.status) {
        setSearchBy('')
        setActionType('index')
        reset()
        toast.success('با موفقیت ایجاد شد')
      } else if (!res?.status) {
        toast.error(res?.message[0])
        onClose()
      }
    } catch (error) {
      throw error
    }
  }

  const { mutateAsync: deletewaiting, isLoading: loadWating }: any = useDeleteWatingListConsultation()

  const handleDeleteWaiting = async (watiId: string) => {
    try {
      await toast.promise(deletewaiting({ id: id, rowId: selectedRow?.id, waitId: watiId, params }), {
        pending: 'در حال انجام...'
      })
    } catch (error) {
      throw error
    }
  }

  const handleClose = () => {
    onClose()
    reset()
    setDocumentData(null)
    setActionType('index')
    setListWating([])
  }

  return (
    <>
      <Dialog TransitionComponent={Transition} fullWidth open={open} maxWidth='lg' scroll='body'>
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton
            size='small'
            onClick={() => handleClose()}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
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

          {/* show meeting */}
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={3} md={3}>
                <Box display='flex' alignItems='center' gap={1}>
                  <BiUser color='#65f32dff' size={20} />

                  <Typography component='span' fontWeight={500}>
                    مشاور:
                  </Typography>

                  <Typography component='span'>
                    {`${selectedRow?.advisor?.first_name} ${selectedRow?.advisor?.last_name} (${selectedRow?.advisor?.username})`}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={4} md={4}>
                <Box display='flex' alignItems='center' gap={1}>
                  <BiArea color='#2df3f3ff' size={20} />

                  <Typography component='span' fontWeight={500}>
                    حوزه های فعالیت :
                  </Typography>

                  <Typography component='span'>
                    {`${selectedRow?.activityFieldAreas?.map((el: any) => el?.name)}`}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={2} md={2}>
                <Box display='flex' alignItems='center' gap={1}>
                  <BiData color='#f3a42dff' size={20} />

                  <Typography component='span' fontWeight={500}>
                    تاریخ :
                  </Typography>

                  <Typography component='span'>{`${selectedRow?.date}`}</Typography>
                </Box>
              </Grid>

              <Grid item xs={2} md={2}>
                <Box display='flex' alignItems='center' gap={1}>
                  <BiTime color='#f0ed56ff' size={20} />

                  <Typography component='span' fontWeight={500}>
                    زمان شروع :
                  </Typography>

                  <Typography component='span'>{`${selectedRow?.start_time}`}</Typography>
                </Box>
              </Grid>

              <Grid item xs={2} md={2}>
                <Box display='flex' alignItems='center' gap={1}>
                  <BiTime color='#ec4c4cff' size={20} />

                  <Typography component='span' fontWeight={500}>
                    زمان پایان :
                  </Typography>

                  <Typography component='span'>{`${selectedRow?.end_time}`}</Typography>
                </Box>
              </Grid>

              <Grid item xs={2} md={2}>
                <Box display='flex' alignItems='center' gap={1}>
                  <BiMoney color='#2be4f1ff' size={20} />

                  <Typography component='span' fontWeight={500}>
                    هزینه :
                  </Typography>

                  <Typography component='span'>{`${selectedRow?.price}`}</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>

          <Divider />

          {actionType === 'index' && (
            <Grid container spacing={6} mt={6}>
              <Grid item xs={12}>
                <Button variant='outlined' onClick={() => setActionType('create')}>
                  ایجاد
                </Button>
              </Grid>
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
                      <TableCell align='center'>تاریخ و زمان</TableCell>
                      <TableCell align='center'>رزرو کننده</TableCell>
                      <TableCell align='center'>شماره پرونده</TableCell>
                      <TableCell align='center'>عملیات</TableCell>
                    </TableRow>
                  </TableHead>

                  {listWating && listWating.length > 0 ? (
                    <TableBody>
                      {listWating?.map((wating: any) => (
                        <TableRow key={wating?.id} hover>
                          <TableCell align='center'>{wating?.reservationTime}</TableCell>
                          <TableCell align='center'>{`${wating?.consultationDocument?.first_name} ${wating?.consultationDocument?.last_name} (${wating?.consultationDocument?.username})`}</TableCell>
                          <TableCell align='center'>{wating?.consultationDocument?.document_number}</TableCell>
                          <TableCell align='center'>
                            <IconButton disabled={loadWating} onClick={() => handleDeleteWaiting(wating?.id)}>
                              <BiTrash color='#f16666ff' size={20} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  ) : (
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={5} align='center'>
                          <Typography>هیچ دیتایی موجود نمی‌باشد</Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </Grid>
            </Grid>
          )}

          {actionType === 'create' && (
            <CardContent>
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
                                searchBy === 'document_number'
                                  ? 'شماره پرونده را وارد کنید...'
                                  : 'کد ملی را وارد کنید...'
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
                          disabled={isPending}
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
                            {documentData?.map((document: any) => (
                              <TableRow key={document?.id} hover>
                                <TableCell align='center'>{document?.document_number}</TableCell>
                                <TableCell align='center'>{document?.username}</TableCell>
                                <TableCell align='center'>{`${document?.first_name} ${document?.last_name} (${document?.username})`}</TableCell>
                                <TableCell align='center'>{document?.mobile}</TableCell>
                                <TableCell align='center'>
                                  <Button
                                    variant='outlined'
                                    size='small'
                                    disabled={isLoading}
                                    onClick={() => {
                                      handleRequest(document)
                                    }}
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
              </form>
            </CardContent>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' sx={{ fontFamily: 'inherit' }} color='error' onClick={() => handleClose()}>
            بستن
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
