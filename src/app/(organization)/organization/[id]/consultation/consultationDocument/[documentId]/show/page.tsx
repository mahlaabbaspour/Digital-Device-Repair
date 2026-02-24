import Breadcrumb from '@/components/elements/Breadcrumb'
import CardShowDocumentAndDiagnosisConsultation from '@/components/pages/organization/consultationServices/consultationDocuments/CardShowDocumentConsultation'
import { fetchShowDocumentConsultationOrganization } from '@/libs/organization/consultation/consultationOrganization'

export const metadata = {
  title: 'نمایش پرونده',
  description: 'می توانید پرونده مورد نظر را مشاهده کنید'
}

export default async function DocumentShow({ params }: any) {
  const { id, documentId } = await params
  const show = await fetchShowDocumentConsultationOrganization({ id, documentId })

  const items = [
    {
      title: 'فهرست پرونده های مرکز',
      to: `/organization/${id}/consultation/consultationDocument`
    },
    {
      title: `نمایش پرونده (${show?.first_name} ${show?.last_name} - ${show?.document_number})`
    }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <CardShowDocumentAndDiagnosisConsultation id={id} documentId={documentId} show={show} />
    </>
  )
}
