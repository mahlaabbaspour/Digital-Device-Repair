'use client'

import { useRouter } from 'next/navigation'

import { Button, Chip } from '@mui/material'

import { BiPlus } from 'react-icons/bi'

import Breadcrumb from '@/components/Breadcrumb'
import CustomTable from '@/components/CustomTable'

import { useGetRepairsUpsertData } from '@/hooks/admin/upsertData/useUpsertData'

export default function RepairsTable() {
  const router = useRouter()

  const items = [{ title: 'داشبورد', to: '/admin' }, { title: 'تعمیرات' }]

  const { data: upsertData } = useGetRepairsUpsertData()

  const statusCodes = upsertData?.data?.status_codes ?? []

  const cardHeader = {
    status: true,

    btn: (
      <Button
        variant='contained'
        startIcon={<BiPlus />}
        onClick={() => {
          router.push('/admin/repairs/create')
        }}
      >
        ایجاد تعمیر
      </Button>
    ),

    placeholderSearch: null
  }

  const dataStruct = {
    rowId: ['id'],

    title: ['نام دستگاه', 'نام مشتری', 'وضعیت'],

    name: [['name'], ['customer_code'], ['status_code']],

    customCol: [
      null,
      null,
      (value: any[]) => {
        const statusName = value?.[0]

        const status = statusCodes.find((item: any) => item.name === statusName)

        return (
          <Chip
            label={status?.name ?? '-'}
            size='small'
            variant='outlined'
            color={
              status
                ? status.id === 1
                  ? 'primary'
                  : status.id === 2
                    ? 'warning'
                    : status.id === 3
                      ? 'success'
                      : status.id === 4
                        ? 'error'
                        : 'default'
                : 'default'
            }
          />
        )
      }
    ],

    align: ['center', 'center', 'center'],

    width: ['25%', '25%', '25%'],

    sort: ['name', 'customer', 'status_code'],

    filter: [null, null, null, null]
  }

  return (
    <>
      <Breadcrumb items={items} />

      <CustomTable
        titleTable={{
          title: 'فهرست تعمیرات',
          description: 'تمام تعمیرات ثبت شده'
        }}
        checkboxEnabled={true}
        cardHeader={cardHeader}
        queryKey='repair'
        baseUrl='/repair'
        dataStruct={dataStruct}
        sortConfig={{
          columnParam: 'order_by',
          directionParam: 'order'
        }}
        btnOperation={{
          status: () => true,
          delete: () => true,
          edit: () => true,
          show: () => true,

          onShow: (row: any) => {
            router.push(`/admin/repairs/${row.id}/show`)
          },

          onEdit: (row: any) => {
            router.push(`/admin/repairs/${row.id}/edit`)
          }
        }}
      />
    </>
  )
}
