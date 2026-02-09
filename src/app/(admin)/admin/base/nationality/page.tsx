import Breadcrumb from "@/components/elements/Breadcrumb"
import NationalityTable from "@/components/pages/admin/base/nationality/TableNationality"

export const metadata = {
    title: 'فهرست ملیت ها',
    description: 'می توانید فهرست ملیت ها را مشاهده کنید'
}

const items = [
    {
        title: 'فهرست ملیت ها'
    }
]

export default function NationalityPage() {
    return (
         <>
            <Breadcrumb items={items} />
            <NationalityTable />
         </>
    )
}
