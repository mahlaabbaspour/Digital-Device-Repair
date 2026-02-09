import { Box } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function MediaGallerySlider({ items }: any) {
  return (
    <Box width='100%' maxWidth={800} margin='0 auto' borderRadius={2} overflow='hidden'>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        style={{ height: '400px' }}
      >
        {items?.map((item: any, index: any) => (
          <SwiperSlide key={index}>
            {item.type === 'image' ? (
              <img
                src={item.url}
                alt={`media-${index}`}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            ) : (
              <video
                src={item.url}
                controls
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}
