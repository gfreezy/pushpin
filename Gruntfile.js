module.exports = function(grunt) {
	require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);

	var webpack = require("webpack");
	var webpackConfig = require("./webpack.config.js");
	var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
	var path = require("path");

	grunt.initConfig({
		webpack: {
			options: webpackConfig,
			build: {
				output: {
					filename: "[name]-[hash].min.js",
					chunkFilename: "[name]-[chunkhash].min.js"
				},
				recordsPath: path.join(__dirname, "records.json"),
				plugins: webpackConfig.plugins.concat(
					new webpack.DefinePlugin({
						"process.env": {
							// This has effect on the react lib size
							"NODE_ENV": JSON.stringify("production")
						}
					}),

					new webpack.optimize.OccurenceOrderPlugin(),
					new ChunkManifestPlugin(),
					new webpack.optimize.DedupePlugin(),
					new webpack.optimize.UglifyJsPlugin({
						sourceMap: false,
				    mangle: {
			        except: ['$super', '$', 'exports', 'require']
				    }
					})
				)
			},
			"build-dev": {
				devtool: "sourcemap",
				debug: true
			}
		},
		"webpack-dev-server": {
			options: {
				webpack: webpackConfig,
				contentBase: "http://localhost:9090",
				host: "0.0.0.0",
				port: 9090,
				info: false,
				publicPath: "/" + webpackConfig.output.publicPath,
				hot: true,
				inline: true,
			},
			start: {
				keepAlive: true,
				webpack: {
					devtool: "eval",
					debug: true
				}
			}
		},
		watch: {
			app: {
				files: ["./static/js/src/**/*"],
				tasks: ["webpack:build-dev"],
				options: {
					spawn: false,
				}
			}
		},
		clean: ["./static/js/dist/*"]
	});

	// The development server (the recommended option for development)
	grunt.registerTask("default", ["webpack-dev-server:start"]);

	// Build and watch cycle (another option for development)
	// Advantage: No server required, can run app from filesystem
	// Disadvantage: Requests are not blocked until bundle is available,
	//               can serve an old app on too fast refresh
	grunt.registerTask("dev", ["webpack:build-dev", "watch:app"]);

	// Production build
	grunt.registerTask("build", ["clean", "webpack:build"]);
};
