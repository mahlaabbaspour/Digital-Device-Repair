import Consultant from '@/components/pages/landing/Consultant'
import Slider from '@/components/pages/landing/Slider'
import { Box } from '@mui/material'

function LadningPage() {
  return (
    <>
      <Box id='consultant' sx={{ mt: 10 }}>
        <Consultant />
      </Box>
      <Box id='slider'>
        <Slider />
      </Box>
    </>
  )
}

export default LadningPage
