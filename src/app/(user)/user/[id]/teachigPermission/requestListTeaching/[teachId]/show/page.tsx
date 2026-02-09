import Breadcrumb from '@/components/elements/Breadcrumb'
import RequestShowForm from '@/components/pages/user/teachigPermission/RequestListShowForm'
import {
  fetchHistoryComposingTeachingPermissionUpsertData,
  fetchHistoryEducationTeachingPermissionUpsertData,
  fetchHistoryStudyTeachingPermissionUpsertData,
  fetchHistoryTeachingTeachingPermissionUpsertData,
  fetchTeachingPermissionShow,
  fetchTeachingPermissionUpsertData
} from '@/libs/user/teachigPermission'

export const metadata = {
  title: 'نمایش درخواست تدریس',
  descritpion: 'می توانید مجوز تدریس مورد نظر را ایجاد کنید'
}

export default async function UpdateTeachingPermissionPage({ params }: any) {
  const { id, teachId } = await params
  const upsertData = await fetchTeachingPermissionUpsertData(id)
  const show = await fetchTeachingPermissionShow({ id, teachId })
  const dataStudy = await fetchHistoryStudyTeachingPermissionUpsertData({ id, teachId })
  const dataEducation = await fetchHistoryEducationTeachingPermissionUpsertData({ id, teachId })
  const dataTeaching = await fetchHistoryTeachingTeachingPermissionUpsertData({ id, teachId })
  const dataComposing = await fetchHistoryComposingTeachingPermissionUpsertData({ id, teachId })

  const items = [
    {
      title: 'فهرست مجوز تدریس ها',
      to: `/user/${id}/teachigPermission/requestListTeaching`
    },
    {
      title: 'نمایش مجوز تدریس'
    }
  ]
  return (
    <>
      <Breadcrumb items={items} />
      <RequestShowForm
        id={id}
        teachId={teachId}
        upsertData={upsertData}
        show={show}
        dataStudy={dataStudy}
        dataEducation={dataEducation}
        dataTeaching={dataTeaching}
        dataComposing={dataComposing}
      />
    </>
  )
}
