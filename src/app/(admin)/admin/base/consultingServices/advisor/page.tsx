import Breadcrumb from '@/components/elements/Breadcrumb'
import AdvistorTable from '@/components/pages/admin/base/advistor/TableAdvistor'

export const metadata = {
  title: 'فهرست مشاوران',
  description: 'می توانید فهرست مشاوران را مشاهده کنید'
}

const items = [
  {
    title: 'فهرست مشاوران'
  }
]

export default function AdvisorPage() {
  return (
    <>
      <Breadcrumb items={items} />
      <AdvistorTable />
    </>
  )
}
