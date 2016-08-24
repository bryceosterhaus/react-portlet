module.exports = {
    entry: "./src/main/resources/META-INF/resources/js/main.js",
    output: {
        path: './src/main/resources/META-INF/resources/dist',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};