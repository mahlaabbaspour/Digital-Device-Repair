'use client'

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import { format } from 'date-fns-jalali'



export default function CardAdminShow({ data , title, description }: { data: any;   title: string, description: string}) {

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
              <Grid item xs={12} md={6}>
                <TextField fullWidth label='نام' value={data?.first_name} InputLabelProps={{ shrink: true }} />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='نام خانوادگی'
                  value={data?.last_name ? data?.last_name : ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='کد ملی'
                  value={data?.username ?  data?.username  : ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='شماره موبایل'
                  value={data?.mobile ?  data?.mobile : ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='تلفن'
                  value={data?.phone ?  data?.phone : '__'}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='ایمیل'
                  value={data?.email ?  data?.email : '__'}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='تاریخ تولد'
                  value={data?.birth_date ? format(data?.birth_date, 'yyyy/MM/dd') : '__'}
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
                  value={data?.address ?  data?.address : '__'}
                  InputLabelProps={{ shrink: true }}
                  multiline
                  rows={3}
                />
              </Grid>

              
            </Grid>

            <div className='flex mt-6 gap-3'>
              <Button sx={{ ml: 'auto' }} variant='text' href={`/admin/membership/realPersons/admins`}>
                برگشت به فهرست 
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}


