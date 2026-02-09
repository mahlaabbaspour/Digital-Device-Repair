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
  Grid,
  Autocomplete,
  TextField,
  CardContent,
  Pagination,
  Select,
  FormControl,
  MenuItem,
  Skeleton
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import { ArrowDropDownIcon } from '@mui/x-date-pickers'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useFetchDocumentList } from '@/hooks/institution/consultationDocuments/useDocumentList'
import { dateConverter } from '@/helpers/DateHelpers'
import CustomDatePicker from '@/components/elements/customDatePicker'

const TableConsultationMeeting = ({
  columns,
  rows,
  actions,
  title,
  description,
  selectRow,
  id,
  documentId,
  upsertData
}: any) => {
  console.log(id, upsertData, 'id')
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

  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  console.log(paginatedRows, 'paginatedRows')
  const [fiter, setFilter] = useState('')

  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const router = useRouter()

  const getValueByPath = (obj: any, path: string) => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj)
  }

  const {
    control: controlFilter,
    handleSubmit: handleSubmitFilter,
    reset
  } = useForm({
    defaultValues: {
      start_date: null,
      end_date: null,
      consultation_status_ids: [],
      advisor_ids: [],
      activity_field_area_ids: [],
      document_id: null,
      username: '',
      mobile: '',
      full_name: ''
    }
  })

  const [filters, setFilters] = useState<any>({})
  const [open, setOpen] = useState(false)
  const { data: documents, isLoading }: any = useFetchDocumentList({ id: id, params: filters })
  console.log(documents, 'documents')

  async function onSubmitFilter(values: any) {
    try {
      const start_date = dateConverter(values?.start_date)
      const end_date = dateConverter(values?.end_date)
      const data = {
        start_date,
        end_date,
        consultation_status_ids: values?.consultation_status_ids.map((el: any) => el?.id),
        advisor_ids: values?.advisor_ids?.map((el: any) => el?.id),
        activity_field_area_ids: values?.activity_field_area_ids?.map((el: any) => el?.id),
        document_id: values?.document_id?.id,
        username: values?.username,
        mobile: values?.mobile,
        full_name: values?.full_name
      }
      setFilters(data)
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <Accordion expanded={open} onChange={() => setOpen(prev => !prev)} elevation={0}>
        <AccordionSummary
          expandIcon={open ? <ExpandLessIcon sx={{ fontSize: 30 }} /> : <ExpandMoreIcon sx={{ fontSize: 30 }} />}
          sx={{
            minHeight: '100px',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            '& .MuiAccordionSummary-expandIconWrapper': {
              order: 0,
              marginBottom: 1
            },
            '& .MuiAccordionSummary-content': {
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }
          }}
        >
          <Typography variant='h6' fontWeight='bold'>
            فیلترهای پیشرفته
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            می توانید فهرست پرونده های مورد نظر را فیلتر کنید
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Box>
            <form onSubmit={handleSubmitFilter(onSubmitFilter)}>
              <CardContent>
                <Grid container spacing={5}>
                  {/* start_time */}
                  <Grid item xs={12} md={3}>
                    <Controller
                      control={controlFilter}
                      name='start_date'
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomDatePicker label='شروع بازه' value={value} onChange={onChange} />
                      )}
                    />
                  </Grid>

                  {/* end_time */}
                  <Grid item xs={12} md={3}>
                    <Controller
                      control={controlFilter}
                      name='end_date'
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomDatePicker label='پایان بازه' value={value} onChange={onChange} />
                      )}
                    />
                  </Grid>

                  {/* status_meeting */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name='consultation_status_ids'
                      control={controlFilter}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <Autocomplete
                          readOnly={false}
                          options={upsertData?.MeetingConsultationStatuses}
                          value={value}
                          multiple={true}
                          onChange={(_, newvalue) => onChange(newvalue)}
                          noOptionsText='هیچ نتیجه ای یافت نشد'
                          getOptionLabel={(options: { name: string }) => options?.name || ''}
                          renderInput={params => (
                            <TextField label='وضعیت جلسه' {...params} error={!!error} helperText={error?.message} />
                          )}
                        />
                      )}
                    />
                  </Grid>

                  {/* advisor_ids */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name='advisor_ids'
                      control={controlFilter}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAsyncAutocomplete
                          url={`/institution/${id}/meeting/base/select/advisor`}
                          readOnly={false}
                          onAddValue={newValue => onChange(newValue)}
                          value={value}
                          getOptionLabel={optien => optien?.name}
                          label='مشاوران'
                          multiple={true}
                          error={!!error}
                          helperText={error?.message}
                        ></CustomAsyncAutocomplete>
                      )}
                    />
                  </Grid>

                  {/* activity_field_area_ids */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name='activity_field_area_ids'
                      control={controlFilter}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAsyncAutocomplete
                          url={`/institution/${id}/meeting/base/select/consulting-activity-field-area`}
                          readOnly={false}
                          onAddValue={newValue => onChange(newValue)}
                          value={value}
                          getOptionLabel={optien => optien?.name}
                          label='حیطه های فعالیت'
                          multiple={true}
                          error={!!error}
                          helperText={error?.message}
                        ></CustomAsyncAutocomplete>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Divider />
                  </Grid>

                  {/* document_id */}
                  <Grid item xs={12} md={3}>
                    <Controller
                      name='document_id'
                      control={controlFilter}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAsyncAutocomplete
                          url={`/institution/${id}/meeting/base/select/consultation-document`}
                          readOnly={false}
                          onAddValue={newValue => onChange(newValue)}
                          value={value}
                          getOptionLabel={option => `${option?.first_name} ${option?.last_name} (${option?.username})`}
                          label='پرونده های مرکز'
                          error={!!error}
                          helperText={error?.message}
                        ></CustomAsyncAutocomplete>
                      )}
                    />
                  </Grid>

                  {/* username */}
                  <Grid item xs={12} sm={3}>
                    <Controller
                      name='username'
                      control={controlFilter}
                      render={({ field: { onChange, value }, fieldState: { error } }) => {
                        return (
                          <TextField
                            label='کدملی'
                            fullWidth
                            error={!!error}
                            helperText={error?.message}
                            value={value}
                            onChange={onChange}
                            InputProps={{ readOnly: false }}
                          />
                        )
                      }}
                    />
                  </Grid>

                  {/* mobile */}
                  <Grid item xs={12} sm={3}>
                    <Controller
                      name='mobile'
                      control={controlFilter}
                      render={({ field: { onChange, value }, fieldState: { error } }) => {
                        return (
                          <TextField
                            label='شماره  موبایل'
                            fullWidth
                            error={!!error}
                            helperText={error?.message}
                            value={value}
                            onChange={onChange}
                            InputProps={{ readOnly: false }}
                          />
                        )
                      }}
                    />
                  </Grid>

                  {/* full_name */}
                  <Grid item xs={12} sm={3}>
                    <Controller
                      name='full_name'
                      control={controlFilter}
                      render={({ field: { onChange, value }, fieldState: { error } }) => {
                        return (
                          <TextField
                            label='نام و نام خانوادگی'
                            fullWidth
                            error={!!error}
                            helperText={error?.message}
                            value={value}
                            onChange={onChange}
                            InputProps={{ readOnly: false }}
                          />
                        )
                      }}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', mt: 10 }}>
                  <Button
                    variant='outlined'
                    sx={{ fontFamily: 'inherit' }}
                    color='primary'
                    disabled={false}
                    type='submit'
                  >
                    جستجو
                  </Button>
                </Box>
              </CardContent>
            </form>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Card sx={{ mt: 5 }}>
        <CardHeader
          sx={{ textAlign: 'center' }}
          title={
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              {title}{' '}
            </Typography>
          }
          subheader={description && <Typography variant='caption'>{description}</Typography>}
        />
        <Divider />

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
                        {getValueByPath(row, col.key)}
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
                  count={Math.ceil(rows.length / pageSize)}
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
          count={rows.length}
          rowsPerPage={5}
          page={pageIndex}
          onPageChange={(_, page) => {
            setPageIndex(page)
          }}
        />
      </Card>
    </>
  )
}

export default TableConsultationMeeting
