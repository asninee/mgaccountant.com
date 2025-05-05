'use client'

import { IconChevronLgDown } from '@intentui/icons'
import { buttonStyles, Link, Menu, Navbar } from 'ui'

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
          <Navbar.Item href='/'>Home</Navbar.Item>
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
        </Navbar.Section>

        <Navbar.Section className='ml-auto hidden md:flex'>
          <Navbar.Flex className='sm:gap-x-1'>
            <Link
              aria-label='Contact'
              className={buttonStyles({ size: 'small', intent: 'secondary' })}
              href='/contact'
            >
              <span className='font-semibold'>Get in touch</span>
            </Link>
          </Navbar.Flex>
        </Navbar.Section>
      </Navbar.Nav>

      <Navbar.Compact>
        <Navbar.Flex>
          <Navbar.Trigger className='-ml-2' />
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
          <Navbar.Flex>
            <Link
              aria-label='Contact'
              className={buttonStyles({ size: 'small', intent: 'secondary' })}
              href='/contact'
            >
              <span className='font-semibold'>Get in touch</span>
            </Link>
          </Navbar.Flex>
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
