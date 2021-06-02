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
    '@assets': './src/assets',
    '@components': './src/components',
    '@lib': './src/lib',
    '@stores': './src/stores',
    '@styles': './src/styles',
  },

  optimize: {
    minify: false,
  },

  devOptions: {
    open: 'none',
    port: 8080,
  },
};
