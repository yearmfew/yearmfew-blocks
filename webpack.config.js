const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const blocksDir = path.resolve(__dirname, 'blocks');
const entry = {};

// Ana src/index.js dosyasını ekle
const mainSrcIndex = path.join(__dirname, 'src', 'index.js');
if (fs.existsSync(mainSrcIndex)) {
    entry['main'] = mainSrcIndex;
}

// Blocks klasöründeki her bloğu tara
fs.readdirSync(blocksDir).forEach((blockName) => {
    const blockPath = path.join(blocksDir, blockName);
    const blockSrcPath = path.join(blockPath, 'src');

    // Eğer bu bir klasör değilse atla
    if (!fs.statSync(blockPath).isDirectory()) {
        return;
    }

    // Her bloğun src klasöründeki dosyaları kontrol et
    if (fs.existsSync(blockSrcPath)) {
        const indexJs = path.join(blockSrcPath, 'index.js');
        const viewJs = path.join(blockSrcPath, 'view.js');

        if (fs.existsSync(indexJs)) {
            entry[`${blockName}/index`] = indexJs;
        }

        if (fs.existsSync(viewJs)) {
            entry[`${blockName}/view`] = viewJs;
        }
    }
});
module.exports = {
    entry,
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    externals: {
        '@wordpress/blocks': 'wp.blocks',
        '@wordpress/components': 'wp.components',
        '@wordpress/data': 'wp.data',
        '@wordpress/element': 'wp.element',
        '@wordpress/i18n': 'wp.i18n',
        '@wordpress/core-data': 'wp.coreData',
        '@wordpress/block-editor': 'wp.blockEditor',
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    resolve: {
        extensions: ['.js', '.scss', '.css'],
    },
    optimization: {
        splitChunks: false
    }
};
