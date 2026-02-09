'use client'

import CustomChip from '@/@core/components/mui/chip/index'
import CustomTable from '@/components/elements/customTable/CustomTable'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BiAdjust } from 'react-icons/bi'
import RequestPermissionHoldModal from './RequestPermissionHoldModal'

const dataStruct = {
  title: ['عنوان دوره', 'هزینه دوره', , 'زمان شروع و پایان ثبت نام', 'وضعیت'],
  name: [['title'], ['course_fee'], ['registration_start_at', 'registration_end_at'], ['courseStatus']],
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

export default function TableEducationalCourse({ id }: any) {
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
      <RequestPermissionHoldModal id={id} rowSelect={row} open={modalOpen} onClose={() => setModalOpen(false)} />
      <CustomTable
        baseUrl={`/institution/${id}/education/course/core/course`}
        queryKey='educationalCourse'
        textBtn='ایجاد دوره'
        btnShow={true}
        dataStruct={dataStruct}
        previousData={[]}
        checkboxEnabled={false}
        titleTable={{
          title: 'فهرست دوره های آموزشی',
          description: 'می توانید فهرست دوره های آموزشی را مشاهده کنید'
        }}
        btnOperation={{
          status: () => true,
          delete: () => true,
          edit: () => true,
          show: () => true
        }}
        customOperation={[
          {
            icon: <BiAdjust />,
            onClick: (row: any) => openModal(row),
            if: () => true,
            color: 'info',
            title: 'درخواست مجوز برگذاری دوره'
          }
        ]}
      />
    </>
  )
}
