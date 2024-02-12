const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color':'#3CB4AB',
      '@text-color':'#132845',
      '@font-family':"'FuturaStd', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu'",
      '@input-height-base':'40px',
      '@border-color-base':'@primary-color'
    },
  }),
);
