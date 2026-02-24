import CardInstitution from '@/components/pages/landing/institution/CardInstitution'
import HeadingInstitution from '@/components/pages/landing/institution/HeaderInstitution'
import { fetchInstitutionLandingUpsertData } from '@/libs/landing/institutionLanding'
import { Box } from '@mui/material'

export default async function InstitutionPage() {
  const data = await fetchInstitutionLandingUpsertData()
  return (
    <>
      <Box sx={{ mt: 10 }}>
        <HeadingInstitution />
      </Box>
      <div>
        <CardInstitution data={data} />
      </div>
    </>
  )
}
