module.exports = function gruntConfig(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        eslint: {
            options: {
                configFile: '.eslintrc',
            },
            target: ['VerbalExpressions.js'],
        },

        qunit: {
            files: ['test/index.html'],
        },

        copy: {
            build: {
                src: '<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.js',
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
                    'dist/<%= pkg.name %>.min.js': ['<%= pkg.name %>.js'],
                },
            },
        },

        sourcemap_localize: {
            options: {
                localize_to: '..',
            },
            build: {
                files: {
                    src: ['dist/*.min.map'],
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-sourcemap-localize');

    grunt.registerTask('test', ['eslint', 'qunit']);
    grunt.registerTask('default', ['qunit']);
    grunt.registerTask('build', ['qunit', 'copy', 'uglify', 'sourcemap_localize']);
};
