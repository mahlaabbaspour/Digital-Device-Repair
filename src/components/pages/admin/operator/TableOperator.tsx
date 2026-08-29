'use client'

import { useState } from 'react'

import { Button, Chip } from '@mui/material'

import { BiPlus } from 'react-icons/bi'

import Breadcrumb from '@/components/Breadcrumb'
import CustomTable from '@/components/CustomTable'
import OperatorCreate from './CreateOperator'
import OperatorShow from './ShowOperator'
import OperatorEdit from './EditOperator'

export default function OperatorTable() {
  const [open, setOpen] = useState<boolean>(false)

  const [editId, setEditId] = useState<number | null>(null)
  const [showId, setShowId] = useState<number | null>(null)

  const items = [{ title: 'داشبورد', to: '/admin' }, { title: 'اپراتورها' }]

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
        ایجاد اپراتور
      </Button>
    ),
    placeholderSearch: null
  }

  const dataStruct = {
    rowId: ['id'],

    title: ['نام و نام خانوادگی', 'وضعیت'],

    name: [['first_name'], ['status']],

    customCol: [
      (_value: any[], _index: number, row: any) => {
        return `${row.first_name} ${row.last_name}`
      },

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

    align: ['center', 'center'],

    width: ['25%', '25%'],

    sort: ['first_name', 'status'],

    filter: [null, null]
  }

  return (
    <>
      <Breadcrumb items={items} />

      <CustomTable
        titleTable={{
          title: 'فهرست اپراتور',
          description: 'تمام اپراتور ثبت شده'
        }}
        checkboxEnabled={true}
        cardHeader={cardHeader}
        queryKey='operator'
        baseUrl='/operator'
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

      <OperatorCreate
        open={open}
        onClose={() => {
          setOpen(false)
          setEditId(null)
        }}
      />
      <OperatorShow open={!!showId} id={showId} onClose={() => setShowId(null)} />
      <OperatorEdit open={!!editId} id={editId} onClose={() => setEditId(null)} />
    </>
  )
}
