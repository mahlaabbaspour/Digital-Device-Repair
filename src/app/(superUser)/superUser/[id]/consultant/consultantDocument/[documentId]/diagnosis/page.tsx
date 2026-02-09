import Breadcrumb from '@/components/elements/Breadcrumb'
import DiagnosisTable from '@/components/pages/superUser/consultant/DiagnosisTable'
import { fetchShowDiagnosisIndex } from '@/libs/superUser/diagnosis'

export const metadata = {
  title: 'تشخیص های مشاور',
  description: 'می توانید فهرست تشخیص های مشاوره را مشاهده کنید'
}

export default async function DiagnosisPage({ params }: any) {
  const { id, documentId } = await params
  const show = await fetchShowDiagnosisIndex({ id, documentId })

  const items = [
    {
      title: 'فهرست پرونده های مشاور',
      to: `/superUser/${id}/consultant/consultantDocument`
    },
    {
      title: 'فهرست تشخیص های مشاور'
    }
  ]
  return (
    <>
      <Breadcrumb items={items} />
      <DiagnosisTable id={id} documentId={documentId} show={show} />
    </>
  )
}
