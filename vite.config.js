// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const proxy = {
  '/api': {
    target: 'http://backend:5000',   // container name + port inside the container
    changeOrigin: true,
  },
}

export default defineConfig({
  plugins: [react()],
  server: { proxy },    // used by `npm run dev`
  preview: { proxy },   // used by `npm run preview`
})