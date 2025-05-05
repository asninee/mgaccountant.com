'use client'

import { IconChevronLgDown } from '@intentui/icons'
import { buttonStyles, Link, Menu, Navbar, Separator } from 'ui'

import logoImg from '@images/logo.webp'

export const NavBar = (props: React.ComponentProps<typeof Navbar>) => {
  return (
    <Navbar {...props}>
      <Navbar.Nav>
        <Navbar.Logo aria-label='Go to homepage' href='/'>
          <img
            loading='eager'
            src={logoImg.src}
            alt='mgaccountant logo'
            className='h-10 w-auto'
          />
        </Navbar.Logo>
        <Navbar.Section>
          <Navbar.Item href='/about'>About</Navbar.Item>
          <Menu>
            <Navbar.Item>
              Services <IconChevronLgDown data-slot='chevron' />
            </Navbar.Item>
            <Menu.Content items={categories} className='font-semibold'>
              {item => (
                <Menu.Item id={item.id} textValue={item.label} href={item.url}>
                  {item.label}
                </Menu.Item>
              )}
            </Menu.Content>
          </Menu>
          <Navbar.Item href='/news' isDisabled>
            News
          </Navbar.Item>
          <Navbar.Item isDisabled className='md:hidden'>
            <Separator className='my-3' orientation='horizontal' />
          </Navbar.Item>
          <Navbar.Item className='md:hidden' href='/contact'>
            Get in touch
          </Navbar.Item>
        </Navbar.Section>

        <Navbar.Section className='hidden md:flex'>
          <Navbar.Flex className='sm:gap-x-1'>
            <Link
              aria-label='Contact'
              className={buttonStyles({ size: 'small', intent: 'plain' })}
              href='/contact'
            >
              <span className='font-semibold'>Get in touch</span>
            </Link>
          </Navbar.Flex>
        </Navbar.Section>
      </Navbar.Nav>

      <Navbar.Compact>
        <Navbar.Flex>
          <Navbar.Logo aria-label='Go to homepage' href='/'>
            <img
              loading='eager'
              src={logoImg.src}
              alt='mgaccountant logo'
              className='h-10 w-auto'
            />
          </Navbar.Logo>
        </Navbar.Flex>
        <Navbar.Flex>
          <Navbar.Trigger className='-mr-2' />
        </Navbar.Flex>
      </Navbar.Compact>
    </Navbar>
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
