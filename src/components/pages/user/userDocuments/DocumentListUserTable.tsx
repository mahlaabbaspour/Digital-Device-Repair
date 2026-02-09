'use client'

import CustomChip from '@/@core/components/mui/chip/index'
import CustomTable from '@/components/elements/customTable/CustomTable'
import { useRouter } from 'next/navigation'
import { BiComment } from 'react-icons/bi'

const dataStruct = {
  title: ['شماره پرونده', 'مشاور', , 'موبایل', 'وضعیت'],
  name: [['document_number'], ['advisors'], ['mobile'], ['consultationDocumentStatus']],
  align: ['', 'center', 'center', 'center', 'center'],
  filter: [true, true, true, true],
  sort: ['document_number', 'last_name', 'mobile', 'status'],
  rowId: ['id'],
  customCol: [
    ([e]: any) => e,
    ([e]: any) => e?.map((el: any) => `${el?.first_name} ${el?.last_name}(${el?.username})`),
    ([e]: any) => e,
    ([e]: any) => {
      return (
        <CustomChip
          label={e?.id === 1 ? 'مفتوح' : e?.id === 2 ? 'مختومه' : e?.id === 3 ? 'ارجاع شده' : ''}
          color={e?.id === 1 ? 'success' : e?.id === 2 ? 'error' : e?.id === 3 ? 'warning' : 'primary'}
          skin='light'
          variant='outlined'
        />
      )
    }
  ]
}

export default function DocumentListUserTable({ id }: any) {
  const router = useRouter()

  return (
    <>
      <CustomTable
        baseUrl={`/user/${id}/core/inPerson-consultation/`}
        queryKey='document'
        textBtn=''
        btnShow={false}
        dataStruct={dataStruct}
        previousData={[]}
        checkboxEnabled={false}
        titleTable={{
          title: 'پرونده های مشاوره',
          description: 'می توانید فهرست پرونده های گیرنده خدمت را مشاهده کنید'
        }}
        btnOperation={{
          status: () => true,
          delete: () => false,
          edit: () => false,
          show: () => false
        }}
        customOperation={[
          {
            icon: <BiComment />,
            onClick: (row: any) =>
              router.push(
                `/user/${id}/userDocuments/documentList/${row?.id}/comment?advisorId=${row?.advisors[0]?.id}`
              ),
            if: () => true,
            color: 'success',
            title: 'چت'
          }
        ]}
      />
    </>
  )
}
