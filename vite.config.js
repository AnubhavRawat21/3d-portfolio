import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
console.log("Triggering Vite Restart...");
export default defineConfig({
  plugins: [react()],
})
