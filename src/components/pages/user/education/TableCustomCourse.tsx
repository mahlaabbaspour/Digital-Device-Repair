'use client'

import { useState } from 'react'
import { Box, Table, TableBody, TableCell, TableRow, Skeleton, TableHead } from '@mui/material'

const TableCustomCourse = ({ columns, rows, actions, isLoading, id, upsertData }: any) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const paginatedRows = rows?.length ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : []

  function getNestedValue(obj: any, paths: any) {
    if (!Array.isArray(paths)) return []

    return paths.map(path => path.split('.').reduce((acc: any, key: any) => acc?.[key], obj))
  }

  return (
    <>
      <Box sx={{ mt: 15 }}>
        <Table
          sx={{
            borderCollapse: 'separate',
            borderSpacing: '0 8px' // فاصله عمودی بین ردیف‌ها
          }}
        >
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
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: '#f5f5f5',
                      '& td': {
                        borderBottom: 'none'
                      },
                      '&:not(:last-child)': {
                        mb: 1
                      }
                    }}
                  >
                    {columns.map((col: any) => (
                      <TableCell
                        key={col.key}
                        align='center'
                        sx={{
                          py: 2
                        }}
                      >
                        {getNestedValue(row, col.key)}
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
          )}
        </Table>
      </Box>
    </>
  )
}

export default TableCustomCourse
