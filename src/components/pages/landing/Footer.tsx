'use client'

import React from 'react'
import { Box, Grid, Typography, Container, Divider, Stack, Tooltip } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

const footerLinks = [
  {
    id: 1,
    children: [
      {
        title: true,
        titleText: 'فاواگستر سپهر'
      },
      {
        title: false,
        titleText: 'درباره ما',
        link: 'https://modernize-nextjs.adminmart.com/apps/kanban'
      },
      {
        title: false,
        titleText: 'محصولات ما',
        link: 'https://modernize-nextjs.adminmart.com/apps/invoice/list'
      }
    ]
  },
  {
    id: 2,
    children: [
      {
        title: true,
        titleText: 'لینک‌های مفید'
      },
      {
        title: false,
        titleText: 'مشاوره آنلاین',
        link: 'https://archivehis.bums.ac.ir'
      },
      {
        title: false,
        titleText: 'غربالگری ',
        link: 'https://www.bums.ac.ir'
      },
      {
        title: false,
        titleText: 'مهارت های زندگی',
        link: 'https://nobat.bums.ac.ir'
      }
    ]
  }
]

const Footer = () => {
  return (
    <Box bgcolor='#ecf2ff' sx={{ mt: 20 }}>
      <Container
        maxWidth='lg'
        sx={{
          pt: {
            xs: '30px',
            lg: '60px'
          }
        }}
      >
        <Grid container spacing={3} justifyContent='space-between' mb={7}>
          <Grid item xs={6} sm={8} lg={4}>
            <Typography fontSize='17px' fontWeight='600' mb='22px'>
              سامانه مشاوره
            </Typography>
            <Typography variant='body1' component='div'>
              سامانه مشاوره با هدف ارتقاء سلامت روان و بهبود کیفیت زندگی افراد طراحی شده است. این سامانه بستری امن،
              حرفه‌ای و قابل اعتماد برای ارائه خدمات مشاوره‌ای در حوزه‌های فردی، خانوادگی، تحصیلی و شغلی فراهم می‌نماید.
              <div className=''></div>
              در این سامانه، فرآیند دریافت مشاوره به‌صورت یکپارچه و الکترونیکی پیاده‌سازی شده و امکان ارتباط مؤثر با
              مشاوران متخصص از طریق پنل‌های اختصاصی فراهم است. مدیریت جلسات، پیگیری روند مشاوره، ثبت سوابق و دریافت
              خدمات به شکلی ساده، سریع و محرمانه انجام می‌پذیرد تا تجربه‌ای مطمئن و متفاوت از مشاوره را برای شما رقم
              بزند.
            </Typography>
          </Grid>
          {footerLinks.map((footerlink, i) => (
            <Grid item xs={6} sm={4} lg={2} key={i}>
              {footerlink.children.map((child, i) => (
                <React.Fragment key={i}>
                  {child.title ? (
                    <Typography fontSize='17px' fontWeight='600' mb='22px'>
                      {child.titleText}
                    </Typography>
                  ) : (
                    <Link href={`${child.link}`}>
                      <Typography
                        sx={{
                          display: 'block',
                          padding: '10px 0',
                          fontSize: '15px',
                          color: theme => theme.palette.text.primary,
                          '&:hover': {
                            color: theme => theme.palette.primary.main
                          }
                        }}
                        component='span'
                      >
                        {child.titleText}
                      </Typography>
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          ))}
          <Grid item xs={6} sm={6} lg={2}>
            <Typography fontSize='17px' fontWeight='600' mb='22px'>
              شبکه‌های اجتماعی
            </Typography>

            <Stack direction='row' gap='20px'>
              <Tooltip title='Facebook'>
                <Link href='#'>
                  <Image src='/images/icons/socialMedia/icon-facebook.svg' alt='facebook' width={22} height={22} />
                </Link>
              </Tooltip>
              <Tooltip title='Twitter'>
                <Link href='#'>
                  <Image src='/images/icons/socialMedia/icon-twitter.svg' alt='twitter' width={22} height={22} />
                </Link>
              </Tooltip>
              <Tooltip title='Instagram'>
                <Link href='#'>
                  <Image src='/images/icons/socialMedia/icon-instagram.svg' alt='instagram' width={22} height={22} />
                </Link>
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>

        <Divider />

        <Box py='20px' flexWrap='wrap' display='flex' justifyContent='center'>
          <Stack direction='row' gap={1} alignItems='center'>
            <Image src='/images/fava-logo.png' width={20} height={20} alt='logo' />
            <Typography ml={2} mt={1} variant='body1' fontSize='15px'>
              تمامی حقوق برای شرکت دانش بنیان <span style={{ fontWeight: 600 }}>فاواگستر سپهر</span> محفوظ است.{' '}
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
