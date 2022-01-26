module.exports = {
  mount: {
    public: '/',
    src: '/dist',
  },

  env: {
    APP_VERSION: require('./package.json').version,
  },

  plugins: ['@snowpack/plugin-svelte', '@snowpack/plugin-dotenv'],

  alias: {
    '@app': './src/app',
    '@assets': './src/assets',
    '@components': './src/components',
    '@features': './src/features',
    '@lib': './src/lib',
    '@stores': './src/stores',
    '@styles': './src/styles',
  },

  optimize: {
    minify: true,
  },

  devOptions: {
    open: 'none',
    port: 8080,
  },
};
