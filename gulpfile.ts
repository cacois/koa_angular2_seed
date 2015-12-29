import gulp = require('gulp');
import gulpLoadPlugins = require('gulp-load-plugins');
var runSequence = require('run-sequence');
import chalk = require('chalk');
import util = require('gulp-util');
import path = require('path');
import {GULP_TASKS_SRC} from "./gulp_tasks/config";

gulp.task('clean', [], task('clean'));
gulp.task('client_sass', [], task('client_sass'));
gulp.task('client_deps', [], task('client_deps'));
gulp.task('client_build', [], task('client_build'));
gulp.task('client_bundle', [], task('client_bundle'));
gulp.task('client_copy', [], task('client_copy'));
gulp.task('client_inject', [], task('client_inject'));
gulp.task('client_node_modules', [], task('client_node_modules'));
gulp.task('client_release', [], task('client_release'));
gulp.task('tsd', [], task('tsd'));
gulp.task('tslint', [], task('tslint'));

gulp.task('client:build', function(cb) {
    runSequence(
        'client_sass',
        'tslint',
        'client_deps',
        'client_copy',
        'client_build',
        'client_bundle',
        'client_inject',
        'client_node_modules',
        'client_release'
    );
});

function task(taskname: string, option?: string) {
    util.log(
        'Loading task',
        chalk.yellow(taskname, option || ''),
        chalk.red(GULP_TASKS_SRC + taskname));

    return require(GULP_TASKS_SRC + taskname)(gulp, gulpLoadPlugins(), option);
}
