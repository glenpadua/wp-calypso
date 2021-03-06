module.exports = {
	cacheDirectory: '<rootDir>/../.cache/jest',
	moduleNameMapper: {
		'^config$': '<rootDir>/server/config/index.js',
		'^wp-calypso-client/config$': '<rootDir>/server/config/index.js',
	},
	transform: {
		'\\.[jt]sx?$': 'babel-jest',
		'\\.(gif|jpg|jpeg|png|svg|scss|sass|css)$': require.resolve(
			'@automattic/calypso-build/jest/transform/asset.js'
		),
	},
	modulePaths: [ '<rootDir>/../test', '<rootDir>', '<rootDir>/extensions' ],
	rootDir: '../../client',
	testEnvironment: 'node',
	transformIgnorePatterns: [
		'node_modules[\\/\\\\](?!flag-icon-css|redux-form|simple-html-tokenizer|draft-js|social-logos|gridicons|wp-calypso-client)',
	],
	testMatch: [ '<rootDir>/**/test/*.[jt]s?(x)', '!**/*.skip.[jt]s?(x)', '!**/.eslintrc.*' ],
	testPathIgnorePatterns: [ '<rootDir>/server/' ],
	testURL: 'https://example.com',
	setupFiles: [ 'regenerator-runtime/runtime' ], // some NPM-published packages depend on the global
	setupFilesAfterEnv: [ '<rootDir>/../test/client/setup-test-framework.js' ],
	verbose: false,
	globals: {
		google: {},
	},
};
