module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        stylus: {
            options: {
                'compress': false,
                'include css': true
            },
            compile: {
                files: {
                  'html/master.css': 'app/_styles/master.styl',
                }
            }
        },
        concat: {
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/hammerjs/hammer.js',
                    'bower_components/jquery.hammer.js/jquery.hammer.js',
                    'bower_components/velocity/velocity.js',
                    'bower_components/velocity/velocity.ui.js',
                    'craft/plugins/charge/resources/js/stripe_v2.min.js',
                    'craft/plugins/charge/resources/js/jquery.charge.js',
                    'app/_scripts/main.js'
                ],
                dest: 'assets/master.js',
            }
        },
        watch: {
            scripts: {
                files: ['app/_scripts/*.js', 'Gruntfile.js', 'app/_styles/*.styl'],
                tasks: ['concat', 'stylus'],
                options: {
                    spawn: false
                },
            }
        },
        // browserSync: {
        //     dev: {
        //         bsFiles: {
        //             src : 'html/_css/*.css'                },
        //         options: {
        //             watchTask: true,
        //             proxy: 'http://localhost:8888/wewantrest/html',
        //             startPath: 'wewantrest/html/',
        //         }
        //     }
        // }


    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-stylus');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'stylus', 'watch' ]);

};
