import Breadcrumb from '@/components/elements/Breadcrumb'
import FormDocumentConsultation from '@/components/pages/institution/consultationDocuments/documentList/FormDocument'
import { fetchDocumentUpsertData } from '@/libs/institution/consultationDocuments/documentList'

export const metadata = {
  title: 'ایجاد پرونده',
  description: 'می توانید پرونده مورد نظر را ایجاد کنید'
}

export default async function DocumentForm({ params }: any) {
  const { id } = await params
  const upsertData = await fetchDocumentUpsertData(id)

  const items = [
    {
      title: 'فهرست پرونده های مرکز',
      to: `/institution/${id}/consultationServices/consultationDocuments/documentList`
    },
    {
      title: 'ایجاد پرونده'
    }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <FormDocumentConsultation id={id} upsertData={upsertData} />
    </>
  )
}
