var runSequence = require('run-sequence');
import {join} from 'path';

import {ENV, CLIENT_SRC, SERVER_SRC} from './config';


export = function watch(gulp, plugins) {
    return function () {
        process.env.NODE_ENV = ENV;
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
                join(CLIENT_SRC, '**/*.css'),
                join(CLIENT_SRC, '**/*.html')], ['client_copy'])
            .on('error', function (error) {
                // silently catch 'ENOENT' error typically caused by renaming watched folders
                if (error.code === 'ENOENT') {
                    return;
                }
            });
        gulp.watch([
                join(CLIENT_SRC, '**/*.ts')], ['client_build'])
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
        gulp.watch([
                join(SERVER_SRC, '**/*.ts'),
                join(SERVER_SRC, 'config.json')
            ], ['server_build'])
            .on('error', function (error) {
                // silently catch 'ENOENT' error typically caused by renaming watched folders
                if (error.code === 'ENOENT') {
                    return;
                }
            });
    };
};
