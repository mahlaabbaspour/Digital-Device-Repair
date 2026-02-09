import Breadcrumb from "@/components/elements/Breadcrumb"
import LanguageTable from "@/components/pages/admin/base/language/TableLanguage"

export const metadata = {
    title: 'فهرست زبان ها',
    description: 'می توانید فهرست زبان ها را مشاهده کنید'
}

const items = [
    {
        title: 'فهرست زبان ها'
    }
]

export default function LanguagePage() {
    return (
         <>
            <Breadcrumb items={items} />
            <LanguageTable />
         </>
    )
}
