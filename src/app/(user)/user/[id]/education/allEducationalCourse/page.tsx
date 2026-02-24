import Breadcrumb from '@/components/elements/Breadcrumb'
import CardAllEducationalCoursesUser from '@/components/pages/user/education/CardAllEducationalCoursesUser'
import { fetchInstitutionShowCourseUser, fetchInstitutionUpsertDataUser } from '@/libs/user/educationCourse'

export const metadata = {
  title: 'معرفی مرکز',
  descritpion: 'می توانید صفحه معرفی مرکز را مشاهده کنید'
}

export default async function InstitutionShowPage({ params, searchParams }: any) {
  const { id } = await params
  const institutionId = searchParams?.institutionId
  const show = await fetchInstitutionShowCourseUser({ id, institutionId })
  const upsertData = await fetchInstitutionUpsertDataUser(id)

  const items = [
    {
      title: 'فهرست دوره های آموزشی'
    }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <CardAllEducationalCoursesUser id={id} institutionId={institutionId} upsertData={upsertData} show={show} />
    </>
  )
}
