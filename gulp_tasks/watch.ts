var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
import {join} from 'path';

import {CLIENT_SRC, SERVER_SRC} from './config';


export = function watch(gulp, plugins) {
    return function () {
        runSequence(
            'build',
            'nodemon',
            'browser_sync');

        gulp.watch([join(CLIENT_SRC, 'index.html')], ['client_inject'])
            .on('error', function (error) {
                // silently catch 'ENOENT' error typically caused by renaming watched folders
                if (error.code === 'ENOENT') {
                    return;
                }
            });
        gulp.watch([
                join(CLIENT_SRC, '**/*.ts'),
                join(CLIENT_SRC, '**/*.css'),
                join(CLIENT_SRC, '**/*.html')], ['client_build'])
            .on('error', function (error) {
                // silently catch 'ENOENT' error typically caused by renaming watched folders
                if (error.code === 'ENOENT') {
                    return;
                }
            });
        gulp.watch(join(CLIENT_SRC, '**/*.scss'), ['client_sass'])
            .on('error', function (error) {
                // silently catch 'ENOENT' error typically caused by renaming watched folders
                if (error.code === 'ENOENT') {
                    return;
                }
            });
        gulp.watch(join(CLIENT_SRC, '**/*.css'), ['client_copy'])
            .on('error', function (error) {
                // silently catch 'ENOENT' error typically caused by renaming watched folders
                if (error.code === 'ENOENT') {
                    return;
                }
            });
        gulp.watch(join(SERVER_SRC, '**/*.ts'), ['server_build'])
            .on('error', function (error) {
                // silently catch 'ENOENT' error typically caused by renaming watched folders
                if (error.code === 'ENOENT') {
                    return;
                }
            });
        //gulp.watch([join(APP_DEST, '**/*.*')], reload)
        //    .on('error', function (error) {
        //        // silently catch 'ENOENT' error typically caused by renaming watched folders
        //        if (error.code === 'ENOENT') {
        //            return;
        //        }
        //    });
    };
};
