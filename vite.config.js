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
      manifest: {
        name: 'HanCards',
        short_name: 'HanCards',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
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