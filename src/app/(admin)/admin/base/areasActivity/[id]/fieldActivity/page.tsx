import Breadcrumb from '@/components/elements/Breadcrumb'
import FieldActivityTable from '@/components/pages/admin/base/areasActivity/feildActivity/TableFieldActivity'

export const metadata = {
  title: 'فهرست حوزه های فعالیت',
  description: 'می توانید فهرست حوزه های فعالیت را مشاهده کنید'
}

const items = [
  {
    title: 'فهرست حیطه های فعالیت',
    to: '/admin/base/areasActivity'
  },
  {
    title: 'فهرست حوزه های فعالیت'
  }
]

export default async function FieldActivityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <>
      <Breadcrumb items={items} />
      <FieldActivityTable id={id} />
    </>
  )
}
