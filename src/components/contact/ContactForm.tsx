'use client'

import { useState } from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { toast } from 'sonner'
import { Button, Card, TextField, Textarea } from 'ui'

const accessKey = import.meta.env.PUBLIC_W3FORMS_KEY
const hCaptchaSiteKey = import.meta.env.PUBLIC_HCAPTCHA_SITE_KEY

const ContactForm = () => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  const handleHCaptchaChange = (token: string) => {
    setCaptchaToken(token)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!captchaToken) {
      toast.error('Please complete the captcha verification')
      return
    }

    const formData = new FormData(e.currentTarget)
    const json = JSON.stringify(Object.fromEntries(formData))

    toast.promise(
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: json,
      }),
      {
        loading: 'Sending...',
        success: 'Email was sent successfully!',
        error: 'Something went wrong!',
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} className='mt-3 flex flex-col'>
      <input type='hidden' name='access_key' value={accessKey} />
      <Card className='md:p-4'>
        <Card.Content className='md:pt-6'>
          <div className='flex flex-col gap-8'>
            <div className='flex flex-wrap gap-6'>
              <div className='flex grow flex-col space-y-2'>
                <TextField label='First name' name='firstName' isRequired />
              </div>
              <div className='flex grow flex-col space-y-2'>
                <TextField label='Last name' name='lastName' isRequired />
              </div>
            </div>
            <div className='flex flex-wrap gap-6'>
              <div className='flex grow flex-col space-y-2'>
                <TextField label='Email' type='email' name='email' isRequired />
              </div>
              <div className='flex grow flex-col space-y-2'>
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
            <HCaptcha
              sitekey={hCaptchaSiteKey}
              onVerify={handleHCaptchaChange}
              reCaptchaCompat={false}
            />
          </div>
        </Card.Content>
        <Card.Footer className='md:pb-6'>
          <Button type='submit' className='w-full font-semibold'>
            Let's talk
          </Button>
          <div id='result'></div>
        </Card.Footer>
      </Card>
    </form>
  )
}

export default ContactForm
