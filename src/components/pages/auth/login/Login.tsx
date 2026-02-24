'use client'

// React Imports
import { FormEvent, useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import { toast } from 'react-toastify'
import { getSession, signIn } from 'next-auth/react'
// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { SystemMode } from '@core/types'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'
import { Box, IconButton, Stack, TextField } from '@mui/material'

import { BiHide, BiShowAlt } from 'react-icons/bi'

import Lottie from 'lottie-react'
import animationData from '../../../../assets/Consulting Blue Color.json'

// Styled Custom Components
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 680,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: {
    maxBlockSize: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxBlockSize: 450
  }
}))

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 355,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(0) }
}))

const Login = ({ mode }: { mode: SystemMode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [username, setUsername] = useState('0000000001')
  const [password, setPassowrd] = useState('Sepehr.20231402')
  const [isLoading, setisLoading] = useState(false)
  // Vars
  // const darkImg = '/image/pages/auth-mask-dark.png'
  const lightImg = '/image/pages/auth-mask-light.png'
  const darkIllustration = '/image/illustrations/auth/v2-login-dark.png'
  const lightIllustration = '/image/illustrations/auth/v2-login-light.png'
  const borderedDarkIllustration = '/image/illustrations/auth/v2-login-dark-border.png'
  const borderedLightIllustration = '/image/illustrations/auth/v2-login-light-border.png'

  // Hooks
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true })
  // const authBackground = useImageVariant(mode, lightImg, darkImg)
  const router = useRouter()
  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  async function handlesubmit(e: FormEvent) {
    e.preventDefault()
    if (username && password) {
      const newData = { username, password }
      setisLoading(true)

      try {
        const response: any = await toast.promise(signIn('credentials', { redirect: false, ...newData }), {
          pending: 'در حال انجام...'
          // error: ''
        })

        if (response?.error) {
          toast.error(response.error.replaceAll('"', ''))
        } else {
          toast.success('عملیات با موفقیت انجام شد')
          if (callbackUrl) {
            router.replace(callbackUrl)
          } else {
            const session: any = await getSession()

            if (session?.user?.user?.id) {
              router.replace(`/user/${session?.user?.user?.id}/cartable/dashboard`)
            }
          }
        }
      } catch (error) {
        throw error
      }
      setisLoading(false)
    } else {
      toast.error('اطلاعات وارد شده صحیح نمی باشد!')
    }
  }
  return (
    <div className='flex bs-full justify-center overflow-hidden'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <div>
          <Box mt={20}>
            <Lottie animationData={animationData} loop autoplay style={{ width: 700, height: 700 }} />
          </Box>
          {/* {!hidden && (
            <MaskImg
              alt='mask'
              src={authBackground}
              className={classnames({ 'scale-x-[-1]': theme.direction === 'rtl' })}
            />
          )} */}
        </div>

        {/* <div className="py-4 mt-auto text-center">
             <Box flexWrap='wrap' display='flex' justifyContent='center'>
                        <Stack direction='row' gap={1} alignItems='center'>
                            <Image src='/images/fava-logo.png' width={15} height={15} alt='logo' />
                            <Link style={{ textDecoration: 'none' }} target='_blank' href='http://sepehr-ict.ir/'>
                                <Typography ml={1} variant='body1' fontSize={13}>
                                    تمامی حقوق برای شرکت دانش بنیان{' '}
                                    <span style={{ fontWeight: 600 }}>فاواگستر سپهر</span> محفوظ است. © {1404}
                                </Typography>
                            </Link>
                        </Stack>
                    </Box>
        </div> */}
      </div>

      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box mb={2}>
              <img src='/images/favicon.png' height={70} width={80} alt='سامانه مشاوره' />
            </Box>
            <TypographyStyled textAlign='center' variant='h6'>{`سامانه مشاوره`}</TypographyStyled>
            <Typography mt={2} textAlign='center' fontSize={15} variant='caption'>
              سامانه مشاوره و غربالگری بهزیستی
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handlesubmit} className='flex flex-col gap-6 mt-4'>
            <TextField
              autoFocus
              fullWidth
              label='نام کاربری'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              label='کلمه عبور'
              id='outlined-adornment-password'
              type={isPasswordShown ? 'text' : 'password'}
              value={password}
              onChange={e => setPassowrd(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton size='large' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                        {isPasswordShown ? <BiShowAlt /> : <BiHide />}
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
            />
            <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
              <FormControlLabel control={<Checkbox />} label='به خاطر بسپار' />
              <Typography
                className='text-end'
                color='primary.main'
                variant='body1'
                component={Link}
                href={'/pages/auth/forgot-password-v2'}
              >
                رمز عبور خود را فراموش کردم!
              </Typography>
            </div>
            <Divider>
              <Typography variant='caption'>ورود با تلفن همراه </Typography>
            </Divider>
            <TextField autoFocus fullWidth label='تفن همراه' />
            <Button fullWidth variant='contained' type='submit' disabled={isLoading}>
              ورود
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
