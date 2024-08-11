import { cn } from '@/lib/utils'
import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu'

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Services for businesses',
    href: '/services/businesses',
    description:
      'Overview of services provided for businesses, with tiered plans outlined.',
  },
  {
    title: 'Services for individuals',
    href: '/services/individuals',
    description: 'Overview of services provided for individuals.',
  },
]

const NavMenu = () => {
  return (
    <NavigationMenu className='md:block hidden'>
      <NavigationMenuList className='gap-10'>
        <NavigationMenuItem>
          <NavigationMenuLink
            href='/about'
            className={navigationMenuTriggerStyle()}
          >
            About Us
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid gap-3 p-4 md:w-[400px] lg:w-[500px]'>
              {components.map(component => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <NavigationMenuLink
            href='/news'
            className={navigationMenuTriggerStyle()}
          >
            News
          </NavigationMenuLink>
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className='font-medium leading-none'>{title}</div>
          <p className='text-sm line-clamp-2 leading-snug text-muted-foreground'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})

export default NavMenu
