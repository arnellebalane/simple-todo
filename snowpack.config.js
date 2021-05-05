module.exports = {
  mount: {
    public: '/',
    src: '/dist',
  },

  plugins: ['@snowpack/plugin-svelte'],

  alias: {
    '@assets': './src/assets',
    '@components': './src/components',
    '@lib': './src/lib',
    '@styles': './src/styles',
  },

  optimize: {
    minify: true,
  },
};
