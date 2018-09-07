# webpack-lowercase-name

_Adds the template option [lc-name] that will substitute a lower-case name_

Notice: It is recommended that the plugin _webpack-chunk-renamer-plugin_ be used instead of this one.
It does everything this does and then some and I'll likely not continue to maintain this plugin
in the future.

I prefer to have my exported JavaScript objects start with an upper-case letter, but I like
the actual JavaScript files to be all lower case names. For example, suppose you have 
these entry points:

``` javascript
    entry: {
        Console: './src/Console/Console.js',
        Site: './src/Site/Site.js'
    },
```

Then configure the output this way to create a library with the name exposed as a global object.

``` javascript
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: '[name]',
        libraryTarget: 'umd',
        libraryExport: "default",
        publicPath: ''
    },
```

The library will export Console and Site, but will also name the .js files Console.js and Site.js. 
I prefer that the files be console.js and site.js, which is consistent with many libraries. Setting the 
entry points as console and site will do that, but then the exported global variables will be
console and site as well.

This plugin adds a new template: [lc-name] that will convert the name to lower case. It can be used in
place of [name] to specify the file name:

``` javascript
    output: {
        filename: '[lc-name].js',
        path: path.resolve(__dirname, 'dist'),
        library: '[name]',
        libraryTarget: 'umd',
        libraryExport: "default",
        publicPath: ''
    },
```

Now the exported global variables will be Console and Site and the files console.js and site.js.

## Install

[npm](https://www.npmjs.com/package/webpack-lowercase-name): `npm install webpack-lowercase-name --save-dev`

## Utilizing

Require the plugin in webpack.config.js:

``` javascript 
const LowerCaseNamePlugin = require('webpack-lowercase-name');
```

And add to the list of plugins:

``` javascript
    plugins: [
        new LowerCaseNamePlugin()
    ],
```

## An Issue with splitChunks

If utilized with splitChunks, the generated filename may not be as expected. For example, suppose we apply the above
example and this splitChunks configuration to create a vendor chunk:

``` javascript
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
```

The generated output file will be vendor.vendor.js. The reason is that splitChunks will look at the generated
filename and ensure it will be unique if more than one chunk is generated. The code tests to ensure
either [id] or [name] are present. If neither is present, it prefixes [id]. to the filename, creating 
[id].[lc-name].js, which creates the file vendor.vendor.js. The fix for this problem is to specify the 
name for chunked files separately using [name] instead of [lc-name]:

``` javascript
    output: {
        filename: '[lc-name].js',
        chunkFilename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: '[name]',
        libraryTarget: 'umd',
        libraryExport: "default",
        publicPath: ''
    },
```

## License

webpack-lowercase-name is released under the MIT license.

* * *

Made by Charles B. Owen

