'use client'

import CustomChip from '@/@core/components/mui/chip/index'
import CustomTable from '@/components/elements/customTable/CustomTable'
import { useRouter } from 'next/navigation'
import { MdOutlineAssessment } from 'react-icons/md'

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

export default function PendingApprovalTable({ id }: any) {
  const router = useRouter()
  return (
    <>
      <CustomTable
        baseUrl={`/organization/${id}/core/consultation-subsidy`}
        queryKey='evaluationOrganization'
        textBtn=''
        btnShow={false}
        dataStruct={dataStruct}
        previousData={[]}
        checkboxEnabled={false}
        titleTable={{
          title: 'درخواست های درانتظار ارزیابی شهرستان',
          description: 'می توانید فهرست درخواست های در انتظار ارزیابی شهرستان را مشاهدهد کنید'
        }}
        btnOperation={{
          status: () => true,
          delete: () => false,
          edit: () => false,
          show: () => false
        }}
        customOperation={[
          {
            icon: <MdOutlineAssessment />,
            onClick: (row: any) =>
              router.push(
                `/organization/${id}/consultationServices/consultationSubsidy/pendingApproval/${row?.id}/evaluation`
              ),
            if: () => true,
            color: 'success',
            title: 'ارزیابی'
          }
        ]}
      />
    </>
  )
}
