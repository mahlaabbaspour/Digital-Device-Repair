'use client'

import CustomTable from '@/components/elements/customTable/CustomTable'
import { Button } from '@mui/material'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { BiCreditCard, BiShowAlt } from 'react-icons/bi'
import { useState } from 'react'
import ModalLCreateSubsidyCredit from './ModalCreateSubsidyCredit'
import ModalUpdateSubsidyCredit from './ModalUpdateSubsidyCredit'
import { useRouter } from 'next/navigation'

const dataStruct = {
  title: ['نام', 'زمان شروع', 'زمان پایان', 'مبلغ'],
  name: [['title'], ['start_time'], ['end_time'], ['final_price']],
  align: ['', 'center', 'center', 'center', 'center'],
  filter: [true, true, true, true],
  sort: ['name', 'name', 'name', 'name'],
  rowId: ['id', 'id', 'id', 'id'],
  customCol: [
    ([e]: any) => e,
    ([e]: any) => e,
    ([e]: any) => e,
    ([e]: any) => `${Number(e).toLocaleString('fa-IR')} ریال`
  ]
}

export default function SubsidyCreditTable({ id }: any) {
  const router = useRouter()
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
      <ModalLCreateSubsidyCredit
        title='ایجاد اعتبارات یارانه'
        description='می توانید اعتبار یارانه مورد نظر را ایجاد کنید'
        open={modalOpenCreate}
        onClose={() => setModalOpenCreate(false)}
        id={id}
      />
      <ModalUpdateSubsidyCredit
        action={action}
        currentRow={currentRow}
        title={`${action === 'edit' ? 'ویرایش سازمان مخاطب' : 'نمایش سازمان مخاطب'}`}
        description={`${action === 'edit' ? 'می توانید سازمان مخاطب مورد نظر را ویرایش کنید' : 'می توانید سازمان مخاطب مورد نظر را مشاهده کنید'}`}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        id={id}
      />
      <CustomTable
        baseUrl={`/organization/${id}/credit/core/credit`}
        queryKey='subsidyCredit'
        textBtn=''
        btnShow={false}
        dataStruct={dataStruct}
        previousData={[]}
        checkboxEnabled={true}
        setCurrentRow={setCurrentRow}
        titleTable={{ title: 'اعتبارات یارانه', description: 'می توانید فهرست اعتبارات یارانه را مشاهده کنید' }}
        btnOperation={{
          status: () => true,
          delete: () => true,
          edit: () => false,
          show: () => false
        }}
        customOperation={[
          {
            icon: <BiCreditCard />,
            onClick: (row: any) =>
              router.push(`/organization/${id}/consultationSubsidy/subsidyCredit/${row?.id}/creditAllocations`),
            if: () => true,
            color: 'info',
            title: 'تخصیص اعتبار'
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
              ایجاد اعتبار
            </Button>
          )
        }}
      />
    </>
  )
}
