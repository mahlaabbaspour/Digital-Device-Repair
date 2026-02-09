'use client'

import CustomChip from '@/@core/components/mui/chip/index'
import CustomTable from '@/components/elements/customTable/CustomTable'
import { useChangeDocument } from '@/hooks/institution/consultationDocuments/useDocumentList'
import { useState } from 'react'
import { BiAdjust, BiShow, BiSync } from 'react-icons/bi'
import MeetingStatusModal from './CancelStatusModal'
import MeetingCancelledShowModal from './CancelShowModal'

const dataStruct = {
  title: ['زمان کنسل', 'کاربر', 'زمان پرداخت', 'شماره پیگیری', 'وضعیت'],
  name: [
    ['cancelled_time'],
    ['consultationDocument.first_name', 'consultationDocument.last_name'],
    ['payment_time'],
    ['tracking_code'],
    ['status']
  ],
  align: ['', 'center', 'center', 'center', 'center'],
  filter: [true, true, true, true, true],
  sort: ['document_number', 'last_name', 'username', 'mobile', 'status'],
  rowId: ['id'],
  customCol: [
    ([e]: any) => (e ? e : '__'),
    ([e, c]: any) => `${e} ${c}`,
    ([e]: any) => e,
    ([e]: any) => e,
    ([e]: any) => {
      return (
        <CustomChip
          label={e === '1' ? 'مشخص شده' : 'نامشخص'}
          color={e === '1' ? 'success' : 'error'}
          skin='light'
          variant='outlined'
        />
      )
    }
  ]
}

export default function CancleMeetingTable({ id }: any) {
  const [open, setOpen] = useState(false)
  const [openShow, setOpenShow] = useState(false)
  const [currunt, setCurrent] = useState<any>(null)
  const [meeting, setMeeting] = useState<any>(null)

  const { mutateAsync, isPending }: any = useChangeDocument()

  const handleClosed = async (row: any) => {
    setOpen(true)
    setCurrent(row)
    // if (row) {
    //   const data = await fetchShowCancelMeeting({ id: id, rowId: row?.id })
    //   console.log(data, 'data')
    // }
  }

  const handleShow = async (row: any) => {
    setOpenShow(true)
    setCurrent(row)
  }

  return (
    <>
      <MeetingCancelledShowModal
        id={id}
        title='نمایش جلسه'
        description='می توانید جلسه مورد نظر را مشاهده کنید'
        open={openShow}
        onClose={() => setOpenShow(false)}
        currunt={currunt}
      />
      <MeetingStatusModal
        id={id}
        title='تعیین وضعیت جلسه'
        description='می توانید جلسه لفو شده مورد نظر را تعیین تکلیف کنید'
        open={open}
        onClose={() => setOpen(false)}
        currunt={currunt}
      />
      <CustomTable
        baseUrl={`/institution/${id}/meeting/core/cancelled-meeting`}
        queryKey='cancelMeeting'
        textBtn='ایجاد پرونده جدید'
        btnShow={false}
        dataStruct={dataStruct}
        previousData={[]}
        checkboxEnabled={true}
        titleTable={{ title: 'جلسات کنسل شده', description: 'می توانید فهرست  جلسات کنسل شده را مشاهده کنید' }}
        btnOperation={{
          status: () => true,
          delete: () => true,
          edit: () => false,
          show: () => false
        }}
        customOperation={[
          {
            icon: <BiAdjust />,
            onClick: (row: any) => handleClosed(row),
            if: (row: any) => (row?.status === '1' ? false : true),
            color: 'info',
            title: 'تعیین وضعیت'
          },
          {
            icon: <BiShow />,
            onClick: (row: any) => handleShow(row),
            if: (row: any) => true,
            color: 'warning',
            title: 'نمایش'
          }
        ]}
      />
    </>
  )
}
