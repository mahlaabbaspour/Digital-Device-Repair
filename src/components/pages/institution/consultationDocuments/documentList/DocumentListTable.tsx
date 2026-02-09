'use client'

import CustomChip from '@/@core/components/mui/chip/index'
import CustomTable from '@/components/elements/customTable/CustomTable'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BiSync } from 'react-icons/bi'
import ChangeStatusDocument from './ChangeStatusDocument'
import { MdFactCheck } from 'react-icons/md'

const dataStruct = {
  title: ['شماره پرونده', 'کد ملی', 'نام و نام خانوادگی ', 'موبایل', 'وضعیت'],
  name: [['document_number'], ['username'], ['first_name', 'last_name'], ['mobile'], ['consultationDocumentStatus']],
  align: ['', 'center', 'center', 'center', 'center'],
  filter: [true, true, true, true, true],
  sort: ['document_number', 'last_name', 'username', 'mobile', 'status'],
  rowId: ['id'],
  customCol: [
    ([e]: any) => e,
    ([e]: any) => e,
    ([e, c]: any) => `${e} ${c}`,
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

export default function DocumentListTable({ id }: any) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [currunt, setCurrent] = useState<any>(null)

  const handleClosed = (row: any) => {
    setOpen(true)
    setCurrent(row)
  }

  return (
    <>
      <ChangeStatusDocument open={open} onClose={() => setOpen(false)} selectedRow={currunt} id={id} />
      <CustomTable
        baseUrl={`/institution/${id}/inPerson-consultation/core/inPerson-consultation`}
        queryKey='documentUser'
        textBtn='ایجاد پرونده جدید'
        btnShow={true}
        dataStruct={dataStruct}
        previousData={[]}
        checkboxEnabled={true}
        titleTable={{ title: 'پرونده های مرکز', description: 'می توانید فهرست پرونده های مرکز را مشاهده کنید' }}
        btnOperation={{
          status: () => true,
          delete: () => true,
          edit: () => true,
          show: () => true
        }}
        customOperation={[
          {
            icon: <BiSync />,
            onClick: (row: any) => handleClosed(row),
            if: () => true,
            color: 'success',
            title: 'وضعیت پرونده'
          },
          {
            icon: <MdFactCheck />,
            onClick: (row: any) =>
              router.push(
                `/institution/${id}/consultationServices/consultationDocuments/documentList/${row?.id}/diagnosisAndMeeting`
              ),
            if: () => true,
            color: 'info',
            title: 'جلسات و تشخیص ها'
          }
        ]}
      />
    </>
  )
}
