# webpack-lowercase-name

_Adds the template option [lc-name] that will substitute a lower-case name_

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

Require the plugin in webpack.common.js:

``` javascript 
const LowerCaseNamePlugin = require('webpack-lowercase-name');
```

And add to the list of plugins:

``` javascript
    plugins: [
        new LowerCaseNamePlugin()
    ],
```

## License

webpack-lowercase-name is released under the MIT license.

* * *

Made by Charles B. Owen
