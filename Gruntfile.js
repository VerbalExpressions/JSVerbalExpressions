module.exports = function gruntConfig(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        eslint: {
            options: {
                configFile: '.eslintrc',
            },
            target: ['VerbalExpressions.js', 'test/tests.js'],
        },

        qunit: {
            files: ['test/index.html'],
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
                    'dist/verbalexpressions.min.js': ['<%= pkg.main %>'],
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
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-sourcemap-localize');

    grunt.registerTask('test', ['eslint', 'qunit']);
    grunt.registerTask('default', ['qunit']);
    grunt.registerTask('build', ['test', 'copy', 'uglify', 'sourcemap_localize', 'jsdoc:dist']);
    grunt.registerTask('docs', ['test', 'jsdoc:src']);
};
