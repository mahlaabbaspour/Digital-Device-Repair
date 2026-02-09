import Breadcrumb from "@/components/elements/Breadcrumb"
import RaceTable from "@/components/pages/admin/base/race/TableRace"

export const metadata = {
    title: 'فهرست نژاد ها',
    description: 'می توانید فهرست نژاد ها را مشاهده کنید'
}

const items = [
    {
        title: 'فهرست نژاد ها'
    }
]

export default function LanguagePage() {
    return (
         <>
            <Breadcrumb items={items} />
            <RaceTable />
         </>
    )
}
