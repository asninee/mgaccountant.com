'use client'

import { Container } from '@/components/layout/container'
import { LayoutGroup, motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { ListBox, ListBoxItem } from 'react-aria-components'
import { tv } from 'tailwind-variants'
import { Button, buttonStyles, Link, Sheet, useMediaQuery } from 'ui'

import { IconBarsThree } from 'justd-icons'
import logoImg from '../../images/logo.webp'

const links = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'About',
    url: '/about',
  },
  {
    name: 'Services - Businesses',
    url: '/services/businesses',
  },
  {
    name: 'Services - Individuals',
    url: '/services/individuals',
  },
  // {
  //   name: 'News',
  //   url: '/news',
  // },
  {
    name: 'Contact',
    url: '/contact',
  },
]

export function Navigation() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  return (
    <div className='sticky top-0 z-50 overflow-hidden pb-0'>
      <nav className='bg-bg py-2'>
        <Container>
          <div className='flex items-center justify-between'>
            <div className='flex gap-x-8 items-center'>
              <Link href='/'>
                <span className='sr-only'>mgaccountant</span>
                <img
                  loading='eager'
                  src={logoImg.src}
                  alt='mgaccountant logo'
                  className='h-10 w-auto'
                />
              </Link>
              {!isMobile && (
                <span className='sm:inline hidden'>
                  <NavContent />
                </span>
              )}
            </div>
            <div className='flex items-center gap-2 justify-end'>
              <Link
                aria-label='Contact'
                className={buttonStyles({ size: 'small' })}
                href='/contact'
              >
                <span className='font-semibold'>Get in touch</span>
              </Link>
              {isMobile && <NavResponsive />}
            </div>
          </div>
        </Container>
      </nav>
    </div>
  )
}

const navStyles = tv({
  base: 'text-sm relative py-0 sm:py-4 inline-flex focus:outline-none focus-visible:text-fg font-medium',
  variants: {
    isCurrent: {
      true: 'text-fg',
      false: 'text-muted-fg',
    },
  },
})

function NavResponsive() {
  const [isOpen, setOpen] = React.useState(false)
  const [pathname, setPathname] = React.useState('')

  useEffect(() => {
    setPathname(window.location.pathname)
    setOpen(false)
  }, [pathname])

  return (
    <Sheet onOpenChange={setOpen} isOpen={isOpen}>
      <Button size='square-petite' appearance='outline'>
        <IconBarsThree />
      </Button>
      <Sheet.Content>
        <Sheet.Header className='text-left p-4 border-b'>
          <Sheet.Title className='text-sm flex items-center gap-2'>
            <span className='sr-only'>mgaccountant</span>
            <img
              loading='eager'
              src={logoImg.src}
              alt='mgaccountant logo'
              className='h-10 w-auto'
            />
          </Sheet.Title>
        </Sheet.Header>
        <Sheet.Body className='px-4 pt-4'>
          <NavContent />
        </Sheet.Body>
      </Sheet.Content>
    </Sheet>
  )
}

function NavContent() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const id = React.useId()
  return (
    <LayoutGroup id={id}>
      <ListBox
        orientation={isMobile ? 'vertical' : 'horizontal'}
        layout={isMobile ? 'stack' : 'grid'}
        className='flex relative sm:flex-row flex-col sm:items-center gap-3 sm:gap-6'
        items={links}
        aria-label='Navigation'
      >
        {item => (
          <NavLink
            textValue={item.name}
            target={undefined}
            href={item.url}
            id={item.url}
          >
            {item.name}
          </NavLink>
        )}
      </ListBox>
    </LayoutGroup>
  )
}

interface LinkProps extends React.ComponentProps<typeof ListBoxItem> {
  isCurrent?: boolean
  className?: string
  children: React.ReactNode
}

function NavLink({ children, className, ...props }: LinkProps) {
  const [pathname, setPathname] = React.useState('')

  useEffect(() => {
    setPathname(window.location.pathname)
  }, [])

  const isCurrent = pathname === props.href
  return (
    <ListBoxItem className={navStyles({ isCurrent, className })} {...props}>
      {children}
      {isCurrent && <CurrentIndicator />}
    </ListBoxItem>
  )
}

function CurrentIndicator() {
  return (
    <motion.span
      className='h-full inset-y-0 sm:inset-auto sm:h-0.5 w-0.5 sm:w-full rounded-full bg-fg -left-4 sm:-bottom-2 sm:inset-x block absolute'
      layoutId='current'
    />
  )
}
