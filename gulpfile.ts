import gulp = require('gulp');
import gulpLoadPlugins = require('gulp-load-plugins');
var runSequence = require('run-sequence');
import chalk = require('chalk');
import util = require('gulp-util');
import path = require('path');
import {GULP_TASKS_SRC} from "./gulp_tasks/config";

gulp.task('clean', [], task('clean'));
gulp.task('tsd', [], task('tsd'));
gulp.task('tslint', [], task('tslint'));
gulp.task('client_sass', [], task('client_sass'));
gulp.task('client_deps', [], task('client_deps'));
gulp.task('client_copy', [], task('client_copy'));
gulp.task('client_build', [], task('client_build'));
gulp.task('client_post_build', [], task('client_post_build'));
gulp.task('client_inject', [], task('client_inject'));
gulp.task('server_copy', [], task('server_copy'));
gulp.task('server_build', ['server_copy'], task('server_build'));
gulp.task('nodemon', [], task('nodemon'));
gulp.task('browser_sync', [], task('browser_sync'));
gulp.task('watch', [], task('watch'));

gulp.task('client:build', function(cb) {
    runSequence(
        'clean',
        'tslint',
        'client_sass',
        'client_deps',
        'client_copy',
        'client_build',
        'client_post_build',
        'client_inject',
        cb
    );
});

gulp.task('server:build', function(cb) {
    runSequence(
        'clean',
        'tslint',
        'server_build',
        cb
    );
});

gulp.task('build', function(cb) {
    runSequence(
        'clean',
        'tslint',
        'client_sass',
        'client_deps',
        'client_copy',
        'client_build',
        'client_post_build',
        'client_inject',
        'server_build',
        cb
    );
});

function task(taskname: string, option?: string) {
    util.log(
        'Loading task',
        chalk.yellow(taskname, option || ''),
        chalk.red(GULP_TASKS_SRC + taskname));

    return require(GULP_TASKS_SRC + taskname)(gulp, gulpLoadPlugins(), option);
}

