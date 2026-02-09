'use client'

import CustomChip from '@/@core/components/mui/chip/index'
import CustomTable from '@/components/elements/customTable/CustomTable'
import { CheckBoxTwoTone } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BiGame } from 'react-icons/bi'
import CourseStatusDeterminationModal from './CourseStatusDeterminationModal'

const dataStruct = {
  title: ['عنوان دوره', 'هزینه دوره', , 'تاریخ مجوز و تاریخ انقضای مجوز', 'وضعیت'],
  name: [['title'], ['course_fee'], ['activity_permission_date', 'activity_expiration_date'], ['courseStatus']],
  align: ['', 'center', 'center', 'center', 'center'],
  filter: [true, true, true, true],
  sort: ['document_number', 'last_name', 'mobile', 'courseStatus'],
  rowId: ['id'],
  customCol: [
    ([e]: any) => e,
    ([e]: any) => e,
    ([e, v]: any) => `${e ?? ''} _ ${v ?? ''}`,
    ([e]: any) => {
      return (
        <CustomChip
          label={e?.name}
          color={
            e?.id === 1
              ? 'secondary'
              : e?.id === 2
                ? 'warning'
                : e?.id === 3
                  ? 'info'
                  : e?.id === 4
                    ? 'success'
                    : e?.id === 5
                      ? 'error'
                      : 'primary'
          }
          skin='light'
          variant='outlined'
        />
      )
    }
  ]
}

export default function TableCoursePendingApproval({ id }: any) {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const [row, setRow] = useState(null)
  console.log(row, 'row')

  const openModal = (row: any) => {
    setRow(row)
    setModalOpen(true)
  }

  return (
    <>
      <CourseStatusDeterminationModal id={id} rowSelect={row} open={modalOpen} onClose={() => setModalOpen(false)} />
      <CustomTable
        baseUrl={`/organization/${id}/education/course/core/course`}
        queryKey='coursePendingApproval'
        textBtn='ایجاد دوره'
        btnShow={true}
        dataStruct={dataStruct}
        previousData={[]}
        checkboxEnabled={false}
        titleTable={{
          title: 'فهرست دوره های در انتظار صدور مجوز',
          description: 'می توانید فهرست دوره های در انتظار صدور مجوز را مشاهده کنید'
        }}
        btnOperation={{
          status: () => true,
          delete: () => false,
          edit: () => false,
          show: () => true
        }}
        customOperation={[
          {
            icon: <CheckBoxTwoTone />,
            onClick: (row: any) => openModal(row),
            if: () => true,
            color: 'info',
            title: 'تعیین وضعیت دوره'
          }
        ]}
      />
    </>
  )
}
