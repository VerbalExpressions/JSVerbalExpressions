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
            options: {
                nyc: true,
            },

            verbose: {
                test: ['test/tests.js'],
                options: {
                    verbose: true,
                    nyc: true,
                },
            },
        },

        babel: {
            options: {
                sourceMap: true,
                presets: [['@babel/preset-env', { modules: false }]],
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

        umd: {
            all: {
                options: {
                    src: 'dist/verbalexpressions.js',
                    objectToExport: 'VerEx',
                    amdModuleId: 'VerEx',
                    globalAlias: 'VerEx',
                },
            },
        },

        uglify: {
            options: {
                banner:
                    '/*!\n' +
                    '* <%= pkg.name %> JavaScript Library v<%= pkg.version %>\n' +
                    '* <%= pkg.homepage %>\n' +
                    '*\n' +
                    '* Released under the <%= pkg.license %> license\n' +
                    '*/\n',
                sourceMap: true,
            },
            dist: {
                files: {
                    'dist/verbalexpressions.min.js': [
                        'dist/verbalexpressions.js',
                    ],
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

        markdownlint: {
            options: {
                config: grunt.file.readJSON('.mdlintrc.json'),
            },
            src: ['README.md', 'docs/*.md', 'docs/VerbalExpression/*.md'],
        },
    });

    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-ava');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-umd');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sourcemap-localize');
    grunt.loadNpmTasks('grunt-markdownlint');

    grunt.registerTask('default', ['test']);
    grunt.registerTask('test', [
        'compile',
        'eslint',
        'markdownlint',
        'ava:test',
    ]);
    grunt.registerTask('test:verbose', ['compile', 'eslint', 'ava:verbose']);
    grunt.registerTask('compile', ['babel', 'umd:all']);
    grunt.registerTask('build', [
        'compile',
        'ava:test',
        'uglify',
        'sourcemap_localize',
    ]);
};
