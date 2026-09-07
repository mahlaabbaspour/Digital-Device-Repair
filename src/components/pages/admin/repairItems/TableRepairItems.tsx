'use client'

import { useEffect, useState } from 'react'

import { BiPlus } from 'react-icons/bi'

import { Button } from '@mui/material'

import CustomTable from '@/components/CustomTable'

import RepairItemsCreate from './CreateRepairItems'
import RepairItemsShow from './ShowRepairItems'
import RepairItemsEdit from './EditRepairItems'

import { useGetRepairItemsList } from '@/hooks/admin/repairItems/useRepairItems'

type RepairItemsTableProps = {
  repairId: number
  onTotalChange?: (total: number) => void
  operationMode?: 'all' | 'show' | 'none'
}

export default function RepairItemsTable({ repairId, onTotalChange, operationMode = 'all' }: RepairItemsTableProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [showId, setShowId] = useState<number | null>(null)

  const { data: repairItemsData } = useGetRepairItemsList(repairId)

  useEffect(() => {
    const items = repairItemsData?.data ?? []

    const total = items.reduce((sum: number, item: any) => {
      return sum + Number(item.total_price ?? 0)
    }, 0)

    onTotalChange?.(total)
  }, [repairItemsData, onTotalChange])

  const cardHeader = {
    status: true,

    btn:
      operationMode === 'all' ? (
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
      ) : null,

    placeholderSearch: null
  }

  const dataStruct = {
    rowId: ['id'],

    title: ['نوع', 'نام', 'تعداد', 'فی واحد', 'جمع', 'کارشناس'],

    name: [['repair_id'], ['name'], ['quantity'], ['unit_price'], ['total_price'], ['expert']],

    customCol: [
      null,
      null,
      null,
      (value: number) => Number(value).toLocaleString('en-US'),
      (value: number) => Number(value).toLocaleString('en-US'),
      null
    ],

    align: ['center', 'center', 'center', 'center', 'center', 'center'],

    width: ['10%', '20%', '10%', '20%', '20%', '20%'],

    sort: ['repair_id', 'name', 'quantity', 'unit_price', 'total_price', 'expert'],

    filter: [null, null, null, null, null]
  }

  const btnOperation = {
    status: () => operationMode !== 'none',

    show: () => operationMode !== 'none',

    edit: () => operationMode === 'all',

    delete: () => operationMode === 'all',

    onShow: (row: any) => {
      setShowId(row.id)
    },

    onEdit: (row: any) => {
      setEditId(row.id)
    }
  }

  return (
    <>
      <CustomTable
        hideSearch={operationMode === 'none'}
        hidePagination={operationMode === 'none'}
        titleTable={{
          title: 'کالا ها و خدمات تعمیر',
          description: 'اطلاعات ثبت شده کالاها و خدمات'
        }}
        checkboxEnabled={operationMode === 'all'}
        cardHeader={cardHeader}
        queryKey='repair-items'
        baseUrl={`/repair/${repairId}/repair-item`}
        dataStruct={dataStruct}
        sortConfig={{
          columnParam: 'order_by',
          directionParam: 'order'
        }}
        btnOperation={btnOperation}
      />

      {operationMode === 'all' && (
        <>
          <RepairItemsCreate
            open={open}
            repairId={repairId}
            onClose={() => {
              setOpen(false)
              setEditId(null)
            }}
          />

          <RepairItemsEdit open={!!editId} repairId={repairId} repairItemId={editId} onClose={() => setEditId(null)} />
        </>
      )}

      {operationMode !== 'none' && (
        <RepairItemsShow open={!!showId} repairId={repairId} repairItemId={showId} onClose={() => setShowId(null)} />
      )}
    </>
  )
}
