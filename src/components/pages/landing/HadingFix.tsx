'use client'

import { AppBar, Box, Button, Container, Stack, styled, Toolbar, Typography, useMediaQuery } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Navigation from './Navigation'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import UserDropdown from '@/components/layout/shared/UserDropdown'

function HeadingFix() {
  const [isScrolled, setIsScrolled] = useState(false)

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    justifyContent: 'center',
    [theme.breakpoints.up('lg')]: {
      minHeight: '80px'
    },
    backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.1)' : 'rgba(236, 242, 255, 0.2)',
    backdropFilter: isScrolled ? 'blur(10px)' : 'none',
    WebkitBackdropFilter: isScrolled ? 'blur(10px)' : 'none',
    transition: 'background-color 0.5s ease, backdrop-filter 0.5s ease',
    boxShadow: isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'
  }))

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    color: theme.palette.text.secondary,
    justifyContent: 'space-between'
  }))

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'))
  const router = useRouter()
  const session: any = useSession()

  return (
    <AppBarStyled position='fixed' elevation={0}>
      <Container sx={{ maxWidth: '1400px !important' }}>
        <ToolbarStyled>
          <Box display='flex' flexDirection='row' alignItems='center' component={Link} href='/landing'>
            <Image src='/images/favicon.png' alt='logo' height={45} width={45} priority />
            <Typography mt={2} ml={3} sx={{ fontWeight: 900 }} variant='h4'>
              سامانه مشاوره
            </Typography>
          </Box>
          {lgUp ? (
            <Stack spacing={1} direction='row' alignItems='center'>
              <Navigation />
            </Stack>
          ) : null}

          {session?.data ? (
            <UserDropdown />
          ) : (
            <Button color='primary' variant='contained' onClick={() => router.push('/auth/login')}>
              ورود
            </Button>
          )}
        </ToolbarStyled>
      </Container>
    </AppBarStyled>
  )
}

export default HeadingFix
