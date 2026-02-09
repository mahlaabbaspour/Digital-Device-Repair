'use client'

import React from 'react'

import Link from 'next/link'

import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import ChipCustom from '@/@core/components/mui/chip/index'

interface BreadCrumbItem {
  title: string
  to?: string
}

interface BreadCrumbProps {
  items?: BreadCrumbItem[]
}

const Breadcrumb = ({ items = [] }: BreadCrumbProps) => {
  const pathname = usePathname()
  const firstRoute = pathname.split('/').filter(Boolean)[0]

  return (
    <Box
      display='flex'
      alignItems='center'
      sx={{
        mb: 4,
        ml: 2,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <>
        <Image alt='dashboard' src={`/images/icons/dashboard-dark.png`} width={17} height={17} />
        <Link href={`/${firstRoute}`}>
          <Typography ml={1} sx={{ textDecoration: 'none', cursor: 'pointer' }}>
            داشبورد
          </Typography>
        </Link>
        <Typography variant='body1' fontSize={18} sx={{ mx: 1.5, color: 'text.secondary' }}>
          &gt;
        </Typography>
      </>
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <Box key={item.title} display='flex' alignItems='center'>
            {item.to && !isLast ? (
              <Link href={item.to}>
                <Typography sx={{ textDecoration: 'none', cursor: 'pointer' }}>{item.title}</Typography>
              </Link>
            ) : (
              <ChipCustom color='primary' size='small' label={item.title} skin='light' sx={{ borderRadius: 0.5 }} />
            )}

            {!isLast && (
              <Typography fontSize={18} variant='body1' sx={{ mx: 1.5, color: 'text.secondary' }}>
                &gt;
              </Typography>
            )}
          </Box>
        )
      })}
    </Box>
  )
}

export default Breadcrumb
