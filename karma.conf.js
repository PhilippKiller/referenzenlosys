// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js',
      'app/bower_components/angular/angular.min.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-cookies/angular-cookies.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/angular-route/angular-route.js',

      //'app/scripts/*.js',
      //'app/scripts/**/*.js',
      //'test/mock/**/*.js',
      //'test/spec/**/*.js',

      'test/spec/**/*.js',

      'app/js/ie-trim-polyfill.js'
      ,'app/js/xml2json.min.js'
      ,'http://cdn.leafletjs.com/leaflet-0.7/leaflet.js'
      ,'app/js/angular/leaflet/angular-leaflet-directive.min.js'
      ,'http://maps.google.com/maps/api/js?v=3.2&sensor=false'
      ,'app/js/angular/leaflet/plugins/Google.js'
      ,'app/js/angular/nginfinitescroll/ng-infinite-scroll.min.js'
      ,'app/*.js'
      ,'app/ng/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Firefox'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};