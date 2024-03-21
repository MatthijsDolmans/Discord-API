const path = require('path');

module.exports = {
  transpileDependencies: true,
  chainWebpack: (config) => {
    config
      .plugin('copy')
      .tap((args) => {
        args[0].push({
          from: path.resolve(__dirname, 'public/_redirects'), // Adjust the path as necessary
          to: path.resolve(__dirname, 'dist'), // Adjust the output directory as necessary
          toType: 'file',
          ignore: ['.*'],
        });
        return args;
      });
  },
};
