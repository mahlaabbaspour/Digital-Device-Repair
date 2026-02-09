import Breadcrumb from '@/components/elements/Breadcrumb'
import UpdateEducationalCourse from '@/components/pages/institution/education/UpdateEducationalCourse'
import {
  fetchLessonEducationalShowInstitution,
  fetchLessonEducationalUpsertDataInstitution
} from '@/libs/institution/education/lessonEducation'

export const metadata = {
  title: 'ویرایش دوره اموزشی',
  description: 'می توانید  دوره های اموزشی را ویرایش  کنید'
}

export default async function TeachingPermissionPage({ params }: any) {
  const { id, courseId } = await params
  const data = await fetchLessonEducationalUpsertDataInstitution(id)
  const show = await fetchLessonEducationalShowInstitution({ id, rowId: courseId })

  const items = [
    {
      title: 'فهرست دوره های اموزشی',
      to: `/institution/${id}/education/educationalCourse`
    },
    {
      title: 'ویرایش دوره آموزشی '
    }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <UpdateEducationalCourse id={id} upsertData={data} courseId={courseId} show={show} />
    </>
  )
}
