'use client'

import { useState } from 'react'

import { HiOutlinePencilAlt } from 'react-icons/hi'
import { BiShowAlt } from 'react-icons/bi'

import { API_ROUTS_ADMIN } from '@/configs/urls'

import { Button, Typography } from '@mui/material'
import CustomTable from '@/components/elements/customTable/CustomTable'
import ModalCreateAdvistor from './ModalCreateAdvistor'
import ModalUpdateAdvistor from './ModalUpdateAdvistor'

const dataStruct = {
  title: ['مشاور', 'حیطه های مشاوره'],
  name: [['first_name', 'last_name', 'username'], ['activityFieldAreas']],
  align: ['', 'center', 'center'],
  filter: [true, true],
  sort: ['name', 'name'],
  rowId: ['id'],
  customCol: [
    ([e, c, d]: any) => `${e} ${c}-${d}`,
    ([e]: any) =>
      e && Array.isArray(e) ? (
        e.map((el: any, i: number) => (
          <Typography key={i} component='span' sx={{ mx: 0.5 }}>
            {el?.name}-
          </Typography>
        ))
      ) : (
        <Typography>-</Typography>
      )
  ]
}

export default function AdvistorTable() {
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
      <ModalCreateAdvistor
        title='ایجاد مشاور'
        description='می توانید مشاور مورد نظر را ایجاد کنید'
        open={modalOpenCreate}
        onClose={() => setModalOpenCreate(false)}
      />
      <ModalUpdateAdvistor
        action={action}
        currentRow={currentRow}
        title={`${action === 'edit' ? 'ویرایش مشاور' : 'نمایش مشاور'}`}
        description={`${action === 'edit' ? 'می توانید مشاور مورد نظر را ویرایش کنید' : 'می توانید مشاور مورد نظر را مشاهده کنید'}`}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <CustomTable
        baseUrl={API_ROUTS_ADMIN.ADVISTOR_BASE}
        queryKey='advistor'
        textBtn=''
        btnShow={false}
        dataStruct={dataStruct}
        previousData={[]}
        checkboxEnabled={true}
        setCurrentRow={setCurrentRow}
        titleTable={{ title: 'مشاوران', description: 'می توانید فهرست مشاوران فعالیت را مشاهده کنید' }}
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
              ایجاد مشاور
            </Button>
          )
        }}
      />
    </>
  )
}
