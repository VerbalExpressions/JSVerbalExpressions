module.exports = function gruntConfig(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        eslint: {
            options: {
                configFile: '.eslintrc',
            },
            target: ['VerbalExpressions.js', 'test/tests.js', 'Gruntfile.js'],
        },

        ava: {
            test: ['test/tests.js'],
            verbose: {
                test: ['test/tests.js'],
                options: {
                    verbose: true,
                },
            },
        },

        copy: {
            build: {
                src: '<%= pkg.main %>',
                dest: 'dist/verbalexpressions.js',
            },
        },

        uglify: {
            options: {
                banner: '/*!\n'
                    + '* <%= pkg.name %> JavaScript Library v<%= pkg.version %>\n'
                    + '* <%= pkg.homepage %>\n'
                    + '*\n'
                    + '* Released under the <%= pkg.license %> license\n'
                    + '*/\n',
                sourceMap: true,
            },
            dist: {
                files: {
                    'dist/verbalexpressions.min.js': ['dist/verbalexpressions.js'],
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
                src: ['VerbalExpressions.js'],
            },
        },

        babel: {
            options: {
                sourceMap: true,
                presets: ['env'],
                plugins: [
                    ['transform-builtin-extend', { globals: ['RegExp'] }],
                ],
            },
            dist: {
                files: {
                    'dist/verbalexpressions.js': 'VerbalExpressions.js',
                },
            },
        },

        iife: {
            build: {
                files: {
                    'dist/verbalexpressions.js': 'dist/verbalexpressions.js',
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-ava');
    grunt.loadNpmTasks('grunt-sourcemap-localize');
    grunt.loadNpmTasks('grunt-iife');

    grunt.registerTask('default', ['test']);
    grunt.registerTask('test', ['eslint', 'ava:test']);
    grunt.registerTask('test:verbose', ['eslint', 'ava:verbose']);
    grunt.registerTask('compile', ['babel']);
    grunt.registerTask('build', ['test', 'copy', 'compile', 'iife', 'uglify', 'sourcemap_localize', 'jsdoc:dist']);
    grunt.registerTask('docs', ['test', 'jsdoc:src']);
};
