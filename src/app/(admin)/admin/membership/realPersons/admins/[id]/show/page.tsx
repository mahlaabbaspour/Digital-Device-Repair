import Breadcrumb from "@/components/elements/Breadcrumb";
import CardAdminShow from "@/components/pages/admin/membership/realPersons/admins/CardAdminShow";
import { fetchAdminShow } from "@/libs/admin/membership/realPersons/admins/admin";

export const metadata = {
    title: 'نمایش مدیر',
    description: 'می توانید نمایش مدیر را مشاهده کنید'
}

const items = [
    {
        title: 'فهرست مدیران',
        to: '/admin/membership/realPersons/admins'
    },
    {
        title: 'نمایش مدیر'
    }
]

export default async function AdminShow({ params } : { params: Promise<{id: string}>} ) {
    const { id } = await params;
    const show = await fetchAdminShow(id);

    return (
       <>
         <Breadcrumb items={items} />
         <CardAdminShow data={show} title="اطلاعات مدیر" description="می توانید اطلاعات مدیر را مشاهده کنید"  />
       </>
    )
}
