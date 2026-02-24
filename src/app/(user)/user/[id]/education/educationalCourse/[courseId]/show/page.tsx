import Breadcrumb from '@/components/elements/Breadcrumb'
import CardEducationCourseShowUser from '@/components/pages/user/education/CardEducationCourseShowUser'
import { fetchEducationCourseShowUser } from '@/libs/user/educationCourse'

export const metadata = {
  title: 'ویرایش دوره اموزشی',
  description: 'می توانید  دوره های اموزشی را ویرایش  کنید'
}

export default async function TeachingPermissionPage({ params }: any) {
  const { id, courseId } = await params
  const show = await fetchEducationCourseShowUser({ id, courseId })

  const items = [
    {
      title: 'فهرست دوره های اموزشی',
      to: `/institution/${id}/education/educationalCourse`
    },
    {
      title: 'نمایش دوره آموزشی '
    }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <CardEducationCourseShowUser show={show} id={id} courseId={courseId} />
    </>
  )
}
