import Breadcrumb from '@/components/elements/Breadcrumb'
import CreateMeet1480Form from '@/components/pages/institution/institution1480/Meet1480Form'
import { fetchInstitution1480UpsertDataInstitution } from '@/libs/institution/institution1480/institution1480Institution'

export const metadata = {
  title: 'فهرست جلسات1480',
  description: 'می توانید فهرست جلسات 1480 را مشاهده کنید'
}

export default async function CreateMeetInstitution1480({ params }: any) {
  const { id } = await params
  const upsertData = await fetchInstitution1480UpsertDataInstitution(id)

  const items = [
    {
      title: 'فهرست جلسات 1480',
      to: `/institution/${id}/institution1480/meetings`
    },
    {
      title: 'ایجاد جلسه'
    }
  ]
  return (
    <>
      <Breadcrumb items={items} />
      <CreateMeet1480Form id={id} upsertData={upsertData} />
    </>
  )
}
