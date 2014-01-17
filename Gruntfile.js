/*
 * grunt-wp-readme
 * https://github.com/johnpbloch/grunt-wp-readme
 *
 * Copyright (c) 2014 John P. Bloch
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg      : grunt.file.readJSON('package.json'),
		jshint   : {
			all    : [
				'Gruntfile.js',
				'tasks/*.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean    : {
			tests: ['tmp']
		},

		// Configuration to be run (and then tested).
		wp_readme: {
			options: {
				readme    : 'tmp',
				defaultFaq: 'None yet!\n\n'
			},
			test   : {
				displayName   : 'Test Plugin',
				contributors  : ['JohnPBloch'],
				donateLink    : 'foobar',
				tags          : ['testing', 'build'],
				minimumVersion: '3.7',
				testedUpTo    : '3.8',
				stableTag     : '<%= pkg.version %>',
				blurb         : 'Teh best plugin EVAR!!1!',
				sections      : {
					description : 'This is totally the best plugin you\'ll ever see.\n\n' +
							'LITERALLY.\n\n' +
							'I mean, it\'s like Chuck Norris and Shark Week had a horrifying ' +
							'but at the same time awesome love child. It does the following:\n\n' +
							'* Nothing\n' +
							'* MOAR nothing\n\n' +
							'What more could you possibly want??!',
					installation: ['testing one two three', 'one small step'],
					faq         : [
						{
							question: 'Are you for real?',
							answer  : 'YES'
						},
						{
							question: 'Seems legit',
							answer  : 'This is not a question.\n\n' +
									'But yes, this is true.'
						}
					],
					screenshots : [
						'Awesome',
						'Sauce'
					],
					changelog   : [
						{
							version    : '2.0',
							releaseDate: 'NOW',
							changes    : [
								'I don\'t do point releases. What\'s the point? LOL',
								'Twice the awesome!'
							]
						},
						{
							version: '1.0',
							changes: '* Initial release'
						}
					],
					upgrade     : 'You should upgrade because OMG',
					extra       : {
						header: 'WAT',
						body  : 'LOL inorite?'
					}
				}
			}
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');

	// By default, lint and run the build.
	grunt.registerTask('default', ['jshint', 'clean', 'wp_readme']);

};
