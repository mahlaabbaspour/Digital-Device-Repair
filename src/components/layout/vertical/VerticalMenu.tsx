'use client'

import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, MenuItem, SubMenu } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
  panel: string
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu, panel }: Props) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const { id } = useParams()

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  const navAdmin = [
    {
      title: 'کارتابل ادمین',
      icon: '/images/icons/menu/cartable.png',
      children: [
        {
          title: 'داشبورد',
          path: '/admin/cartable/dashboard'
        }
      ]
    },
    {
      title: 'اطلاعات پایه',
      icon: '/images/icons/menu/info.png',
      children: [
        {
          title: 'زیر ساخت',
          icon: '/images/icons/menu/tools.png',
          children: [
            {
              title: 'تقسیمات کشوری',
              path: '/admin/base/region'
            },
            {
              title: 'حیطه های فعالیت',
              path: '/admin/base/areasActivity'
            },
            {
              title: 'نوع خدمت گیرنده',
              path: '/admin/base/serviceRecipient'
            },
            {
              title: 'زبان ها',
              path: '/admin/base/language'
            },
            {
              title: 'نژاد ها',
              path: '/admin/base/race'
            },
            {
              title: 'ملیت ها',
              path: '/admin/base/nationality'
            },
            {
              title: 'تابعیت ها',
              path: '/admin/base/citizenship'
            },
            {
              title: 'تحصیلات',
              path: '/admin/base/education'
            },
            {
              title: 'تاهل',
              path: '/admin/base/marital'
            },
            {
              title: 'وضعیت اشتغال',
              path: '/admin/base/employmentStatus'
            },
            {
              title: 'نوع معرف',
              path: '/admin/base/refferrerType'
            },
            {
              title: 'سازمان مخاطب',
              path: '/admin/base/targetOrganization'
            }
          ]
        },
        {
          title: 'خدمات مشاوره',
          icon: '/images/icons/menu/serviceReceiver.png',
          children: [
            {
              title: 'فهرست شاخص های ارزیابی مشاوره',
              path: '/admin/base/consultingServices/consultationSubsidyCriteria'
            },
            {
              title: 'مشاوران',
              icon: '/images/icons/menu/newbie.png',
              children: [
                {
                  title: 'فهرست مشاوران',
                  path: '/admin/base/consultingServices/advisor'
                }
              ]
            }
          ]
        }
      ]
    }
  ]

  const navInstitution = [
    {
      title: 'کارتابل',
      icon: '/images/icons/menu/cartable.png',
      children: [
        {
          title: 'داشبورد',
          path: `/institution/${id}/cartable/dashboard`
        }
      ]
    },
    {
      title: 'مشاوره',
      icon: '/images/icons/menu/experience.png',
      children: [
        {
          title: 'داشبورد',
          icon: '/images/icons/menu/cartable.png',
          path: `/institution/${id}/consultationServices/dashboard`
        },
        {
          title: 'جلسات مشاوره',
          icon: '/images/icons/menu/calendar.png',
          children: [
            {
              title: 'تقویم جلسات',
              path: `/institution/${id}/consultationServices/consultationCalendar/calender`
            },
            {
              title: 'فهرست جلسات',
              path: `/institution/${id}/consultationServices/consultationCalendar/consultationMeetings`
            },
            {
              title: 'جلسات کنسل شده',
              path: `/institution/${id}/consultationServices/consultationCalendar/cancelMeeting`
            }
          ]
        },
        {
          title: 'پرونده های مشاوره',
          icon: '/images/icons/menu/experience.png',
          children: [
            {
              title: 'فهرست پرونده های مشاوره',
              path: `/institution/${id}/consultationServices/consultationDocuments/documentList`
            }
          ]
        }
      ]
    },
    {
      title: 'یارانه مشاوره',
      icon: '/images/icons/menu/charity.png',
      children: [
        {
          title: 'فهرست درخواست ها',
          path: `/institution/${id}/consultationSubsidy/requestsList`
        },
        {
          title: 'فهرست درحال ارزیابی',
          path: `/institution/${id}/consultationSubsidy/evaluationList`
        },
        {
          title: 'فهرست یاری برگ ها',
          path: `/institution/${id}/consultationSubsidy/consultationVoucher`
        }
      ]
    },
    {
      title: 'مرکز 1480',
      icon: '/images/icons/menu/announcements.png',
      children: [
        {
          title: 'تقویم 1480',
          path: `/institution/${id}/institution1480/calendar`
        },
        {
          title: 'ایجاد جلسه 1480',
          path: `/institution/${id}/institution1480/meetings/create`
        },
        {
          title: 'فهرست جلسات 1480',
          path: `/institution/${id}/institution1480/meetings`
        }
      ]
    },
    {
      title: 'آموزش',
      icon: '/images/icons/menu/executionOrders.png',
      children: [
        {
          title: 'فهرست دوره های آموزشی',
          path: `/institution/${id}/education/educationalCourse`
        }
      ]
    }
  ]

  const navUser = [
    {
      title: 'کارتابل گیرنده خدمت',
      icon: '/images/icons/menu/cartable.png',
      children: [
        {
          title: 'داشبورد',
          path: `/user/${id}/cartable/dashboard`
        }
      ]
    },
    {
      title: 'آموزش',
      icon: '/images/icons/menu/executionOrders.png',
      children: [
        {
          title: 'مراکز آموزشی',
          path: `/`
        },
        {
          title: ' دوره های آموزشی',
          path: `/user/${id}/education/educationalCourse`
        },
        {
          title: 'تقویم جلسات آموزشی',
          path: `/`
        }
      ]
    },
    {
      title: 'مشاوره',
      icon: '/images/icons/menu/experience.png',
      children: [
        {
          title: 'پرونده های مشاوره',
          path: `/user/${id}/consultant/userDocument`
        },
        {
          title: 'تقویم جلسات مشاوره',
          path: `/user/${id}/consultant/calendarMeetingUser`
        },
        {
          title: 'یارانه مشاوره',
          icon: '/images/icons/menu/charity.png',
          children: [
            {
              title: 'فهرست درخواست ها',
              path: `/user/${id}/consultant/consultationSubsidy/requestsList`
            }
          ]
        }
      ]
    },
    {
      title: 'مجوز تدریس',
      icon: '/images/icons/menu/education.png',
      children: [
        {
          title: 'فهرست درخواست ها',
          path: `/user/${id}/teachigPermission/requestListTeaching`
        }
      ]
    }
  ]

  const navSuperUser = [
    {
      title: 'کارتابل',
      icon: '/images/icons/menu/cartable.png',
      children: [
        {
          title: 'داشبورد',
          path: `/superUser/${id}/cartable/dashboard`
        }
      ]
    },
    {
      title: 'مشاوره',
      icon: '/images/icons/menu/experience.png',
      children: [
        {
          title: 'تقویم جلسات مشاوره',
          path: `/superUser/${id}/consultant/calendarMeeting`
        },
        {
          title: 'پرونده های مشاوره',
          path: `/superUser/${id}/consultant/consultantDocument`
        }
      ]
    },
    {
      title: 'مرکز1480',
      icon: '/images/icons/menu/announcements.png',
      children: [
        {
          title: 'تقویم',
          path: `/superUser/${id}/institution1480/calendar`
        },
        {
          title: 'ایجاد جلسه 1480',
          path: `/superUser/${id}/institution1480/meetings/create`
        },
        {
          title: 'فهرست جلسات',
          path: `/superUser/${id}/institution1480/meetings`
        }
      ]
    }
  ]

  const navOrganization = [
    {
      title: 'کارتابل سازمان',
      icon: '/images/icons/menu/cartable.png',
      children: [
        {
          title: 'داشبورد',
          path: `/organization/${id}/cartable/dashboard`
        }
      ]
    },
    {
      title: 'مشاوره',
      icon: '/images/icons/menu/experience.png',
      children: [
        {
          title: 'داشبورد',
          path: ``
        },
        {
          title: 'پرونده های مشاوره',
          path: `/organization/${id}/consultation/consultationDocument`
        },
        {
          title: 'جلسات مشاوره',
          path: `/organization/${id}/consultation/consultationMeetings`
        }
      ]
    },

    {
      title: 'یارانه مشاوره',
      icon: '/images/icons/menu/charity.png',
      children: [
        {
          title: 'داشبورد',
          path: ``
        },
        {
          title: 'درخواست ها',
          path: `/organization/${id}/consultationSubsidy/pendingApproval`
        },
        {
          title: 'اعتبارات یارانه',
          path: `/organization/${id}/consultationSubsidy/subsidyCredit`
        }
      ]
    },
    {
      title: 'مجوز تدریس',
      icon: '/images/icons/menu/education.png',
      children: [
        {
          title: 'در دست بررسی',
          path: `/organization/${id}/teachigPermission/requestListRevision`
        },
        {
          title: 'تایید شده',
          path: `/organization/${id}/teachigPermission/requestListConfirmed`
        },
        {
          title: 'رد شده',
          path: `/organization/${id}/teachigPermission/requestListReject`
        }
      ]
    },
    {
      title: 'آموزش',
      icon: '/images/icons/menu/executionOrders.png',
      children: [
        {
          title: 'فهرست اطلاعات پایه دوره ها',
          path: `/organization/${id}/education/lesson`
        },
        {
          title: 'دوره های در انتظار صدور مجوز',
          path: `/organization/${id}/education/coursePendingApproval`
        }
      ]
    }
  ]

  const getNavByPanel = () => {
    switch (panel) {
      case 'admin':
        return navAdmin
      case 'user':
        return navUser
      case 'institution':
        return navInstitution
      case 'superUser':
        return navSuperUser
      case 'organization':
        return navOrganization
      default:
        return []
    }
  }

  function VerticalItem(item: any) {
    if (item?.children) {
      return (
        <SubMenu label={item.title} key={item.title} icon={item.icon}>
          {item.children.map((chl: any) => VerticalItem(chl))}
        </SubMenu>
      )
    }

    return (
      <MenuItem key={item.title} href={item.path}>
        {item.title}
      </MenuItem>
    )
  }

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        {/* {
          (panel === 'admin' ? navAdmin : navInstitution).map(
            item => VerticalItem(item)
          )
        } */}

        {getNavByPanel().map(item => VerticalItem(item))}
      </Menu>
      {/* <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <GenerateVerticalMenu menuData={menuData(dictionary)} />
      </Menu> */}
    </ScrollWrapper>
  )
}

export default VerticalMenu
