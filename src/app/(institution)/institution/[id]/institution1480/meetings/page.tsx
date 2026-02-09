import Breadcrumb from '@/components/elements/Breadcrumb'
import TableInstitution1480 from '@/components/pages/institution/institution1480/TableInstitution1480'

export const metadata = {
  title: 'فهرست جلسات1480',
  description: 'می توانید فهرست پرونده ها را مشاهده کنید'
}

const items = [
  {
    title: 'فهرست جلسات1480'
  }
]

export default async function DocumentListUserPage({ params }: any) {
  const { id } = await params
  return (
    <>
      <Breadcrumb items={items} />
      <TableInstitution1480 id={id} />
    </>
  )
}
