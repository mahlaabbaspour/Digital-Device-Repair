'use client'

import { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

// import { useSession } from 'next-auth/react'
import {
  Box,
  TextField,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  IconButton,
  FormControl,
  MenuItem,
  Select,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
  Pagination,
  Modal,
  Fade,
  CircularProgress,
  Popover,
  FormControlLabel,
  Chip
} from '@mui/material'

// import { RiCloseCircleFill } from 'react-icons/ri'
import { IoTrashOutline } from 'react-icons/io5'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { BiShowAlt, BiTrash } from 'react-icons/bi'
import { FiAlertCircle, FiFilter } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'

import { ArrowDropDownIcon } from '@mui/x-date-pickers'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'

import type { AxiosInstance } from 'axios'

import { api } from '@/libs/api'

// import { axiosConfig } from '@iconify/tools/lib/index.js'

// import CustomTextField from './TextField'

import tableStyles from '@core/styles/table.module.css'

import DebouncedInput from '@/components/DebouncedInput'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 5,
  borderRadius: 2
}

function CustomTable({
  cacheTime = 5 * 60 * 1000,
  btnShow,
  textBtn,
  isPending,
  routeNameCustom,
  checkboxEnabled,
  dataStruct,
  customOperation,
  filterOptions = {},
  upsertData = {},
  selectedRowId = null,
  onRowClick,

  queryKey,
  baseUrl,
  apiClient = api,
  previousData,
  deleteModal = {
    title: null,
    text: null
  },
  titleTable = {
    title: null,
    description: null
  },
  cardHeader = {
    status: true,
    btn: null,
    placeholderSearch: null
  },
  btnOperation = {
    status: () => true,
    delete: () => true,
    edit: () => true,
    show: () => true,

    onShow: (row: any) => {},
    onEdit: (row: any) => {}
  },
  sortConfig = {
    columnParam: 'sort_by',
    directionParam: 'sort_order'
  }
}: any) {
  const routeName = usePathname()

  // const session: any = useSession()
  const queryClient = useQueryClient()

  // const { data: session, status } = useSession()

  // برای لاگین
  // const token = session?.accessToken

  // const token: any = session?.data?.myToken
  const [deleteFildId, setDeleteFildId] = useState('')
  const [openModal, setOpenModal] = useState('')
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('')

  const [datas, setDatas] = useState<any[]>([])

  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [sortColumn, setSortColumn] = useState<string>('')
  const [selectRows, setSelectRows] = useState<any>([])

  const [openFilter, setOpenFilter] = useState<any>(() =>
    dataStruct?.name.map((item: string) => {
      return {
        name: item[0],
        status: false,
        value: ''
      }
    })
  )

  const [filterAnchor, setFilterAnchor] = useState<HTMLElement | null>(null)

  const [activeFilter, setActiveFilter] = useState<any>(null)

  const [selectedFilters, setSelectedFilters] = useState<Record<string, number[]>>({})
  const [filterText, setFilterText] = useState('')

  const { data, isLoading } = useQuery({
    // توی خطا پایین باید توکن باشه
    queryKey: [
      queryKey,
      {
        baseUrl,
        pageIndex,
        pageSize,
        filter,
        sortColumn,
        sortDirection,
        selectedFilters
      }
    ],
    queryFn: async () => {
      try {
        // const sort = sortColumn ? `${sortColumn}_${sortDirection}` : ''
        // const params = new URLSearchParams()

        // params.append('page', String(pageIndex + 1))
        // params.append('first', String(pageSize))

        // if (filter) params.append('search', filter)

        // if (sort) params.append('sort', sort)

        const params = new URLSearchParams()

        params.append('page', String(pageIndex + 1))
        params.append('first', String(pageSize))

        if (filter) params.append('search', filter)

        if (sortColumn) {
          params.append(sortConfig.columnParam, sortColumn)
          params.append(sortConfig.directionParam, sortDirection)
        }

        // Object.entries(selectedFilters).forEach(([key, values]) => {
        //   values.forEach(id => {
        //     params.append(`${key}[]`, String(id))
        //   })
        // })

        Object.entries(selectedFilters).forEach(([key, values]) => {
          const selectedNames = values
            .map(id => {
              const selectedItem = filterOptions[key]?.find((item: any) => item.id === id)

              return selectedItem?.name
            })
            .filter(Boolean)

          if (selectedNames.length > 0) {
            params.append(key, selectedNames.join(','))
          }
        })

        // const res = await api.get(`${baseUrl}?page=${pageIndex + 1}&first=${pageSize}&search=${filter}&sort=${sort}`)
        // const res = await apiClient.get(`${baseUrl}?${params.toString()}`)
        const separator = baseUrl.includes('?') ? '&' : '?'

        const res = await apiClient.get(`${baseUrl}${separator}${params.toString()}`)

        // const res = await api.get(
        //   `${baseUrl}?page=${pageIndex + 1}&first=${pageSize}&search=${filter}&order_column=${sortColumn}&order_type=${sortDirection}`

        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`
        //     }
        //   }
        // )

        console.log('SORT REQUEST:', {
          order_column: sortColumn,
          order_type: sortDirection
        })

        console.log('SORT RESPONSE:', res.data?.data)

        // console.log(baseUrl, 'base url')
        const data = await res.data

        return data
      } catch (error) {
        throw error
      }
    },
    staleTime: cacheTime,

    // توی خط پایین بعد از && باید !!token باشه
    enabled: Boolean(baseUrl)

    // enabled: Boolean(baseUrl) && (!previousData || previousData.length === 0)
  })

  // console.log(datas, 'datasss')

  const deleteFeild = async (id: string) => {
    setLoading(true)

    try {
      if (!baseUrl) {
        setDatas((prev: any) => prev.filter((row: any) => getNestedValue(row, dataStruct.rowId)[0] !== id))

        toast.success('عملیات با موفقیت انجام شد')
        setOpenModal('')

        return
      }

      // const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${baseUrl}/destroy/${id}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Accept: 'application/json'

      //     // Authorization: `Bearer ${token}`
      //   }
      // })

      // const result = await apiClient.delete(`${baseUrl}/destroy/${id}`)

      // if (result.ok) {
      //   queryClient.invalidateQueries({ queryKey: [queryKey] })
      //   setDatas((data: any) => data.filter((row: any) => getNestedValue(row, dataStruct.rowId)[0] !== id))
      //   toast.success('عملیات با موفقیت انجام شد.')
      //   setOpenModal('')
      // }

      await apiClient.delete(`${baseUrl}/destroy/${id}`)

      queryClient.invalidateQueries({
        queryKey: [queryKey]
      })

      setDatas((data: any) => data.filter((row: any) => getNestedValue(row, dataStruct.rowId)[0] !== id))

      toast.success('عملیات با موفقیت انجام شد.')

      setOpenModal('')
    } catch (error) {
      toast.error('خطایی رخ داده است')
    } finally {
      setLoading(false)
    }
  }

  const tableData = previousData?.length ? previousData : (data?.data ?? [])

  useEffect(() => {
    if (previousData && previousData.length > 0) {
      setDatas(previousData)
    } else {
      setDatas(data?.data ?? [])
    }
  }, [data, previousData])

  const totalDataCount = previousData && previousData.length > 0 ? previousData.length : (data?.meta?.total ?? 0)

  // const totalDataCount = datas.length

  function getNestedValue(obj: any, paths: any) {
    if (!Array.isArray(paths)) return []

    return paths.map(path => path.split('.').reduce((acc: any, key: any) => acc?.[key], obj))
  }

  const handleSelectedAll = (checked: boolean) => {
    setSelectRows(checked ? datas.map((r: any) => getNestedValue(r, dataStruct.rowId)).map(([e]: any) => e) : [])
  }

  const handleSelectRow = (id: any, checked: boolean) => {
    setSelectRows((prev: any) => (checked ? [...prev, id] : prev.filter((item: any) => item != id)))
  }

  const paginatedData =
    previousData && previousData.length > 0 ? datas.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize) : datas

  // const paginatedData = datas.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)

  return (
    <>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={openModal === 'delete'}
        onClose={() => setOpenModal('')}
        closeAfterTransition
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={openModal === 'delete'} className='relative'>
          <Box sx={{ ...style }}>
            <div className='absolute  end-3 top-3'>
              <IconButton onClick={() => setOpenModal('')}>
                <AiOutlineClose />
              </IconButton>
            </div>
            <div className='w-full flex justify-center'>
              <IconButton color='error'>
                <FiAlertCircle className='size-[60px]' />
              </IconButton>
            </div>

            <Typography id='transition-modal-title' className='text-center' variant='h5' component='h5' sx={{ mt: 3 }}>
              حذف {deleteModal.title}
            </Typography>
            <Typography id='transition-modal-description' variant='subtitle1' className='text-center' sx={{ mt: 3 }}>
              آیا از حذف {deleteModal.text} مطمئن هستید؟
            </Typography>

            <div className='mt-8 flex w-full justify-end'>
              <div className='flex gap-3'>
                <Button onClick={() => setOpenModal('')} variant='contained'>
                  انصراف
                </Button>
                {loading ? (
                  <Button color='error' variant='contained'>
                    {' '}
                    <CircularProgress size={20} color='inherit' />
                  </Button>
                ) : (
                  <Button onClick={() => deleteFeild(deleteFildId)} color='error' variant='contained'>
                    بله
                  </Button>
                )}
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={openModal === 'allDelete'}
        onClose={() => setOpenModal('')}
        closeAfterTransition
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={openModal === 'allDelete'} className='relative'>
          <Box sx={{ ...style }}>
            <div className='absolute  end-3 top-3'>
              <IconButton onClick={() => setOpenModal('')}>
                <AiOutlineClose />
              </IconButton>
            </div>
            <div className='w-full flex justify-center'>
              <IconButton color='error'>
                <FiAlertCircle className='size-[60px]' />
              </IconButton>
            </div>

            <Typography id='transition-modal-title' className='text-center' variant='h5' component='h5' sx={{ mt: 3 }}>
              حذف گروهی {deleteModal.text}
            </Typography>
            <Typography id='transition-modal-description' variant='subtitle1' className='text-center' sx={{ mt: 3 }}>
              آیا از حذف گروهی {deleteModal.text} مطمئن هستید؟
            </Typography>

            <div className='mt-8 flex w-full justify-end'>
              <div className='flex gap-3'>
                <Button onClick={() => setOpenModal('')} variant='contained'>
                  انصراف
                </Button>
                {loading ? (
                  <Button color='error' variant='contained'>
                    {' '}
                    <CircularProgress size={20} color='inherit' />
                  </Button>
                ) : (
                  <Button onClick={() => deleteFeild(deleteFildId)} color='error' variant='contained'>
                    بله
                  </Button>
                )}
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>

      <Card>
        {titleTable.title && (
          <>
            <CardHeader
              sx={{ textAlign: 'center', mb: 5 }}
              title={
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                  {titleTable.title}{' '}
                </Typography>
              }
              subheader={titleTable.description && <Typography variant='caption'>{titleTable.description}</Typography>}
            />
            <Divider component='hr' sx={{ mb: 4 }} />
          </>
        )}
        {cardHeader.status && (
          <CardHeader
            sx={{ padding: 5 }}
            title={
              cardHeader.btn ||
              (btnShow && (
                <Button href={routeNameCustom || `${routeName}/create`} variant='contained'>
                  {textBtn}
                </Button>
              ))
            }
            action={
              <div className='flex'>
                {btnOperation.delete('allDelete') && (
                  <Tooltip title='حذف گروهی'>
                    <IconButton onClick={() => setOpenModal('allDelete')}>
                      <BiTrash color='error' />
                    </IconButton>
                  </Tooltip>
                )}
                <DebouncedInput value={filter ?? ''} onChange={(value: string) => setFilter(String(value))} />
              </div>
            }
          />
        )}

        <div className='overflow-x-auto'>
          <Table stickyHeader className={tableStyles.table}>
            <TableHead>
              <TableRow>
                {checkboxEnabled && (
                  <TableCell>
                    <Checkbox
                      indeterminate={selectRows.length > 0 && selectRows.length < datas.length}
                      checked={selectRows.length === datas.length && datas.length > 0}
                      onChange={(_, checked) => handleSelectedAll(checked)}
                    />
                  </TableCell>
                )}
                {dataStruct.title.map((item: any, i: number) =>
                  !dataStruct.filter[i] ? (
                    <TableCell
                      key={i}
                      sx={{
                        width: dataStruct.width?.[i],
                        textAlign: `${dataStruct.align?.[i]} !important`,
                        paddingLeft: `${openFilter[i]?.status ? '0px' : '20px'} !important`
                      }}
                      onContextMenu={e => {
                        e.preventDefault()

                        if (dataStruct.sort[i]) {
                          if (sortColumn === dataStruct.sort[i]) {
                            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
                          } else {
                            setSortColumn(dataStruct.sort[i])
                            setSortDirection('asc')
                          }
                        }
                      }}
                    >
                      <TableSortLabel
                        active={sortColumn === dataStruct.sort[i]}
                        direction={sortColumn === dataStruct.sort[i] ? sortDirection : 'asc'}
                        onClick={() => {
                          if (!dataStruct.sort[i]) return

                          if (sortColumn === dataStruct.sort[i]) {
                            setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
                          } else {
                            setSortColumn(dataStruct.sort[i])
                            setSortDirection('asc')
                          }
                        }}
                        sx={!dataStruct.sort[i] ? { pointerEvents: 'none' } : undefined}
                      >
                        {item}
                      </TableSortLabel>
                    </TableCell>
                  ) : (
                    <TableCell
                      key={i}
                      sx={{
                        width: dataStruct.width?.[i],
                        textAlign: `${dataStruct.align?.[i]} !important`,
                        position: 'relative',
                        padding: '0px !important',
                        paddingLeft: `${openFilter[i]?.status ? '0px' : '20px'} !important`
                      }}
                      onContextMenu={e => {
                        e.preventDefault()

                        if (dataStruct.sort[i]) {
                          if (sortColumn === dataStruct.sort[i]) {
                            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
                          } else {
                            setSortColumn(dataStruct.sort[i])
                            setSortDirection('asc')
                          }
                        }
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: dataStruct.align?.[i],
                          gap: 0.5
                        }}
                      >
                        {dataStruct.filter[i] && (
                          <IconButton
                            size='small'
                            onClick={e => {
                              setFilterAnchor(e.currentTarget)
                              setActiveFilter(dataStruct.filter[i].key)
                              setFilterText('')
                            }}
                          >
                            <FiFilter size={16} />
                          </IconButton>
                        )}

                        <TableSortLabel
                          active={sortColumn === dataStruct.sort[i]}
                          direction={sortDirection}
                          onClick={() => {}}
                        >
                          {item}
                        </TableSortLabel>
                      </Box>
                      {/* {!openFilter[i]?.status ? (
                        <TableSortLabel
                          onClick={() => null}
                          active={sortColumn === dataStruct.sort[i]}
                          direction={sortDirection}
                          sx={dataStruct.sort[i] || { pointerEvents: 'none' }}
                        >
                          {item}
                        </TableSortLabel>
                      ) : (
                        <div
                          className={`absolute w-full flex justify-${dataStruct.align?.[i]} fade-in -translate-y-1/2`}
                        >
                          <TextField
                            color='secondary'
                            size='small'
                            variant='outlined'
                            placeholder='جستجو...'
                            value={openFilter[i].value}
                            sx={{
                              textAlign: `${dataStruct.align?.[i]} !important`,
                              mx: 1
                            }}
                            onChange={(e: any) => {
                              const arr = [...openFilter]

                              arr[i].value = e.target.value
                              setOpenFilter(arr)
                            }}
                            InputProps={{
                              endAdornment: (
                                <IconButton
                                  onClick={e => {
                                    e.stopPropagation()
                                    setOpenFilter((prev: any) => {
                                      const next = [...prev]

                                      next[i].status = false
                                      next[i].value = ''

                                      return next
                                    })
                                  }}
                                  sx={{ p: 0, mr: '-10px' }}
                                  color='default'
                                >
                                  <RiCloseCircleFill />
                                </IconButton>
                              )
                            }}
                          />
                        </div>
                      )} */}
                    </TableCell>
                  )
                )}
                {btnOperation?.status(true) && (
                  <TableCell sx={{ textAlign: `${dataStruct.align?.[dataStruct.align.length - 1]} !important` }}>
                    عملیات
                  </TableCell>
                )}
              </TableRow>
            </TableHead>

            {/* باید قبل از isLoading !token باشه  */}
            {isLoading || isPending ? (
              <TableBody>
                {new Array(6).fill(0).map((_: any, i: any) => (
                  <TableRow key={i}>
                    {checkboxEnabled && (
                      <TableCell key={i}>
                        <Box sx={{ width: 18, display: 'flex', justifyContent: dataStruct.align?.[i] }}>
                          <Skeleton animation='wave' height={30} sx={{ width: '100%' }} />
                        </Box>
                      </TableCell>
                    )}
                    {dataStruct.title.map((_: any, i: any) => (
                      <TableCell
                        key={i}
                        sx={{
                          width: dataStruct.width?.[i]
                        }}
                      >
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: dataStruct.align?.[i] }}>
                          <Skeleton animation='wave' height={30} sx={{ width: '60%' }} />
                        </Box>
                      </TableCell>
                    ))}
                    {btnOperation?.status(true) && (
                      <TableCell>
                        <Box
                          sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: `${dataStruct.align?.[dataStruct.align.length - 1]} !important`
                          }}
                        >
                          <Skeleton animation='wave' height={30} sx={{ width: '60%' }} />
                        </Box>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            ) : paginatedData?.length === 0 ? (
              <TableBody>
                <TableRow sx={{ height: '75px !important' }}>
                  <TableCell colSpan={dataStruct.title.length + 2} className='text-center'>
                    هیچ داده ای در دسترس نیست
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {paginatedData?.map((row: any, i: any) => {
                  const id = getNestedValue(row, dataStruct.rowId)[0]

                  return (
                    <TableRow
                      key={id}
                      hover
                      onClick={() => onRowClick?.(row)}
                      sx={{
                        height: 69,
                        cursor: onRowClick ? 'pointer' : 'default',
                        transition: 'background-color 0.2s ease, border-color 0.2s ease',
                        borderLeft: '3px solid',
                        borderLeftColor: selectedRowId === id ? 'primary.main' : 'transparent',
                        backgroundColor:
                          selectedRowId === id ? 'rgba(var(--mui-palette-primary-mainChannel) / 0.08)' : 'inherit',
                        '&:hover': {
                          backgroundColor:
                            selectedRowId === id
                              ? 'rgba(var(--mui-palette-primary-mainChannel) / 0.12)'
                              : 'rgba(var(--mui-palette-primary-mainChannel) / 0.04)'
                        }
                      }}
                    >
                      {checkboxEnabled && (
                        <TableCell>
                          <Checkbox
                            checked={selectRows.includes(id)}
                            onChange={(_, checked) => handleSelectRow(id, checked)}
                          />
                        </TableCell>
                      )}
                      {/* {dataStruct?.name?.map((item: any, i: any) => {
                        return (
                          <TableCell sx={{ textAlign: `${dataStruct.align[i]} !important` }} key={i}>
                            {dataStruct.customCol?.[i](getNestedValue(row, item))}
                          </TableCell>
                        )
                      })} */}
                      {dataStruct?.name?.map((item: any, i: any) => {
                        const custom = dataStruct?.customCol?.[i]

                        return (
                          <TableCell
                            sx={{ width: dataStruct.width?.[i], textAlign: `${dataStruct.align[i]} !important` }}
                            key={i}
                          >
                            {custom ? custom(getNestedValue(row, item), i, row) : getNestedValue(row, item)[0]}
                          </TableCell>
                        )
                      })}
                      {btnOperation?.status(row) && (
                        <TableCell sx={{ textAlign: `${dataStruct.align[dataStruct.align.length - 1]} !important` }}>
                          {customOperation?.map((btn: any, i: any) => {
                            if (!btn.if(row)) return null
                            const href = btn.pth ? `${routeName}/${id}/${btn.path}` : undefined

                            return href ? (
                              <Tooltip title={btn.title} arrow key={i}>
                                <Link href={href} passHref>
                                  <IconButton color={btn.color} sx={btn?.sx} title={btn.title}>
                                    {btn.icon}
                                  </IconButton>
                                </Link>
                              </Tooltip>
                            ) : (
                              <Tooltip title={btn.title} arrow key={i}>
                                <IconButton color={btn.color} sx={btn?.sx} onClick={() => btn.onClick(row)}>
                                  {btn.icon}
                                </IconButton>
                              </Tooltip>
                            )
                          })}

                          {btnOperation?.show(row) && (
                            <Tooltip title={'نمایش'} arrow>
                              <IconButton
                                sx={{ scale: 1.03 }}
                                // href={`${routeName}/${id}/show`}
                                color='warning'
                                onClick={() => {
                                  btnOperation?.onShow?.(row)
                                }}
                              >
                                <BiShowAlt />
                              </IconButton>
                            </Tooltip>
                          )}

                          {btnOperation?.edit(row) && (
                            <Tooltip title={'ویرایش'} arrow>
                              <IconButton
                                sx={{ scale: 0.95 }}
                                color='primary'
                                // href={`${routeName}/${id}/update`}
                                onClick={() => {
                                  btnOperation?.onEdit?.(row)
                                }}
                              >
                                <HiOutlinePencilAlt />
                              </IconButton>
                            </Tooltip>
                          )}

                          {btnOperation?.delete(row) && (
                            <Tooltip title={'حذف'} arrow>
                              <IconButton
                                sx={{ scale: 0.9 }}
                                onClick={() => {
                                  setDeleteFildId(id)
                                  setOpenModal('delete')
                                }}
                                color='error'
                              >
                                <IoTrashOutline />
                              </IconButton>
                            </Tooltip>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  )
                })}
              </TableBody>
            )}
          </Table>
        </div>

        <TablePagination
          component={() => (
            <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
              <Typography color='text.disabled'>
                {`نمایش ${pageIndex * pageSize} تا  ${(Math.min(pageIndex + 1) * pageSize, totalDataCount)} از ${totalDataCount}`}
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
                  count={Math.ceil(totalDataCount / pageSize)}
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
          count={tableData.length ?? 0}
          rowsPerPage={5}
          page={pageIndex}
          onPageChange={(_, page) => {
            setPageIndex(page)
          }}
        />
      </Card>

      <Popover
        open={Boolean(filterAnchor)}
        anchorEl={filterAnchor}
        onClose={() => {
          setFilterAnchor(null)
          setActiveFilter(null)
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 6
          }
        }}
      >
        <Box
          sx={{
            width: 280,
            p: 2
          }}
        >
          {/* Search */}
          <TextField
            fullWidth
            size='small'
            placeholder='جستجو...'
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Items */}
          <Box
            sx={{
              maxHeight: 260,
              overflowY: 'auto',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              p: 1
            }}
          >
            {(filterOptions[activeFilter] || []).filter((item: any) => item.name.includes(filterText)).length === 0 ? (
              <Typography variant='body2' color='text.secondary' sx={{ textAlign: 'center', py: 2 }}>
                دیتای موردنظر یافت نشد
              </Typography>
            ) : (
              (filterOptions[activeFilter] || [])
                .filter((item: any) => item.name.includes(filterText))
                .map((item: any) => (
                  <FormControlLabel
                    key={item.id}
                    control={
                      <Checkbox
                        checked={selectedFilters[activeFilter]?.includes(item.id) || false}
                        onChange={e => {
                          const checked = e.target.checked

                          setSelectedFilters(prev => {
                            const current = prev[activeFilter] || []

                            return {
                              ...prev,
                              [activeFilter]: checked ? [...current, item.id] : current.filter(x => x !== item.id)
                            }
                          })
                        }}
                      />
                    }
                    label={item.name}
                  />
                ))
            )}
          </Box>

          {/* Selected Items */}
          {(selectedFilters[activeFilter] || []).length > 0 && (
            <Box
              sx={{
                mt: 2,
                pt: 2,
                borderTop: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Typography
                variant='caption'
                color='text.secondary'
                sx={{
                  display: 'block',
                  mb: 1
                }}
              >
                انتخاب شده:
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 0.5
                }}
              >
                {(selectedFilters[activeFilter] || []).map((id: number) => {
                  const selectedItem = (filterOptions[activeFilter] || []).find((item: any) => item.id === id)

                  if (!selectedItem) return null

                  return (
                    <Chip
                      key={id}
                      label={selectedItem.name}
                      size='small'
                      onDelete={() => {
                        setSelectedFilters(prev => ({
                          ...prev,
                          [activeFilter]: (prev[activeFilter] || []).filter(itemId => itemId !== id)
                        }))
                      }}
                    />
                  )
                })}
              </Box>
            </Box>
          )}

          {/* Buttons */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2
            }}
          >
            <Button
              color='error'
              onClick={() => {
                setSelectedFilters(prev => ({
                  ...prev,
                  [activeFilter]: []
                }))
              }}
            >
              پاک کردن
            </Button>

            {/* <Button variant='contained' onClick={() => setFilterAnchor(null)}>
              تایید
            </Button> */}
          </Box>
        </Box>
      </Popover>
    </>
  )
}

export default CustomTable
