import 'reflect-metadata';
import util = require('gulp-util');
import chalk = require('chalk');
import {join} from 'path';
import {SERVER_DEST} from './config';

export = function server_test(gulp, plugins, option) {
    return function () {
        util.log(chalk.bgBlue('Starting server_test...'));

        process.env.NODE_ENV = 'test';

        return gulp.src([
                join(SERVER_DEST, '**/*.spec.js'),
                '!' + join(SERVER_DEST, 'public/**/*.spec.js')
            ])
            .pipe(plugins.mocha({
                timeout: 5000,
                reporter: 'spec'
            }))
            .once('error', (error) => {
                console.error(error);
                process.exit(1);
            });
    };
}
