module.exports = {
  mount: {
    public: '/',
    src: '/dist',
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
    minify: true,
  },

  devOptions: {
    open: 'none',
    port: 8080,
  },
};
