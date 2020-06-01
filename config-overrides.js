const {override, fixBabelImports, addLessLoader, addPostcssPlugins, disableEsLint} = require('customize-cra');

const config = override(
    disableEsLint(),
    // enable tree shaking for antd
    fixBabelImports('antd-mobile', {
        libraryName:      'antd-mobile',
        libraryDirectory: 'es',
        style:            true,
    }),
    fixBabelImports('antd', {
        libraryName:      'antd',
        libraryDirectory: 'es',
        style:            true,
    }),
    fixBabelImports('@ant-design/icons', {
        libraryName:             '@ant-design/icons',
        libraryDirectory:        'es/icons',
        camel2DashComponentName: false,
    }),
    // use less and custom theming antd
    addLessLoader({
        lessOptions: {
            modifyVars:        {
                // 'brand-primary':   'red',
                // 'color-text-base': '#333',
                // '@primary-color':  '#1DA57A',
            },
            javascriptEnabled: true,
        },
    }),
    // namespacing antd
    addPostcssPlugins([require('postcss-prefixwrap')('.antd-ns', {
        // prefixRootTags: true,
        ignoredSelectors: [
            ':root',
            /^\.zoom-big-fast(.+)$/,
            /^\.ant(.+)$/,
            /^\.slide-(.+)$/,
            /^\.am-(.+)$/,
        ],
    })]),
    // emit single js file
    config => {
        // config.output.filename           = 'static/js/ui.js';
        // Consolidate chunk files instead
        config.optimization.splitChunks  = {
            cacheGroups: {
                default: false,
            },
        };
        // Move runtime into bundle instead of separate file
        config.optimization.runtimeChunk = false;
        return config;
    },
);


module.exports = config;
