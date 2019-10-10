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

    // Build without spectre.css
    // config.module
    //   .rule('css')
    //   .exclude
    //   .add(new RegExp(/spectre.min.css/gi)).end();
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
};
