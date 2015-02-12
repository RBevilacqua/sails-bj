/**
 * Install bower components.
 *
 * ---------------------------------------------------------------
 *
 * Installs bower components and copies the required files into the assets folder structure.
 *
 */

module.exports = function(grunt) {

	grunt.config.set('bower', {
		install: {
			options: {
				targetDir: './assets/vendor',
				layout: 'byType',
				install: true,
				verbose: false,
				cleanTargetDir: true,
				cleanBowerDir: true,
				bowerOptions: {},
                dest: './assets/',
                js_dest: './assets/js/vendor',
                css_dest: './assets/styles',
			}
		},
        dev: {
            dest: './assets/',
            js_dest: './assets/js/vendor',
            css_dest: './assets/styles',
            cleanTargetDir: true,
            cleanBowerDir: true,
        }
	});

	grunt.loadNpmTasks('grunt-bower');
};
