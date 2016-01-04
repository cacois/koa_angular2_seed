import util = require('gulp-util');
import chalk = require('chalk');
import {join} from 'path';
import {SERVER_SRC, SERVER_DEST} from './config';

export = function server_copy(gulp, plugins) {
    return function () {
        util.log(chalk.bgBlue('Starting server_copy...'));

        return gulp
            .src([
                join(SERVER_SRC, 'config.json'),
            ])
            .pipe(plugins.changed(SERVER_DEST))
            .pipe(gulp.dest(SERVER_DEST));
    };
};
