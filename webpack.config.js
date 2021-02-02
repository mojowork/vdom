module.exports = {
    entry: './src/index.js',
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        overlay: true
    }
}