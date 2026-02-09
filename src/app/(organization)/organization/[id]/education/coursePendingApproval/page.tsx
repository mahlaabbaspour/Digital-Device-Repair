import Breadcrumb from '@/components/elements/Breadcrumb'
import TableCoursePendingApproval from '@/components/pages/organization/education/coursePendingApproval/TableCoursePendingApproval'

export const metadata = {
  title: 'فهرست  دوره های اموزشی',
  description: 'می توانید فهرست دوره های اموزشی را مشاهده کنید'
}

const items = [
  {
    title: 'فهرست دوره های اموزشی'
  }
]

export default async function CoursePendingApprovalPage({ params }: any) {
  const { id } = await params

  return (
    <>
      <Breadcrumb items={items} />
      <TableCoursePendingApproval id={id} />
    </>
  )
}
