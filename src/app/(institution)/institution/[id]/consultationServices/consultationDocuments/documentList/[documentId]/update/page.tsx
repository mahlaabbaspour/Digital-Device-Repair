import Breadcrumb from '@/components/elements/Breadcrumb'
import FormUpdateDocumentConsultation from '@/components/pages/institution/consultationDocuments/documentList/FormUpdateDocument'
import {
  fetchDocumentUpsertData,
  fetchShowConsultationDocuments
} from '@/libs/institution/consultationDocuments/documentList'

export const metadata = {
  title: 'ویرایش پرونده',
  description: 'می توانید پرونده مورد نظر را ویرایش کنید'
}

export default async function DocumentUpdate({ params }: any) {
  const { id, documentId } = await params
  const upsertData = await fetchDocumentUpsertData(id)
  const show = await fetchShowConsultationDocuments({ id: id, rowId: documentId })

  const items = [
    {
      title: 'فهرست پرونده های مرکز',
      to: `/institution/${id}/consultationServices/consultationDocuments/documentList`
    },
    {
      title: ` ویرایش پرونده (${show?.first_name} ${show?.last_name})`
    }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <FormUpdateDocumentConsultation
        documentId={documentId}
        show={show}
        id={id}
        upsertData={upsertData}
        disabled={false}
        action={'edit'}
      />
    </>
  )
}
