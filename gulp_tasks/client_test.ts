import util = require('gulp-util');
import chalk = require('chalk');
import {join} from 'path';
import {CLIENT_DEST} from './config';

export = function server_test(gulp, plugins, option) {
    return function () {
        util.log(chalk.bgBlue('Starting client_test...'));

        process.env.NODE_ENV = 'test';

        return gulp.src([
                join(CLIENT_DEST, '**/*.spec.js')
            ])
            .pipe(plugins.debug())
            .pipe(plugins.mochaCo({
                reporter: 'spec'
            }))
            .once('end', function () {
                process.exit();
            });
    };
}
