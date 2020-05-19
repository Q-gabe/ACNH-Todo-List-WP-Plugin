const pkg = require('./package.json');

module.exports = {
	// Project Identity
	appName: 'acnhTodoApp',
	type: 'plugin',
	slug: 'acnh-todo-app',
	bannerConfig: {
		name: 'acnhTodoApp',
		author: 'Gabriel Ong',
		license: 'UNLICENSED',
		link: 'UNLICENSED',
		version: pkg.version,
		copyrightText:
			'This software is released under the UNLICENSED License\nhttps://opensource.org/licenses/UNLICENSED',
		credit: true,
	},
	// Files we need to compile, and where to put
	files: [
		{
		 	name: 'app',
		 	entry: {
		 		main: './src/main.js',
		 	},
		 	// Webpack config for LESS CSS preprocessing and CSS-modules
		 	webpackConfig: (config, merge, appDir, isDev) => {
                const newConfig = { ...config };
                newConfig.module.rules = [
                    ...newConfig.module.rules,
                        {
                            test: /\.less$/,
                            use: [
                                {
                                    loader: "style-loader",
                                },
                                {
                                    loader: "css-loader",
                                    options: {
                                        sourceMap: true,
                                        // localIdentName moved to modules
                                        // (https://github.com/rails/webpacker/issues/2197#issuecomment-517234086)
                                        modules: {
                                            localIdentName: "[local]___[hash:base64:5]",
                                        },
                                    }
                                },
                                {
                                    loader: "less-loader",
                                },
                            ],
                        },
                        {
                            test: /\.svg$/,
                            use: ['@svgr/webpack'],
                        }
                ];
                return newConfig;
            },
		},
	],
	// Output path relative to the context directory
	// We need relative path here, else, we can not map to publicPath
	outputPath: 'dist',
	// Project specific config
	// Needs react(jsx)?
	hasReact: true,
	// Needs sass?
	hasSass: false,
	// Needs less?
	hasLess: false,
	// Needs flowtype?
	hasFlow: false,
	// Externals
	// <https://webpack.js.org/configuration/externals/>
	externals: {
		jquery: 'jQuery',
	},
	// Webpack Aliases
	// <https://webpack.js.org/configuration/resolve/#resolve-alias>
	alias: undefined,
	// Show overlay on development
	errorOverlay: true,
	// Auto optimization by webpack
	// Split all common chunks with default config
	// <https://webpack.js.org/plugins/split-chunks-plugin/#optimization-splitchunks>
	// Won't hurt because we use PHP to automate loading
	optimizeSplitChunks: true,
	// Usually PHP and other files to watch and reload when changed
	watch: './inc|includes/**/*.php',
	// Files that you want to copy to your ultimate theme/plugin package
	// Supports glob matching from minimatch
	// @link <https://github.com/isaacs/minimatch#usage>
	packageFiles: [
		'inc/**',
		'vendor/**',
		'dist/**',
		'*.php',
		'*.md',
		'readme.txt',
		'languages/**',
		'layouts/**',
		'LICENSE',
		'*.css',
	],
	// Path to package directory, relative to the root
	packageDirPath: 'package',
};
