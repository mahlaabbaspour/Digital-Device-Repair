'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { BiShowAlt } from 'react-icons/bi'
import { FaNetworkWired } from 'react-icons/fa'
import { HiOutlinePencilAlt } from 'react-icons/hi'

import { API_ROUTS_ADMIN } from '@/configs/urls'

import CustomTable from '@/components/elements/customTable/CustomTable'
import ModalCreateAreasActivity from './ModalCreateAreasActivity'
import ModalUpdateAreasActivity from './ModalUpdateAreasActivity'
import { Button } from '@mui/material'

const dataStruct = {
  title: ['نام'],
  name: [['name']],
  align: ['', 'center'],
  filter: [true],
  sort: ['name'],
  rowId: ['id'],
  customCol: [([e]: any) => e]
}

export default function AreasActivityTable() {
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

  const router = useRouter()

  return (
    <>
      <ModalCreateAreasActivity
        title='ایجاد حیطه فعالیت'
        description='می توانید حیطه فعالیت مورد نظر را ایجاد کنید'
        open={modalOpenCreate}
        onClose={() => setModalOpenCreate(false)}
      />
      <ModalUpdateAreasActivity
        action={action}
        currentRow={currentRow}
        title={`${action === 'edit' ? 'ویرایش  حیطه فعالیت' : 'نمایش  حیطه فعالیت'}`}
        description={`${action === 'edit' ? 'می توانید حیطه فعالیت مورد نظر را ویرایش کنید' : 'می توانید حیطه فعالیت مورد نظر را مشاهده کنید'}`}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <CustomTable
        baseUrl={API_ROUTS_ADMIN.AREASACTIVITY_BASE}
        queryKey='areasActivity'
        textBtn=''
        btnShow={false}
        dataStruct={dataStruct}
        previousData={[]}
        checkboxEnabled={true}
        setCurrentRow={setCurrentRow}
        titleTable={{ title: 'حیطه های فعالیت', description: 'می توانید فهرست حیطه های فعالیت را مشاهده کنید' }}
        btnOperation={{
          status: () => true,
          delete: () => true,
          edit: () => false,
          show: () => false
        }}
        customOperation={[
          {
            icon: <FaNetworkWired />,
            onClick: (row: any) => router.push(`/admin/base/areasActivity/${row?.id}/fieldActivity`),
            if: () => true,
            color: 'success',
            title: 'حوزه های حیطه فعالیت'
          },
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
              ایجاد حیطه فعالیت جدید
            </Button>
          )
        }}
      />
    </>
  )
}
