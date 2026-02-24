import Breadcrumb from '@/components/elements/Breadcrumb'
import DashboardConsultation from '@/components/pages/institution/consultationDashboard/Dashboard'

export const metadata = {
  title: 'داشبورد مشاوره',
  descritpion: 'می توانید داشبورد مشاوره را مشاهده کندی'
}

export default function DashboardConsultationPage() {
  const items = [
    {
      title: 'داشبورد مشاوره'
    }
  ]
  return (
    <>
      <Breadcrumb items={items} />
      <DashboardConsultation />
    </>
  )
}
