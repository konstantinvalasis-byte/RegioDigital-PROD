import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, type Plugin} from 'vite';
import Critters from 'critters';

// Vite-Plugin: Critical CSS inline in <head>, Rest asynchron laden
// Läuft in closeBundle, nachdem alle Assets auf Disk geschrieben wurden
function criticalCssPlugin(): Plugin {
  return {
    name: 'critical-css',
    apply: 'build',
    enforce: 'post',
    async closeBundle() {
      const fs = await import('fs/promises');
      const htmlPath = path.resolve(__dirname, 'dist/index.html');
      const html = await fs.readFile(htmlPath, 'utf8');
      const critters = new Critters({
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        preload: 'swap',
        inlineFonts: false,
        pruneSource: false,
        logLevel: 'warn',
      });
      const result = await critters.process(html);
      await fs.writeFile(htmlPath, result, 'utf8');
      console.log('✓ Critical CSS inlined');
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), criticalCssPlugin()],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-icons': ['lucide-react'],
          },
        },
      },
    },
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
