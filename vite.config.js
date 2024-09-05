import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgr from 'vite-plugin-svgr';
import copy from 'rollup-plugin-copy';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        nodePolyfills(),
        svgr(),
        checker({
            typescript: true,
            eslint: { lintCommand: 'eslint "./src/**/*.{ts,tsx}"', dev: { logLevel: ['error'] } },
        }),
        copy({
            targets: [
                { src: 'src/assets/idls/*.idl', dest: 'dist/src/assets/idls' }, // Copy .idl files to dist
            ],
            hook: 'writeBundle', // Ensure it happens during the build
        }),
    ],
    resolve: { alias: { '@': '/src' } },
    // assetsInclude: ['**/*.idl'],
});
