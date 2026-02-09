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
  Skeleton
} from '@mui/material'
import { toast } from 'react-toastify'
import { useState } from 'react'
import {
  useCreateDocumentInstitution,
  useDeleteWatingListMeetingInstitution,
  useWatingListMeetingInstitution
} from '@/hooks/landing/useInstitutionLanding'

export default function CreateWatingListMeetingInstitution({
  onClose,
  open,
  id,
  selectedRow,
  document,
  datas
}: {
  onClose: any
  open: boolean
  id: string
  selectedRow: any
  document: any
  datas: any
}) {
  const [selectedId, setSelectedId] = useState(null)

  //request wating meeting
  const { mutateAsync: watingCreate, isPending: isLoading }: any = useWatingListMeetingInstitution()
  const handleRequest = async (data: any) => {
    try {
      if (!data) {
        toast.error('ابتدا یک پرونده را انتخاب کرده')
        return
      }

      const dataReserve = {
        consultation_document_id: selectedId
      }

      const res: any = await toast.promise(watingCreate({ data: dataReserve, id: id, rowId: selectedRow?.id }), {
        pending: 'در حال انجام...'
      })
      console.log(res, 'res')

      if (res?.status) {
        toast.success('با موفقیت انجام شد')
        onClose()
        setSelectedId(null)
      } else {
        toast?.error(res?.message)
        onClose()
        setSelectedId(null)
      }
    } catch (error) {
      throw error
    }
  }

  ///////Destroy WatingList meeting
  const { mutateAsync: watingDelete, isPending: isLoadingDelete }: any = useDeleteWatingListMeetingInstitution()
  const handleRequestDelete = async () => {
    try {
      const res: any = await toast.promise(
        watingDelete({ id: id, meetingId: selectedRow?.id, rowId: datas?.data?.meetingWaitingListId }),
        {
          pending: 'در حال انجام...'
        }
      )
      console.log(res, 'res')

      if (res?.status) {
        toast.success('عملیات با موفقیت انجام شد')
        onClose()
      }
    } catch (error) {
      throw error
    }
  }

  ///document
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
              <Typography variant='body1'>
                تعداد افراد حاضر در صف انتظار{' '}
                {!datas?.status ? datas?.message?.waitingCount : datas?.data?.waitingCount} نفر می باشد{' '}
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
        <DialogActions>
          <Button variant='outlined' sx={{ fontFamily: 'inherit' }} color='error' onClick={onClose}>
            انصراف
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

          {!datas?.status && (
            <Button
              variant='contained'
              sx={{ fontFamily: 'inherit' }}
              color='primary'
              onClick={() => handleRequest(selectedId)}
              disabled={isLoading}
            >
              ثبت در صف انتظار
            </Button>
          )}

          {datas?.status && (
            <Button
              variant='contained'
              sx={{ fontFamily: 'inherit' }}
              color='error'
              onClick={() => handleRequestDelete()}
              disabled={isLoadingDelete}
            >
              حذف از صف انتظار
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}
