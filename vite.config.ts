import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '' // <-- Al dejarlo vacío, se adapta automáticamente a cualquier nombre de repositorio
})
