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
                        'scripts/**/*.js',
                        'backend/*.php',
                        'bower_components/jquery/dist/*.min.js',
                        'bower_components/angular/*.min.js',
                        'bower_components/angular-route/*.min.js',
                        'bower_components/components-font-awesome/**.*',
                        'bower_components/components-font-awesome/fonts/**.*'
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
            options: {
                mangle: false,
                report: 'gzip'
            },
            target : {
                files : [{
                    expand: true,
                    cwd : 'dist/scripts/',
                    src: ['controller/*.js', 'app.js'],
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
                    src: ['index.html', 'views/{,*/}*.html'],
                    dest: 'dist/'
                }]
            }
        },

        imagemin: {
            options: {
                optimizationLevel: 3,
            },
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'dist/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/images/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('compile:inject', [
        'copy',
        'imagemin',
        'cssmin',
        'uglify',
        'processhtml',
        'htmlmin'
    ]);

    grunt.registerTask('compile', [
        'copy',
        'imagemin',
        'cssmin',
        'uglify',
        'htmlmin'
    ]);

};
