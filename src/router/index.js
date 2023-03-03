import { createRouter, createWebHistory } from 'vue-router';
import { i18n, loadLocaleMessages, setI18nLanguage } from '@locales/setup';
import { useUserStore } from '@stores/UserStore';
import routes from './routes';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach(async (to, from, next) => {
	const userStore = useUserStore();
	const lang = userStore.lang;

	if (!i18n.global.availableLocales.includes(lang)) {
		await loadLocaleMessages(i18n, lang);
	}

	setI18nLanguage(i18n, lang);

	next();
});

export default router;
