'use client'

import { useState } from 'react'

import { Button, Chip } from '@mui/material'

import { BiPlus } from 'react-icons/bi'

import Breadcrumb from '@/components/Breadcrumb'
import CustomTable from '@/components/CustomTable'
import ProductShow from './ShowProduct'
import ProductCreate from './CreateProduct'
import ProductEdit from './EditProduct'

export default function ProductTable() {
  const [open, setOpen] = useState<boolean>(false)

  const [editId, setEditId] = useState<number | null>(null)
  const [showId, setShowId] = useState<number | null>(null)

  const items = [{ title: 'داشبورد', to: '/admin' }, { title: 'کالاها' }]

  const cardHeader = {
    status: true,
    btn: (
      <Button
        variant='contained'
        onClick={() => {
          setEditId(null)
          setOpen(true)
        }}
        startIcon={<BiPlus />}
      >
        ایجاد کالا
      </Button>
    ),
    placeholderSearch: null
  }

  const dataStruct = {
    rowId: ['id'],

    title: ['نام', 'موجودی', 'وضعیت'],

    name: [['name'], ['stock'], ['status']],

    customCol: [
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

    align: ['center', 'center', 'center'],

    width: ['35%', '35%', '30%'],

    sort: ['name', 'stock', 'status'],

    filter: [null, null, null]
  }

  return (
    <>
      <Breadcrumb items={items} />

      <CustomTable
        titleTable={{
          title: 'فهرست کالاها',
          description: 'تمام کالاهای ثبت شده'
        }}
        checkboxEnabled={true}
        cardHeader={cardHeader}
        queryKey='product'
        baseUrl='/product'
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

      <ProductCreate
        open={open}
        onClose={() => {
          setOpen(false)
          setEditId(null)
        }}
      />
      <ProductShow open={!!showId} id={showId} onClose={() => setShowId(null)} />
      <ProductEdit open={!!editId} id={editId} onClose={() => setEditId(null)} />
    </>
  )
}
