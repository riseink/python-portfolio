const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const webpack = require("webpack")
const path = require("path")

module.exports = (env, argv) => {


  /**
   * Determine the current configuration mode
   * ("development" or "production" based on --mode flag)
   */
  const devMode = argv.mode === "development"

  return {

    /**
     * Set the configuration mode
     */
    mode: devMode ? "development" : "production",

    /**
     * Define entry points
     * (files that will get a bundle)
     */
    entry: {
      app: "./website/static/js/src/app.js",
      react_index: "./website/static/js/src/react_index.js"
    },

    /**
     * Define output paths
     * (where bundles will live)
     */
    output: {
      filename: "js/build/[name].bundle.js",
      path:
        devMode
          ? path.resolve(__dirname, "./website/static/")
          : path.resolve(__dirname, "./website/static/")
    },

    module: {
      rules: [

        /**
         * Transpile JavaScript to ES5 with babel-loader
         * (see `.babelrc` for configuration)
         */
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },

        /**
         * Load web fonts
         */
        {
          test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            publicPath: "/static/css/build/fonts",
            outputPath: "css/build/fonts"
          }
        },

        /**
         * Compile SCSS to CSS
         */
        {
          test: /\.scss$|\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        }
      ]
    },

    plugins: [
      /**
       * Creates one CSS bundle for each JS file containing CSS.
       */
      new MiniCssExtractPlugin({
        filename: "css/build/[name].bundle.css"
      })
    ],

    /**
     * Optimization settings
     * (runs in production mode only)
     */
    optimization: {
      minimizer: [
        new UglifyJsPlugin({ // minimize JS
          cache: true,
          parallel: true
        }),
        new OptimizeCSSAssetsPlugin({}) // minimize CSS
      ],
      /**
       * Create a chunk containing code from NPM modules, called `vendor.bundle.js`
       */
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all"
          }
        }
      }
    }
  }
}
