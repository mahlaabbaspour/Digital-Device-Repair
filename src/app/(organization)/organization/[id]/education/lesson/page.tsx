import Breadcrumb from '@/components/elements/Breadcrumb'
import LessonEducationTable from '@/components/pages/organization/education/lesson/TableLessonEducation'
import { fetchLessonEducationUpsertData } from '@/libs/organization/education/lesson'

export const metadata = {
  title: 'فهرست اطلاعات پایه دوره ها',
  description: 'می توانید فهرست اطلاعات پایه دوره ها را مشاهده کنید'
}

const items = [
  {
    title: 'فهرست اطلاعات پایه دوره ها'
  }
]

export default async function LanguagePage({ params }: any) {
  const { id } = await params
  const data = await fetchLessonEducationUpsertData(id)

  return (
    <>
      <Breadcrumb items={items} />
      <LessonEducationTable id={id} data={data} />
    </>
  )
}
