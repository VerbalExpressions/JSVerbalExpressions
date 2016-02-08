module.exports = function gruntConfig(grunt) {
    module.require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        eslint: {
            options: {
                configFile: '.eslintrc',
            },
            target: ['VerbalExpressions.js', 'test/tests.js'],
            Gruntfile: [
                'Gruntfile.js',
            ],
        },

        qunit: {
            options: {
                coverage: {
                    src: [
                        'VerbalExpressions.js',
                    ],
                    instrumentedFiles: 'tmp',
                    htmlReport: 'coverage',
                },
            },
            files: ['test/index.html'],
        },

        copy: {
            build: {
                src: 'VerbalExpressions.js',
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
                    '* Released under the <%= pkg.license %> license\n' +
                    '*\n' +
                    '* Date: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    '*\n' +
                    '*/\n',
                sourceMap: true,
            },
            dist: {
                files: {
                    'dist/verbalexpressions.min.js': ['VerbalExpressions.js'],
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

        jsdoc: {
            options: {
                pedantic: true,
                verbose: true,
                readme: 'README.md',
                package: 'package.json',
            },
            src: {
                options: {
                    destination: 'docs',
                },
                src: ['VerbalExpressions.js'],
            },
            dist: {
                options: {
                    destination: 'dist/docs',
                },
                src: ['dist/verbalexpressions.js'],
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

    grunt.registerTask('test', [
        'moduleTest',
        'eslint:target',
        'qunit:files',
    ]);
    grunt.registerTask('default', ['eslint:Gruntfile', 'test']);
    grunt.registerTask('moduleTest', function moduleTest() {
        var VE = new (module.require('./VerbalExpressions.js'));
        VE = VE.whitespace().multiple('').find('not').whitespace().multiple('');
        grunt.log.write(VE.replace('VerbalExpressions as module does not work!', ' '));
    });
    grunt.registerTask('build', [
        'eslint:target',
        'qunit:files',
        'copy:build',
        'uglify:dist',
        'sourcemap_localize:build',
        'jsdoc:dist',
    ]);
};
