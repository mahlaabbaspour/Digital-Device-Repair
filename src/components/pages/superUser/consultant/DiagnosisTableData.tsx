'use client'

import { useState } from 'react'
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  CardHeader,
  Divider,
  Button
} from '@mui/material'
import DebouncedInput from '@/components/elements/customTable/DebouncedInput'
import { useRouter } from 'next/navigation'

type Column = {
  label: string
  key: string
}

type Props = {
  columns: Column[]
  rows: any[]
  actions?: (row: any) => React.ReactNode
}

const TableDigansisData = ({ columns, rows, actions, title, description, selectRow, id, documentId }: any) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  const [fiter, setFilter] = useState('')

  const router = useRouter()

  return (
    <Card>
      <CardHeader
        sx={{ textAlign: 'center' }}
        title={
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            {title}{' '}
          </Typography>
        }
        subheader={description && <Typography variant='caption'>{description}</Typography>}
      />
      <CardHeader
        sx={{ padding: 5 }}
        title={
          <Button
            onClick={() =>
              router.push(
                `/superUser/${id}/consultant/consultantDocument/${documentId}/diagnosis/create?meetingId=${selectRow?.id}`
              )
            }
            variant='contained'
          >
            ایجاد تشخیص
          </Button>
        }
        action={
          <div className='flex'>
            <DebouncedInput value={fiter ?? ''} onChange={(value: string) => setFilter(String(value))} />
          </div>
        }
      />

      <Divider component='hr' />

      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col: any) => (
              <TableCell key={col.key} align='center'>
                {col.label}
              </TableCell>
            ))}
            {actions && <TableCell align='center'>عملیات</TableCell>}
          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedRows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + 1} align='center'>
                داده‌ای وجود ندارد
              </TableCell>
            </TableRow>
          ) : (
            paginatedRows.map((row: any, index: any) => (
              <TableRow key={index}>
                {columns.map((col: any) => (
                  <TableCell key={col.key} align='center'>
                    {row[col.key]}
                  </TableCell>
                ))}

                {actions && (
                  <TableCell align='center'>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>{actions(row)}</Box>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <TablePagination
        component='div'
        count={rows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
        labelRowsPerPage='تعداد در صفحه'
      />
    </Card>
  )
}

export default TableDigansisData
