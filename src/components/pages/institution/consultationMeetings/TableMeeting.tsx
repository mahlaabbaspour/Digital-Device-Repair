'use client'

import { IconButton, Box } from '@mui/material'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { BiShowAlt } from 'react-icons/bi'
import { IoTrashOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import TableConsultationMeeting from './TableConsultationMeeting'

export default function TableMeeting({ data, id, upsertData }: any) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  console.log(selected, 'sljflsjf')

  console.log(data, 'data')
  return (
    <>
      <TableConsultationMeeting
        columns={[
          { label: 'تاریخ', key: 'date' },
          { label: 'ساعت شروع ', key: 'start_time' },
          { label: 'ساعت پایان', key: 'end_time' },
          { label: 'هزینه جلسه', key: 'price' }
        ]}
        title='فهرست جلسات مشاوره'
        description='می توانید فهرست جلسات مشاوره را مشاهده کنید'
        rows={data}
        id={id}
        upsertData={upsertData}
        actions={(row: any) => (
          <>
            <IconButton color='warning'>
              <BiShowAlt size={19} />
            </IconButton>
            <IconButton color='primary' onClick={() => router.push(`/admin/food/${row?.id}/update`)}>
              <HiOutlinePencilAlt size={18} />
            </IconButton>
            <IconButton
              color='error'
              onClick={() => {
                setOpen(true)
                setSelected(row)
              }}
            >
              <IoTrashOutline size={18} />
            </IconButton>
          </>
        )}
      />
    </>
  )
}
