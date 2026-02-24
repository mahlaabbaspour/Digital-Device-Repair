'use client'

import CustomChip from '@/@core/components/mui/chip/index'
import CustomTable from '@/components/elements/customTable/CustomTable'
import { useRouter } from 'next/navigation'

const dataStruct = {
  title: ['انقضاء', 'درصد یارانه مشاوره', , 'تعداد جلسات', 'وضعیت'],
  name: [['expires_at'], ['consultationSubsidy.subsidy_percentage'], ['meeting_count'], ['consultationVoucherStatus']],
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
            e?.id === 1
              ? 'warning'
              : e?.id === 2
                ? 'success'
                : e?.id === 2
                  ? 'warning'
                  : e?.id === 3
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

export default function ConsultationVoucherTable({ id }: any) {
  const router = useRouter()

  return (
    <>
      <CustomTable
        baseUrl={`/institution/${id}/consultation-subsidy/core/consultation-subsidy/consultation-voucher/`}
        queryKey='consultationSubsidyInstitution'
        textBtn=''
        btnShow={false}
        dataStruct={dataStruct}
        previousData={[]}
        checkboxEnabled={false}
        titleTable={{
          title: 'فهرست یاری برگ ها',
          description: 'می توانید فهرست یاری برگ ها را مشاهده کنید'
        }}
        btnOperation={{
          status: () => true,
          delete: () => false,
          edit: () => false,
          show: () => true
        }}
      />
    </>
  )
}
