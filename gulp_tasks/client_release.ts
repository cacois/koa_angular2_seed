import util = require('gulp-util');
import {join} from 'path';
import {ENV, TMP_SRC, CLIENT_DEST} from './config';

export = function client_release(gulp, plugins) {
    return function () {
        return gulp
            .src(TMP_SRC, {read: false})
            .pipe(ENV === 'dev' ? util.noop() : gulp.dest(CLIENT_DEST));
    };
};

