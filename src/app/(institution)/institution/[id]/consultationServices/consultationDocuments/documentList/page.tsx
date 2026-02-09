import Breadcrumb from '@/components/elements/Breadcrumb'
import DocumentListTable from '@/components/pages/institution/consultationDocuments/documentList/DocumentListTable'

export const metadata = {
  title: 'فهرست پرونده ها',
  description: 'می توانید فهرست پرونده ها را مشاهده کنید'
}

const items = [
  {
    title: 'فهرست پرونده ها'
  }
]

export default async function DocumentListPage({ params }: any) {
  const { id } = await params
  return (
    <>
      <Breadcrumb items={items} />
      <DocumentListTable id={id} />
    </>
  )
}
