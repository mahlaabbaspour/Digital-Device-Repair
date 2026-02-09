'use client'

import CustomTable from "@/components/elements/customTable/CustomTable";
import { API_ROUTS_ADMIN } from "@/configs/urls";
import { Box } from "@mui/material";

const dataStruct = {
  title: ['نام و نام خانوادگی ', 'کد ملی', 'موبایل', 'کد پستی', 'ایمیل'],
  name: [['first_name' , 'last_name'], ['username'], ['mobile'], ['postal_code'], ['email']],
  align: ['', 'center', 'center', 'center', 'center'],
  filter: [true, true, true, true, true],
  sort: ['last_name', 'username', 'mobile', 'postal_code', 'email'],
  rowId: ['id'],
  customCol: [
    ([e , c]: any) => `${e} ${c}`,
    ([e]: any) => e,
    ([e]: any) =>  e,
    ([e]: any) =>  '__',
    ([e]: any) =>  '__',
  ]
}

export default function AdminsTable() {
    return (
        <CustomTable
            baseUrl={API_ROUTS_ADMIN.ADMIN_BASE}
            queryKey='admin'
            textBtn='ایجاد مدیر جدید'
            btnShow={false}
            dataStruct={dataStruct}
            previousData={[]}
            titleTable={{ title: 'مدیران' , description: 'می توانید فهرست کارمندان را مشاهده کنید'}}
             btnOperation={{
              status: () => true,
              delete: () => false,
              edit: () => false,
              show: () => true
            }}
        />
    )
}
