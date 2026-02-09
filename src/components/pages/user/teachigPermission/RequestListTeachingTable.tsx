'use client'

import CustomChip from '@/@core/components/mui/chip/index'
import CustomTable from '@/components/elements/customTable/CustomTable'
import { useRouter } from 'next/navigation'

const dataStruct = {
  title: ['شماره مجوز فعالیت', 'محل اشتغال', , 'تاریخ مجوز و تاریخ انقضای مجوز', 'وضعیت'],
  name: [
    ['number_permission_activity'],
    ['employment_locality_name'],
    ['activity_permission_date', 'activity_expiration_date'],
    ['requestTeachingPermissionStatus']
  ],
  align: ['', 'center', 'center', 'center', 'center'],
  filter: [true, true, true, true],
  sort: ['document_number', 'last_name', 'mobile', 'status'],
  rowId: ['id'],
  customCol: [
    ([e]: any) => e,
    ([e]: any) => (e ? e : ''),
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

export default function RequestListTeachingTable({ id }: any) {
  const router = useRouter()

  return (
    <>
      <CustomTable
        baseUrl={`/user/${id}/education/request-teaching-permission/core/request-teaching-permission`}
        queryKey='document'
        textBtn='ایجاد درخواست'
        btnShow={true}
        dataStruct={dataStruct}
        previousData={[]}
        checkboxEnabled={false}
        titleTable={{
          title: 'فهرست درخواست های تدریس',
          description: 'می توانید فهرست درخواست های تدریس را مشاهده کنید'
        }}
        btnOperation={{
          status: () => true,
          delete: () => true,
          edit: () => true,
          show: () => true
        }}
      />
    </>
  )
}
