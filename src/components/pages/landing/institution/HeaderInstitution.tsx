'use client'

import React, { FC, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Box, Typography, keyframes, styled, useMediaQuery, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'

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

const HeadingInstitution: FC<SectionHero2Props> = ({ className = '' }) => {
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

  const renderItem = (index: number) => {
    return (
      <div ref={sectionRef} key={index} className={`relative w-full flex justify-center ${className}`}>
        <div className='max-w-4xl w-full px-2 py-20 flex flex-col items-center gap-8'>
          <h6 className='font-semibold text-3xl sm:text-4xl md:text-5xl xl:text-6xl leading-[120%] text-slate-900'>
            {visible && renderAnimatedWords('فهرست مراکز')}
          </h6>

          <Box
            sx={{
              lineHeight: 2.2,
              color: 'text.secondary',
              fontSize: '1.05rem',
              textAlign: 'justify',

              width: '100%'
            }}
            component='div'
            className='max-w-3xl'
          >
            <span style={{ visibility: 'hidden', display: 'block' }}>
              مراکز خدماتی بستری مناسب برای ارائه خدمات تخصصی...
            </span>

            {visible && (
              <>
                {renderAnimatedWords(
                  'مراکز خدماتی این سامانه با هدف ارائه خدمات تخصصی، استاندارد و در دسترس برای کاربران طراحی شده‌اند. هر مرکز با بهره‌گیری از نیروهای متخصص و امکانات مناسب، تلاش می‌کند خدماتی با کیفیت بالا در حوزه‌های مختلف آموزشی، مشاوره‌ای و توانمندسازی فردی ارائه دهد.',
                  0.5
                )}
                <br />
                {renderAnimatedWords(
                  'کاربران می‌توانند با جستجو و انتخاب مرکز موردنظر، به مجموعه‌ای از خدمات متنوع دسترسی پیدا کنند و متناسب با نیازهای خود، مسیر رشد و پیشرفت را با اطمینان بیشتری دنبال نمایند. این ساختار یکپارچه موجب افزایش کیفیت خدمات، صرفه‌جویی در زمان و بهبود تجربه کاربری خواهد شد.',
                  3.5
                )}
              </>
            )}
          </Box>
        </div>
      </div>
    )
  }

  return <>{HERO2_DEMO_DATA.map((_, index) => renderItem(index))}</>
}

export default HeadingInstitution
