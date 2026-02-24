'use client'

import InfoBox from '@/components/elements/InfoBox'
import { Box, Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import { BiCreditCard, BiMoney, BiTime, BiShowAlt, BiWallet } from 'react-icons/bi'
import TableReceivedCredits from './ReceivedCreditsTable'
import CustomTable from '@/components/elements/customTable/CustomTable'
import { useState } from 'react'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import ModalCreateCreditAllocation from './CreateCreditAllocationModal'
import ModalUpdateCreditAllocation from './UpdateCreditAllocationModal'

const dataStruct = {
  title: ['زمان', 'تخصیص گیرنده', 'مبلغ', 'مانده'],
  name: [['allocated_at'], ['allocatee.name'], ['price'], ['price']],
  align: ['', 'center', 'center', 'center'],
  filter: [true, true, true, true],
  sort: ['name', 'name', 'name', 'name'],
  rowId: ['id', 'id', 'id', 'id'],
  customCol: [
    ([e]: any) => e,
    ([e]: any) => e,
    ([e]: any) => `${Number(e).toLocaleString('fa-IR')} ریال`,
    ([e]: any) => `${Number(e).toLocaleString('fa-IR')} ریال`
  ]
}

export default function CreditAllocationsCard({ creditId, id, show, data }: any) {
  console.log(show, data, 'show')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalOpenCreate, setModalOpenCreate] = useState(false)
  const [action, setAction] = useState<'edit' | 'show' | null>(null)
  const [currentRow, setCurrentRow] = useState<any>(null)
  const openEditModal = (row: any) => {
    setAction('edit')
    setCurrentRow(row)
    setModalOpen(true)
  }

  const openShowModal = (row: any) => {
    setAction('show')
    setCurrentRow(row)
    setModalOpen(true)
  }

  const openCreateModal = () => {
    setModalOpenCreate(true)
  }

  return (
    <>
      <ModalCreateCreditAllocation
        title='ایجاد تخصیص یارانه'
        description='می توانید اعتبار یارانه مورد نظر را ایجاد کنید'
        open={modalOpenCreate}
        onClose={() => setModalOpenCreate(false)}
        id={id}
        creditId={creditId}
        show={show}
      />
      <ModalUpdateCreditAllocation
        action={action}
        currentRow={currentRow}
        title={`${action === 'edit' ? 'ویرایش اعتبار یارانه' : 'نمایش اعتبار یارانه'}`}
        description={`${action === 'edit' ? 'می توانید اعتبار یارانه مورد نظر را ویرایش کنید' : 'می توانید اعتبار یارانه مورد نظر را مشاهده کنید'}`}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        id={id}
        creditId={creditId}
      />
      <Card
        sx={{
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
        }}
      >
        <CardHeader
          sx={{ textAlign: 'center', pb: 0 }}
          title={
            <Typography variant='h6' fontWeight='bold'>
              اطلاعات اعتبار
            </Typography>
          }
          subheader={
            <Typography variant='caption' color='text.secondary'>
              می توانید اطلاعات اعتبار را مشاهده کنید
            </Typography>
          }
        />

        <CardContent sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <InfoBox
                icon={<BiCreditCard size={34} color='#2e7d32' />}
                title='عنوان'
                value={show?.title ? show?.title : ''}
                // subValue={show ? `${show?.evaluationInstitution?.name}` : '—'}
                bg='#eef7f0'
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <InfoBox
                icon={<BiTime size={34} color='#0288d1' />}
                title='زمان شروع / زمان پایان اعتبار'
                value={`${show?.end_time} تا ${show?.start_time}`}
                subValue={'مدت انقضا یارانه '}
                bg='#eef5fb'
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <InfoBox
                icon={<BiMoney size={34} color='#2e7d32' />}
                title='مبلغ کل'
                value={show?.final_price ? `${Number(show?.final_price).toLocaleString('fa-IR')} ریال` : ''}
                // subValue={show ? `${show?.meeting_count} جلسه` : ''}
                bg='#eef7f0'
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <InfoBox
                icon={<BiWallet size={34} color='#ef6c00' />}
                title='مانده'
                value={`${Number(show?.remaining_credit).toLocaleString('fa-IR')} ریال`}
                // subValue={show ? show?.consultationSubsidyType?.name : ''}
                bg='#fff4eb'
              />
            </Grid>
          </Grid>
        </CardContent>

        <CardContent>
          <TableReceivedCredits
            columns={[
              { label: 'زمان', key: ['allocated_at'] },
              { label: 'تخصیص دهنده', key: ['allocator.name'] },
              {
                label: 'مبلغ',
                key: ['price'],
                render: (value: any, row: any) => <Box>{`${Number(value).toLocaleString('fa-IR')} ریال`}</Box>
              },
              {
                label: 'مانده',
                key: ['allocator.remaining_credit'],
                render: (value: any, row: any) => (
                  <Box>{value ? `${Number(value).toLocaleString('fa-IR')} ریال ` : '__'}</Box>
                )
              }
            ]}
            title='فهرست جلسات حضوری'
            description='می توانید فهرست جلسات حضوری را مشاهده کنید'
            rows={data}
            isLoading={false}
            id={id}
            upsertData={[]}
            disabled={false}
          />
        </CardContent>
      </Card>

      <Card sx={{ mt: 10 }}>
        <CustomTable
          baseUrl={`/organization/${id}/credit/core/credit/${creditId}/credit-allocation/index-allocator`}
          queryKey='creditAllocation'
          textBtn=''
          btnShow={false}
          dataStruct={dataStruct}
          previousData={[]}
          checkboxEnabled={true}
          setCurrentRow={setCurrentRow}
          titleTable={{ title: 'تخصیص اعتبارات', description: 'می توانید فهرست تخصیص اعتبارات را مشاهده کنید' }}
          btnOperation={{
            status: () => true,
            delete: () => true,
            edit: () => false,
            show: () => false
          }}
          customOperation={[
            {
              icon: <HiOutlinePencilAlt />,
              onClick: (row: any) => openEditModal(row),
              if: () => true,
              color: 'primary',
              title: 'ویرایش'
            },
            {
              icon: <BiShowAlt />,
              onClick: (row: any) => openShowModal(row),
              if: () => true,
              color: 'warning',
              title: 'نمایش'
            }
          ]}
          cardHeader={{
            status: true,
            btn: (
              <Button variant='contained' color='primary' onClick={() => openCreateModal()}>
                تخصیص اعتبار
              </Button>
            )
          }}
        />
      </Card>
    </>
  )
}
