import Breadcrumb from '@/components/elements/Breadcrumb'
import CardShowResource from '@/components/pages/user/education/CardShowResource'
import { fetchResourceShowCourseUser } from '@/libs/user/educationCourse'

export const metadata = {
  title: 'ویرایش دوره اموزشی',
  description: 'می توانید  دوره های اموزشی را ویرایش  کنید'
}

export default async function TeachingPermissionPage({ params }: any) {
  const { id, courseId, resourceId } = await params
  const show = await fetchResourceShowCourseUser({ id, courseId, resourceId })

  const items = [
    {
      title: 'فهرست دوره های اموزشی',
      to: `/user/${id}/education/educationalCourse/`
    },
    {
      title: 'مشاهده ()',
      to: `/user/${id}/education/educationalCourse/${courseId}/show`
    },
    {
      title: `مشاهده ( ${show?.title} )`
    }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <CardShowResource id={id} courseId={courseId} resourceId={resourceId} show={show} />
    </>
  )
}
