import Breadcrumb from '@/components/elements/Breadcrumb'
import DiagnosisAndMeetingTable from '@/components/pages/institution/consultationDocuments/documentList/DiagnosisAndMeetingTable'
import { fetchShowDiagnosisAndMeeting } from '@/libs/institution/consultationDocuments/documentList'

export const metadata = {
  title: 'جلسات و تشخیص های جلسه',
  description: 'می توانید فهرست تشخیص های مشاوره را مشاهده کنید'
}

export default async function DiagnosisPage({ params }: any) {
  const { id, documentId } = await params
  const show = await fetchShowDiagnosisAndMeeting({ id, documentId })

  const items = [
    {
      title: 'فهرست پرونده های مشاوره',
      to: `/institution/${id}/consultationServices/consultationDocuments/documentList`
    },
    {
      title: `جلسات و تشخیص های  (${show?.first_name} ${show?.last_name})`
    }
  ]
  return (
    <>
      <Breadcrumb items={items} />
      <DiagnosisAndMeetingTable id={id} show={show} documentId={documentId} />
    </>
  )
}
