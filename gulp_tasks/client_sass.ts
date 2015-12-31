import util = require('gulp-util');
import chalk = require('chalk');
import {join} from 'path';
import {ENV, CLIENT_SRC, CLIENT_CSS_SRC} from './config';

export = function client_sass(gulp, plugins, option) {
    return function () {
        util.log(chalk.bgBlue('Starting client_sass...'));
        return gulp
            .src(join(CLIENT_SRC, '**', '*.scss'))
            .pipe(ENV === 'dev' ? plugins.sourcemaps.init() : util.noop())
            .pipe(plugins.sass().on('error', plugins.sass.logError))
            .pipe(ENV === 'release' ? plugins.cssnano() : util.noop())
            .pipe(ENV === 'dev' ? plugins.sourcemaps.write('.') : util.noop())
            .pipe(plugins.flatten())
            .pipe(gulp.dest(CLIENT_CSS_SRC));
    };
}
