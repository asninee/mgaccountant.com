'use client'

import { useMediaQuery } from '@lib/utils'
import { Card } from 'ui'

const team = [
  {
    id: 1,
    name: 'Manesha Goncalves',
    role: 'Managing Partner',
    email: 'manesha@mgaccountant.com',
    paras: [
      {
        content:
          "Manesha is the firm's Managing Partner, responsible for driving the vision and strategy of the firm. Manesha's 10 years of experience extends to working with clients in the businesses of IT, recruitment, media, childcare, healthcare, construction, and retail.",
      },
      {
        content:
          'Outside of work, Manesha enjoys spending time with her two children, friends and family.',
      },
    ],
  },
  {
    id: 2,
    name: 'Leandro Goncalves',
    role: 'Partner Support',
    email: 'leandro@mgaccountant.com',
    paras: [
      {
        content:
          "Leandro Goncalves is the Partner Support at MG Accountant Ltd, where he plays a crucial role in assisting with the firm's operations.",
      },
      {
        content:
          'Outside of his professional responsibilities, Leandro is passionate about cooking and enjoys spending quality time with his children, balancing his career with his personal life and hobbies.',
      },
    ],
  },
  {
    id: 3,
    name: 'Priya Mohit',
    role: 'Finance Administrator',
    email: 'priya@mgaccountant.com',
    paras: [
      {
        content:
          "Priya Mohit is the Finance Administrator at MG Accountant Ltd, where she is responsible for managing the company's financial activities.",
      },
      {
        content:
          'In her free time, Priya indulges in her passion for arts and crafts, finding creativity and relaxation through her artistic hobbies.',
      },
    ],
  },
]

const TeamCards = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6'>
      {team.map(member => (
        <Card key={member.id}>
          <Card.Header>
            <Card.Title className='font-serif text-2xl md:text-3xl'>
              {member.name}
            </Card.Title>
            <Card.Description className='flex flex-col gap-4'>
              <span className='font-serif text-2xl italic md:text-3xl'>
                {member.role}
              </span>
              <a
                href={`mailto:${member.email}`}
                className='sm:text-md inline-flex items-center gap-1 rounded-md font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-neutral-950'
              >
                {member.email}
              </a>
              <div className='flex flex-col gap-6'>
                {member.paras.map((p, i) => (
                  <p className='text-md' key={i}>
                    {p.content}
                  </p>
                ))}
              </div>
            </Card.Description>
          </Card.Header>
        </Card>
      ))}
    </div>
  )
}

export default TeamCards
