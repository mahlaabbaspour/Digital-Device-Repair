import Breadcrumb from '@/components/elements/Breadcrumb'
import CalendarConsultation from '@/components/pages/superUser/consultant/CalendarConsultation'
import { fetchShowCalenderConsultation } from '@/libs/superUser/documentConsultant'

export const metadata = {
  title: 'تقویم',
  description: 'می توانید تقویم جلسات را مشاهده کنید'
}

const items = [
  {
    title: 'تقویم جلسات مشاوره'
  }
]

export default async function CalendarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await fetchShowCalenderConsultation(id)

  return (
    <>
      <Breadcrumb items={items} />
      <CalendarConsultation data={data} id={id} />
    </>
  )
}
