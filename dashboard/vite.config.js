// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: 'Kisaan-Mitr-Website', // <-- This must match your repo name exactly!
  plugins: [react()],
})