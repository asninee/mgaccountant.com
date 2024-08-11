import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

const accessKey = import.meta.env.PUBLIC_W3FORMS_KEY

const ContactForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(e.currentTarget)
    e.preventDefault()

    const object = Object.fromEntries(data)
    const json = JSON.stringify(object)

    const promise = fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: json,
    })

    toast.promise(promise, {
      loading: 'Sending...',
      success: () => {
        return 'Email was sent successfully!'
      },
      error: 'Something went wrong!',
    })
  }

  return (
    <form onSubmit={handleSubmit} className='mt-3 flex flex-col'>
      <input type='hidden' name='access_key' value={accessKey} />
      <Card className='bg-neutral-100 sm:p-4'>
        <CardContent className='pt-6'>
          <div className='flex flex-col gap-8'>
            <div className='flex flex-wrap gap-6'>
              <div className='flex flex-col space-y-2 grow'>
                <Label htmlFor='fname'>
                  First Name <span className='text-red-500'>*</span>
                </Label>
                <Input
                  className='bg-white'
                  name='fname'
                  required
                  placeholder='Your first name'
                />
              </div>
              <div className='flex flex-col space-y-2 grow'>
                <Label htmlFor='lname'>
                  Last Name <span className='text-red-500'>*</span>
                </Label>
                <Input
                  className='bg-white'
                  name='lname'
                  required
                  placeholder='Your last name'
                />
              </div>
            </div>
            <div className='flex flex-wrap gap-6'>
              <div className='flex flex-col space-y-2 grow'>
                <Label htmlFor='email'>
                  Email Address <span className='text-red-500'>*</span>
                </Label>
                <Input
                  className='bg-white'
                  type='email'
                  name='email'
                  required
                  placeholder='Your email address'
                />
              </div>
              <div className='flex flex-col space-y-2 grow'>
                <Label htmlFor='cname'>Company Name</Label>
                <Input
                  className='bg-white'
                  name='cname'
                  placeholder='Your company name'
                />
              </div>
            </div>
            <div className='flex flex-col space-y-2'>
              <Label htmlFor='number'>Contact Number</Label>
              <Input
                type='tel'
                className='bg-white'
                name='number'
                placeholder='Your contact number'
              />
            </div>
            <div className='flex flex-col space-y-2'>
              <Label htmlFor='message'>
                Message <span className='text-red-500'>*</span>
              </Label>
              <Textarea
                className='bg-white'
                name='message'
                required
                placeholder='Type your message here'
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type='submit'>Submit</Button>
          <div id='result'></div>
        </CardFooter>
      </Card>
    </form>
  )
}

export default ContactForm
