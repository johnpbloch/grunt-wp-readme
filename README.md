# grunt-wp-readme

Generate a readme.txt for your WordPress plugins.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-wp-readme --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-wp-readme');
```

## The "wp_readme" task

### Overview
In your project's Gruntfile, add a section named `wp_readme` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  wp_readme: {
    options: {
      readme: 'readme.txt',
      defaultInstallation: '',
      defaultFaq: '',
      defaultChangelog: '',
      defaultUpgrade: '',
      defaultScreenshots: ''
    },
    your_target: {
      displayName: '',
      contributors: [],
      donateLink: '',
      tags: [],
      minimumVersion: '',
      testedUpTo: '',
      stableTag: '',
      license: 'GPL-2.0+',
      licenseURI: 'http://www.gnu.org/licenses/gpl-2.0.html',
      blurb: '',
      sections: {
        description: '', // String. Longer description of plugin. Defaults to the blurb.
        installation: '', // String or array of instructions.
        faq: [], // Array of faq objects
        screenshots: [], // Array of screenshot captions
        changelog: [], // Array of changelog objects
        upgrade: '', // String. Upgrade notice contents
        extra: {header: false, body: false} // Extra arbitrary section. Optional. May set strings for header and body to define the header (tab) and its contents.
      }
    },
  },
});
```

### Options

#### readme

Type: `String`

You can specify a custom location for the readme.txt file to be saved. By default, it will be saved to `readme.txt` in the same directory as your `Gruntfile.js` file. If the value you set for `readme` doesn't end with `readme.txt`, it is assumed to be a directory and will append `/readme.txt` to the value.

#### defaultInstallation

Type: `String`

The default value of the Installation section if it is left undefined in your configuration

#### defaultFaq

Type: `String`

The default value of the FAQ section if left undefined

#### defaultChangelog

Type: `String`

The default value of the Changelog section if left undefined

#### defaultUpgrade

Type: `String`

The default value of the Upgrade Notice section if left undefined

#### defaultScreenshots

Type: `String`

The default value of the Screenshots

### Configuration

#### displayName

Type: `String` **REQUIRED**

Your plugin's display name

#### contributors

Type: `Array` **REQUIRED**

An array of wordpress.org usernames. At least one must be specified.

#### donateLink

Type: `Array`

Optional URL for donations

#### tags

Type: `Array`

An array of tags to help people find your plugin

#### minimumVersion

Type: `String` **REQUIRED**

The minimum supported version of WordPress that your plugin works with

#### testedUpTo

Type: `String` **REQUIRED**

The version of WordPress up to which you've verified that your plugin works

#### stableTag

Type: `String` **REQUIRED**

The current stable version of your plugin.

#### license

Type: `String`

License under which your plugin is distributed. Defaults to `GPL 2.0+`.

#### licenseURI

Type: `String`

Link to license text. Defaults to `http://www.gnu.org/licenses/gpl-2.0.html`

#### blurb

Type: `String`

A short (preferably one sentence) description of your plugin

#### sections

Type: `Object`

An object detailing the contents of any sections of the plugin's `readme.txt`. See below for more details on sections and their structure/format.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

#### 0.1.0

* Initial release
