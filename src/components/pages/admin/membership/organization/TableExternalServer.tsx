'use client'

import CustomTable from '@/components/elements/customTable/CustomTable'
import MenuButton from '@/components/elements/MenuButton'
import { API_ROUTS_ADMIN } from '@/configs/urls'
import { Box, CircularProgress, IconButton, MenuItem, Tooltip, Typography } from '@mui/material'
import { useState } from 'react'
import CreateExternalStorage from './CreateExternalStorage'
import CustomChip from '@/@core/components/mui/Chip'
import CreateSMSServer from './CreateSMSServer'
import CreateClassOnlineServer from './CreateClassOnlineServer'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { toast } from 'react-toastify'
import { connectionTest } from '@/libs/admin/membership/legalPersons/organization/externalServer'
import { Icon } from '@iconify/react'

export default function ExternalServerTable({ id }: any) {
  const [loadConnection, setLoadConnection] = useState(false)
  const handleConnectionTest = async (rowId: any) => {
    try {
      setLoadConnection(true)
      const res = await toast.promise(connectionTest({ id: id, rowId: rowId }), {
        pending: 'در حال تست ارتباط...'
      })

      const message = res?.data
      const errorMessage = res?.message
      if (res?.status) {
        toast.success(message)
      } else {
        toast.error(errorMessage)
      }
    } catch (error) {
      throw error
    } finally {
      setLoadConnection(false)
    }
  }

  const dataStruct = {
    title: ['نام', 'آدرس', 'توع سرور خارجی', 'فعال جاری', 'تست ارتباط'],
    name: [['name'], ['address'], ['externalServerType.name'], ['is_current'], ['id', 'externalServerType.id']],
    align: ['', 'center', 'center', 'center', 'center'],
    filter: [true, true, true, true, true],
    sort: ['name', 'identifier', 'organizationType.name', 'phone', 'postal_code'],
    rowId: ['id'],
    customCol: [
      ([e]: any) => e,
      ([e]: any) => e,
      ([e]: any) => (e ? e : '__'),
      ([e]: any) => (
        <Box sx={{ textAlign: 'center' }}>
          <CustomChip color={e == '1' ? 'success' : 'error'} label={e == '1' ? 'فعال ' : 'غیرفعال'} />
        </Box>
      ),
      ([e, c]: any) => (
        <>
          {c === 3 ? (
            <Tooltip title='تست ارتباط'>
              <IconButton onClick={() => handleConnectionTest(e)} color='primary'>
                {loadConnection ? <CircularProgress size={15} /> : <Icon icon='mdi:refresh' />}
              </IconButton>
            </Tooltip>
          ) : (
            <Typography>__</Typography>
          )}
        </>
      )
    ]
  }

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [currentRow, setCurrentRow] = useState(null)
  const [action, setAction] = useState<'edit' | 'create' | null>('create')
  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
  }

  const [openModal1, setOpenModal1]: any = useState()
  const [openModal2, setOpenModal2]: any = useState()
  const [openModal3, setOpenModal3]: any = useState()

  return (
    <>
      <CreateExternalStorage
        action={action}
        currentRow={currentRow}
        id={id}
        open={openModal1}
        setOpen={setOpenModal1}
        disabled={false}
        title='ایجاد حافظه خارجی'
        description='اطلاعات حافظه خارجی را وارد کنید'
      />
      <CreateSMSServer
        action={action}
        currentRow={currentRow}
        id={id}
        open={openModal2}
        setOpen={setOpenModal2}
        disabled={false}
        title='ایجاد سرویس پیامک'
        description='اطلاعات سرویس پیامک را وارد کنید'
      />
      <CreateClassOnlineServer
        action={action}
        currentRow={currentRow}
        id={id}
        open={openModal3}
        setOpen={setOpenModal3}
        disabled={false}
        title='ایجاد کلاس آنلاین'
        description='اطلاعات کلاس آنلاین را وارد کنید'
      />
      <CustomTable
        baseUrl={`${API_ROUTS_ADMIN.EXTERNAL_SERVER_BASE}/${id}/external-server`}
        queryKey='externalServer'
        textBtn=''
        btnShow={false}
        dataStruct={dataStruct}
        previousData={[]}
        titleTable={{ title: 'سرویس های خارجی', description: 'می توانید فهرست سرویس های خارجی را مشاهده کنید' }}
        customOperation={[
          {
            icon: <HiOutlinePencilAlt />,
            onClick: (row: any) => {
              const type = row?.externalServerType?.id

              if (type === 1) {
                setOpenModal1((prev: any) => !prev)
                setMenuAnchorEl(null)
                setCurrentRow(row)
                setAction('edit')
              } else if (type === 2) {
                setOpenModal2((prev: any) => !prev)
                setMenuAnchorEl(null)
                setCurrentRow(row)
                setAction('edit')
              } else if (type === 3) {
                setOpenModal3((prev: any) => !prev)
                setMenuAnchorEl(null)
                setCurrentRow(row)
                setAction('edit')
              }
            },
            if: () => true,
            color: 'primary',
            title: 'ویرایش'
          }
        ]}
        cardHeader={{
          status: true,
          btn: (
            <MenuButton
              color='primary'
              anchorEl={menuAnchorEl}
              handleClick={handleButtonClick}
              handleClose={handleMenuClose}
              open={Boolean(menuAnchorEl)}
              title='ایجاد سرور جدید'
              menuItems={
                <Box>
                  <MenuItem
                    onClick={() => {
                      setOpenModal1((prev: any) => !prev)
                      setMenuAnchorEl(null)
                      setAction('create')
                    }}
                  >
                    حافظه ذخیره سازی
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setOpenModal2((prev: any) => !prev)
                      setMenuAnchorEl(null)
                      setAction('create')
                    }}
                  >
                    SMS
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setOpenModal3((prev: any) => !prev)
                      setMenuAnchorEl(null)
                      setAction('create')
                    }}
                  >
                    کلاس آنلاین
                  </MenuItem>
                </Box>
              }
            />
          )
        }}
        btnOperation={{
          status: () => true,
          delete: () => true,
          edit: () => false,
          show: () => false
        }}
      />
    </>
  )
}
