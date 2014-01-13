module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        qunit: {
            files: ['test/index.html']
        },

        uglify: {
            options: {
                banner: '/*!\n' +
                        '* <%= pkg.name %> JavaScript Library v<%= pkg.version %>\n' +
                        '* <%= pkg.homepage %>\n' +
                        '*\n' +
                        '*\n' +
                        '* Released under the MIT license\n' +
                        '* http://jquery.org/license\n' +
                        '*\n' +
                        '* Date: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                        '*\n' +
                        '*/\n'
            },
            dist: {
                files: {'dist/<%= pkg.name %>.min.js' : ['<%= pkg.name %>.js']}
            }
        }
    });

	grunt.loadNpmTasks("grunt-contrib-qunit");
  grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.registerTask('test', 'qunit');
    grunt.registerTask('default', ['qunit']);
    grunt.registerTask('build', 'uglify');
};
