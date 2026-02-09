import Breadcrumb from '@/components/elements/Breadcrumb'
import RequestUpdateForm from '@/components/pages/user/teachigPermission/RequestListUpdateForm'
import {
  fetchHistoryComposingTeachingPermissionUpsertData,
  fetchHistoryEducationTeachingPermissionUpsertData,
  fetchHistoryStudyTeachingPermissionUpsertData,
  fetchHistoryTeachingTeachingPermissionUpsertData,
  fetchTeachingPermissionShow,
  fetchTeachingPermissionUpsertData
} from '@/libs/user/teachigPermission'

export const metadata = {
  title: 'ویرایش درخواست تدریس',
  descritpion: 'می توانید مجوز تدریس مورد نظر را ایجاد کنید'
}

export default async function CreateTeachingPermissionPage({ params }: any) {
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
      title: 'ویرایش مجوز تدریس'
    }
  ]
  return (
    <>
      <Breadcrumb items={items} />
      <RequestUpdateForm
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
