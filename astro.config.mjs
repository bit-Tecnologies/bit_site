// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import VitePWA from '@vite-pwa/astro';
import sitemap from '@astrojs/sitemap';

/** @type {any} Astro and @tailwindcss/vite currently resolve different Vite type copies here. */
const tailwindPlugin = tailwindcss();

// https://astro.build/config
export default defineConfig({
  site: 'https://bit-tecnologies.pages.dev',
  devToolbar: {
    enabled: false,
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  integrations: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,avif}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.github\.com\/.*$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'github-api',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60, // 1 hour — GitHub API has rate limits
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },
      manifest: {
        name: 'bit Tecnologies',
        short_name: 'bit',
        description: 'bit Tecnologies - Professional Web Development',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
    sitemap()
  ],

  i18n: {
    defaultLocale: "ru",
    locales: ["ru", "en"],
    routing: {
      prefixDefaultLocale: false
    }
  },

  output: "static",

  vite: {
    plugins: [tailwindPlugin],
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug']
        }
      },
      chunkSizeWarningLimit: 1000,
      assetsInlineLimit: 4096
    }
  },

  build: {
    format: 'directory',
    assets: 'assets'
  },

  image: {
    domains: ['cybernattor.github.io'],
    // @ts-ignore - formats is valid in Astro
    formats: ['avif', 'webp'],
  },
});
