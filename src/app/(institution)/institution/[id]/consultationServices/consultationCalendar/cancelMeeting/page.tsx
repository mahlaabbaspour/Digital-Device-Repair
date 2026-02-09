import Breadcrumb from '@/components/elements/Breadcrumb'
import CancleMeetingTable from '@/components/pages/institution/advisoryMeeting/CancelMeetingTable'

export const metadata = {
  title: 'جلسات کنسل شده',
  description: 'می توانید فهرست  جلسات کنسل شده را مشاهده کنید'
}

const items = [
  {
    title: 'جلسات کنسل شده'
  }
]

export default async function CancelMeetingPage({ params }: any) {
  const { id } = await params
  return (
    <>
      <Breadcrumb items={items} />
      <CancleMeetingTable id={id} />
    </>
  )
}
