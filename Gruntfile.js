module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-browserify');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			options: {
				transform: [
					['babelify', {sourceMapRelative: "~/Develop/pushpin/"}]
				]
			},
			watch: {
				options: {
					browserifyOptions: {
						debug: true
					},
					watch: true,
					keepAlive: true
				},
				files: {
					'static/js/dist/bundle.js': ['static/js/src/app.jsx']
				}
			},
			build: {
				files: {
					'static/js/dist/bundle.js': ['static/js/src/app.jsx']
				}
			}
		}
	});

	grunt.registerTask('watch', ['browserify:watch']);
	grunt.registerTask('build', ['browserify:build']);
	grunt.registerTask('default', ['watch']);
};
