import Footer from './Footer'
import HeadingFix from './HadingFix'
import ScrollToTop from './ScrollToTop'

export const metadata = {
  title: 'سامانه مشاوره'
}

function LandingLayout({ children }: any) {
  return (
    <div>
      <HeadingFix />
      {children}
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default LandingLayout
