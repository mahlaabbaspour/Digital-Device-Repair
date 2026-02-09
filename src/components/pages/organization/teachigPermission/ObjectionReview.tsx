'use client'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
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
  Divider,
  FormControlLabel,
  FormControl,
  Radio,
  Box,
  RadioGroup,
  Alert,
  List,
  ListItem
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { GeTErrorFetch } from '@/components/elements/errorHandler'
import { toast } from 'react-toastify'
import { useProcessObjectionTeachingPermissionRevision } from '@/hooks/organization/useRevisionTeachingPermission'

export default function ObjectionReviewModal({
  onClose,
  open,
  id,
  rowSelect
}: {
  onClose: any
  open: boolean
  id: string
  rowSelect: any
}) {
  const { control, handleSubmit, setError, reset } = useForm({
    defaultValues: {
      request_teaching_permission_status_id: 5
    }
  })

  const { mutateAsync, isPending }: any = useProcessObjectionTeachingPermissionRevision()

  async function onSubmit(values: any) {
    try {
      await toast.promise(mutateAsync({ data: values, id, revisionId: rowSelect?.id }), {
        pending: 'در حال انجام...'
      })
      onClose()
      reset()
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
                  بررسی اعتراض
                </Typography>
              }
              subheader={<Typography variant='caption'>می توانید اعتراض مورد نظر را بررسی کنید</Typography>}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name='request_teaching_permission_status_id'
                      control={control}
                      render={({ field }) => (
                        <RadioGroup
                          row
                          {...field}
                          sx={{
                            justifyContent: 'center',
                            gap: 2
                          }}
                        >
                          <FormControlLabel
                            value={4}
                            control={<Radio sx={{ display: 'none' }} />}
                            label={
                              <Box
                                sx={{
                                  px: 4,
                                  py: 1.5,
                                  borderRadius: 999,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1,
                                  cursor: 'pointer',
                                  fontWeight: 700,
                                  color: field.value == 4 ? '#fff' : '#4caf50',
                                  background: field.value == 4 ? 'linear-gradient(135deg,#22c55e,#16a34a)' : '#e8f5e9',
                                  boxShadow: field.value == 4 ? '0 8px 24px rgba(34,197,94,.4)' : 'none'
                                }}
                              >
                                ✔ تأیید شده
                              </Box>
                            }
                          />

                          <FormControlLabel
                            value={2}
                            control={<Radio sx={{ display: 'none' }} />}
                            label={
                              <Box
                                sx={{
                                  px: 4,
                                  py: 1.5,
                                  borderRadius: 999,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1,
                                  cursor: 'pointer',
                                  fontWeight: 700,
                                  color: field.value == 2 ? '#fff' : '#d0d17aff',
                                  background:
                                    field.value == 2 ? 'linear-gradient(135deg,#d0d17aff,#d0d17aff)' : '#f5f3e8ff',
                                  boxShadow: field.value == 2 ? '0 8px 24px rgba(218, 228, 81, 0.4)' : 'none'
                                }}
                              >
                                عودت برای اصلاح
                              </Box>
                            }
                          />

                          <FormControlLabel
                            value={5}
                            control={<Radio sx={{ display: 'none' }} />}
                            label={
                              <Box
                                sx={{
                                  px: 4,
                                  py: 1.5,
                                  borderRadius: 999,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1,
                                  cursor: 'pointer',
                                  fontWeight: 700,
                                  color: field.value == 5 ? '#fff' : '#ef4444',
                                  background: field.value == 5 ? 'linear-gradient(135deg,#ef4444,#dc2626)' : '#fdecec',
                                  boxShadow: field.value == 5 ? '0 8px 24px rgba(239,68,68,.4)' : 'none'
                                }}
                              >
                                ✖ رد شده
                              </Box>
                            }
                          />
                        </RadioGroup>
                      )}
                    />
                  </FormControl>
                </Grid>

                {rowSelect?.objection_description && (
                  <Grid item xs={12} mb={2} mt={3}>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                      <Typography sx={{ fontWeight: 900, fontSize: '1rem' }}>توضیحات اعتراض</Typography>
                      <Typography variant='caption'>می توانید توضیحات اعتراض کاربر را مشاهده کنید</Typography>
                    </Box>
                    <Alert severity='info' icon={false}>
                      <List>
                        <ListItem disablePadding sx={{ color: 'info.main' }}>
                          {rowSelect?.objection_description}
                        </ListItem>
                      </List>
                    </Alert>
                  </Grid>
                )}

                {rowSelect?.objection && (
                  <Grid item xs={12} mb={5}>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                      <Typography sx={{ fontWeight: 900, fontSize: '1rem' }}>دلایل رد</Typography>
                      <Typography variant='caption'>می توانید دلایل رد قبلی را مشاهده کنید</Typography>
                    </Box>
                    <Alert
                      severity={
                        rowSelect?.requestTeachingPermissionStatus?.id == 5
                          ? 'error'
                          : rowSelect?.requestTeachingPermissionStatus?.id == 4
                            ? 'success'
                            : rowSelect?.requestTeachingPermissionStatus?.id == 2
                              ? 'warning'
                              : 'info'
                      }
                      icon={false}
                    >
                      <List>
                        {rowSelect?.objection?.map((item: any) => (
                          <ListItem
                            key={item}
                            disablePadding
                            sx={{
                              color: `${
                                rowSelect?.requestTeachingPermissionStatus?.id == 5
                                  ? 'error.main'
                                  : rowSelect?.requestTeachingPermissionStatus?.id == 4
                                    ? 'success.main'
                                    : rowSelect?.requestTeachingPermissionStatus?.id == 2
                                      ? 'warning.main'
                                      : 'info.main'
                              }`
                            }}
                          >
                            {item}
                          </ListItem>
                        ))}
                      </List>
                    </Alert>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </DialogContent>
          <DialogActions>
            <Button variant='outlined' sx={{ fontFamily: 'inherit' }} color='error' onClick={onClose}>
              بستن
            </Button>
            <Button
              variant='contained'
              sx={{ fontFamily: 'inherit' }}
              color='primary'
              disabled={isPending}
              type='submit'
            >
              ثبت
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
