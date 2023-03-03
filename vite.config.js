import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import { resolve, dirname } from 'node:path';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		VueI18nPlugin({
			include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**'),
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'@components': fileURLToPath(new URL('./src/components', import.meta.url)),
			'@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
			'@locales': fileURLToPath(new URL('./src/locales', import.meta.url)),
			'@modals': fileURLToPath(new URL('./src/modals', import.meta.url)),
			'@plugins': fileURLToPath(new URL('./src/plugins', import.meta.url)),
			'@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
			'@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
			'@views': fileURLToPath(new URL('./src/views', import.meta.url)),
			'@widgets': fileURLToPath(new URL('./src/widgets', import.meta.url)),
			'@services': fileURLToPath(new URL('./src/services', import.meta.url)),
		},
	},
	server: {
		host: '0.0.0.0',
		port: '8080',
	},
});
