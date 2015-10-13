/*
 * grunt-wp-readme
 * https://github.com/johnpbloch/grunt-wp-readme
 *
 * Copyright (c) 2014 John P. Bloch
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	function getHeaders(data) {
		var output = '=== ' + data.displayName + ' ===\n';
		if ('string' === typeof data.contributors) {
			data.contributors = [data.contributors];
		}
		output += 'Contributors: ' + data.contributors.join(', ') + '\n' +
				(data.donateLink ? 'Donate link: ' + data.donateLink + '\n' : '') +
				'Tags: ' + data.tags.join(', ') + '\n' +
				'Requires at least: ' + data.minimumVersion + '\n' +
				'Tested up to: ' + data.testedUpTo + '\n' +
				'Stable tag: ' + data.stableTag + '\n' +
				'License: ' + data.license + '\n' +
				'License URI: ' + data.licenseURI + '\n' +
				(data.textDomain ? 'Text Domain: ' + data.textDomain + '\n' : '') +
				(data.domainPath ? 'Domain Path: ' + data.domainPath + '\n' : '') +
				'\n' +
				data.blurb + '\n' +
				'\n';

		return output;
	}

	function getDescriptionSection(section) {
		return '== Description ==\n' +
				'\n' +
				section + '\n' +
				'\n';
	}

	function getInstallationSection(section, options) {
		var index,
				item,
				output = '== Installation ==\n' +
						'\n';
		if (!section.length) {
			return output + options.defaultInstallation;
		}
		if (section instanceof Array) {
			for (index = 0; index < section.length; index += 1) {
				item = section[index];
				output += (index + 1) + '. ' + item + '\n';
			}
		} else {
			output += section + '\n';
		}

		return output + '\n';
	}

	function getFaqSection(section, options) {
		var index,
				item,
				output = '== Frequently Asked Questions ==\n' +
						'\n';
		if (!section.length) {
			return output + options.defaultFaq;
		}

		for (index = 0; index < section.length; index += 1) {
			item = section[index];
			output += '= ' + item.question + ' =\n' +
					'\n' +
					item.answer + '\n' +
					'\n';
		}

		return output;
	}

	function getScreenshotsSection(section, options) {
		var index,
				item,
				output = '== Screenshots ==\n' +
						'\n';
		if (!section.length) {
			return output + options.defaultScreenshots;
		}

		for (index = 0; index < section.length; index += 1) {
			item = section[index];
			output += (index + 1) + '. ' + item + '\n';
		}

		return output + '\n';
	}

	function getChangelogSection(section, options) {
		var index,
				item,
				formatChange = function (change) {
					return '* ' + change;
				},
				output = '== Changelog ==\n' +
						'\n';
		if (!section.length) {
			return output + options.defaultChangelog;
		}

		for (index = 0; index < section.length; index += 1) {
			item = section[index];
			output += '= ' + item.version + ' =\n';
			if (undefined !== item.releaseDate) {
				output += '* Released: ' + item.releaseDate + '\n';
			}
			if (item.changes instanceof Array) {
				output += item.changes.map(formatChange).join('\n') + '\n';
			} else {
				output += item.changes + '\n';
			}
			output += '\n';
		}

		return output;
	}

	function getUpgradeSection(section, options) {
		var banner = '== Upgrade Notice ==\n' +
				'\n';
		if ('' === section) {
			return banner + options.defaultUpgrade;
		}
		return banner +
				section + '\n' +
				'\n';
	}

	function getExtraSection(section) {
		if (!section.header || !section.body) {
			return '';
		}
		return '== ' + section.header + ' ==\n' +
				'\n' +
				section.body + '\n' +
				'\n';
	}

	grunt.registerMultiTask('wp_readme', 'Generate a readme.txt for your WordPress plugins.', function () {
		// Merge task-specific and/or target-specific options with these defaults.
		var wpData,
				sections,
				output,
				options = this.options({
					readme             : 'readme.txt',
					defaultInstallation: '',
					defaultFaq         : '',
					defaultChangelog   : '',
					defaultUpgrade     : '',
					defaultScreenshots : ''
				});

		if ('readme.txt' !== options.readme.substr(-10)) {
			options.readme += '/readme.txt';
		}

		wpData = {
			displayName   : this.data.displayName || false,
			contributors  : this.data.contributors || [],
			donateLink    : this.data.donateLink || false,
			tags          : this.data.tags || [],
			minimumVersion: this.data.minimumVersion || false,
			testedUpTo    : this.data.testedUpTo || false,
			stableTag     : this.data.stableTag || false,
			license       : this.data.license || 'GPL-2.0+',
			licenseURI    : this.data.licenseURI || 'http://www.gnu.org/licenses/gpl-2.0.html',
			textDomain    : this.data.textDomain || false,
			domainPath    : this.data.domainPath || false,
			blurb         : this.data.blurb || '',
			sections      : this.data.sections || {}
		};

		['displayName', 'minimumVersion', 'testedUpTo', 'stableTag'].forEach(function (item) {
			if (!wpData[item]) {
				grunt.fail.warn(item + ' is a required field!');
			}
		});
		if (!wpData.contributors.length) {
			grunt.fail.warn('You must specify at least one contributor!');
		}

		sections = {
			description : wpData.sections.description || wpData.blurb,
			installation: wpData.sections.installation || '',
			faq         : wpData.sections.faq || [],
			screenshots : wpData.sections.screenshots || [],
			changelog   : wpData.sections.changelog || [],
			upgrade     : wpData.sections.upgrade || '',
			extra       : wpData.sections.extra || {header: false, body: false}
		};

		output = getHeaders(wpData) +
				getDescriptionSection(sections.description) +
				getInstallationSection(sections.installation, options) +
				getFaqSection(sections.faq, options) +
				getScreenshotsSection(sections.screenshots, options) +
				getChangelogSection(sections.changelog, options) +
				getUpgradeSection(sections.upgrade, options) +
				getExtraSection(sections.extra);

		grunt.file.write(options.readme, grunt.util.normalizelf(output));

		grunt.log.writeln('File ' + options.readme + ' created.');
	});

};
