'use client'

import { forwardRef, type ReactElement, type Ref } from 'react'

import {
  alpha,
  Avatar,
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Fade,
  Grid,
  IconButton,
  Typography,
  type FadeProps
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined'
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined'
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined'
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined'
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined'

import { useGetRepairItems } from '@/hooks/admin/repairItems/useRepairItems'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type Props = {
  open: boolean
  onClose: () => void
  repairItemId: number | null
  repairId: number | string
}

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2.5,
      p: 2.5,
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
        backgroundColor: theme => alpha(theme.palette.primary.main, 0.1),
        color: 'primary.main'
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

export default function RepairItemsShow({ open, onClose, repairItemId, repairId }: Props) {
  const {
    data: response,
    isLoading,
    error
  } = useGetRepairItems({
    repairId,
    repairItemId
  })

  const repairItem = response?.data ?? response

  const formatPrice = (price: number | string | null | undefined) => {
    if (price === null || price === undefined || price === '') {
      return '—'
    }

    return `${Number(price).toLocaleString('en-US')} تومان`
  }

  const isProduct = repairItem?.itemable_type?.includes('Product') ?? false

  const isService = repairItem?.itemable_type?.includes('Service') ?? false

  const typeLabel = isProduct ? 'کالا' : isService ? 'خدمت' : '—'

  if (!open) {
    return null
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='md' scroll='body' TransitionComponent={Transition}>
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 2
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box
        sx={theme => ({
          px: { xs: 4, sm: 6 },
          pt: 4.5,
          pb: 4,
          backgroundColor: alpha(theme.palette.primary.main, 0.08)
        })}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              flexShrink: 0
            }}
          >
            <BuildOutlinedIcon />
          </Box>

          <Box>
            <DialogTitle
              sx={{
                p: 0,
                fontSize: '1.2rem',
                fontWeight: 700
              }}
            >
              مشاهده آیتم
            </DialogTitle>

            <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
              اطلاعات قطعه یا خدمت استفاده‌شده در تعمیر
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      <DialogContent
        sx={{
          px: { xs: 4, sm: 6 },
          py: 5
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              minHeight: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography color='text.secondary'>در حال دریافت اطلاعات...</Typography>
          </Box>
        ) : error || !repairItem ? (
          <Box
            sx={{
              minHeight: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography color='error'>اطلاعات آیتم پیدا نشد.</Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={theme => ({
                mb: 4,
                p: 3,
                borderRadius: 2,
                border: '1px solid',
                borderColor: repairItem.status
                  ? alpha(theme.palette.success.main, 0.35)
                  : alpha(theme.palette.error.main, 0.35),
                backgroundColor: repairItem.status
                  ? alpha(theme.palette.success.main, 0.06)
                  : alpha(theme.palette.error.main, 0.06),
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                flexWrap: 'wrap'
              })}
            >
              <Avatar
                variant='rounded'
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: 2,
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText'
                }}
              >
                {isService ? <BuildOutlinedIcon fontSize='large' /> : <Inventory2OutlinedIcon fontSize='large' />}
              </Avatar>

              <Box
                sx={{
                  flex: 1,
                  minWidth: 180
                }}
              >
                <Typography variant='h6' fontWeight={700}>
                  {repairItem.name || '—'}
                </Typography>

                <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
                  {typeLabel}
                </Typography>
              </Box>

              <Chip
                label={repairItem.status ? 'فعال' : 'غیرفعال'}
                color={repairItem.status ? 'success' : 'error'}
                size='small'
                sx={{
                  fontWeight: 700,
                  borderRadius: 1.5
                }}
              />
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <InfoItem icon={<CategoryOutlinedIcon fontSize='small' />} label='نوع' value={typeLabel} />
              </Grid>

              <Grid item xs={12} md={6}>
                <InfoItem icon={<Inventory2OutlinedIcon fontSize='small' />} label='نام' value={repairItem.name} />
              </Grid>

              {isProduct && (
                <Grid item xs={12} md={6}>
                  <InfoItem icon={<QrCode2OutlinedIcon fontSize='small' />} label='سریال' value={repairItem.serial} />
                </Grid>
              )}

              <Grid item xs={12} md={6}>
                <InfoItem
                  icon={<EngineeringOutlinedIcon fontSize='small' />}
                  label='کارشناس'
                  value={repairItem.expert}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <InfoItem
                    icon={<NumbersOutlinedIcon fontSize='small' />}
                    label='تعداد'
                    value={
                      repairItem.quantity !== null && repairItem.quantity !== undefined
                        ? Number(repairItem.quantity).toLocaleString('en-US')
                        : '—'
                    }
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <InfoItem
                    icon={<PaymentsOutlinedIcon fontSize='small' />}
                    label='مبلغ واحد'
                    value={formatPrice(repairItem.unit_price)}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <InfoItem
                    icon={<CalculateOutlinedIcon fontSize='small' />}
                    label='جمع'
                    value={formatPrice(repairItem.total_price)}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mt: 5 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2.5,
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
                    backgroundColor: theme => alpha(theme.palette.primary.main, 0.1),
                    color: 'primary.main'
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
                    توضیحات
                  </Typography>

                  <Typography
                    variant='body1'
                    fontWeight={500}
                    sx={{
                      lineHeight: 1.9,
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    {repairItem.description || '—'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
