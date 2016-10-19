var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    exec = require('child_process').exec,
    chalk = require('chalk');

gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        },
        port: 3000
    });
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("app/public/partials/*.html").on('change', browserSync.reload);
    gulp.watch("app/public/*.js").on('change', browserSync.reload);
    gulp.watch("app/public/controllers/*.js").on('change', browserSync.reload);
    gulp.watch("app/public/directives/*.js").on('change', browserSync.reload);
    gulp.watch("app/public/services/*.js").on('change', browserSync.reload);
    gulp.watch("app/css/*.css").on('change', browserSync.reload);
});

gulp.task('default', ['watch'], function() {
  exec("whoami", function(error, result) {
        console.log(chalk.bgGreen('Welcome to')+chalk.bold.bgGreen(' **Welcome To Tuga Application**')+chalk.bold.green(' - CLIENT'));
        console.log(chalk.bgBlue('Have a great day!')+' '+chalk.bold.yellow(result.toUpperCase()));
  });
});
