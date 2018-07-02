/**
 * Simple Webpack plugin that adds the template option [lc-name] that will
 * substitute in a lower-case version of a name.
 *
 * This allows exporting a module like Console, while leaving the name of
 * the generate .js file as console.js.
 */
function LowerCaseNamePlugin(options) {
    // There are no options right now...
}

LowerCaseNamePlugin.prototype.apply = function(compiler) {
    const REGEXP_NAME = /\[lc-name\]/gi,
        REGEXP_ID = /\[id\]/gi;

    compiler.hooks.compilation.tap("LowerCaseNamePlugin", compilation => {
         const mainTemplate = compilation.mainTemplate;

        mainTemplate.hooks.assetPath.tap(
            "LowerCaseNamePlugin",
            (path, data) => {

                const chunk = data.chunk;
                const chunkName = chunk && (chunk.name || chunk.id);

                if (typeof path === "function") {
                    path = path(data);
                }

                return path.replace(REGEXP_NAME, (match, ...args) => {
                    return chunkName.toLowerCase();
                });
             }
        );
    })
}

module.exports = LowerCaseNamePlugin;