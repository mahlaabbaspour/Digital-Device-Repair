'use client'

import { useParams, useRouter } from 'next/navigation'

import {
  alpha,
  Avatar,
  Box,
  Chip,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Typography,
  CardActions
} from '@mui/material'

import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'
import DevicesOtherOutlinedIcon from '@mui/icons-material/DevicesOtherOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'

import Breadcrumb from '@/components/Breadcrumb'

import { useGetRepairs } from '@/hooks/admin/repairs/useRepairs'
import { useGetRepairsUpsertData } from '@/hooks/admin/upsertData/useUpsertData'

import RepairItemsTable from '../repairItems/TableRepairItems'

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 3,
      p: 3,
      borderRadius: 1.5,
      border: '1px solid',
      borderColor: 'divider',
      backgroundColor: 'background.paper',
      transition: 'all 0.2s ease',
      '&:hover': {
        borderColor: 'primary.main',
        backgroundColor: 'action.hover'
      }
    }}
  >
    <Box
      sx={{
        width: 42,
        height: 42,
        minWidth: 42,
        borderRadius: 1.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'primary.main',
        color: 'primary.contrastText'
      }}
    >
      {icon}
    </Box>

    <Box sx={{ minWidth: 0 }}>
      <Typography
        variant='caption'
        color='text.secondary'
        sx={{
          display: 'block',
          mb: 0.5
        }}
      >
        {label}
      </Typography>

      <Typography
        variant='body1'
        fontWeight={600}
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        {value ?? '—'}
      </Typography>
    </Box>
  </Box>
)

