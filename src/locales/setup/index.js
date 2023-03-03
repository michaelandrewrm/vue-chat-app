import { nextTick, isRef } from 'vue';
import { createI18n } from 'vue-i18n';

function isComposer(instance, mode) {
	return mode === 'composition' && isRef(instance.locale);
}

export const SUPPORT_LOCALES = ['es', 'en'];

export function getLocale(i18n) {
	if (isComposer(i18n.global, i18n.mode)) {
		return i18n.global.locale.value;
	}

	return i18n.global.locale;
}

export function setLocale(i18n, locale) {
	if (isComposer(i18n.global, i18n.mode)) {
		i18n.global.locale.value = locale;
	} else {
		i18n.global.locale = locale;
	}
}

export function setI18nLanguage(i18n, locale) {
	setLocale(i18n, locale);

	document.querySelector('html').setAttribute('lang', locale);
}

export async function loadLocaleMessages(i18n, locale) {
	const messages = await import(/* @vite-ignore */ `../${locale}.json`);

	i18n.global.setLocaleMessage(locale, messages.default);

	return nextTick();
}

export function setupI18n(options = { locale: 'es' }) {
	const i18n = createI18n(options);

	setI18nLanguage(i18n, options.locale);

	return i18n;
}

export const i18n = setupI18n({
	legacy: false,
	locale: 'es',
	fallbackLocale: 'en',
});
