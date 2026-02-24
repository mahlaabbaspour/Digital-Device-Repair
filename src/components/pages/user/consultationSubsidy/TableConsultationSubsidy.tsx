'use client'

import CustomChip from '@/@core/components/mui/chip/index'
import CustomTable from '@/components/elements/customTable/CustomTable'
import { useRouter } from 'next/navigation'

const dataStruct = {
  title: ['نام', 'درصد یارانه مشاوره', , 'تعداد جلسات', 'وضعیت'],
  name: [['name'], ['subsidy_percentage'], ['meeting_count'], ['consultationSubsidyStatus']],
  align: ['', 'center', 'center', 'center', 'center'],
  filter: [true, true, true, true],
  sort: ['document_number', 'last_name', 'mobile', 'status'],
  rowId: ['id'],
  customCol: [
    ([e]: any) => e,
    ([e]: any) => `${e}%`,
    ([e]: any) => e,
    ([e]: any) => {
      return (
        <CustomChip
          label={`${e?.name}`}
          color={
            e?.id === 1 ? 'success' : e?.id === 4 ? 'error' : e?.id === 2 ? 'warning' : e?.id === 3 ? 'info' : 'primary'
          }
          skin='light'
          variant='outlined'
        />
      )
    }
  ]
}

export default function RequestListTable({ id }: any) {
  const router = useRouter()

  return (
    <>
      <CustomTable
        baseUrl={`/user/${id}/consultation-subsidy/core/consultation-subsidy`}
        queryKey='consultationSubsidy'
        textBtn='ایجاد درخواست'
        btnShow={true}
        dataStruct={dataStruct}
        previousData={[]}
        checkboxEnabled={false}
        titleTable={{
          title: 'فهرست درخواست ها',
          description: 'می توانید فهرست درخواست ها را مشاهده کنید'
        }}
        btnOperation={{
          status: () => true,
          delete: () => true,
          edit: () => false,
          show: () => true
        }}
      />
    </>
  )
}
