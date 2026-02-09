import Breadcrumb from '@/components/elements/Breadcrumb'
import ConsultationSubsidyCriteriaTable from '@/components/pages/admin/base/consultationSubsidyCriteria/TableConsultationSubsidyCriteria'

export const metadata = {
  title: 'فهرست شاخص های ارزیابی',
  description: 'می توانید فهرست شاخص های ارزیابی مشاوره را مشاهده کنید'
}

const items = [
  {
    title: 'فهرست شاخص های ارزیابی مشاوره'
  }
]

export default function EductionPage() {
  return (
    <>
      <Breadcrumb items={items} />
      <ConsultationSubsidyCriteriaTable />
    </>
  )
}
