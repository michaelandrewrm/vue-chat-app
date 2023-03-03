/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
	root: true,
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-prettier',
		'plugin:@intlify/vue-i18n/recommended',
	],
	overrides: [
		{
			files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
			extends: ['plugin:cypress/recommended'],
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-await-in-loop': 'error',
		'no-constant-binary-expression': 'error',
		'no-constructor-return': 'error',
		'no-duplicate-imports': 'error',
		'no-new-native-nonconstructor': 'error',
		'no-promise-executor-return': 'error',
		'no-self-compare': 'error',
		'no-use-before-define': [
			'error',
			{
				functions: true,
				classes: true,
				variables: true,
				allowNamedExports: false,
			},
		],
		'arrow-body-style': ['error', 'as-needed'],
		'camelcase': [
			'error',
			{
				properties: 'always',
				ignoreDestructuring: false,
				ignoreImports: false,
				ignoreGlobals: false,
			},
		],
		'default-case': 'off',
		'dot-notation': 'warn',
		'eqeqeq': 'warn',
		'no-alert': 'error',
		'no-eq-null': 'error',
		'rest-spread-spacing': ['error', 'never'],
		'@intlify/vue-i18n/no-unused-keys': [
			'error',
			{
				extensions: ['.js', '.vue'],
			},
		],
	},
	settings: {
		'vue-i18n': {
			localeDir: './src/locales/*.json',
			messageSyntaxVersion: '^9.2.2',
		},
	},
};
