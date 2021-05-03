module.exports = {
  mount: {
    public: '/',
    src: '/dist',
  },

  plugins: ['@snowpack/plugin-svelte'],

  alias: {
    '@assets': './src/assets',
    '@components': './src/components',
    '@styles': './src/styles',
  },
};
