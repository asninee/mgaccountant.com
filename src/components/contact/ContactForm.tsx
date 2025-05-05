'use client'

import { toast } from 'sonner'
import { Button, Card, TextField, Textarea } from 'ui'

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
      <Card className='md:p-4'>
        <Card.Content className='md:pt-6'>
          <div className='flex flex-col gap-8'>
            <div className='flex flex-wrap gap-6'>
              <div className='flex flex-col space-y-2 grow'>
                <TextField label='First name' name='firstName' isRequired />
              </div>
              <div className='flex flex-col space-y-2 grow'>
                <TextField label='Last name' name='lastName' isRequired />
              </div>
            </div>
            <div className='flex flex-wrap gap-6'>
              <div className='flex flex-col space-y-2 grow'>
                <TextField label='Email' type='email' name='email' isRequired />
              </div>
              <div className='flex flex-col space-y-2 grow'>
                <TextField label='Company' name='companyName' />
              </div>
            </div>
            <div className='flex flex-col space-y-2'>
              <TextField
                label='Phone number'
                type='tel'
                name='phoneNumber'
                placeholder='123-456-7890'
              />
            </div>
            <div className='flex flex-col space-y-2'>
              <Textarea label='Message' name='message' isRequired />
            </div>
          </div>
        </Card.Content>
        <Card.Footer className='md:pb-6'>
          <Button type='submit' className='font-semibold w-full'>
            Let's talk
          </Button>
          <div id='result'></div>
        </Card.Footer>
      </Card>
    </form>
  )
}

export default ContactForm
