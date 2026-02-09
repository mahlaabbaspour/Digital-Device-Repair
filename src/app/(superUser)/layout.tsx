// MUI Imports
import Button from '@mui/material/Button'

// Layout Imports
import LayoutWrapper from '@layouts/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'
import HorizontalLayout from '@layouts/HorizontalLayout'

import Navigation from '@components/layout/vertical/Navigation'
import Header from '@components/layout/horizontal/Header'
import Customizer from '@core/components/customizer'
import ScrollToTop from '@core/components/scroll-to-top'
import { getMode, getSystemMode } from '@/@core/utils/serverHelpers'
import Navbar from '@/components/layout/vertical/Navbar'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const systemMode = await getSystemMode()
  const mode = await getMode()

  return (
    // <AuthGuard>
    <>
      <LayoutWrapper
        systemMode={systemMode}
        verticalLayout={
          <VerticalLayout navigation={<Navigation panel='superUser' mode={mode} />} navbar={<Navbar />}>
            {children}
          </VerticalLayout>
        }
        horizontalLayout={<HorizontalLayout header={<Header panel={'superUser'} />}>{children}</HorizontalLayout>}
      />
      <ScrollToTop className='mui-fixed'>
        <Button variant='contained' className='is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center'>
          <i className='tabler-arrow-up' />
        </Button>
      </ScrollToTop>
      <Customizer dir={'rtl'} />
    </>
    //{' '}
    // </AuthGuard>
  )
}
