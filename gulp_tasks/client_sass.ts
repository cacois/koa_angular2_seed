import {join} from 'path';
import util = require('gulp-util');
import {ENV, CLIENT_SRC, CLIENT_CSS_SRC} from './config';

export = function client_sass(gulp, plugins, option) {
    return function () {
        return gulp
            .src(join(CLIENT_SRC, '**', '*.scss'))
            .pipe(ENV === 'dev' ? plugins.sourcemaps.init() : util.noop())
            .pipe(plugins.sass().on('error', plugins.sass.logError))
            .pipe(ENV === 'release' ? plugins.cssnano() : util.noop())
            .pipe(ENV === 'dev' ? plugins.sourcemaps.write(CLIENT_CSS_SRC) : util.noop())
            .pipe(plugins.flatten())
            .pipe(gulp.dest(CLIENT_CSS_SRC));
    };
}
