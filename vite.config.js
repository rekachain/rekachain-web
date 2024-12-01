import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import i18n from 'laravel-react-i18n/vite';
import os from 'os';
import { unlinkSync, existsSync } from 'fs';

const ip = Object.values(os.networkInterfaces())
    .flat()
    .find((i) => i.family === 'IPv4' && !i.internal)?.address;

export default defineConfig(({ command }) => {
    console.log(`Running vite with command: ${command}`);
    try {
        // eslint-disable-next-line no-sync
        if (existsSync('public/hot')) {
            unlinkSync('public/hot');
        }
    } catch (err) {
        console.error(err);
    }

    const sharedConfig =
        // eslint-disable-next-line no-undef
        command === 'serve' && process.argv.includes('--host=0.0.0.0')
            ? {
                  base: '/',
                  server: {
                      host: '0.0.0.0',
                      port: 5173,
                      hmr: {
                          host: ip,
                          port: 5173,
                      },
                  },
              }
            : {};

    return {
        ...sharedConfig,
        plugins: [
            laravel({
                input: 'resources/js/app.tsx',
                refresh: true,
            }),
            react(),
            i18n(),
        ],
        optimizeDeps: {
            include: ['html2canvas', 'jspdf'],
        },
    };
});
