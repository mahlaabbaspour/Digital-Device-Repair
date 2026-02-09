import ShowInstitutionCard from '@/components/pages/landing/institution/CardShowInstitution'
import { fetchInstitutionCalender, fetchInstitutionShow } from '@/libs/landing/institutionLanding'

export const metadata = {
  title: 'معرفی مرکز',
  descritpion: 'می توانید صفحه معرفی مرکز را مشاهده کنید'
}

export default async function InstitutionShowPage({ params }: any) {
  const { id } = await params
  const show = await fetchInstitutionShow(id)
  const data = await fetchInstitutionCalender(id)

  return <ShowInstitutionCard id={id} show={show} data={data} />
}
