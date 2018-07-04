module.exports = function gruntConfig(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        eslint: {
            options: {
                configFile: '.eslintrc',
            },
            target: ['VerbalExpressions.js', 'test/tests.js'],
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
                banner: '/*!\n' +
                    '* <%= pkg.name %> JavaScript Library v<%= pkg.version %>\n' +
                    '* <%= pkg.homepage %>\n' +
                    '*\n' +
                    '* Released under the <%= pkg.license %> license\n' +
                    '*/\n',
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

        babel: {
            options: {
                sourceMap: true,
                presets: ["env"],
                plugins: [
                    ["transform-builtin-extend", {"globals": ["RegExp"]}],
                ],
            },
            dist: {
                files: {
                    'dist/verbalexpressions.js': 'VerbalExpressions.js',
                },
            },
        },

    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-ava');
    grunt.loadNpmTasks('grunt-sourcemap-localize');

    grunt.registerTask('default', ['test']);
    grunt.registerTask('test', ['eslint', 'ava:test']);
    grunt.registerTask('test:verbose', ['eslint', 'ava:verbose']);
    grunt.registerTask('compile', ['babel']);
    grunt.registerTask('build', ['test', 'copy', 'compile', 'uglify', 'sourcemap_localize']);
};
