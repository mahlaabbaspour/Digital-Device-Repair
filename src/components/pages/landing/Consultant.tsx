'use client'

import React, { FC, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Box, Button, keyframes, styled } from '@mui/material'
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

const Hero: FC<SectionHero2Props> = ({ className = '' }) => {
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
      <div ref={sectionRef} key={index} className={`relative w-full flex justify-center ${className}`}>
        {/* Main Center Container */}
        <div className='max-w-7xl w-full px-6 py-20 flex flex-col lg:flex-row-reverse items-center gap-14'>
          {/* TEXT - Right Side */}
          <div className='w-full lg:w-1/2 text-right'>
            <div className='space-y-6'>
              {/* Animated Title */}
              <h2 className='font-semibold text-3xl sm:text-4xl md:text-5xl xl:text-6xl leading-[114%] text-slate-900 hidden sm:block'>
                {visible && renderAnimatedWords('سامانه مشاوره')}
              </h2>

              <Box sx={{ lineHeight: 2, color: 'text.secondary', fontSize: '1rem' }} component='div'>
                <span style={{ visibility: 'hidden', display: 'block' }}>
                  سامـانـه اورسا جهت مدیـریت بهبـــود کیفیـت در بیمـارستـان و مراکـز درمانـی ...
                </span>

                {visible && (
                  <>
                    {renderAnimatedWords(
                      'مشاوره فرآیندی تخصصی و هدفمند است که در آن فرد با کمک یک مشاور آگاه و باتجربه، به بررسی چالش‌ها، دغدغه‌ها و مسائل شخصی، خانوادگی، تحصیلی یا شغلی خود می‌پردازد. هدف اصلی مشاوره، افزایش آگاهی، شناخت بهتر خود، بهبود تصمیم‌گیری و یافتن راهکارهای مؤثر برای حل مشکلات و ارتقای کیفیت زندگی است.',
                      0.5
                    )}
                    <br />
                    {renderAnimatedWords(
                      'در جلسات مشاوره، فضایی امن، محرمانه و بدون قضاوت فراهم می‌شود تا فرد بتواند با آرامش درباره احساسات، افکار و تجربیات خود صحبت کند و با دریافت راهنمایی‌های تخصصی، مسیر مناسب‌تری برای رشد فردی و سلامت روان خود انتخاب نماید.',
                      3.5
                    )}
                  </>
                )}
              </Box>
            </div>
            <div className='mt-8 flex justify-end'>
              <Button
                onClick={() => router.push('/landing/institution')}
                variant='contained'
                size='large'
                sx={{
                  borderRadius: '14px',
                  px: 4,
                  py: 1.5,
                  fontSize: '15px',
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
                }}
              >
                مشاهده مراکز مشاوره
              </Button>
            </div>
          </div>

          <div className='w-full lg:w-1/2 flex justify-center'>
            <Image
              src='/images/Banner1.png'
              alt='hospital banner'
              width={420}
              height={420}
              className='object-contain'
              priority
            />
          </div>
        </div>
      </div>
    )
  }

  return <>{HERO2_DEMO_DATA.map((_, index) => renderItem(index))}</>
}

export default Hero
