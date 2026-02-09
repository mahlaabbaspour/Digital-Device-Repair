'use client'

import CustomTable from '@/components/elements/customTable/CustomTable'
import { API_ROUTS_ADMIN } from '@/configs/urls'
import { Button } from '@mui/material'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { BiShowAlt } from 'react-icons/bi'
import { useState } from 'react'
import ModalLCreateRace from './ModalCreateRace'
import ModalUpdateRace from './ModalUpdateRace'

const dataStruct = {
  title: ['نام'],
  name: [['name']],
  align: ['', 'center'],
  filter: [true],
  sort: ['name'],
  rowId: ['id'],
  customCol: [([e]: any) => e]
}

export default function RaceTable() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalOpenCreate, setModalOpenCreate] = useState(false)
  const [action, setAction] = useState<'edit' | 'show' | null>(null)
  console.log(action, 'action')
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
      <ModalLCreateRace
        title='ایجاد نژاد'
        description='می توانید نژاد مورد نظر را ایجاد کنید'
        open={modalOpenCreate}
        onClose={() => setModalOpenCreate(false)}
      />
      <ModalUpdateRace
        action={action}
        currentRow={currentRow}
        title={`${action === 'edit' ? 'ویرایش نژاد' : 'نمایش نژاد'}`}
        description={`${action === 'edit' ? 'می توانید نژاد مورد نظر را ویرایش کنید' : 'می توانید نژاد مورد نظر را مشاهده کنید'}`}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <CustomTable
        baseUrl={API_ROUTS_ADMIN.RACE_BASE}
        queryKey='race'
        textBtn=''
        btnShow={false}
        dataStruct={dataStruct}
        previousData={[]}
        checkboxEnabled={true}
        setCurrentRow={setCurrentRow}
        titleTable={{ title: 'نژاد ها', description: 'می توانید فهرست نژاد ها را مشاهده کنید' }}
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
              ایجاد نژاد جدید
            </Button>
          )
        }}
      />
    </>
  )
}
