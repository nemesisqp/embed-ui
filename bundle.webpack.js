const path = require('path');
const glob = require('glob');

module.exports = {
    mode:    'production',
    entry:   {
        'bundle.js': glob.sync('build/static/?(js|css)/main.*.?(js|css)').map(f => path.resolve(__dirname, f)),
    },
    output:  {
        filename: 'embed-ui.min.js',
    },
    module:  {
        rules: [
            {
                test: /\.css$/,
                use:  ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [],
};
