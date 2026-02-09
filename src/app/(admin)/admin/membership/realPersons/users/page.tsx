import Breadcrumb from "@/components/elements/Breadcrumb";
import UsersTable from "@/components/pages/admin/membership/realPersons/users/TableUsers";


export const metadata = {
    title: 'فهرست کاربران',
    description: 'می توانید فهرست کاربران را مشاهده کنید'
}

const items = [
    {
        title: 'فهرست کاربران'
    }
]

export default function UsersPage() {
    return (
        <>
         <Breadcrumb items={items} />
         <UsersTable />
        </>
    )
}
