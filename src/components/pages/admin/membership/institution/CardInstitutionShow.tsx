'use client'

import { Button, Card, CardContent, CardHeader, Grid, TextField, Typography } from '@mui/material'

export default function CardInstitutionShow({
  data,
  title,
  description
}: {
  data: any
  title: string
  description: string
}) {
  console.log(data, 'data')

  return (
    <>
      <Card>
        <CardHeader
          sx={{ textAlign: 'center' }}
          title={
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
              {title}
            </Typography>
          }
          subheader={<Typography variant='caption'>{description}</Typography>}
        />
        <CardContent>
          <form>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label='نام' value={data?.name} InputLabelProps={{ shrink: true }} />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='کد شناسه'
                  value={data?.identifier ? data?.identifier : ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='نوع مرکز'
                  value={data?.institution_type ? data?.institution_type : ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='حوضه حیطه فعالیت'
                  value={data?.activityFieldArea.name ? data?.activityFieldArea.name : '__'}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='سازمان بهزیستی ناظر'
                  value={data?.supervisoryOrganization.name ? data?.supervisoryOrganization.name : '__'}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='کد پستی'
                  value={data?.postal_code ? data?.postal_code : '__'}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  label='آدرس'
                  value={data?.address ? data?.address : '__'}
                  InputLabelProps={{ shrink: true }}
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>

            <div className='flex mt-6 gap-3'>
              <Button sx={{ ml: 'auto' }} variant='text' href={`/admin/membership/legalPersons/institutions`}>
                برگشت به فهرست مراکز
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
