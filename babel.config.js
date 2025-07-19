module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
          '@assets': './assets',
        },
      },
    ],
    '@babel/plugin-transform-export-namespace-from',
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
}
