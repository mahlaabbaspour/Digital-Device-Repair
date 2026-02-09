import Breadcrumb from '@/components/elements/Breadcrumb'
import ProfileInstitutionShow from '@/components/pages/institution/base/profile/ProfileShow'
import { fetchShowProfile } from '@/libs/institution/base/profile'

export const metadata = {
  title: 'پروفایل مرکز',
  description: 'می توانید پروفایل مرکز را مشاهده کنید'
}

export default async function ProfileInstitutionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const show = await fetchShowProfile(id)

  const items = [
    {
      title: `پروفایل مرکز (${show?.name})`
    }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <ProfileInstitutionShow id={id} show={show} />
    </>
  )
}
