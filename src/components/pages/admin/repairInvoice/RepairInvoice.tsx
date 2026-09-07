'use client'

import { useRef } from 'react'

import Image from 'next/image'
import { useParams } from 'next/navigation'

import { useReactToPrint } from 'react-to-print'
import { Box, Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'

import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import DevicesOtherOutlinedIcon from '@mui/icons-material/DevicesOtherOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined'
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined'

import { useGetRepairs } from '@/hooks/admin/repairs/useRepairs'

import RepairItemsTable from '../repairItems/TableRepairItems'

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value?: React.ReactNode }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 3,
      p: 3,
      width: '100%',
      boxSizing: 'border-box',
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

export default function RepairInvoice() {
  const { id } = useParams()

  const repairId = Number(id)

  const contentRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    contentRef
  })

  const { data: repairResponse, isLoading: repairLoading, error: repairError } = useGetRepairs(repairId)

  const repair = repairResponse?.data ?? repairResponse

  const formatPrice = (price: number | string | null | undefined) => {
    if (price === null || price === undefined || price === '') {
      return '—'
    }

    return `${Number(price).toLocaleString('en-US')} تومان`
  }

  if (repairLoading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight={400}>
        <Typography>در حال دریافت اطلاعات فاکتور...</Typography>
      </Box>
    )
  }

  if (repairError || !repair) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight={400}>
        <Typography>اطلاعات فاکتور پیدا نشد.</Typography>
      </Box>
    )
  }

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Button variant='contained' startIcon={<PrintOutlinedIcon />} onClick={handlePrint}>
          چاپ فاکتور
        </Button>
      </Box>

      <div ref={contentRef} className='repair-invoice-print' dir='rtl'>
        <Card>
          <CardHeader
            title={
              <Box
                sx={{
                  width: '100%'
                }}
              >
                <Grid container alignItems='center' spacing={4} className='invoice-header-grid'>
                  <Grid item md={3} className='invoice-header-logo'>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: {
                          xs: 'center',
                          md: 'flex-start'
                        }
                      }}
                    >
                      <Image src='/images/repairInvoice.jpg' alt='Logo' width={150} height={140} />
                    </Box>
                  </Grid>

                  <Grid item md={6} className='invoice-header-title'>
                    <Typography variant='h4' fontWeight={700} textAlign='center'>
                      فاکتور فروش کالا و خدمات
                    </Typography>
                  </Grid>

                  <Grid item md={3} className='invoice-header-info'>
                    <Grid container spacing={2}>
                      <Grid item md={12} className='invoice-header-info-item'>
                        <InfoItem icon={<ReceiptLongOutlinedIcon fontSize='small' />} label='شماره' value={repair.id} />
                      </Grid>

                      <Grid item md={12} className='invoice-header-info-item'>
                        <InfoItem
                          icon={<AccessTimeOutlinedIcon fontSize='small' />}
                          label='تاریخ'
                          value={repair.received_at}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            }
          />

          <CardContent>
            <Box>
              <Grid container spacing={3}>
                <Grid item md={4}>
                  <InfoItem
                    icon={<DevicesOtherOutlinedIcon fontSize='small' />}
                    label='نوع دستگاه'
                    value={repair.device_type}
                  />
                </Grid>

                <Grid item md={4}>
                  <InfoItem
                    icon={<DevicesOtherOutlinedIcon fontSize='small' />}
                    label='نام دستگاه'
                    value={repair.name}
                  />
                </Grid>

                <Grid item md={4}>
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
                <Grid item md={6}>
                  <InfoItem icon={<PersonOutlinedIcon fontSize='small' />} label='مشتری' value={repair.customer_code} />
                </Grid>

                <Grid item md={6}>
                  <InfoItem
                    icon={<PersonOutlinedIcon fontSize='small' />}
                    label='اپراتور'
                    value={repair.operator_code}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mt: 5 }}>
              <Grid container spacing={3}>
                <Grid item md={4}>
                  <InfoItem
                    icon={<AccessTimeOutlinedIcon fontSize='small' />}
                    label='زمان دریافت'
                    value={repair.received_at}
                  />
                </Grid>

                <Grid item md={4}>
                  <InfoItem
                    icon={<AccessTimeOutlinedIcon fontSize='small' />}
                    label='زمان موعد تحویل'
                    value={repair.delivery_due_at}
                  />
                </Grid>

                <Grid item md={4}>
                  <InfoItem
                    icon={<AccessTimeOutlinedIcon fontSize='small' />}
                    label='زمان تحویل'
                    value={repair.delivery_at}
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>

        <Card className='repair-items-invoice-card' sx={{ mt: 4 }}>
          <RepairItemsTable repairId={repairId} operationMode='none' />
        </Card>

        <Card className='invoice-footer-card' sx={{ mt: 4 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={4}>
                <InfoItem
                  icon={<PaymentsOutlinedIcon fontSize='small' />}
                  label='مبلغ کل'
                  value={formatPrice(repair.total_amount)}
                />
              </Grid>

              <Grid item md={4}>
                <InfoItem
                  icon={<PaymentsOutlinedIcon fontSize='small' />}
                  label='مبلغ تخفیف'
                  value={formatPrice(repair.discount_amount)}
                />
              </Grid>

              <Grid item md={4}>
                <InfoItem
                  icon={<PaymentsOutlinedIcon fontSize='small' />}
                  label='مبلغ قابل پرداخت'
                  value={formatPrice(repair.payable_amount)}
                />
              </Grid>

              <Grid item md={6} className='invoice-description'>
                <Box
                  sx={{
                    height: 110,
                    mt: 2,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 3,
                    p: 3,
                    borderRadius: 1.5,
                    border: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'background.paper',
                    boxSizing: 'border-box'
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

                  <Box sx={{ minWidth: 0, flex: 1 }}>
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
                        whiteSpace: 'pre-wrap',
                        overflowWrap: 'anywhere'
                      }}
                    >
                      {repair.customer_description || '—'}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item md={6} className='invoice-signature'>
                <Box
                  sx={{
                    height: 110,
                    mt: 2,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 3,
                    p: 3,
                    borderRadius: 1.5,
                    border: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'background.paper',
                    boxSizing: 'border-box'
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
                    <BadgeOutlinedIcon />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant='caption'
                      color='text.secondary'
                      sx={{
                        display: 'block',
                        mb: 1
                      }}
                    >
                      امضای مسئول
                    </Typography>

                    <Box
                      sx={{
                        height: 55,
                        borderBottom: '1px dashed',
                        borderColor: 'text.secondary'
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 8mm;
          }

          html,
          body {
            direction: rtl;
            width: 100%;
            margin: 0 !important;
            padding: 0 !important;
          }

          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .repair-invoice-print .MuiGrid-item {
            box-sizing: border-box !important;
          }

          .repair-invoice-print .MuiGrid-item[class*='MuiGrid-grid-md-4'] {
            flex-basis: 33.333333% !important;
            max-width: 33.333333% !important;
          }

          .repair-invoice-print .MuiGrid-item[class*='MuiGrid-grid-md-6'] {
            flex-basis: 50% !important;
            max-width: 50% !important;
          }

          .repair-invoice-print .MuiGrid-item > * {
            width: 100% !important;
          }

          .repair-invoice-print {
            direction: rtl;
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            box-sizing: border-box;
          }

          .repair-invoice-print .invoice-header-grid {
            display: flex !important;
            flex-wrap: nowrap !important;
            width: 100% !important;
            align-items: center;
            direction: rtl;
          }

          .repair-invoice-print .invoice-header-logo {
            flex: 0 0 25% !important;
            max-width: 25% !important;
          }

          .repair-invoice-print .invoice-header-title {
            flex: 0 0 50% !important;
            max-width: 50% !important;
          }

          .repair-invoice-print .invoice-header-info {
            flex: 0 0 25% !important;
            max-width: 25% !important;
          }

          .repair-invoice-print .MuiCard-root {
            width: 100% !important;
            box-sizing: border-box;
          }

          .repair-invoice-print .repair-items-invoice-card {
            width: 100% !important;
          }

          .repair-invoice-print .repair-items-invoice-card .MuiCardHeader-root {
            margin-bottom: 0 !important;
          }

          .repair-invoice-print .repair-items-invoice-card .MuiCardHeader-root:first-child {
            padding: 8px 16px 4px !important;
            margin-bottom: 0 !important;
          }

          .repair-invoice-print .repair-items-invoice-card .MuiDivider-root {
            margin-bottom: 8px !important;
          }

          .repair-invoice-print
            .repair-items-invoice-card
            .MuiCardHeader-root
            + .MuiDivider-root
            + .MuiCardHeader-root {
            display: none !important;
          }

          .repair-invoice-print .repair-items-invoice-card .MuiCardHeader-title {
            font-size: 0.95rem !important;
            line-height: 1.4 !important;
          }

          .repair-invoice-print .repair-items-invoice-card .MuiCardHeader-subheader {
            font-size: 0.7rem !important;
            line-height: 1.3 !important;
          }

          .repair-invoice-print .repair-items-invoice-card .MuiTable-root {
            width: 100% !important;
            table-layout: fixed;
          }

          .repair-invoice-print .repair-items-invoice-card .MuiTableCell-root {
            padding: 7px 8px !important;
            white-space: normal;
            word-break: break-word;
          }

          .repair-invoice-print > .MuiCard-root:first-child {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .repair-invoice-print .repair-items-invoice-card {
            break-inside: auto !important;
            page-break-inside: auto !important;
          }

          .repair-invoice-print .MuiGrid-container {
            width: 100% !important;
          }

          .repair-invoice-print .invoice-header-info {
            flex: 0 0 25% !important;
            max-width: 25% !important;
          }

          .repair-invoice-print .invoice-header-info-item {
            width: 100% !important;
            max-width: 100% !important;
            flex-basis: 100% !important;
            box-sizing: border-box !important;
          }

          .repair-invoice-print .invoice-header-info-item > .MuiBox-root {
            width: 100% !important;
            height: 70px !important;
            min-height: 70px !important;
            box-sizing: border-box !important;
          }

          .repair-invoice-print .invoice-description > .MuiBox-root,
          .repair-invoice-print .invoice-signature > .MuiBox-root {
            height: 90px !important;
            min-height: 90px !important;
            margin-top: 0 !important;
            padding: 12px 16px !important;
            box-sizing: border-box !important;
          }

          .repair-invoice-print .invoice-description .MuiTypography-body1 {
            line-height: 1.5 !important;
          }

          .repair-invoice-print .invoice-signature .MuiBox-root:last-child {
            height: 45px !important;
          }

          .repair-invoice-print .invoice-footer-card {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .repair-invoice-print .invoice-footer-card .MuiCardContent-root {
            padding: 12px !important;
          }

          .repair-invoice-print .invoice-footer-card .MuiGrid-container {
            row-gap: 8px !important;
          }
        }
      `}</style>
    </>
  )
}
