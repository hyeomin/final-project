const FontPreloadPlugin = require('webpack-font-preload-plugin');

module.exports = {
  webpack: {
    plugins: [
      new FontPreloadPlugin({
        extensions: ['woff2']
      })
    ]
  }
};
