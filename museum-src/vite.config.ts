import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Built into ../museum for GitHub Pages at https://cycrozen.com/museum/
export default defineConfig({
  base: '/museum/',
  plugins: [react()],
  build: {
    outDir: '../museum',
    emptyOutDir: true,
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  },
  preview: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  },
})
