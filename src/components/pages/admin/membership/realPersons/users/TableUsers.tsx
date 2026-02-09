'use client'

import CustomTable from '@/components/elements/customTable/CustomTable'
import { API_ROUTS_ADMIN } from '@/configs/urls'

const dataStruct = {
  title: ['نام و نام خانوادگی ', 'کد ملی', 'موبایل', 'کد پستی', 'ایمیل'],
  name: [['first_name', 'last_name'], ['username'], ['mobile'], ['postal_code'], ['email']],
  align: ['', 'center', 'center', 'center', 'center'],
  filter: [true, true, true, true, true],
  sort: ['last_name', 'username', 'mobile', 'postal_code', 'email'],
  rowId: ['id'],
  customCol: [
    ([e, c]: any) => `${e} ${c}`,
    ([e]: any) => e,
    ([e]: any) => e,
    ([e]: any) => (e ? e : '__'),
    ([e]: any) => (e ? e : '__')
  ]
}

export default function UsersTable() {
  return (
    <CustomTable
      baseUrl={API_ROUTS_ADMIN.USER_BASE}
      queryKey='admin'
      textBtn='ایجاد کاربر جدید'
      btnShow={true}
      dataStruct={dataStruct}
      previousData={[]}
      checkboxEnabled={true}
      titleTable={{ title: 'کاربران', description: 'می توانید فهرست کاربران را مشاهده کنید' }}
      btnOperation={{
        status: () => true,
        delete: () => true,
        edit: () => true,
        show: () => true
      }}
    />
  )
}
