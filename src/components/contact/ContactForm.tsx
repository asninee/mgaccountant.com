import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { TextField } from '../ui/text-field'
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
        <Card.Content className='pt-6'>
          <div className='flex flex-col gap-8'>
            <div className='flex flex-wrap gap-6'>
              <div className='flex flex-col space-y-2 grow'>
                <TextField
                  label='First Name'
                  name='fname'
                  isRequired
                  placeholder='Your first name'
                />
              </div>
              <div className='flex flex-col space-y-2 grow'>
                <TextField
                  label='Last Name'
                  name='lname'
                  isRequired
                  placeholder='Your last name'
                />
              </div>
            </div>
            <div className='flex flex-wrap gap-6'>
              <div className='flex flex-col space-y-2 grow'>
                <TextField
                  label='Email Address'
                  type='email'
                  name='email'
                  isRequired
                  placeholder='Your email address'
                />
              </div>
              <div className='flex flex-col space-y-2 grow'>
                <TextField
                  label='Company Name'
                  name='cname'
                  placeholder='Your company name'
                />
              </div>
            </div>
            <div className='flex flex-col space-y-2'>
              <TextField
                label='Contact Number'
                type='tel'
                name='number'
                placeholder='Your contact number'
              />
            </div>
            <div className='flex flex-col space-y-2'>
              <Textarea
                label='Message'
                name='message'
                isRequired
                placeholder='Type your message here'
              />
            </div>
          </div>
        </Card.Content>
        <Card.Footer>
          <Button type='submit'>Submit</Button>
          <div id='result'></div>
        </Card.Footer>
      </Card>
    </form>
  )
}

export default ContactForm
