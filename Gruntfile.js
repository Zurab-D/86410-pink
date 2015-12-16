"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  var config = {
    pkg: grunt.file.readJSON("package.json"),

    sass: {
      style: {
        files: {
          "src/css/style.css": "src/sass/style.scss"
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require("autoprefixer")({browsers: "last 2 versions"})
        ]
      },
      style: {
        src: "src/css/*.css"
      }
    },

    clean: {
      build: ["build"],
      watch_html: ["build/*.html"]
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "src",
          src: [
            "css/*.css",
            "fonts/**",
            "img/**",
            "js/*.js",
            "*.html",
            "!**/README"
          ],
          dest: "build"
        }]
      },

      watch_html: {
        files: [{
          expand: true,
          cwd: "src",
          src: ["*.html"],
          dest: "build"
        }]
      }
    },

    cmq: {
      style: {
        files: {
          "src/css/style.css": ["src/css/style.css"]
        }
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: 0,
        report: "gzip"
      },
      target: {
        files: {
          "src/css/style.min.css": ["src/css/style.css"]
        }
      }
    },

    concat: {
      main: {
        src: [
          "node_modules/mustache/mustache.min.js",
          "node_modules/moment/min/moment-with-locales.min.js",
          "src/js/script.js",
        ],
        dest: "src/js/script.con"
      }
    },

    uglify: {
      main: {
        files: {
          "src/js/script.min.js": ["src/js/script.con"]
        }
      }
    },

    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: "build",
          src: ["**/*.{png,jpg,gif,svg}"],
          dest: "build"
          //src: ["build/img/**/*.{png,jpg,gif,svg}"],
          //dest: "/"
        }]
      }
    },

    watch: {
      style: {
        files: ["src/sass/**/*.scss", "src/sass/*.scss"],
        tasks: ["sass", "postcss", "cmq", "cssmin"],
        options: {
          spawn: false,
          livereload: true
        }
      },

      script: {
        files: ["src/js/**/*.js"],
        tasks: ["concat", "uglify"],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
  };

  grunt.registerTask("build", [
    "clean",
    "sass",
    "postcss",
    "cmq",
    "cssmin",
    "concat",
    "uglify",
    "copy",
    "imagemin"
  ]);




  // Не редактируйте эту строку
  config = require("./.gosha")(grunt, config);

  grunt.initConfig(config);
};
