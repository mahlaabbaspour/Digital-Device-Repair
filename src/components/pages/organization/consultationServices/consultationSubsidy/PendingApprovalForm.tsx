'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  CardHeader,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  TextField,
  Chip
} from '@mui/material'
import { BiFemale, BiFile } from 'react-icons/bi'
import { BiMoney, BiUser } from 'react-icons/bi'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useCreateEvaluationOrganization } from '@/hooks/organization/useConsultationSubsidyOrganization'
import TableConsultationVouchers from '@/components/pages/institution/consultationSubsidy/TableConsultationVouchers'
import InfoBox from '@/components/elements/InfoBox'
import { gradients } from '@/configs/bgColor'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import { GeTErrorFetch } from '@/components/elements/errorHandler'

export default function PendingApprovalFormOrganization({ data, show, id, evaluationId }: any) {
  console.log(show, 'show')
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const router = useRouter()

  const { control, handleSubmit, setError, clearErrors, setValue, watch } = useForm({
    defaultValues: {
      consultation_subsidy_status_id: 1,
      consultation_subsidy_rejection_reason_ids: [],
      description: '',
      subsidy_percentage: '',
      meeting_count: '',
      credit_id: null
    }
  })

  const { mutateAsync: create, isPending: loadingCreate }: any = useCreateEvaluationOrganization()
  async function onSubmit(values: any) {
    try {
      let data = {}
      if (values?.consultation_subsidy_status_id == 1) {
        data = {
          consultation_subsidy_status_id: values?.consultation_subsidy_status_id,
          subsidy_percentage: values?.subsidy_percentage,
          meeting_count: values?.meeting_count,
          description: values?.description,
          credit_id: values?.credit_id?.id
        }
      } else {
        data = {
          consultation_subsidy_status_id: values?.consultation_subsidy_status_id,
          consultation_subsidy_rejection_reason_ids: values?.consultation_subsidy_rejection_reason_ids,
          description: values?.description
        }
      }
      const res: any = await toast.promise(create({ data: data, id: id, evaluationId: evaluationId }), {
        pending: 'در حال انجام....'
      })

      if (res?.status) {
        router.back()
      }
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  const advisor = selectedDocument?.consultationMeetings?.[0]?.advisor

  const selectedIds = new Set(data?.selectedCriteria?.map((item: any) => item.id))

  return (
    <>
      <Card>
        <CardHeader
          sx={{ textAlign: 'center', pb: 1, mb: 5 }}
          title={
            <Typography variant='h6' fontWeight={800}>
              اطلاعات درخواست
            </Typography>
          }
          subheader={
            <Typography variant='caption' color='text.secondary'>
              می توانید اطلاعات درخواست یارانه را مشاهده کنید را مشاهده کنید
            </Typography>
          }
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <InfoBox icon={<BiFile size={34} color='#2e7d32' />} title='درخواست' value={show?.name} bg='#eef7f0' />
            </Grid>

            <Grid item xs={12} md={3}>
              <InfoBox
                icon={<BiUser size={34} color='#0288d1' />}
                title='درصد تخفیف / تعداد جلسه'
                subValue={`${show?.meeting_count} جلسه`}
                value={`${show.subsidy_percentage} درصد تخفیف`}
                bg='#eef5fb'
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <InfoBox
                icon={<BiFemale size={34} color='#ef6c00' />}
                title='زمان انقضا'
                value={show?.subsidy_expiration_date}
                // subValue={show ? show?.consultationSubsidyType?.name : ''}
                bg='#fff4eb'
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <InfoBox
                icon={<BiMoney size={34} color='#2e7d32' />}
                title='هزینه جلسه'
                value={show?.consultation_fee}
                bg='#eef7f0'
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mt: 5, mb: 5 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 5 }}>
            <Chip
              label={`نوع ارزیابی: ${show?.consultationSubsidyEvaluationType?.name}`}
              sx={{
                backgroundColor: '#e0f2fe',
                color: '#0369a1',
                fontWeight: 600
              }}
            />

            <Chip
              label={` مرکز: ${show?.evaluationInstitution ? show?.evaluationInstitution?.name : '__'}`}
              sx={{
                backgroundColor: '#e0f2fe',
                color: '#0369a1',
                fontWeight: 600
              }}
            />

            <Chip
              label={` ارزیابی کننده: ${show?.evaluatorUser ? show?.evaluatorUser?.first_name : '_'} ${show?.evaluatorUser ? show?.evaluatorUser?.last_name : '_'}`}
              sx={{
                backgroundColor: '#e0f2fe',
                color: '#0369a1',
                fontWeight: 600
              }}
            />
          </Box>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography textAlign='center' fontWeight={800} color='primary'>
                شاخص‌های ارزیابی یارانه مشاوره
              </Typography>
              <Box sx={{ borderRadius: 3, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                <Grid container>
                  {data?.consultationSubsidyCriteria?.map((item: any, idx: number) => {
                    const isChecked = selectedIds.has(item?.id)
                    return (
                      <Grid
                        item
                        xs={6}
                        key={idx}
                        sx={{
                          p: 2,
                          borderBottom: '1px solid #e5e7eb',
                          borderRight: idx % 2 === 0 ? '1px solid #e5e7eb' : 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: '0.2s',
                          '&:hover': { backgroundColor: '#f9fafb' }
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              //@ts-ignore
                              checked={isChecked}
                              readOnly={true}
                            />
                          }
                          label={item.name}
                        />
                        {item.score && (
                          <Box
                            sx={{
                              minWidth: 36,
                              height: 32,
                              borderRadius: 2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 800,
                              fontSize: 14,
                              color: '#fff',
                              background: gradients[item.id % gradients.length]
                            }}
                          >
                            {item.score}
                          </Box>
                        )}
                      </Grid>
                    )
                  })}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {show?.consultationVouchers?.length > 0 && (
        <Card sx={{ mt: 5 }}>
          <CardHeader
            sx={{ textAlign: 'center' }}
            title={
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                یاری برگ ها{' '}
              </Typography>
            }
            subheader={
              <Typography variant='caption'>
                می توانید فهرست یاری برگ های تخصیص گرفته به این درخواست یارانه را مشاهده کنید
              </Typography>
            }
          />
          <CardContent>
            <TableConsultationVouchers
              columns={[
                { label: 'مرکز', key: ['meeting'] },
                { label: 'جلسه', key: ['meeting.name'] },
                { label: 'درصد یارانه', key: ['consultationSubsidy.subsidy_percentage'] },
                { label: 'تاریخ انقضا', key: ['expires_at'] },
                { label: 'وضعیت', key: ['consultationVoucherStatus.name'] }
              ]}
              title='فهرست جلسات حضوری'
              description='می توانید فهرست جلسات حضوری را مشاهده کنید'
              rows={show?.consultationVouchers}
              isLoading={false}
              id={id}
              onOpen={() => true}
              upsertData={[]}
              disabled={false}
            />
          </CardContent>
        </Card>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card
          sx={{
            mt: 5,
            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
            overflow: 'hidden'
          }}
        >
          <CardHeader
            sx={{ textAlign: 'center', pb: 1, mb: 5 }}
            title={
              <Typography variant='h6' fontWeight={800}>
                بررسی درخواست
              </Typography>
            }
            subheader={
              <Typography variant='caption' color='text.secondary'>
                می‌توانید درخواست مورد نظر را تأیید یا رد کنید
              </Typography>
            }
          />

          <CardContent sx={{ px: 4, pb: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='consultation_subsidy_status_id'
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        row
                        {...field}
                        sx={{
                          justifyContent: 'center',
                          gap: 2
                        }}
                      >
                        <FormControlLabel
                          value={1}
                          control={<Radio sx={{ display: 'none' }} />}
                          label={
                            <Box
                              sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 999,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                cursor: 'pointer',
                                fontWeight: 700,
                                color: field.value == 1 ? '#fff' : '#4caf50',
                                background: field.value == 1 ? 'linear-gradient(135deg,#22c55e,#16a34a)' : '#e8f5e9',
                                boxShadow: field.value == 1 ? '0 8px 24px rgba(34,197,94,.4)' : 'none'
                              }}
                            >
                              ✔ تأیید درخواست
                            </Box>
                          }
                        />

                        <FormControlLabel
                          value={4}
                          control={<Radio sx={{ display: 'none' }} />}
                          label={
                            <Box
                              sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 999,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                cursor: 'pointer',
                                fontWeight: 700,
                                color: field.value == 4 ? '#fff' : '#ef4444',
                                background: field.value == 4 ? 'linear-gradient(135deg,#ef4444,#dc2626)' : '#fdecec',
                                boxShadow: field.value == 4 ? '0 8px 24px rgba(239,68,68,.4)' : 'none'
                              }}
                            >
                              ✖ رد درخواست
                            </Box>
                          }
                        />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </Grid>

              {watch('consultation_subsidy_status_id') == 1 && (
                <>
                  <Grid item xs={4}>
                    <Controller
                      name='subsidy_percentage'
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label='درصد یارانه'
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Controller
                      name='credit_id'
                      control={control}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAsyncAutocomplete
                          url={`/organization/${id}/consultation-subsidy/base/select/credit`}
                          readOnly={false}
                          onAddValue={newValue => onChange(newValue)}
                          value={value}
                          getOptionLabel={optien => optien?.name}
                          label='اعتبار سازمان'
                          error={!!error}
                          helperText={error?.message}
                        ></CustomAsyncAutocomplete>
                      )}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <Controller
                      name='meeting_count'
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label='تعداد جلسات'
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  </Grid>
                </>
              )}

              {watch('consultation_subsidy_status_id') == 4 && (
                <Grid item xs={12}>
                  <Typography textAlign='center' fontWeight={800} color='error'>
                    دلایل رد درخواست
                  </Typography>
                  <FormControl fullWidth>
                    <Controller
                      name='consultation_subsidy_rejection_reason_ids'
                      control={control}
                      render={({ field: { value, onChange } }) => {
                        const toggle = (name: any) =>
                          //@ts-ignore
                          value.includes(name)
                            ? onChange(value.filter((v: string) => v !== name))
                            : onChange([...value, name])

                        return (
                          <Box sx={{ borderRadius: 3, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                            <Grid container>
                              {data?.consultationSubsidyRejectionReasons?.map((item: any, idx: number) => (
                                <Grid
                                  item
                                  xs={6}
                                  key={idx}
                                  sx={{
                                    p: 2,
                                    borderBottom: '1px solid #e5e7eb',
                                    borderRight: idx % 2 === 0 ? '1px solid #e5e7eb' : 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    transition: '0.2s',
                                    '&:hover': { backgroundColor: '#fef2f2' }
                                  }}
                                >
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        //@ts-ignore
                                        checked={value.includes(item.id)}
                                        onChange={() => toggle(item.id)}
                                      />
                                    }
                                    label={item.name}
                                  />
                                  {item.score && (
                                    <Box
                                      sx={{
                                        minWidth: 36,
                                        height: 32,
                                        borderRadius: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 800,
                                        fontSize: 14,
                                        color: '#fff',
                                        background: gradients[item.id % gradients.length]
                                      }}
                                    >
                                      {item.score}
                                    </Box>
                                  )}
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        )
                      }}
                    />
                  </FormControl>
                </Grid>
              )}

              <Grid item xs={12}>
                <Controller
                  name='description'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      multiline
                      rows={3}
                      fullWidth
                      label='توضیحات'
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 10 }}>
              <Button variant='contained' type='submit' disabled={loadingCreate}>
                {' '}
                ثبت
              </Button>
            </Box>
          </CardContent>
        </Card>
      </form>
    </>
  )
}
