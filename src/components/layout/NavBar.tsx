'use client'

import { IconChevronLgDown } from '@intentui/icons'
import {
  Link,
  Menu,
  MenuContent,
  MenuItem,
  Navbar,
  NavbarItem,
  NavbarMobile,
  NavbarProvider,
  NavbarSection,
  NavbarSpacer,
  NavbarStart,
  NavbarTrigger,
  Separator,
} from 'ui'

import logoImg from '@images/logo.webp'

export const NavBar = (props: React.ComponentProps<typeof Navbar>) => {
  return (
    <NavbarProvider>
      <Navbar {...props}>
        <NavbarStart>
          <Link aria-label='Go to homepage' href='/' className='font-medium'>
            <img
              loading='eager'
              src={logoImg.src}
              alt='mgaccountant logo'
              className='h-10 w-auto'
            />
          </Link>
        </NavbarStart>
        <NavbarSpacer className='hidden md:block' />
        <NavbarSection>
          <NavbarItem href='/about'>About</NavbarItem>
          <Menu>
            <NavbarItem>
              Services
              <IconChevronLgDown className='col-start-2' />
            </NavbarItem>
            <MenuContent items={categories} className='font-semibold'>
              {item => (
                <MenuItem id={item.id} textValue={item.label} href={item.url}>
                  {item.label}
                </MenuItem>
              )}
            </MenuContent>
          </Menu>
          <NavbarItem isDisabled href='/news'>
            News
          </NavbarItem>
          <NavbarItem isDisabled className='md:hidden'>
            <Separator className='my-3' orientation='horizontal' />
          </NavbarItem>
        </NavbarSection>
        <NavbarSpacer className='hidden md:block' />
        <NavbarSection>
          <NavbarItem href='/contact' className='sm:gap-x-1'>
            Get in touch
          </NavbarItem>
        </NavbarSection>
      </Navbar>

      <NavbarMobile>
        <Link aria-label='Go to homepage' href='/'>
          <img
            loading='eager'
            src={logoImg.src}
            alt='mgaccountant logo'
            className='h-10 w-auto'
          />
        </Link>
        <NavbarSpacer />
        <NavbarTrigger />
      </NavbarMobile>
    </NavbarProvider>
  )
}

const categories = [
  {
    id: 1,
    label: 'Businesses',
    url: '/services/businesses',
  },
  {
    id: 2,
    label: 'Individuals',
    url: '/services/individuals',
  },
]
