module.exports = function(grunt) {

    grunt.initConfig({
        // Copy files in dist/
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

        // Compile css files
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

        // Compile js files
        uglify: {
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

        // Inject files (js and css) into index.html
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

        // Compile html files
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

    grunt.registerTask('compile', [
        'copy',
        'cssmin',
        'uglify',
        'htmlmin',
        'processhtml'
    ]);

};
