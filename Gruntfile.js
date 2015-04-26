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
					filename: "[name]-[chunkhash].min.js",
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
					new webpack.optimize.CommonsChunkPlugin({
						names: "vender",
						minChunks: Infinity,
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
				devtool: "eval",
				debug: true
			}
		},
		"webpack-dev-server": {
			options: {
				webpack: webpackConfig,
				contentBase: "http://localhost:8080",
				info: false,
				publicPath: "/" + webpackConfig.output.publicPath,
				hot: true,
				inline: true,
				proxy: {
					"*": "http://localhost:8080"
				}
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
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'static/js/dist/*',
            'templates/**/*.jinja2'
          ]
        },
        options: {
          watchTask: true,
          proxy: 'http://localhost:8080',
        }
      }
    },
		clean: ["./static/js/dist/*"]
	});

	// The development server (the recommended option for development)
	grunt.registerTask("watch", ["webpack-dev-server"]);

	grunt.registerTask("default", ["browserSync", "dev"]);

	// Build and watch cycle (another option for development)
	// Advantage: No server required, can run app from filesystem
	// Disadvantage: Requests are not blocked until bundle is available,
	//               can serve an old app on too fast refresh
	grunt.registerTask("dev", ["webpack:build-dev", "watch:app"]);

	// Production build
	grunt.registerTask("build", ["clean", "webpack:build"]);
};
