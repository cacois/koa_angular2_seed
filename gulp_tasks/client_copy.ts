import merge = require('merge-stream');
import {join} from 'path';
import {ENV, CLIENT_SRC, CLIENT_DEST, TMP_DIR} from './config';

export = function client_copy(gulp, plugins) {
    return function () {
        return merge(copyHtml(), copyCss());

        function copyHtml() {
            return gulp
                .src(join(CLIENT_SRC, '**/*.html'))
                .pipe(ENV === 'dev' ? gulp.dest(CLIENT_DEST) : gulp.dest(TMP_DIR));
        }

        function copyCss() {
            return gulp
                .src(join(CLIENT_SRC, '**/*.css'))
                .pipe(ENV === 'dev' ? gulp.dest(CLIENT_DEST) : gulp.dest(TMP_DIR));
        }
    };
};
