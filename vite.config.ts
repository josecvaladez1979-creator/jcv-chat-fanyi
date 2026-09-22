import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/jcv-chat-fānyì/' // Reemplaza la ruta genérica por el nombre exacto de tu repositorio de GitHub
})
