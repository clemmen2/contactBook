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
                files: [
                    { expand: true, src: 'index.html', dest: 'dist/' },
                    { expand: true, src: 'index.html', dest: 'src/' }
                ]
            },
            templ: {
                files: [
                    { expand: true, src: 'templ/*.html', dest: 'dist/' },
                    { expand: true, src: 'templ/*.html', dest: 'src/' }
                ]
            },
            app: { expand: true, src: 'app/**', dest: 'src/' },
            styles: { expand: true, src: 'styles/*.css', dest: 'src/' },
            bower: {
                files: [
                    { expand: true, src: 'bower_components/bootstrap/dist/css/bootstrap.min.css', dest: 'src/' },
                    { expand: true, src: 'bower_components/bootstrap/dist/css/bootstrap-theme.min.css', dest: 'src/' },
                    { expand: true, src: 'bower_components/jquery/dist/jquery.min.js', dest: 'src/' },
                    { expand: true, src: 'bower_components/bootstrap/dist/js/bootstrap.min.js', dest: 'src/' },
                    { expand: true, src: 'bower_components/angular/angular.min.js', dest: 'src/' },
                    { expand: true, src: 'bower_components/angular-route/angular-route.min.js', dest: 'src/' },
                    { expand: true, src: 'bower_components/angular-messages/angular-messages.min.js', dest: 'src/' },
                    { expand: true, src: 'bower_components/angular-ui-scrollpoint/dist/scrollpoint.min.js', dest: 'src/' }
                ]
            }
        },
        compress: {
            main: {
                options: {
                    archive:'acsChallenge_William_Dixon.zip'
                },
                files: [
                    { expand: true, src: 'src/**', dest: '.' },
                    { expand: true, src: 'dist/**', dest: '.' }
                ]
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
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.registerTask('default', ['jshint:src']);
    grunt.registerTask('build', ['copy', 'jshint:src', 'useminPrepare', 'concat:generated', 'uglify:generated', 'cssmin:generated', 'usemin', 'compress']);
};