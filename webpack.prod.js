// eslint-disable-next-line import/no-extraneous-dependencies
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { version } = require('./package.json');

module.exports = merge(common, {
    entry: { 'emails-input': './src/emails-input.js' },
    mode: 'production',
    output: {
        filename: `emails-input.${version}.js`,
    },
});
