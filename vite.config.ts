import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Thư mục output, mặc định là 'dist'
    sourcemap: false, // Tắt sourcemap để tối ưu
  },
  base: '/', // Đường dẫn cơ sở, chỉnh nếu deploy subpath
});