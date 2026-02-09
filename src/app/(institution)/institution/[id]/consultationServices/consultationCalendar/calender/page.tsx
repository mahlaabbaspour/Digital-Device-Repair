import Breadcrumb from '@/components/elements/Breadcrumb'
import CalendarCard from '@/components/pages/institution/advisoryMeeting/Calendar'
import { fetchShowCalendar, fetchUpsertDataCalendar } from '@/libs/institution/advisoryMeeting/calendar'

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
  const show = await fetchShowCalendar({ id: id })
  const upsertData = await fetchUpsertDataCalendar(id)

  const formatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    numberingSystem: 'latn'
  })

  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)

  const todayDate = formatter.format(today)
  const tomorrowDate = formatter.format(tomorrow)
  const yesterdayDate = formatter.format(yesterday)

  return (
    <>
      <Breadcrumb items={items} />
      <CalendarCard
        id={id}
        show={show}
        upsertData={upsertData}
        tomorrowDate={tomorrowDate}
        yesterdayDate={yesterdayDate}
        todayDate={todayDate}
      />
    </>
  )
}
