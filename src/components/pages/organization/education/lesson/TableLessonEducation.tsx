'use client'

import CustomTable from '@/components/elements/customTable/CustomTable'
import { Button } from '@mui/material'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { BiShowAlt } from 'react-icons/bi'
import { useState } from 'react'
import ModalLCreateLessonEducation from './ModalCreateLessonEducation'
import ModalUpdateLessonEducation from './ModalUpdateLessonEducation'

const dataStruct = {
  title: ['نام', 'زمان (ساعت)'],
  name: [['title'], ['duration']],
  align: ['', 'center', 'center'],
  filter: [true, true],
  sort: ['name', 'name'],
  rowId: ['id'],
  customCol: [([e]: any) => e, ([e]: any) => e]
}

export default function LessonEducationTable({ id, data }: any) {
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
      <ModalLCreateLessonEducation
        title='ایجاد دوره'
        description='می توانید دوره مورد نظر را ایجاد کنید'
        open={modalOpenCreate}
        onClose={() => setModalOpenCreate(false)}
        id={id}
        data={data}
      />
      <ModalUpdateLessonEducation
        action={action}
        currentRow={currentRow}
        title={`${action === 'edit' ? 'ویرایش دوره' : 'نمایش دوره'}`}
        description={`${action === 'edit' ? 'می توانید دوره مورد نظر را ویرایش کنید' : 'می توانید دوره مورد نظر را مشاهده کنید'}`}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        id={id}
        data={data}
      />
      <CustomTable
        baseUrl={`/organization/${id}/education/lesson/core/lesson`}
        queryKey='lessonEducation'
        textBtn=''
        btnShow={false}
        dataStruct={dataStruct}
        previousData={[]}
        checkboxEnabled={true}
        setCurrentRow={setCurrentRow}
        titleTable={{ title: 'اطاعات پایه دوره ها', description: 'می توانید فهرست اطاعات پایه دوره ها را مشاهده کنید' }}
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
              ایجاد دوره جدید
            </Button>
          )
        }}
      />
    </>
  )
}
