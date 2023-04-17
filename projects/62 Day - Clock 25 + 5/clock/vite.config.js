import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/FreeCodeCamp-Certification/Clock25/',
  build: {
    outDir: '../Clock25',
  }
})