export default function RepairsShow() {
  const router = useRouter()

  const { id } = useParams()

  const repairId = Number(id)

  const { data: repairResponse, isLoading: repairLoading, error: repairError } = useGetRepairs(repairId)

  const { data: upsertResponse, isLoading: upsertLoading } = useGetRepairsUpsertData()

  const repair = repairResponse?.data ?? repairResponse

  const upsertData = upsertResponse?.data ?? upsertResponse

  const statusCodes = upsertData?.status_codes ?? []

  const currentStatus = statusCodes.find((item: { id: number; name: string }) => item.name === repair?.status_code)

  const getStatusColor = (statusId?: number): 'primary' | 'warning' | 'success' | 'error' | 'default' => {
    switch (statusId) {
      case 1:
        return 'primary'

      case 2:
        return 'warning'

      case 3:
        return 'success'

      case 4:
        return 'error'

      default:
        return 'default'
    }
  }

  const statusColor = getStatusColor(currentStatus?.id)

  const formatPrice = (price: number | string | null | undefined) => {
    if (price === null || price === undefined || price === '') {
      return '—'
    }

    return `${Number(price).toLocaleString('en-US')} تومان`
  }

  if (repairLoading || upsertLoading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight={400}>
        {' '}
        <Typography>در حال دریافت اطلاعات تعمیر... </Typography>{' '}
      </Box>
    )
  }

  if (repairError || !repair) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 400
        }}
      >
        {' '}
        <Typography>اطلاعات تعمیر پیدا نشد. </Typography>{' '}
      </Box>
    )
  }

  const items = [
    {
      title: 'داشبورد',
      to: '/admin'
    },
    {
      title: 'لیست تعمیرات',
      to: '/admin/repairs'
    },
    {
      title: 'مشاهده تعمیر'
    }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <Card>
        <Box
          sx={{
            position: 'relative',
            px: 5,
            py: 4.5,
            borderRadius: '12px 12px 0 0'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 2
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                backgroundColor: 'primary.main',
                color: 'common.white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <DevicesOtherOutlinedIcon />
            </Box>

            <Box>
              <Typography
                variant='h6'
                sx={{
                  fontWeight: 700,
                  fontSize: '1.15rem',
                  lineHeight: 1.5
                }}
              >
                مشاهده تعمیر
              </Typography>

              <Typography
                variant='body2'
                color='text.secondary'
                sx={{
                  mt: 0.25
                }}
              >
                می‌توانید اطلاعات تعمیر را مشاهده کنید
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider />

        <CardContent>
          <Box
            sx={theme => ({
              mb: 5,
              p: 4,
              borderRadius: 2,
              border: '1px solid',
              borderColor:
                statusColor === 'primary'
                  ? alpha(theme.palette.primary.main, 0.35)
                  : statusColor === 'warning'
                    ? alpha(theme.palette.warning.main, 0.35)
                    : statusColor === 'success'
                      ? alpha(theme.palette.success.main, 0.35)
                      : statusColor === 'error'
                        ? alpha(theme.palette.error.main, 0.35)
                        : theme.palette.divider,

              backgroundColor:
                statusColor === 'primary'
                  ? alpha(theme.palette.primary.main, 0.06)
                  : statusColor === 'warning'
                    ? alpha(theme.palette.warning.main, 0.06)
                    : statusColor === 'success'
                      ? alpha(theme.palette.success.main, 0.06)
                      : statusColor === 'error'
                        ? alpha(theme.palette.error.main, 0.06)
                        : theme.palette.background.paper,

              display: 'flex',
              alignItems: 'center',
              gap: 3,
              flexWrap: 'wrap',
              transition: 'all 0.2s ease'
            })}
          >
            <Avatar
              variant='rounded'
              sx={theme => ({
                width: 90,
                height: 90,
                borderRadius: 2,

                backgroundColor:
                  statusColor === 'primary'
                    ? alpha(theme.palette.primary.main, 0.15)
                    : statusColor === 'warning'
                      ? alpha(theme.palette.warning.main, 0.15)
                      : statusColor === 'success'
                        ? alpha(theme.palette.success.main, 0.15)
                        : statusColor === 'error'
                          ? alpha(theme.palette.error.main, 0.15)
                          : alpha(theme.palette.text.primary, 0.08),

                color:
                  statusColor === 'primary'
                    ? 'primary.main'
                    : statusColor === 'warning'
                      ? 'warning.main'
                      : statusColor === 'success'
                        ? 'success.main'
                        : statusColor === 'error'
                          ? 'error.main'
                          : 'text.secondary'
              })}
            >
              <DevicesOtherOutlinedIcon fontSize='large' />
            </Avatar>

            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Typography variant='h6' fontWeight={700}>
                {repair.name || '—'}
              </Typography>

              <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
                {repair.device_type || 'نوع دستگاه مشخص نشده'}
              </Typography>
            </Box>

            <Chip
              label={repair.status_code || '—'}
              color={statusColor}
              size='small'
              sx={{
                fontWeight: 700,
                borderRadius: 1.5
              }}
            />
          </Box>

          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <InfoItem
                  icon={<DevicesOtherOutlinedIcon fontSize='small' />}
                  label='نوع دستگاه'
                  value={repair.device_type}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <InfoItem icon={<DevicesOtherOutlinedIcon fontSize='small' />} label='نام دستگاه' value={repair.name} />
              </Grid>

              <Grid item xs={12} md={4}>
                <InfoItem
                  icon={<BadgeOutlinedIcon fontSize='small' />}
                  label='سریال دستگاه'
                  value={repair.device_serial}
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mt: 5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <InfoItem icon={<PersonOutlinedIcon fontSize='small' />} label='مشتری' value={repair.customer_code} />
              </Grid>

              <Grid item xs={12} md={6}>
                <InfoItem icon={<PersonOutlinedIcon fontSize='small' />} label='اپراتور' value={repair.operator_code} />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mt: 5 }}>
            <Divider sx={{ mb: 4 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <InfoItem
                  icon={<AccessTimeOutlinedIcon fontSize='small' />}
                  label='زمان دریافت'
                  value={repair.received_at || '—'}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <InfoItem
                  icon={<AccessTimeOutlinedIcon fontSize='small' />}
                  label='زمان موعد تحویل'
                  value={repair.delivery_due_at || '—'}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <InfoItem
                  icon={<AccessTimeOutlinedIcon fontSize='small' />}
                  label='زمان تحویل'
                  value={repair.delivery_at || '—'}
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mt: 5 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 3,
                p: 3,
                borderRadius: 1.5,
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.paper'
              }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  minWidth: 42,
                  borderRadius: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText'
                }}
              >
                <DescriptionOutlinedIcon />
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant='caption'
                  color='text.secondary'
                  sx={{
                    display: 'block',
                    mb: 0.5
                  }}
                >
                  توضیحات مشتری
                </Typography>

                <Typography
                  variant='body1'
                  fontWeight={600}
                  sx={{
                    lineHeight: 1.9,
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {repair.customer_description || '—'}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mt: 4 }}>
        <RepairItemsTable repairId={repairId} operationMode='show' />
      </Card>

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant='h6' fontWeight={700} sx={{ mb: 4 }}>
            مبالغ تعمیر
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <InfoItem
                icon={<PaymentsOutlinedIcon fontSize='small' />}
                label='مبلغ کل'
                value={formatPrice(repair.total_amount)}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <InfoItem
                icon={<PaymentsOutlinedIcon fontSize='small' />}
                label='مبلغ تخفیف'
                value={formatPrice(repair.discount_amount)}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <InfoItem
                icon={<PaymentsOutlinedIcon fontSize='small' />}
                label='مبلغ قابل پرداخت'
                value={formatPrice(repair.payable_amount)}
              />
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Box
            sx={{
              mt: 5,
              display: 'flex',
              justifyContent: 'flex-start'
            }}
          >
            <IconButton
              onClick={() => router.push('/admin/repairs')}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1.5
              }}
            >
              <ArrowForwardOutlinedIcon />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
    </>
  )
}
