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
  Skeleton
} from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useState } from 'react'
import axiosConfig from '@/libs/auth/axios'
import { GeTErrorFetch } from '@/components/elements/errorHandler'
import { useCreateDocumentInstitution, useReserveMeetingInstitution } from '@/hooks/landing/useInstitutionLanding'
import { createDocumentInstitution } from '@/libs/landing/institutionLanding'

export default function CreateReservationMeetingInstitution({
  onClose,
  open,
  id,
  selectedRow,
  document
}: {
  onClose: any
  open: boolean
  id: string
  selectedRow: any
  document: any
}) {
  console.log(document, 'document')
  const [documentData, setDocumentData] = useState<any>()
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

  const { mutateAsync: reserve, isPending: isLoading }: any = useReserveMeetingInstitution()

  const handleRequest = async (data: any) => {
    try {
      if (!data) {
        toast.error('ابتدا یک پرونده را انتخاب کرده')
        return
      }

      const dataReserve = {
        consultation_document_id: selectedId
      }

      const res: any = await toast.promise(reserve({ data: dataReserve, id: id, rowId: selectedRow?.id }), {
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

  const { mutateAsync: createDocument, isPending: isLoadingDocument }: any = useCreateDocumentInstitution()

  const handleRequestDocument = async () => {
    try {
      const res: any = await toast.promise(createDocument({ id }), {
        pending: 'در حال انجام...'
      })
      console.log(res, 'res')

      if (res?.status) {
        toast.success(res?.data[0])
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
            <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
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
              {document ? (
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
                        {document?.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} align='center'>
                              <Typography variant='body1' color='text.secondary'>
                                هیچ دیتایی موجود نمی‌باشد
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ) : (
                          document.map((item: any) => (
                            <TableRow key={item?.id} hover>
                              <TableCell align='center'>{item?.document_number}</TableCell>
                              <TableCell align='center'>{item?.username}</TableCell>
                              <TableCell align='center'>{`${item?.first_name} ${item?.last_name}`}</TableCell>
                              <TableCell align='center'>{item?.mobile}</TableCell>
                              <TableCell align='center'>
                                <Checkbox checked={selectedId === item.id} onChange={() => setSelectedId(item?.id)} />
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
              ) : (
                <Skeleton variant='rounded' height={150} sx={{ mb: 5, mt: 10 }} />
              )}
            </CardContent>
          </DialogContent>
        </form>
        <DialogActions>
          {/* <Button variant='contained' sx={{ fontFamily: 'inherit' }} color='error' onClick={onClose}>
            انصراف
          </Button> */}

          {document?.length === 0 && (
            <Button
              variant='contained'
              sx={{ fontFamily: 'inherit' }}
              color='warning'
              type='submit'
              disabled={isLoadingDocument}
              onClick={() => handleRequestDocument()}
            >
              ایجاد پرونده
            </Button>
          )}

          {document?.length > 0 && (
            <Button
              variant='contained'
              sx={{ fontFamily: 'inherit' }}
              color='primary'
              onClick={() => handleRequest(selectedId)}
              disabled={isLoading}
            >
              درخواست نوبت
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}
