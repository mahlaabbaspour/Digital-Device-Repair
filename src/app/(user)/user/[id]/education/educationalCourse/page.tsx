import Breadcrumb from '@/components/elements/Breadcrumb'
import TableEducationalCourseUser from '@/components/pages/user/education/TableEducationCourseUser'

export const metadata = {
  title: 'دوره های آموزشی',
  description: 'می توانید فهرست دوره های اموزشی را مشاهده کنید'
}

const items = [
  {
    title: 'فهرست دوره های اموزشی'
  }
]

export default async function TeachingPermissionPage({ params }: any) {
  const { id } = await params

  return (
    <>
      <Breadcrumb items={items} />
      <TableEducationalCourseUser id={id} />
    </>
  )
}
