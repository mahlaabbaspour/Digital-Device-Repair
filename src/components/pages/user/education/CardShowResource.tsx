'use client'

import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import { Icon } from '@iconify/react'
import { PlayArrowOutlined } from '@mui/icons-material'
import { BiLeftArrow } from 'react-icons/bi'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5'
import PdfViewer from './PdfViewer'
import { useState } from 'react'
import { createVoteResourceCourse } from '@/libs/user/educationCourse'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function CardShowResource({ id, courseId, resourceId, show }: any) {
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  const stars = [1, 2, 3, 4, 5]

  const handleClick = (value: number) => {
    setRating(value)
  }

  const handleVote = async () => {
    try {
      const data = await toast.promise(
        createVoteResourceCourse({ id, courseId, resourceId, Data: { score: Number(rating) } }),
        {
          pending: 'در حال انجام...'
        }
      )

      if (data) {
        toast.success('امتیاز با موفقیت ثبت شد')
      } else {
        toast.error('خطایی رخ داده است')
      }
    } catch (error) {
      throw error
    }
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ borderRadius: 5, backgroundColor: '#fcecd7ef', display: 'flex', minHeight: 30, p: 5 }}>
          <Icon icon='mdi:alert-circle-outline' width={25} color='#f3a640' />
          <Typography color='#f3a640' sx={{ ml: 2, mt: 1 }}>
            لطفا در پایان مشاهده هر ویدیو آموزشی در نظرسنجی شرکت کنید. ملاک مشاهده ویدیو آموزشی شرکت در نظرسنجی ویدیو می
            باشد
          </Typography>
        </Box>

        <Box sx={{ mt: 5 }}>
          <CardContent>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant='body1' sx={{ fontWeight: 700 }}>
                {show?.title}
              </Typography>
            </Box>
            {show?.file?.mime_type === 'pdf' && <PdfViewer fileUrl={show?.file?.address} />}
            {show?.file?.mime_type === 'mp4' && (
              <video src={show.file.address} controls style={{ width: '100%', maxHeight: 400 }} />
            )}
            {show?.file?.mime_type === 'mp3' && (
              <audio
                src={show.file.address}
                style={{ width: 1300, maxHeight: 600 }}
                controls
                controlsList='nodownload nofullscreen noremoteplayback'
              />
            )}

            {show?.file?.mime_type === 'jpg' && (
              <img
                src={show.file.address}
                alt={show.file.original_name}
                style={{
                  width: '100%',
                  maxHeight: 600,
                  objectFit: 'contain',
                  border: '1px solid #ccc',
                  borderRadius: 4
                }}
              />
            )}
          </CardContent>
        </Box>

        <Box
          sx={{
            borderRadius: 1,
            backgroundColor: '#e7fcfcef',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 4,
            gap: 2,
            minWidth: 300
          }}
        >
          <Icon icon='mdi:check-circle-outline' width={40} color='#4caf50' />
          <Typography sx={{ mt: 1, fontWeight: 500, textAlign: 'center' }}>به این ویدیو آموزشی رای دهید.</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {stars.map(star => (
              <Icon
                key={star}
                icon={hover >= star || rating >= star ? 'mdi:star' : 'mdi:star-outline'}
                width={30}
                color='#f3a640'
                style={{ cursor: 'pointer' }}
                onClick={() => handleClick(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              />
            ))}
          </Box>

          <Button variant='contained' onClick={() => handleVote()} disabled={rating === 0} sx={{ mt: 1 }}>
            ثبت
          </Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: `${!show?.previous ? 'flex-end' : !show?.next ? 'flex-start' : 'space-between'}`,
            alignItems: 'flex-start',
            width: '100%',
            p: 2
          }}
        >
          {show?.previous && (
            <Button
              variant='contained'
              color='secondary'
              onClick={() =>
                router.push(
                  `/user/${id}/education/educationalCourse/${courseId}/show/${show?.previous?.id}/showResource`
                )
              }
              startIcon={<IoArrowForward />}
            >
              {show?.previous?.title}
            </Button>
          )}

          {show?.next && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant='contained'
                color='success'
                onClick={() =>
                  router.push(`/user/${id}/education/educationalCourse/${courseId}/show/${show?.next?.id}/showResource`)
                }
                endIcon={<IoArrowBack />}
              >
                {show?.next?.title}
              </Button>
              <Button
                variant='outlined'
                onClick={() => router.push(`/user/${id}/education/educationalCourse/${courseId}/show`)}
              >
                برگشت
              </Button>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}
