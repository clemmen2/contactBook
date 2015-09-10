/// <binding Clean='clean' />
module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            src: {
                files: {
                    src: ['app/**']
                }
            }
        },
        copy:{
            html: {
                expand: true,
                src: 'index.html',
                dest: 'dist/'
            },
            templ: {
                expand: true,
                src: 'templ/*.html',
                dest: 'dist/'
            }
        },
        useminPrepare: {
            html: 'index.html',
            options: {
                dest: 'dist'
            }
        },
        usemin: {
            html: 'dist/index.html'
        },
        clean: {
            dist: ['dist']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.registerTask('default', ['jshint:src']);
    grunt.registerTask('build', ['copy', 'jshint:src', 'useminPrepare', 'concat:generated', 'uglify:generated', 'cssmin:generated', 'usemin']);
};