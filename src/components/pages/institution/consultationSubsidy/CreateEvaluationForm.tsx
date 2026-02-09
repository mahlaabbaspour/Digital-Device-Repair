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
  TextField
} from '@mui/material'
import { BiFemale, BiFile } from 'react-icons/bi'
import { BiMoney, BiUser } from 'react-icons/bi'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useCreateEvaluationInstitution } from '@/hooks/institution/consultationServices/useConsultationSubsidy'

const gradients = [
  'linear-gradient(135deg, #a3bffa, #818cf8)',
  'linear-gradient(135deg, #fcd5ce, #f9a8d4)',
  'linear-gradient(135deg, #c6f6d5, #4ade80)',
  'linear-gradient(135deg, #ffe7ba, #fbbf24)',
  'linear-gradient(135deg, #dbeafe, #93c5fd)',
  'linear-gradient(135deg, #fce7f3, #f9a8d4)',
  'linear-gradient(135deg, #fde68a, #fcd34d)',
  'linear-gradient(135deg, #d1fae5, #6ee7b7)'
]

function InfoBox({ icon, title, value, subValue, bg }: any) {
  return (
    <Box
      sx={{
        backgroundColor: bg,
        borderRadius: 3,
        p: 3,
        height: '100%',
        textAlign: 'center',
        transition: '0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
        }
      }}
    >
      <Box mb={1}>{icon}</Box>

      <Typography variant='body2' color='text.secondary' mb={1}>
        {title}
      </Typography>

      <Typography variant='h6' fontWeight='bold'>
        {value}
      </Typography>

      {subValue && (
        <Typography variant='caption' color='text.secondary'>
          {subValue}
        </Typography>
      )}
    </Box>
  )
}

export default function EvaluationFormInstitutionCreate({ data, show, id, evaluationId }: any) {
  console.log(data, show, evaluationId, 'daaaaaaaaaa')
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const router = useRouter()

  const { control, handleSubmit, setError, clearErrors, setValue, watch } = useForm({
    defaultValues: {
      consultation_subsidy_status_id: 3,
      consultation_subsidy_criterion_id: [],
      consultation_subsidy_rejection_reason_ids: [],
      description: ''
    }
  })

  const { mutateAsync: create, isPending: loadingCreate }: any = useCreateEvaluationInstitution()

  async function onSubmit(values: any) {
    try {
      let data = {}
      if (values?.consultation_subsidy_status_id == 3) {
        data = {
          consultation_subsidy_status_id: values?.consultation_subsidy_status_id,
          consultation_subsidy_criterion_id: values?.consultation_subsidy_criterion_id
        }
      } else {
        data = {
          consultation_subsidy_status_id: values?.consultation_subsidy_status_id,
          consultation_subsidy_rejection_reason_ids: values?.consultation_subsidy_rejection_reason_ids,
          description: values?.description
        }
      }

      toast.promise(create({ data: data, id: id, evaluationId: evaluationId }), {
        pending: 'در حال انجام....'
      })
      router.back()
    } catch (error) {
      throw error
    }
  }

  const advisor = selectedDocument?.consultationMeetings?.[0]?.advisor

  return (
    <>
      <Card
        sx={{
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
        }}
      >
        <CardHeader
          sx={{ textAlign: 'center', pb: 0 }}
          title={
            <Typography variant='h6' fontWeight='bold'>
              اطلاعات پرونده
            </Typography>
          }
          subheader={
            <Typography variant='caption' color='text.secondary'>
              ابتدا لطفاً پرونده مورد نظر خود را انتخاب کنید
            </Typography>
          }
        />

        <CardContent sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <InfoBox
                icon={<BiFile size={34} color='#2e7d32' />}
                title='شماره پرونده'
                value={show ? `${show?.consultationDocuments[0]?.document_number}` : '—'}
                subValue={show ? `${show?.evaluationInstitution?.name}` : '—'}
                bg='#eef7f0'
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <InfoBox
                icon={<BiUser size={34} color='#0288d1' />}
                title='مشاور'
                value={advisor ? `${advisor.first_name} ${advisor.last_name}` : '—'}
                subValue={advisor?.username ? `(${advisor.username})` : ''}
                bg='#eef5fb'
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <InfoBox
                icon={<BiFemale size={34} color='#ef6c00' />}
                title='خدمت گیرنده'
                value={
                  show
                    ? `${show?.consultationDocuments[0]?.first_name} ${show?.consultationDocuments[0]?.last_name}`
                    : '—'
                }
                subValue={show ? show?.consultationSubsidyType?.name : ''}
                bg='#fff4eb'
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <InfoBox
                icon={<BiMoney size={34} color='#2e7d32' />}
                title='هزینه جلسه'
                value={show ? `${show?.consultationDocuments[0]?.consultation_fee} تومان` : '—'}
                subValue={show ? `${show?.meeting_count} جلسه` : ''}
                bg='#eef7f0'
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
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
                          value={3}
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
                                color: field.value == 3 ? '#fff' : '#4caf50',
                                background: field.value == 3 ? 'linear-gradient(135deg,#22c55e,#16a34a)' : '#e8f5e9',
                                boxShadow: field.value == 3 ? '0 8px 24px rgba(34,197,94,.4)' : 'none'
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

              {watch('consultation_subsidy_status_id') == 3 && (
                <Grid item xs={12}>
                  <Typography textAlign='center' fontWeight={800} color='primary'>
                    شاخص‌های ارزیابی یارانه مشاوره
                  </Typography>
                  <FormControl fullWidth>
                    <Controller
                      name='consultation_subsidy_criterion_id'
                      control={control}
                      render={({ field: { value, onChange } }) => {
                        const toggle = (name: string) =>
                          //@ts-ignore
                          value.includes(name)
                            ? onChange(value.filter((v: string) => v !== name))
                            : onChange([...value, name])

                        return (
                          <Box sx={{ borderRadius: 3, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                            <Grid container>
                              {data?.consultationSubsidyCriteria?.map((item: any, idx: number) => (
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

              {watch('consultation_subsidy_status_id') == 4 && (
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
              )}
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
