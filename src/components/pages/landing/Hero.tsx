'use client'

import React, { FC, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Typography, keyframes, styled, useMediaQuery, useTheme } from '@mui/material'

// @ts-ignore
// import Banner from '../../../public/images/landing/Banner1.png'

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

const BackgroundContainer = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  left: '50%',
  right: 0,
  bottom: 0,
  width: '100vw',
  transform: 'translateX(-50%)',
  zIndex: 0,
  backgroundImage: 'url(/images/landing/img/section-bg.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0
  }
}))

const Hero: FC<SectionHero2Props> = ({ className = '' }) => {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect() // run once
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

  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // Detect mobile size

  const renderItem = (index: number) => {
    return (
      <div
        ref={sectionRef}
        className={`nc-SectionHero2Item flex flex-col lg:flex-row items-center justify-center relative overflow-hidden ${className}`}
        key={index}
        style={{ position: 'relative' }}
      >
        {/* Background Image - Now covers full width on mobile */}
        {!isMobile && <BackgroundContainer />}

        {/* Text Content - Exactly as before */}
        <div className='relative container pb-0 pt-14 lg:py-60 flex-1 lg:order-1'>
          <div className='relative z-[1] w-full max-w-3xl space-y-8 sm:space-y-14 text-right min-h-[300px]'>
            <div className='space-y-5 sm:space-y-6'>
              {/* Animated Title */}
              <h2 className='mb-12 font-semibold text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl leading-[114%] text-slate-900 hidden sm:block'>
                {visible && renderAnimatedWords('سامانه اورسا')}
              </h2>
              {/* Animated Body */}
              <Typography variant='body1' lineHeight={2} color='CaptionText'>
                <span style={{ visibility: 'hidden', display: 'block' }}>
                  سامـانـه اورسا جهت مدیـریت بهبـــود کیفیـت در بیمـارستـان و مراکـز درمانـی ...
                </span>
                {visible && (
                  <>
                    {renderAnimatedWords(
                      'سامـانـه اورسا جهت مدیـریت بهبـــود کیفیـت در بیمـارستـان و مراکـز درمانـی ابـزاری قدرتمنـد در پیـاده سـازی فرآینـد اعتبـاربخشـی، بهبود کیفیت خدمات و ارتقاء ایمنی بیمار است',
                      0.5
                    )}
                    <br />
                    {renderAnimatedWords(
                      'دراین سامانه اطلاعات شما یکپارچه و کامل پیاده سازی می شود. تمام فرآیند های پر هزینه کاغذی مرکز شما الکترونیکی می گردد. در پنل های اختصاصی بهبود کیفیت، ایمنی، شاخص، برنامه، رضایت سنجی، چک لیست ها، آموزش، نظام پیشنهادات انتقادات و ... تجربه ای متفاوت را حس می نمایید',
                      1.5
                    )}
                  </>
                )}
              </Typography>
            </div>
          </div>
        </div>

        {/* Image Section - Exactly as before */}
        <div className='lg:order-2 relative mt-10 lg:mt-0 lg:w-[350px] flex lg:ml-12 items-center justify-center'>
          <Image
            width={350}
            height={350}
            sizes='(max-width: 768px) 50vw, (max-width: 1024px) 70vw, 100vw'
            className='object-contain'
            src={''}
            alt='hospital banner'
            priority
          />
        </div>
      </div>
    )
  }

  return <>{HERO2_DEMO_DATA.map((_, index) => renderItem(index))}</>
}

export default Hero
