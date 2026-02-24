'use client'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import NavToggle from './NavToggle'
import ModeDropdown from '@components/layout/shared/ModeDropdown'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'
import ShortcutsDropdown from '../shared/ShortcutsDropdown'
import NavSearch from '../shared/search'
import UserDropdownInstitution from '../shared/UserDropdownInstitution'
import OrganizationDropdown from '../shared/OrganizationDropdown'
import InstitutionDropdown from '../shared/InstitutionDropDown'
import { Divider } from '@mui/material'
// MUI Imports
import IconButton from '@mui/material/IconButton'
import { getPanelTitleFromPath } from '@/helpers/GetPanel'
import { usePathname } from 'next/navigation'

// Vars
const shortcuts: any[] = [
  {
    url: '/admin/membership/legalPersons/organizations',
    icon: 'tabler-calendar',
    title: 'سازمان ها',
    subtitle: 'مدیریت سازمان ها'
  },

  {
    url: '/admin/membership/legalPersons/institutions',
    icon: 'tabler-file-dollar',
    title: 'مراکز',
    subtitle: 'مدیریت مراکز خدمات'
  },
  {
    url: '/admin/membership/realPersons/users',
    icon: 'tabler-users-group',
    title: 'کاربران',
    subtitle: 'مدیریت کاربران'
  },
  {
    url: '/admin/membership/realPersons/admins',
    icon: 'tabler-user',
    title: 'مدیران',
    subtitle: 'مدیریت مدیران'
  },
  {
    url: '',
    icon: 'tabler-settings',
    title: 'لاگ ها',
    subtitle: 'مدیریت لاگ ها'
  }
]

const NavbarContentInstitution = () => {
  const pathname = usePathname()
  const panelTitle = getPanelTitleFromPath(pathname)

  return (
    <div className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}>
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-2 cursor-pointer'>
          <IconButton className='text-textPrimary'>
            <i className='tabler-layout-dashboard text-2xl' />
          </IconButton>
          <div className='whitespace-nowrap select-none'>{panelTitle}</div>
        </div>

        <Divider orientation='vertical' flexItem />
        <NavToggle />
        <NavSearch />
      </div>

      <div className='flex items-center'>
        <OrganizationDropdown />
        <InstitutionDropdown />
        <ModeDropdown />
        <ShortcutsDropdown shortcuts={shortcuts} />
        <UserDropdownInstitution />
      </div>
    </div>
  )
}

export default NavbarContentInstitution
