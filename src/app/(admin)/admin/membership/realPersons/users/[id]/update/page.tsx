import Breadcrumb from "@/components/elements/Breadcrumb";
import UpdateUserForm from "@/components/pages/admin/membership/realPersons/users/CardUserUpdate";
import { fetchshowUser, fetchUserUpsertData } from "@/libs/admin/membership/realPersons/users/user";
import { Card, CardContent } from "@mui/material";

export const metadata = {
    title: 'ویرایش کاربر',
    description: 'می توانید کاربر را ویرایش کنید'
}

const items = [
    {
        title: 'فهرست کاربران',
        to: '/admin/membership/realPersons/users'
    },
    {
        title: 'ویرایش کاربر'
    }
]


export default async function UserUpdatePage({ params } : { params: Promise<{id: string}>} ) {
    const { id } = await params;
    const upsertData = await fetchUserUpsertData();
    const show = await fetchshowUser(id);

    return (
        <>
        <Breadcrumb items={items} />
        <Card>
            <CardContent>
               <UpdateUserForm upsertData={upsertData} show={show} id={id} disabled={false} />
            </CardContent>
        </Card>
        </>
    )
}
