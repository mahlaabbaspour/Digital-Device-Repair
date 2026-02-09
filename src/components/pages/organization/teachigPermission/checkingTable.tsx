'use client'

import CustomTable from '@/components/elements/customTable/CustomTable'
import { useRouter } from 'next/navigation'
import { RiCheckboxCircleLine } from 'react-icons/ri'

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
  customCol: [([e]: any) => e, ([e]: any) => e, ([e, v]: any) => `${e ?? ''} _ ${v ?? ''}`]
}

export default function TeachingPermissionCheckingTable({ id }: any) {
  const router = useRouter()

  return (
    <>
      <CustomTable
        baseUrl={`/organization/${id}/education/request-teaching-permission/core/request-teaching-permission`}
        queryKey='TeachingPermissionRevision'
        textBtn=''
        btnShow={false}
        dataStruct={dataStruct}
        previousData={[]}
        checkboxEnabled={false}
        titleTable={{
          title: 'فهرست درخواست های در دست بررسی',
          description: 'می توانید فهرست درخواست های در دست بررسی را مشاهده کنید'
        }}
        btnOperation={{
          status: () => true,
          delete: () => false,
          edit: () => false,
          show: () => false
        }}
        customOperation={[
          {
            icon: <RiCheckboxCircleLine />,
            onClick: (row: any) =>
              router.push(`/organization/${id}/teachigPermission/requestListRevision/${row?.id}/revision`),
            if: () => true,
            color: 'success',
            title: 'بررسی درخواست'
          }
        ]}
      />
    </>
  )
}
