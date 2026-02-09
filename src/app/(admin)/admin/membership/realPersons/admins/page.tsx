import Breadcrumb from "@/components/elements/Breadcrumb";
import AdminsTable from "@/components/pages/admin/membership/realPersons/admins/TableAdmins";

export const metadata = {
    title: 'فهرست مدیران',
    description: 'می توانید فهرست مدیران را مشاهده کنید'
}

const items = [
    {
        title: 'فهرست مدیران'
    }
]

export default async function AdminsPage() {

    return (
        <>
        <Breadcrumb items={items} />
        <AdminsTable />
        </>
    )
}

