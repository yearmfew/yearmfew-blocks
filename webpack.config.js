const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
    ...defaultConfig,
    entry: {
        'hello-yearmfew/index': './blocks/hello-yearmfew/src/index.js',
        'postonic/index': './blocks/postonic/src/index.js',
        'postonic/view': './blocks/postonic/src/view.js',
        'postonic-slider/index': './blocks/postonic-slider/src/index.js',
        'postonic-slider/view': './blocks/postonic-slider/src/view.js',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
};
