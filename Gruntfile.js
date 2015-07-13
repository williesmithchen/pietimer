"use strict";
module.exports = function(grunt) {
  [
    'grunt-contrib-watch',
    'grunt-contrib-jshint',
    'grunt-contrib-uglify'
  ].forEach(function(task){
    grunt.loadNpmTasks(task);
  });

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      build: {
        files: {
          src: [
            'Gruntfile.js',
            '<%= pkg.main %>'
          ],
          extDot: 'last'
        }
      }
    },

    uglify: {
      options: {
        banner: "<%= pkg.licenseDescription %>",
        sourceMap: true,
        report: 'gzip'
      },
      build: {
        files: [{
          expand: true,
          cwd: '',
          src: ['<%= pkg.main %>', '!<%= pkg.name %>.min.js'],
          extDot: 'last',
          dest: '',
          ext: '.min.js'
        }]
      }
    },

    watch: {
      options: {
        livereload: true,
        dateFormat: function(time) {
          grunt.log.writeln('The watch finished in ' + time + 'ms at ' + grunt.template.today("yyyy-mm-dd TT hh:MM:ss"));
          grunt.log.writeln('Waiting for more changes...');
        },
        spawn: false
      },
      js: {
        files: ['<%= pkg.main %>', '!<%= pkg.name %>.min.js'],
        tasks: ['jshint','uglify']
      }
    }

  });

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('listen', ['watch']);
};
