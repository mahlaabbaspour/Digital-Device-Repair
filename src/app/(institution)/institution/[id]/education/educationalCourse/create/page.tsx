import Breadcrumb from '@/components/elements/Breadcrumb'
import CreateEducationalCourse from '@/components/pages/institution/education/CreateEducationalCourse'
import { fetchLessonEducationalUpsertDataInstitution } from '@/libs/institution/education/lessonEducation'

export const metadata = {
  title: 'ایجاد دوره اموزشی',
  description: 'می توانید  دوره های اموزشی را ایجاد  کنید'
}

export default async function TeachingPermissionPage({ params }: any) {
  const { id } = await params
  const data = await fetchLessonEducationalUpsertDataInstitution(id)

  const items = [
    {
      title: 'فهرست دوره های اموزشی',
      to: `/institution/${id}/education/educationalCourse`
    },
    {
      title: 'ایجاد دوره آموزشی جدید'
    }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <CreateEducationalCourse id={id} upsertData={data} />
    </>
  )
}
