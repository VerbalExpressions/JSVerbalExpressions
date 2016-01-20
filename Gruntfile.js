module.exports = function gruntConfig(grunt) {
    module.require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        eslint: {
            options: {
                configFile: '.eslintrc',
            },
            target: ['VerbalExpressions.js', 'test/tests.js'],
        },

        qunit: {
            options: {
              coverage: {
                src: [
                  'VerbalExpressions.js',
                ],
                instrumentedFiles: 'tmp',
                htmlReport: 'coverage',
              }
            },
            files: ['test/index.html'],
        },

        copy: {
            build: {
                src: '<%= pkg.name %>.js',
                dest: 'dist/verbalexpressions.js',
            },
        },

        uglify: {
            options: {
                banner: '/*!\n' +
                    '* <%= pkg.name %> JavaScript Library v<%= pkg.version %>\n' +
                    '* <%= pkg.homepage %>\n' +
                    '*\n' +
                    '*\n' +
                    '* Released under the <%= pkg.license.type %> license\n' +
                    '* <%= pkg.license.url %>\n' +
                    '*\n' +
                    '* Date: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    '*\n' +
                    '*/\n',
                sourceMap: true,
            },
            dist: {
                files: {
                    'dist/verbalexpressions.min.js': ['<%= pkg.name %>.js'],
                },
            },
        },

        sourcemap_localize: {
            options: {
                localize_to: '..',
            },
            build: {
                files: {
                    src: ['dist/*.min.js.map'],
                },
            },
        },

        watch: {
            testSource: {
                files: [
                    'VerbalExpressions.js',
                    'test/tests.js',
                ],
                tasks: [
                    'test',
                ],
            },
        },
    });

    grunt.registerTask('test', ['default']);
    grunt.registerTask('default', ['eslint', 'qunit']);
    grunt.registerTask('build', ['qunit', 'copy', 'uglify', 'sourcemap_localize']);
};
