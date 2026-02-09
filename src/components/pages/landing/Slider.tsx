'use client'

import { Typography, Container, Card } from '@mui/material'
import React, { FC, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Box, Button, keyframes, styled } from '@mui/material'
import { useRouter } from 'next/navigation'
import SchoolIcon from '@mui/icons-material/School'
import PsychologyIcon from '@mui/icons-material/Psychology'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import GroupsIcon from '@mui/icons-material/Groups'

interface Hero2DataType {
  image: string
  heading: string
  subHeading: string
  btnText: string
  btnLink: any
}

const HERO2_DEMO_DATA: Hero2DataType[] = [
  {
    image: 'imageRightPng2',
    heading: 'Exclusive collection for everyone',
    subHeading: 'In this season, find the best 🔥',
    btnText: 'Explore now',
    btnLink: '/'
  }
]

export interface SectionHero2Props {
  className?: string
}

// === Fast Typing-like Animation Keyframe ===
const typingWord = keyframes`
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
`
// === Word Component ===
const Word = styled('span')<{ delay: number }>(({ delay }) => ({
  opacity: 0,
  display: 'inline-block',
  animation: `${typingWord} 0.15s ease forwards`,
  animationDelay: `${delay}s`,
  marginRight: '6px',
  whiteSpace: 'nowrap'
}))

export const services = [
  {
    id: 1,
    title: 'مشاوره آموزشی',
    description: 'دریافت راهنمایی تخصصی برای انتخاب مسیر تحصیلی، بهبود عملکرد درسی و برنامه‌ریزی هدفمند.',
    icon: PsychologyIcon,
    bg: 'linear-gradient(135deg, #e0f2fe, #bae6fd)'
  },
  {
    id: 2,
    title: 'ارزیابی و آزمون‌ها',
    description: 'برگزاری آزمون‌های هوشمند برای سنجش سطح یادگیری و شناسایی نقاط قوت و ضعف دانش‌آموزان.',
    icon: AssignmentTurnedInIcon,
    bg: 'linear-gradient(135deg, #dcfce7, #86efac)'
  },
  {
    id: 3,
    title: 'مهارت‌های فردی',
    description: 'آموزش مهارت‌هایی مانند مدیریت زمان، تمرکز، کاهش استرس و تقویت اعتمادبه‌نفس.',
    icon: GroupsIcon,
    bg: 'linear-gradient(135deg, #fef9c3, #fde047)'
  },
  {
    id: 4,
    title: 'دوره‌های آموزشی',
    description: 'دسترسی به دوره‌ها و کارگاه‌های متنوع برای یادگیری عمیق‌تر و پیشرفت تحصیلی مستمر.',
    icon: SchoolIcon,
    bg: 'linear-gradient(135deg, #fae8ff, #e879f9)'
  }
]
const Slider: FC<SectionHero2Props> = ({ className = '' }) => {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const renderAnimatedWords = (text: string, baseDelay = 0) => {
    return text.split(' ').map((word, index) => (
      <Word key={index} delay={baseDelay + index * 0.05}>
        {word}
      </Word>
    ))
  }

  const router = useRouter()

  const renderItem = (index: number) => {
    return (
      <div ref={sectionRef} key={index} className={`relative w-full flex justify-center items-center ${className}`}>
        {/* Center Container */}
        <div className='max-w-4xl w-full px-6  flex flex-col items-center text-center gap-8'>
          {/* Animated Title */}
          <h2 className='font-semibold text-3xl sm:text-4xl md:text-5xl xl:text-6xl leading-[120%] text-slate-900'>
            {visible && renderAnimatedWords('سامانه آموزش')}
          </h2>

          {/* Animated Description */}
          <Box
            sx={{ lineHeight: 2.2, color: 'text.secondary', fontSize: '1.05rem' }}
            component='div'
            className='max-w-6xl'
          >
            <span style={{ visibility: 'hidden', display: 'block' }}>سامانه آموزش بستری نوین برای یادگیری...</span>

            {visible && (
              <>
                {renderAnimatedWords(
                  'سامانه آموزش بستری نوین و هوشمند برای ارائه خدمات آموزشی، مدیریت دوره‌ها و ارتقای سطح یادگیری کاربران است. در این سامانه، فراگیران می‌توانند به مجموعه‌ای متنوع از دوره‌های آموزشی دسترسی داشته باشند و مسیر یادگیری خود را به‌صورت هدفمند دنبال کنند.',
                  0.5
                )}
                <br />
                {renderAnimatedWords(
                  'با فراهم شدن محیطی تعاملی، ساده و در دسترس، این سیستم به بهبود کیفیت آموزش، افزایش بهره‌وری یادگیری و توسعه مهارت‌های فردی کمک می‌کند تا کاربران بتوانند سریع‌تر و مؤثرتر به اهداف آموزشی خود دست یابند.',
                  3.5
                )}
              </>
            )}
          </Box>
        </div>
      </div>
    )
  }

  return (
    <Box bgcolor='#ecf2ff' borderRadius={0} textAlign='center' py='90px' position='relative'>
      <Container maxWidth='lg'>
        {HERO2_DEMO_DATA.map((_, index) => renderItem(index))}
        <Box>
          <Container maxWidth='lg'>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(4, 1fr)'
                },
                gap: 4,
                mt: 8
              }}
            >
              {services.map(service => {
                const Icon = service.icon

                return (
                  <Card
                    key={service.id}
                    sx={{
                      background: service.bg,
                      p: 3,
                      borderRadius: 4,
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                      transition: 'all 0.35s ease',

                      '&:hover': {
                        transform: 'translateY(-10px) scale(1.02)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                      }
                    }}
                  >
                    {/* Icon */}
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255,255,255,0.6)',
                        mb: 2
                      }}
                    >
                      <Icon sx={{ fontSize: 28, color: '#0f172a' }} />
                    </Box>

                    {/* Title */}
                    <Typography variant='h6' fontWeight='bold' mb={1}>
                      {service.title}
                    </Typography>

                    {/* Description */}
                    <Typography variant='body2' sx={{ opacity: 0.8, lineHeight: 1.9 }}>
                      {service.description}
                    </Typography>
                  </Card>
                )
              })}
            </Box>
            <Button
              onClick={() => router.push('/landing/institution')}
              variant='contained'
              size='large'
              sx={{
                borderRadius: '10px',
                px: 4,
                mt: 15,
                py: 1.5,
                fontSize: '15px',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
              }}
            >
              مشاهده مراکز آموزش
            </Button>
          </Container>
        </Box>
      </Container>
    </Box>
  )
}

export default Slider
