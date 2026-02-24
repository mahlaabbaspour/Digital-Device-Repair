import Breadcrumb from '@/components/elements/Breadcrumb'
import TableConsultationMeeting from '@/components/pages/institution/consultationMeetings/TableConsultationMeeting'
import { fetchListMeeting, fetchUpsertDataMeeting } from '@/libs/institution/consultationDocuments/documentList'

export const metadata = {
  title: 'فهرست جلسات مشاوره',
  description: 'می توانید فهرست  جلسات مشاوره را مشاهده کنید'
}

const items = [
  {
    title: 'فهرست جلسات مشاوره'
  }
]

export default async function ConsultationMeetingPage({ params }: any) {
  const { id } = await params
  const data = await fetchListMeeting(id)
  const upsertData = await fetchUpsertDataMeeting(id)

  return (
    <>
      <Breadcrumb items={items} />
      <TableConsultationMeeting id={id} data={data} upsertData={upsertData} />
    </>
  )
}
