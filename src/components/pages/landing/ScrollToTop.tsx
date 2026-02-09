'use client'

import React, { useEffect, useState } from 'react'
import { Fab } from '@mui/material'
import { Icon } from '@iconify/react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Function to handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling
    })
  }

  // Function to handle showing/hiding the button on scroll
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <>
      {' '}
      {isVisible ? (
        <Fab
          color='primary'
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            left: '30px',
            bottom: '30px'
          }}
        >
          <Icon height={30} icon='mdi:arrow-up-thin' />
        </Fab>
      ) : null}
    </>
  )
}

export default ScrollToTop
