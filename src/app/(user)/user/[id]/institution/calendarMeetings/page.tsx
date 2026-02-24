import Breadcrumb from '@/components/elements/Breadcrumb'
import CalendarMeetingsCard from '@/components/pages/user/institution/CalendarMeetingCard'
import {
  fetchInstitutionCalender,
  fetchInstitutionCalenderUpsertData,
  fetchShowInstitutionCalenderConsultation
} from '@/libs/user/calendarMeeting'

export const metadata = {
  title: 'معرفی مرکز',
  descritpion: 'می توانید صفحه معرفی مرکز را مشاهده کنید'
}

export default async function InstitutionShowPage({ params, searchParams }: any) {
  const { id } = await params
  const resolvedSearchParams = await searchParams
  const institutionId = resolvedSearchParams?.institutionId
  const data = await fetchInstitutionCalender({ id, institutionId })
  const upsertData = await fetchInstitutionCalenderUpsertData({ id, institutionId })
  const show = await fetchShowInstitutionCalenderConsultation({ id, institutionId })

  const items = [
    {
      title: 'فهرست مراکز',
      to: `/landing/institution`
    },
    {
      title: `تقویم جلسات (${show?.name})`
    }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <CalendarMeetingsCard id={id} data={data} institutionId={institutionId} upsertData={upsertData} show={show} />
    </>
  )
}
