// Karma configuration
// Generated on Mon Oct 30 2017 17:20:32 GMT+0530 (India Standard Time)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine','requirejs'],

        // list of files / patterns to load in the browser
        files: [
//            {pattern: 'public_html/jsonData/*.json', included: false},
            {pattern: 'public_html/js/libs/**/*.js', included: false},
            {pattern: 'public_html/js/appController.js', included: false},
            {pattern: 'public_html/js/viewModels/**/*.js', included: false},
            {pattern: 'public_html/js/viewModels/*.js', included: false},
            {pattern: 'test/*Spec.js', included: false},
            'test/test-main.js'
        ],

        // list of files to exclude
        exclude: [
            'public_html/js/main.js'
        ],

        // preprocess matching files before serving them to the browser
        // available preproc    essors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
//            'public_html/jsonData/*.json': ['coverage'],
            'public_html/js/viewModels/**/*.js': ['coverage'],
            'public_html/js/viewModels/*.js': ['coverage']
        },

        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-coverage',   
            'karma-requirejs'   
        ],

        //Custom added property for coverageReported from docs - by Jat
        //https://technology.amis.nl/2016/10/20/karma-testing-code-coverage-oracle-jet-part-1/
        coverageReporter: {
            type: 'html',
            dir: 'reports/coverage'
        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};
