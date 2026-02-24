import { Transition } from '@/helpers/DialogsHelper'
import { Icon } from '@iconify/react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Typography,
  CardContent,
  CardHeader,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Checkbox,
  Divider,
  Skeleton,
  Box
} from '@mui/material'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useCreateDocumentConsultationUser, useCreateWatingListMeetingUser } from '@/hooks/user/useCalenderMeeting'
import { useSession } from 'next-auth/react'

export default function CreateWatingListMeetingsConsultationModal({
  onClose,
  open,
  id,
  institutionId,
  selectedRow,
  document,
  params,
  datas
}: {
  onClose: any
  open: boolean
  id: string
  institutionId: string
  selectedRow: any
  document: any
  datas: any
  params: any
}) {
  const session: any = useSession()
  const userAuthId = session?.data?.user?.user?.username
  const userId = selectedRow?.consultationDocument?.username
  const HasUserAuth = Boolean(userAuthId == userId)

  //request wating meeting
  const { mutateAsync: watingCreate, isPending: isLoading }: any = useCreateWatingListMeetingUser()
  const handleRequest = async (data: any) => {
    try {
      if (!data) {
        toast.error('ابتدا یک پرونده را انتخاب کرده')
        return
      }

      const dataReserve = {
        consultation_document_id: data
      }

      const res: any = await toast.promise(
        watingCreate({ data: dataReserve, id: id, rowId: selectedRow?.id, params }),
        {
          pending: 'در حال انجام...'
        }
      )
      onClose()
    } catch (error) {
      throw error
    }
  }

  ///document
  const { mutateAsync: createDocument, isPending: isLoadingDocument }: any = useCreateDocumentConsultationUser()
  const handleRequestDocument = async () => {
    try {
      const res: any = await toast.promise(createDocument({ id }), {
        pending: 'در حال انجام...'
      })
      onClose()

      if (res?.status) {
        toast.success(res?.data[0])
      }
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <Dialog TransitionComponent={Transition} fullWidth open={open} maxWidth='lg' scroll='body'>
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          <CardHeader
            sx={{ textAlign: 'center' }}
            title={
              <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                صف انتظار{' '}
              </Typography>
            }
            subheader={
              <Typography variant='body1'>می توانید با انتخاب پرونده مورد نظر در صف انتظار ثبت کنید</Typography>
            }
          />

          <Box sx={{ borderRadius: 5, backgroundColor: '#fcecd7ef', display: 'flex', minHeight: 20, p: 5 }}>
            <Icon icon='mdi:alert-circle-outline' width={25} color='#f3a640' />
            <Typography color='#f3a640' sx={{ ml: 2, mt: 1 }}>
              تعداد افراد حاضر در صف انتظار {!datas?.status ? datas?.message?.waitingCount : datas?.data?.waitingCount}{' '}
              نفر می باشد{' '}
            </Typography>
          </Box>

          <CardContent>
            {!HasUserAuth &&
              (document ? (
                <Grid container spacing={6}>
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
                                {/* <Checkbox checked={selectedId === item.id} onChange={() => setSelectedId(item?.id)} /> */}

                                <Button
                                  variant='outlined'
                                  sx={{ fontFamily: 'inherit' }}
                                  color='primary'
                                  onClick={() => handleRequest(item?.id)}
                                  disabled={isLoading}
                                >
                                  ثبت در صف انتظار
                                </Button>
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
              ))}
          </CardContent>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' sx={{ fontFamily: 'inherit' }} color='error' onClick={onClose}>
            بستن
          </Button>

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

          {/* {!HasUserAuth && (
            <Button
              variant='contained'
              sx={{ fontFamily: 'inherit' }}
              color='primary'
              onClick={() => handleRequest(selectedId)}
              disabled={isLoading}
            >
              ثبت در صف انتظار
            </Button>
          )} */}

          {/* {HasUserAuth && (
            <Button
              variant='contained'
              sx={{ fontFamily: 'inherit' }}
              color='error'
              onClick={() => handleRequestDelete()}
              disabled={isLoadingDelete}
            >
              حذف از صف انتظار
            </Button>
          )} */}
        </DialogActions>
      </Dialog>
    </>
  )
}
