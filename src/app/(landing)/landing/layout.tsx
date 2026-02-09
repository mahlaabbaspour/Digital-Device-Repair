import Footer from '@/components/pages/landing/Footer'
import HeadingFix from '@/components/pages/landing/HadingFix'
import ScrollToTop from '@/components/pages/landing/ScrollToTop'
import { Box } from '@mui/material'

export const metadata = {
  title: 'سامانه مشاوره'
}

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <HeadingFix />
      {children}
      <Footer />
      <ScrollToTop />
    </Box>
  )
}
