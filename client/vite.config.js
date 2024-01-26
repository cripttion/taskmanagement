// vite.config.js
import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://task-management-okh1.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
};
