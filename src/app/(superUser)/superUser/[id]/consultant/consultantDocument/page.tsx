import Breadcrumb from '@/components/elements/Breadcrumb'
import DocumentListConsultantTable from '@/components/pages/consultant/consultantDocument/DocumentListConsultant'

export const metadata = {
  title: 'فهرست پرونده ها',
  description: 'می توانید فهرست پرونده ها را مشاهده کنید'
}

const items = [
  {
    title: 'فهرست پرونده ها'
  }
]

export default async function DocumentListUserPage({ params }: any) {
  const { id } = await params
  return (
    <>
      <Breadcrumb items={items} />
      <DocumentListConsultantTable id={id} />
    </>
  )
}
