import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react-swc'
import {resolve} from 'path'
import {rm} from 'fs/promises'


export default defineConfig(({mode}) => {
    const {VITE_PUBLIC_PATH} = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [
            react(),
            {
                name: 'remove-mock-service-worker',
                apply: 'build',
                closeBundle: async () => {
                    await rm(resolve(__dirname, 'dist/mockServiceWorker.js'), {force: true})
                }
            }
        ],
        build: {
            outDir: 'dist'
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, './src'),
            },
        },
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true
                }
            }
        },
        server: {
            host: '0.0.0.0',
            port: 9000,
            hmr: true,
            proxy: {
                '/openspg/': {
                    target: 'http://127.0.0.1:19994/',
                    changeOrigin: true,
                    secure: false,
                    ws: true,
                },
            },
        },
        base: `${VITE_PUBLIC_PATH}`
    }
})
