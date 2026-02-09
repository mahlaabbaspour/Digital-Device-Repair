import Breadcrumb from '@/components/elements/Breadcrumb'
import ShowInstitutionCard from '@/components/pages/landing/institution/CardShowInstitution'
import CalendarMeetingsCard from '@/components/pages/user/institution/CalendarMeetingCard'
import { fetchInstitutionCalender } from '@/libs/user/calendarMeeting'
import { Typography } from '@mui/material'

export const metadata = {
  title: 'معرفی مرکز',
  descritpion: 'می توانید صفحه معرفی مرکز را مشاهده کنید'
}

export default async function InstitutionShowPage({ params }: any) {
  const { id } = await params
  console.log(id, 'id')
  //   const show = await fetchInstitutionShow(id)
  const data = await fetchInstitutionCalender(id)
  console.log(data, 'data')

  const items = [
    {
      title: 'تقویم جلسات مرکز'
    }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <CalendarMeetingsCard id={id} data={data} />
    </>
  )

  //   return <ShowInstitutionCard id={id} show={show} data={data} />
}
