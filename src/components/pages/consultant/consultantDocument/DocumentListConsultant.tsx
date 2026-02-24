'use client'

import CustomChip from '@/@core/components/mui/chip/index'
import CustomTable from '@/components/elements/customTable/CustomTable'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BiComment, BiSync } from 'react-icons/bi'
import { MdFactCheck } from 'react-icons/md'
import ChangeStatusDocumentConsultant from './ChangeStatusDocumentConsultant'
const dataStruct = {
  title: ['شماره پرونده', 'خدمت گیرنده', , 'موبایل', 'وضعیت'],
  name: [['document_number'], ['first_name', 'last_name', 'username'], ['mobile'], ['consultationDocumentStatus']],
  align: ['', 'center', 'center', 'center', 'center'],
  filter: [true, true, true, true],
  sort: ['document_number', 'last_name', 'mobile', 'status'],
  rowId: ['id'],
  customCol: [
    ([e]: any) => e,
    ([e, c, d]: any) => `${e} ${c} (${d})`,
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

export default function DocumentListConsultantTable({ id }: any) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [currunt, setCurrent] = useState<any>(null)

  const handleClosed = (row: any) => {
    setOpen(true)
    setCurrent(row)
  }

  const session: any = useSession()

  return (
    <>
      <ChangeStatusDocumentConsultant open={open} onClose={() => setOpen(false)} selectedRow={currunt} id={id} />
      <CustomTable
        baseUrl={`/super-user/${id}/core/consultation-document`}
        queryKey='documentConsultant'
        textBtn=''
        btnShow={false}
        dataStruct={dataStruct}
        previousData={[]}
        checkboxEnabled={false}
        titleTable={{
          title: 'پرونده های مشاور',
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
            icon: <BiSync />,
            onClick: (row: any) => handleClosed(row),
            if: () => true,
            color: 'info',
            title: 'وضعیت پرونده'
          },
          {
            icon: <BiComment />,
            onClick: (row: any) =>
              router.push(`/superUser/${id}/consultant/consultantDocument/${row?.id}/comment?advisorId=114`),
            if: () => true,
            color: 'success',
            title: 'چت'
          },
          {
            icon: <MdFactCheck />,
            onClick: (row: any) => router.push(`/superUser/${id}/consultant/consultantDocument/${row?.id}/diagnosis`),
            if: () => true,
            color: 'info',
            title: 'تشخیص های مشاور'
          }
        ]}
      />
    </>
  )
}
