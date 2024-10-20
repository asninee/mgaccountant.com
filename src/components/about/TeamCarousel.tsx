import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'
import { useMediaQuery } from '../ui'
import { Card } from '../ui/card'
import { Carousel } from '../ui/carousel'

const team = [
  {
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

const TeamCarousel = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }))

  return (
    <Carousel
      orientation={isMobile ? 'vertical' : 'horizontal'}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      plugins={[plugin.current as any]}
      opts={{
        loop: true,
        align: 'center',
      }}
      className='relative max-w-full [&_.xrkr]:overflow-hidden [&_.xrkr]:flex [&_.xrkr]:flex-col'
    >
      <Carousel.Content items={team} className='h-96 md:h-auto py-4 snap-y'>
        {member => (
          <Carousel.Item id={member.name} className='sm:basis-1/2 lg:basis-1/3'>
            <div className='p-1'>
              <Card>
                <Card.Header>
                  <Card.Title className='text-2xl font-serif md:text-3xl'>
                    {member.name}
                  </Card.Title>
                  <Card.Description className='flex flex-col gap-4'>
                    <span className='text-2xl font-serif md:text-3xl italic'>
                      {member.role}
                    </span>
                    <a
                      href={`mailto:${member.email}`}
                      className='focus-visible:outline-neutral-950 font-semibold sm:text-md inline-flex items-center gap-1 rounded-md hover:underline focus-visible:outline focus-visible:outline-2'
                    >
                      {member.email}
                    </a>
                    <div className='flex flex-col gap-6'>
                      {member.paras.map(p => (
                        <p className='text-md '>{p.content}</p>
                      ))}
                    </div>
                  </Card.Description>
                </Card.Header>
              </Card>
            </div>
          </Carousel.Item>
        )}
      </Carousel.Content>

      <Carousel.Handler>
        <Carousel.Button slot='previous' />
        <Carousel.Button slot='next' />
      </Carousel.Handler>
    </Carousel>
  )
}

export default TeamCarousel
