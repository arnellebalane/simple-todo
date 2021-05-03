module.exports = {
  mount: {
    public: '/',
    src: '/dist',
  },

  plugins: ['@snowpack/plugin-svelte'],

  alias: {
    '@components': './src/components',
    '@styles': './src/styles',
  },
};
