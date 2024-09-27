import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins:[vue()],
  build: {
    lib: {
      entry: './lib/main.ts',
      name: 'Counter',
      fileName: 'counter'
    }
  }
})
