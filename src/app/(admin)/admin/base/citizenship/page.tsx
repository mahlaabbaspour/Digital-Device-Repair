import Breadcrumb from "@/components/elements/Breadcrumb"
import CitizenshipTable from "@/components/pages/admin/base/citizenship/TableCitizenship"

export const metadata = {
    title: 'فهرست تابعیت ها',
    description: 'می توانید فهرست تابعیت ها را مشاهده کنید'
}

const items = [
    {
        title: 'فهرست تابعیت ها'
    }
]

export default function CitizenshipPage() {
    return (
         <>
            <Breadcrumb items={items} />
            <CitizenshipTable />
         </>
    )
}
