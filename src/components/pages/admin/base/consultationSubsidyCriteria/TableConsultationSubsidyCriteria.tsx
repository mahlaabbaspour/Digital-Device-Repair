'use client'

import CustomTable from '@/components/elements/customTable/CustomTable'
import { API_ROUTS_ADMIN } from '@/configs/urls'
import { Button } from '@mui/material'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { BiShowAlt } from 'react-icons/bi'
import { useState } from 'react'
import ModalCreateConsultationSubsidyCriteria from './ModalCreateConsultationSubsidyCriteria'
import ModalUpdateConsultationSubsidyCriteria from './ModalUpdateConsultationSubsidyCriteria'

const dataStruct = {
  title: ['نام', 'امتیاز'],
  name: [['name'], ['score']],
  align: ['', 'center', 'center'],
  filter: [true, true],
  sort: ['name', 'score'],
  rowId: ['id'],
  customCol: [([e]: any) => e, ([e]: any) => e]
}

export default function ConsultationSubsidyCriteriaTable() {
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
      <ModalCreateConsultationSubsidyCriteria
        title='ایجاد شاخص های ارزیابی مشاوره'
        description='می توانید شاخص های ارزیابی مشاوره مورد نظر را ایجاد کنید'
        open={modalOpenCreate}
        onClose={() => setModalOpenCreate(false)}
      />
      <ModalUpdateConsultationSubsidyCriteria
        action={action}
        currentRow={currentRow}
        title={`${action === 'edit' ? 'ویرایش شاخص های ارزیابی مشاوره' : 'نمایش  شاخص های ارزیابی مشاوره'}`}
        description={`${action === 'edit' ? 'می توانید شاخص ارزیابی مورد نظر را ویرایش کنید' : 'می توانید شاخص ارزیابی مورد نظر را مشاهده کنید'}`}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <CustomTable
        baseUrl={API_ROUTS_ADMIN.BASE_CONSULTATION_SUBSIDY_CRITERION}
        queryKey='consultationSubsidyCriteria'
        textBtn=''
        btnShow={false}
        dataStruct={dataStruct}
        previousData={[]}
        checkboxEnabled={true}
        setCurrentRow={setCurrentRow}
        titleTable={{
          title: 'شاخص های ارزیابی',
          description: 'می توانید فهرست شاخص های ارزیالی مشاوره را مشاهده کنید'
        }}
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
              ایجاد شاخص های ارزیابی
            </Button>
          )
        }}
      />
    </>
  )
}
