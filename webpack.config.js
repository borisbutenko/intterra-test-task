let fs = require("fs")
let path = require("path")

let HtmlWebpackPlugin = require("html-webpack-plugin")
let VueLoaderPlugin = require("vue-loader/lib/plugin")
let MiniCssExtractPlugin = require("mini-css-extract-plugin")
let TerserJSPlugin = require("terser-webpack-plugin")
let OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
let svgSprite = require("svg2sprite")

const [SOURCE, DIST] = [path.join(__dirname, "src"), path.join(__dirname, "dist")]

module.exports = {
    mode: process.env.NODE_ENV === "production" ? "production" : "development",

    entry: path.join(SOURCE, "main.js"),

    output: {
        path: DIST,
        filename: "build.js",
    },

    devServer: {
        contentBase: DIST,
        port: 8000,
    },

    optimization: {
        minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
    },

    module: {
        rules: [
            {
                test: /.vue$/,
                loader: "vue-loader",
            },
            {
                test: /.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(js|vue)$/,
                enforce: "pre",
                loader: "eslint-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.pug$/,
                loader: "pug-plain-loader",
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    "vue-style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    {
                        loader: "stylus-loader",
                        options: {
                            import: ["variables", "mixins"].map(filename => `~@/styles/${filename}.styl`),
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    "vue-style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                ],
            },
            {
                test: /\.woff(2)?$/,
                loader: "url-loader",
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },

    resolve: {
        alias: {
            "@": SOURCE,
        },
        extensions: [
            ".js",
            ".vue",
            ".styl",
            ".json",
            ".pug",
            ".ts",
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(SOURCE, "index.template.html"),
            title: "Intterra",
            svgSprite: (() => {
                let sprite = svgSprite.collection({ inline: true })
                let iconsPath = path.join(SOURCE, "assets", "icons")
                let icons = fs.readdirSync(iconsPath)
                for (let icon of icons) {
                    let name = path.basename(icon, path.extname(icon))
                    let svg = fs.readFileSync(path.resolve(iconsPath, icon)).toString()
                    sprite.add(`svg-${name}`, svg)
                }
                return sprite.compile()
            })(),
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin(),
    ],
}
