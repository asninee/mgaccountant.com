import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://mgaccountant.com',
  adapter: vercel(),
  output: 'hybrid',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    icon(),
    sitemap(),
  ],
})
