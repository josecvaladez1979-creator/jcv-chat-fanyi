import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración avanzada para compilar JCV CHAT FĀNYÌ en la infraestructura gratuita de GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: './' // Asegura que los enlaces de estilos y lógica funcionen en cualquier celular
})
