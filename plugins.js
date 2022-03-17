const { nodeExternalsPlugin } = require('esbuild-node-externals');
const { esbuildDecorators } = require('@anatine/esbuild-decorators');

module.exports = [nodeExternalsPlugin(), esbuildDecorators()];
