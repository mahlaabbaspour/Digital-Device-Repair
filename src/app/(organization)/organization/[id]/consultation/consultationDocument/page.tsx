import Breadcrumb from '@/components/elements/Breadcrumb'
import ConsultationDocumentTable from '@/components/pages/organization/consultationServices/consultationDocuments/ConsultationDocumentTable'

export const metadata = {
  title: 'فهرست پرونده های مشاوره',
  descritpion: 'می توانید فهرست پرونده های مشاروه را مشاهده کنید'
}

const items = [
  {
    title: 'فهرست پرونده های مشاوره'
  }
]

export default async function consultationDocumentsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <>
      <Breadcrumb items={items} />
      <ConsultationDocumentTable id={id} />
    </>
  )
}
