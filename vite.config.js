import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    base:"https://admin.geniearabia.com/",
    target: 'esnext',
    outDir: 'build', // Output directory for production build
    assetsDir: 'assets', // Directory for static assets
    
  },
})
