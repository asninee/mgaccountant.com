import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://mgaccountant.com',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), icon(), sitemap()],
})
