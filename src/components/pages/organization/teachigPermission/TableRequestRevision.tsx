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
  Button,
  Pagination,
  Select,
  FormControl,
  MenuItem,
  Skeleton,
  Chip
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { ArrowDropDownIcon } from '@mui/x-date-pickers'
import CustomChip from '@/@core/components/mui/chip/index'

const TableRequestsRevision = ({
  columns,
  rows,
  actions,
  title,
  description,
  isLoading,
  id,
  onOpen,
  upsertData,
  disabled
}: any) => {
  console.log(columns, 'coulumns')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const paginatedRows = rows?.length ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : []

  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const router = useRouter()

  const getValueByPath = (obj: any, path: string) => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj)
  }

  return (
    <>
      <Box sx={{ mt: 15 }}>
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

          {isLoading ? (
            <TableBody>
              {new Array(6).fill(0).map((_: any, i: any) => (
                <TableRow key={i}>
                  <TableCell key={i}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <Skeleton animation='wave' height={30} sx={{ width: '60%' }} />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: `center !important`
                      }}
                    >
                      <Skeleton animation='wave' height={30} sx={{ width: '60%' }} />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: `center !important`
                      }}
                    >
                      <Skeleton animation='wave' height={30} sx={{ width: '60%' }} />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: `center !important`
                      }}
                    >
                      <Skeleton animation='wave' height={30} sx={{ width: '60%' }} />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: `center !important`
                      }}
                    >
                      <Skeleton animation='wave' height={30} sx={{ width: '60%' }} />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {paginatedRows?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} align='center'>
                    داده‌ای وجود ندارد
                  </TableCell>
                </TableRow>
              ) : (
                paginatedRows?.map((row: any, index: any) => (
                  <TableRow key={index}>
                    {columns.map((col: any) =>
                      col?.key == 'status' ? (
                        <TableCell key={col.key} align='center'>
                          <CustomChip
                            label={
                              row?.status == null
                                ? 'در دست بررسی'
                                : row?.status == '0'
                                  ? 'رد شده'
                                  : row?.status == '1'
                                    ? 'تایید شده'
                                    : ''
                            }
                            //@ts-ignore
                            color={
                              row?.status == null
                                ? 'warning'
                                : row?.status == '0'
                                  ? 'error'
                                  : row?.status == '1'
                                    ? 'success'
                                    : ''
                            }
                            skin='light'
                            variant='outlined'
                          />
                        </TableCell>
                      ) : (
                        <TableCell key={col.key} align='center'>
                          {getValueByPath(row, col.key)}
                        </TableCell>
                      )
                    )}

                    {actions && (
                      <TableCell align='center'>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>{actions(row)}</Box>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          )}
        </Table>

        <TablePagination
          component={() => (
            <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
              <Typography color='text.disabled'>
                {`نمایش ${pageIndex * pageSize} تا  ${(Math.min(pageIndex + 1) * pageSize, rows?.length)} از ${rows?.length}`}
              </Typography>

              <div className='flex items-center'>
                <FormControl sx={{ minWidth: 65, marginRight: 3, height: 38 }} size='small'>
                  <Select
                    sx={{
                      height: 38,
                      color: 'GrayText',
                      '& .MuiSelect-icon': { color: 'GrayText' }
                    }}
                    IconComponent={props => <ArrowDropDownIcon {...props} />}
                    labelId='demo-select-small-label'
                    id='demo-select-small'
                    value={pageSize}
                    onChange={(e: any) => {
                      setPageSize(e.target.value)
                      setPageIndex(0)
                    }}
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                  </Select>
                </FormControl>
                <Pagination
                  shape='rounded'
                  color='primary'
                  variant='tonal'
                  count={Math.ceil(rows?.length / pageSize)}
                  page={pageIndex + 1}
                  onChange={(_, page) => {
                    setPageIndex(page - 1)
                  }}
                  showFirstButton
                  showLastButton
                />
              </div>
            </div>
          )}
          count={rows?.length}
          rowsPerPage={5}
          page={pageIndex}
          onPageChange={(_, page) => {
            setPageIndex(page)
          }}
        />
      </Box>
    </>
  )
}

export default TableRequestsRevision
