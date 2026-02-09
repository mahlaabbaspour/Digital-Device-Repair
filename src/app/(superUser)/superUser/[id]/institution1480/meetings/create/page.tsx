import Breadcrumb from '@/components/elements/Breadcrumb'
import CreateMeetInstitution1480Form from '@/components/pages/superUser/institution1480/MeetInstitution1480Form'
import { fetchInstitution1480UpsertData } from '@/libs/superUser/institution1480'

export const metadata = {
  title: 'فهرست جلسات1480',
  description: 'می توانید فهرست جلسات 1480 را مشاهده کنید'
}

export default async function CreateMeetInstitution1480({ params }: any) {
  const { id } = await params
  const upsertData = await fetchInstitution1480UpsertData(id)

  const items = [
    {
      title: 'فهرست جلسات 1480',
      to: `/superUser/${id}/institution1480/meetings`
    },
    {
      title: 'ایجاد جلسه'
    }
  ]
  return (
    <>
      <Breadcrumb items={items} />
      <CreateMeetInstitution1480Form id={id} upsertData={upsertData} />
    </>
  )
}
