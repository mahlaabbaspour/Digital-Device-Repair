'use client'

import { useState } from 'react'

import { BiPlus } from 'react-icons/bi'

import { Button, Chip } from '@mui/material'

import CustomTable from '@/components/CustomTable'

import RepairItemsCreate from './CreateRepairItems'
import RepairItemsShow from './ShowRepairItems'
import RepairItemsEdit from './EditRepairItems'

type RepairItemsTableProps = {
  repairId: number
}

export default function RepairItemsTable({ repairId }: RepairItemsTableProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [showId, setShowId] = useState<number | null>(null)

  console.log('repairId:', repairId)

  const cardHeader = {
    status: true,
    btn: (
      <Button
        variant='contained'
        startIcon={<BiPlus />}
        onClick={() => {
          setEditId(null)
          setOpen(true)
        }}
      >
        ایجاد
      </Button>
    ),
    placeholderSearch: null
  }

  const dataStruct = {
    rowId: ['id'],
    title: ['نوع', 'نام', 'تعداد', 'کارشناس', 'وضعیت'],
    name: [['type'], ['name'], ['quantity'], ['expert'], ['status']],
    customCol: [
      null,
      null,
      null,
      null,
      (value: any[]) => {
        const status = value[0]

        return (
          <Chip
            label={status ? 'فعال' : 'غیرفعال'}
            color={status ? 'success' : 'error'}
            size='small'
            variant='outlined'
          />
        )
      }
    ],
    align: ['center', 'center', 'center', 'center', 'center'],
    width: ['20%', '20%', '20%', '20%', '20%'],
    sort: ['type', 'name', 'quantity', 'expert', 'status'],
    filter: [null, null, null, null, null]
  }

  return (
    <>
      <CustomTable
        titleTable={{
          title: 'کالا ها و خدمات تعمیر',
          description: 'اطلاعات ثبت شده کالاها و خدمات'
        }}
        checkboxEnabled={true}
        cardHeader={cardHeader}
        queryKey='repair-items'
        baseUrl={`/repair/${repairId}/repair-item`}
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
            setShowId(row.id)
          },
          onEdit: (row: any) => {
            setEditId(row.id)
          }
        }}
      />

      <RepairItemsCreate
        open={open}
        repairId={repairId}
        onClose={() => {
          setOpen(false)
          setEditId(null)
        }}
      />

      <RepairItemsShow open={!!showId} repairId={repairId} repairItemId={showId} onClose={() => setShowId(null)} />

      <RepairItemsEdit open={!!editId} repairId={repairId} repairItemId={editId} onClose={() => setEditId(null)} />
    </>
  )
}
