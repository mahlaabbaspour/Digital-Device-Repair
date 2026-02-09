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

  // {
  //   url: '/admin/externalservices',
  //   icon: 'tabler-device-desktop-analytics',
  //   title: 'سرویس های خارجی',
  //   subtitle: 'مدیریت سرویس های خارجی'
  // },
  {
    url: '',
    icon: 'tabler-settings',
    title: 'لاگ ها',
    subtitle: 'مدیریت لاگ ها'
  }
]

const NavbarContentUser = () => {
  return (
    <div className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}>
      <div className='flex items-center gap-4'>
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

export default NavbarContentUser
