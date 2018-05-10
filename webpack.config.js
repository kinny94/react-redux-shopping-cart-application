const path = require('path');
const webpack = require( 'webpack' );

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    watch: true,
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            }
        ]
    }
};