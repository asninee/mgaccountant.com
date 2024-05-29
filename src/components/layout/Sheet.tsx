import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Icon } from '@iconify/react'

const SheetDemo = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
          <Icon icon='lucide:align-justify' />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <nav className='grid gap-6 text-lg font-medium'>
          <a href='#' className='hover:text-foreground'>
            Home
          </a>
          <a
            href='/about'
            className='text-muted-foreground hover:text-foreground'
          >
            About Us
          </a>
          <a
            href='/services/business'
            className='text-muted-foreground hover:text-foreground'
          >
            Services for business
          </a>
          <a
            href='/services/individuals'
            className='text-muted-foreground hover:text-foreground'
          >
            Services for individuals
          </a>
          <a
            href='/news'
            className='text-muted-foreground hover:text-foreground'
          >
            News
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default SheetDemo
