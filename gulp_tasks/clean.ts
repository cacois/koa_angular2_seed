import util = require('gulp-util');
import chalk = require('chalk');
import {APP_DEST, CLIENT_CSS_SRC} from './config';

export = function clean(gulp, plugins, option) {
    return () => {
        util.log(chalk.bgBlue('Starting clean...'));
        gulp
            .src([
                APP_DEST,
                CLIENT_CSS_SRC,
            ], { read: false })
            .pipe(plugins.rimraf());
    };
};
