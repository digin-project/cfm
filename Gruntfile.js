module.exports = function(grunt) {

    grunt.initConfig({
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    dest: 'dist/',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'views/{,*/}*.html',
                        'images/{,*/}*.*',
                        'fonts/**/*.*',
                        'json/**/*.json',
                        'css/**/*.css',
                        'scripts/**/*.js'
                    ]
                }]
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/css/',
                    src: ['*.css'],
                    dest: 'dist/css/',
                    ext: '.css'
                }]
            }
        },

        uglify: {
            // dist: {
            //     files: {
            //         'dist/app.min.js': ['dist/scripts/controller/IndexCtrl.js']
            //     }
            // }
            target : {
                files : [{
                    expand: true,
                    cwd : 'dist/scripts/',
                    src: ['**/*.js'],
                    dest: 'dist/scripts/',
                    ext: '.js'
                }]
            }
        },

        processhtml: {
            options: {
                process: true,
                data: {
                    message: 'Hello world!'
                }
            },
            dist: {
                files: {
                    'dist/index.html': ['dist/index.html']
                }
            }
        },

        htmlmin : {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['!index.html', 'views/{,*/}*.html'],
                    dest: 'dist/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', [
        'copy',
        'cssmin',
        'uglify',
        'htmlmin',
        'processhtml'
    ]);

};
