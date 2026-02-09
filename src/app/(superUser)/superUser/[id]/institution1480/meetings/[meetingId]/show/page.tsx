import Breadcrumb from '@/components/elements/Breadcrumb'
import UpdateMeetInstitution1480Form from '@/components/pages/superUser/institution1480/MeetInstitution1480FormUpdate'
import { fetchInstitution1480Show, fetchInstitution1480UpsertData } from '@/libs/superUser/institution1480'

export const metadata = {
  title: 'فهرست جلسات1480',
  description: 'می توانید فهرست جلسات 1480 را مشاهده کنید'
}

export default async function CreateMeetInstitution1480({ params }: any) {
  const { id, meetingId } = await params
  const upsertData = await fetchInstitution1480UpsertData(id)
  const show = await fetchInstitution1480Show({ id, meetingId })
  console.log(show, 'show')

  const items = [
    {
      title: 'فهرست جلسات 1480',
      to: `/superUser/${id}/institution1480/meetings`
    },
    {
      title: 'ویرایش جلسه'
    }
  ]
  return (
    <>
      <Breadcrumb items={items} />
      <UpdateMeetInstitution1480Form
        id={id}
        upsertData={upsertData}
        meetingId={meetingId}
        disabled={true}
        show={show}
      />
    </>
  )
}
