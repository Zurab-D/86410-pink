"use strict";

module.exports = {
  copy: {
    gosha: {
      files: [{
        expand: true,
        src: [
          "src/*.html",
          "src/css/**",
          "src/img/**",
          "src/js/**"
        ],
        dest: "gosha",
      }]
    }
  },

  clean: {
    gosha: [
      "gosha/img/README",
      "gosha/js/README",
      "gosha/css/README"
    ]
  },

  lintspaces: {
    codestyle: {
      src: [
        "src/*.html",
        "src/js/*.js",
        "src/less/*.less",
        "src/sass/*.sass",
        "src/sass/*.scss"
      ],
      options: {
        editorconfig: ".editorconfig"
      }
    }
  }
};
