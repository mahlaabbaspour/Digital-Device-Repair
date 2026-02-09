'use client'

import CustomChip from '@/@core/components/mui/chip/index'
import CustomTable from '@/components/elements/customTable/CustomTable'

const dataStruct = {
  title: ['تاریخ', 'زمان شروع و پایان', , 'مشاور'],
  name: [['date'], ['start_time', 'end_time'], ['mobile']],
  align: ['', 'center', 'center', 'center'],
  filter: [true, true, true],
  sort: ['document_number', 'last_name', 'mobile'],
  rowId: ['id'],
  customCol: [
    ([e]: any) => e,
    ([e, c, d]: any) => `${e} تا ${c}`,
    ([e]: any) => (e ? e : '__')
    // ([e]: any) => {
    //   return (
    //     <CustomChip
    //       label={e?.id === 1 ? 'مفتوح' : e?.id === 2 ? 'مختومه' : e?.id === 3 ? 'ارجاع شده' : ''}
    //       color={e?.id === 1 ? 'success' : e?.id === 2 ? 'error' : e?.id === 3 ? 'warning' : 'primary'}
    //       skin='light'
    //       variant='outlined'
    //     />
    //   )
    // }
  ]
}

export default function TableInstitution1480({ id }: any) {
  return (
    <>
      <CustomTable
        baseUrl={`/institution/${id}/meeting-1480/core/meeting-1480`}
        queryKey='documentConsultant'
        textBtn='ایجاد جلسه و تشخیص'
        btnShow={true}
        dataStruct={dataStruct}
        previousData={[]}
        checkboxEnabled={false}
        titleTable={{
          title: 'جلسات مشاوره 1480',
          description: 'می توانید فهرست جلسات مشاوره 1480 را مشاهده کنید'
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
