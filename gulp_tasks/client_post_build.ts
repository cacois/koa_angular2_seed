import util = require('gulp-util');
import chalk = require('chalk');
import {ENV, CLIENT_POST_BUILD_CLEANUP} from './config';

export = function client_post_build(gulp, plugins, option) {
    return () => {
        util.log(chalk.bgBlue('Starting client_post_build...'));
        if(ENV !== 'dev') {
            gulp
                .src(CLIENT_POST_BUILD_CLEANUP, {read: false})
                .pipe(plugins.rimraf());
        }
    };
};
