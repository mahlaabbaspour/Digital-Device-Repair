'use client'

import { Button, styled, Typography } from '@mui/material'
import { usePathname } from 'next/navigation'

// Define your navigation links
export const NavLinks = [
  { title: 'مراکز', href: '#modules' },
  { title: 'سوالات متداول', href: '#questions' },
  { title: 'پشتیبانی', href: '#support' }
]

const StyledButton = styled(Button)(({ theme }) => ({
  transition: 'background-color 0.3s ease, transform 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(93, 135, 255, 0.1)',
    transform: 'translateY(-2px)'
  },
  '&.active': {
    backgroundColor: 'rgba(93, 135, 255, 0.15)',
    '& .MuiTypography-root': {
      color: theme.palette.primary.main
    }
  }
}))

function Navigation() {
  const pathname = usePathname()

  return (
    <>
      {NavLinks.map((navlink, i) => (
        <StyledButton color='inherit' className={pathname === navlink.href ? 'active' : ''} variant='text' key={i}>
          <Typography variant='body1' color='black'>
            {navlink.title}
          </Typography>
        </StyledButton>
      ))}
    </>
  )
}

export default Navigation
