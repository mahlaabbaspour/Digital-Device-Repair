import Breadcrumb from '@/components/elements/Breadcrumb'
import ConsultationMeetingTable from '@/components/pages/organization/consultationServices/consultationMeetings/ConsultationMeetingTable'
import { fetchMeetingConsultationUpsertDataOrganization } from '@/libs/organization/consultation/consultationOrganization'

export const metadata = {
  title: 'فهرست جلسات های مشاوره',
  descritpion: 'می توانید فهرست جلسات های مشاروه را مشاهده کنید'
}

const items = [
  {
    title: 'فهرست جلسات های مشاوره'
  }
]

export default async function consultationMeetingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const upsertData = await fetchMeetingConsultationUpsertDataOrganization(id)
  console.log(upsertData)

  return (
    <>
      <Breadcrumb items={items} />
      <ConsultationMeetingTable id={id} upsertData={upsertData} />
    </>
  )
}
