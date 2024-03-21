const path = require('path');

module.exports = {
  transpileDependencies: true,
  chainWebpack: (config) => {
    config
      .plugin('copy')
      .tap((args) => {
        args[0].push({
          from: path.resolve(__dirname, 'public/_redirects'), 
          to: path.resolve(__dirname, 'dist'), 
          toType: 'file',
          ignore: ['.*'],
        });
        return args;
      });
  },
};
