'use client'

// React Imports
import { useRef, useState } from 'react'

// MUI Imports
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'

// Type Imports
import type { Mode } from '@core/types'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import { Icon } from '@iconify/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Box, Divider, Typography } from '@mui/material'
import { BiHomeAlt, BiHomeSmile, BiSolidBatteryCharging } from 'react-icons/bi'
import { FcOrganization } from 'react-icons/fc'
import { RiOrganizationChart } from 'react-icons/ri'
import { updateInfoOrganizationAndInstitutionActive } from '@/libs/utils'

const OrganizationDropdown = () => {
  const { data: session }: any = useSession()
  const router = useRouter()
  // States
  const [open, setOpen] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)

  // Refs
  const anchorRef = useRef<HTMLButtonElement>(null)

  // Hooks
  const { settings, updateSettings } = useSettings()

  const handleClose = () => {
    setOpen(false)
    setTooltipOpen(false)
  }

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleOrganizationActive = async (id: any) => {
    try {
      const data = {
        organization_id: id
      }
      const res = await updateInfoOrganizationAndInstitutionActive(data)
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <Tooltip
        title='سازمان ها'
        onOpen={() => setTooltipOpen(true)}
        onClose={() => setTooltipOpen(false)}
        open={open ? false : tooltipOpen ? true : false}
        slotProps={{ popper: { className: 'capitalize' } }}
      >
        <IconButton ref={anchorRef} onClick={handleToggle} className='text-textPrimary'>
          <i className='tabler-sitemap text-2xl' />
        </IconButton>
      </Tooltip>
      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-end'
        anchorEl={anchorRef.current}
        className='min-is-[160px] !mbs-3 z-[1]'
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'right top' }}
          >
            <Paper
              sx={{
                minWidth: 240,
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 20px 45px rgba(0,0,0,0.15)'
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.2,
                      px: 3,
                      py: 2,
                      background: 'linear-gradient(135deg, #EEF2FF, #F5F7FF)'
                    }}
                  >
                    <Icon icon='mdi:office-building' fontSize={22} color='#7367F0' />
                    <Typography fontWeight={800} fontSize='14px'>
                      سازمان‌ها
                    </Typography>
                  </Box>

                  <Divider />

                  <MenuList sx={{ p: 1 }}>
                    {session?.user?.organizations?.map((el: any) => (
                      <MenuItem
                        key={el?.id}
                        onClick={() => {
                          router.push(`/organization/${el?.id}/cartable/dashboard`)
                          handleOrganizationActive(el?.id)
                        }}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          borderRadius: '10px',
                          px: 2,
                          py: 1.3,
                          fontSize: '13px',
                          fontWeight: 600,
                          transition: 'all .25s ease',
                          '&:hover': {
                            bgcolor: '#F0EEFF',
                            color: '#7367F0'
                          }
                        }}
                      >
                        <Icon icon='mdi:domain' fontSize={18} />
                        {el?.name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Box>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default OrganizationDropdown
