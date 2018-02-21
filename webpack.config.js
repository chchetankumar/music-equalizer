module.exports = {
    entry: './index.js',
    output : {
        path: './',
        filename: './bundle.js'
    },

    module: {
    loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: "babel-loader",
            query: {
                presets:["es2015","react"],
            },
            },
            {
            test: /\.rt$/,
            exclude: /node_modules/,
            loader: "babel",
            query: {
                presets:["react-templates"],
            },
            }
         ]
    }
};
