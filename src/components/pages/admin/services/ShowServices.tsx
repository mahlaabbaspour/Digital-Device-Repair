'use client'

import type { ReactElement, Ref } from 'react'
import { forwardRef } from 'react'

import type { FadeProps } from '@mui/material/Fade'
import Fade from '@mui/material/Fade'

import {
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Typography
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'

import Icon from '@components/icon'

import { useGetServices } from '@/hooks/admin/services/useServices'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type Props = {
  open: boolean
  id: number | null
  onClose: () => void
}

const InfoItem = ({ icon, label, value }: { icon: string; label: string; value: React.ReactNode }) => (
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
      <Icon icon={icon} fontSize={21} />
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

export default function ServicesShow({ open, id, onClose }: Props) {
  const { data, isLoading, isError } = useGetServices(id)

  const services = data?.data

  const formattedPrice =
    services?.sale_price !== null && services?.sale_price !== undefined
      ? `${Number(services.sale_price).toLocaleString('en-US')} تومان`
      : '—'

  return (
    <Dialog fullWidth maxWidth='sm' open={open} onClose={onClose} TransitionComponent={Transition}>
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 1
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box
        sx={{
          px: { xs: 5, sm: 8 },
          pt: 5,
          pb: 4,
          backgroundColor: 'background.default'
        }}
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
              width: 44,
              height: 44,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              flexShrink: 0
            }}
          >
            <Inventory2OutlinedIcon />
          </Box>

          <Box>
            <DialogTitle
              sx={{
                p: 0,
                fontSize: '1.2rem',
                fontWeight: 700
              }}
            >
              مشاهده خدمت
            </DialogTitle>

            <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
              مشاهده اطلاعات خدمت
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      <DialogContent
        sx={{
          pb: 6,
          px: { xs: 5, sm: 8 },
          pt: 5
        }}
      >
        {isLoading && (
          <Grid container spacing={4}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box
                  sx={{
                    p: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1.5
                  }}
                >
                  <Skeleton variant='circular' width={42} height={42} />
                  <Skeleton variant='text' width='35%' height={18} sx={{ mt: 2 }} />
                  <Skeleton variant='text' width='70%' height={25} />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}

        {isError && !isLoading && (
          <Box
            sx={{
              py: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'error.light',
                color: 'error.main'
              }}
            >
              <Icon icon='mdi:alert-circle-outline' fontSize={28} />
            </Box>

            <Typography color='error.main' fontWeight={600}>
              خطا در دریافت اطلاعات خدمت
            </Typography>
          </Box>
        )}

        {services && !isLoading && !isError && (
          <Box>
            <Box
              sx={{
                mb: 5,
                p: 3,
                borderRadius: 2,
                backgroundColor: services.status ? 'success.lighter' : 'action.hover',
                border: '1px solid',
                borderColor: services.status ? 'success.light' : 'error.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                <Icon icon='mdi:package-variant-closed' fontSize={24} />

                <Box>
                  <Typography variant='body1' fontWeight={700}>
                    {services.name}
                  </Typography>
                </Box>
              </Box>

              <Chip
                size='small'
                icon={
                  <Icon
                    icon={services.status ? 'mdi:check-circle-outline' : 'mdi:close-circle-outline'}
                    fontSize={16}
                  />
                }
                label={services.status ? 'فعال' : 'غیرفعال'}
                color={services.status ? 'success' : 'error'}
                sx={{
                  fontWeight: 600
                }}
              />
            </Box>

            <Divider sx={{ mb: 5 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <InfoItem icon='mdi:package-variant-closed' label='نام خدمت' value={services.name} />
              </Grid>

              <Grid item xs={12} md={12}>
                <InfoItem icon='mdi:cash' label='قیمت فروش' value={formattedPrice} />
              </Grid>
            </Grid>
          </Box>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          px: { xs: 5, sm: 8 },
          pb: 5,
          pt: 2
        }}
      />
    </Dialog>
  )
}
