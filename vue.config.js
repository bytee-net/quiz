module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  filenameHashing: false,
  // Disable chunks
  chainWebpack: (config) => {
    config.optimization.splitChunks(false);
    config.optimization.delete('splitChunks');
    config.plugins.delete('prefetch');
  },
};
