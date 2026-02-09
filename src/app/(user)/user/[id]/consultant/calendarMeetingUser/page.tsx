import Breadcrumb from '@/components/elements/Breadcrumb'
import CalendarUser from '@/components/pages/user/consultant/calendarMeetingUser/Calendar'
import { fetchShowCalendarUser } from '@/libs/user/useCalendarUser'

export const metadata = {
  title: 'تقویم جلسات مشاور',
  description: 'می توانید تقویم جلسات را مشاهده کنید'
}

const items = [
  {
    title: 'تقویم جلسات مشاور'
  }
]

export default async function CalendarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await fetchShowCalendarUser(id)

  return (
    <>
      <Breadcrumb items={items} />
      <CalendarUser data={data} id={id} />
    </>
  )
}
