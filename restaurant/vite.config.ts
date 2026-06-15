import { resolve } from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const base = process.env.GITHUB_ACTIONS === 'true' ? '/jin-jangeo/' : '/';

export default defineConfig({
  base,
  server: {
    port: 5173,
    strictPort: true,
  },
  resolve: {
    alias: { '@shared/media': resolve(__dirname, '../shared/media/index.ts') },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html'),
      },
    },
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['media/**/*', 'icons/*', 'data/**/*'],
      manifest: {
        name: '장어명가 진',
        short_name: '장어명가진',
        description: '강원 영월 숯불 장어구이 전문점',
        theme_color: '#0f0f0f',
        background_color: '#0f0f0f',
        display: 'standalone',
        start_url: base,
        lang: 'ko',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,webp,svg,woff2,mp3}'],
        globIgnores: ['**/data/**'],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: new RegExp(`${base.replace(/\//g, '\\/')}data\\/.*\\.json$`),
            handler: 'NetworkOnly',
          },
        ],
      },
    }),
  ],
});
