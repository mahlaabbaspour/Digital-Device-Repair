'use client'

import CustomTable from '@/components/elements/customTable/CustomTable'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BiErrorCircle } from 'react-icons/bi'
import ObjectionReviewModal from './ObjectionReview'

const dataStruct = {
  title: ['شماره مجوز فعالیت', 'محل اشتغال', , 'تاریخ مجوز و تاریخ انقضای مجوز'],
  name: [
    ['number_permission_activity'],
    ['employment_locality_name'],
    ['activity_permission_date', 'activity_expiration_date']
  ],
  align: ['', 'center', 'center', 'center'],
  filter: [true, true, true],
  sort: ['document_number', 'last_name', 'mobile'],
  rowId: ['id'],
  customCol: [([e]: any) => e, ([e]: any) => e, ([e, v]: any) => `${e} _ ${v}`]
}

export default function TeachingPermissionRejectTable({ id }: any) {
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
      <ObjectionReviewModal id={id} rowSelect={row} open={modalOpen} onClose={() => setModalOpen(false)} />
      <CustomTable
        baseUrl={`/organization/${id}/education/request-teaching-permission/core/request-teaching-permission/index-reject`}
        queryKey='TeachingPermissionRevision'
        textBtn=''
        btnShow={false}
        dataStruct={dataStruct}
        previousData={[]}
        checkboxEnabled={false}
        titleTable={{
          title: 'فهرست درخواست های رد شده',
          description: 'می توانید فهرست درخواست های رد شده را مشاهده کنید'
        }}
        btnOperation={{
          status: () => true,
          delete: () => false,
          edit: () => false,
          show: () => true
        }}
        customOperation={[
          {
            icon: <BiErrorCircle />,
            onClick: (row: any) => openModal(row),
            if: (row: any) => row?.objection_description,
            color: 'error',
            title: 'بررسی اعتراض'
          }
        ]}
      />
    </>
  )
}
