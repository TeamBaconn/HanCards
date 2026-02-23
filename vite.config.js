import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [
      react(),
      VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'HanCards',
        short_name: 'HanCards',
        description: 'Learn Korean vocabulary with smart flashcards',
        categories: ['education', 'utilities', 'productivity'], 
        
        start_url: '/',
        
        display_override: ['fullscreen', 'minimal-ui'],
        display: 'standalone',
        orientation: 'portrait',

        background_color: '#1e1e1e',
        theme_color: '#ffdbd1',
        icons: [
          {
            src: '/icon.png',
            sizes: '256x256',
            type: 'image/png',
          }, 
        ],
      },
      }),
      sitemap({
        hostname: env.VITE_SITE_URL, 
      }),
    ],
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          vi: resolve(__dirname, 'vi/index.html'),
        },
      },
    },
    base: '/',
  }
})