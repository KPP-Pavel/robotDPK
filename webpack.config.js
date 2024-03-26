const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    target: 'node',
    mode: 'production',
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'],
        // Add support for TypeScripts fully qualified ESM imports.
        extensionAlias: {
            '.js': ['.js', '.ts'],
            '.cjs': ['.cjs', '.cts'],
            '.mjs': ['.mjs', '.mts'],
        },
    },
    module: {
        rules: [
            // all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.([cm]?ts|tsx)$/, loader: 'ts-loader' },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: 'public', to: 'public' }],
        }),
    ],
};
