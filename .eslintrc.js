module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	rules: {
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
			},
		],
		'no-var': 'error', // var 금지
		'no-console': ['error', { allow: ['warn', 'error', 'info'] }], // console 금지
		'no-unused-vars': 'error', // 사용하지 않는 변수 금지
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	extends: ['plugin:react/recommended', 'plugin:prettier/recommended', 'prettier'],
};
