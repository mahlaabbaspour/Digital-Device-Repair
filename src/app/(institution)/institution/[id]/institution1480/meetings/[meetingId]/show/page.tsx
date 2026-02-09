import Breadcrumb from '@/components/elements/Breadcrumb'
import UpdateMeet1480Form from '@/components/pages/institution/institution1480/Meet1480UpdateForm'
import {
  fetchInstitution1480ShowInstitution,
  fetchInstitution1480UpsertDataInstitution
} from '@/libs/institution/institution1480/institution1480Institution'

export const metadata = {
  title: 'فهرست جلسات1480',
  description: 'می توانید فهرست جلسات 1480 را مشاهده کنید'
}

export default async function CreateMeetInstitution1480({ params }: any) {
  const { id, meetingId } = await params
  const upsertData = await fetchInstitution1480UpsertDataInstitution(id)
  const show = await fetchInstitution1480ShowInstitution({ id, meetingId })
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
      <UpdateMeet1480Form id={id} upsertData={upsertData} meetingId={meetingId} disabled={true} show={show} />
    </>
  )
}
