//
const path = require('path');

const DIR_ROOT = path.join(__dirname, './../../');

const aliasObj = {
  'vue-dlg': DIR_ROOT,
};


//
const config = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '',
  // outputDir: process.env.NODE_ENV === 'production' ? __dirname + '/lib-build' : __dirname + '/demo',
  css: {
    extract: false
  },
  chainWebpack: (config) => {
    // добавляем свои алиасы
    for (const aliasName in aliasObj) {
      config.resolve.alias.set(aliasName, aliasObj[aliasName]);
    }
  },
};

// fix github page deploy
if(process.env.BUILD_SETTINGS === 'gh-page') {
  config.publicPath = '/vue-dialog/';
}

module.exports = config;
