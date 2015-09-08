module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['./js/**/*.js']
    },
    sass: {
      dist: {
        files: {
          '../styles/main.css': '../sass/main.scss'
        }
      }
    },
    watch: {
      js: {
        files: ['../js/**/*.js'],
        tasks: ['jshint']
      },
			sassy: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
    }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'sass', 'watch']);
};