import merge = require('merge-stream');
import {join} from 'path';
import {CLIENT_SRC, CLIENT_CSS_SRC, CLIENT_DEST, CLIENT_CSS_DEST, CLIENT_FONTS_DEST,  NPM_FONTS} from './config';

export = function client_copy(gulp, plugins) {
    return function () {
        return merge(copyHtml(), copyCss(), copyAppCss(), copyNpmFonts());

        function copyHtml() {
            return gulp
                .src(join(CLIENT_SRC, '**/*.html'))
                .pipe(gulp.dest(CLIENT_DEST));
        }

        function copyCss() {
            return gulp
                .src(join(CLIENT_SRC, '**/*.css'))
                .pipe(gulp.dest(CLIENT_DEST));
        }

        function copyAppCss() {
            return gulp
                .src(join(CLIENT_CSS_SRC, '**/*.css'))
                .pipe(gulp.dest(CLIENT_CSS_DEST));
        }

        function copyNpmFonts() {
            return gulp
                .src(NPM_FONTS)
                .pipe(plugins.flatten())
                .pipe(gulp.dest(CLIENT_FONTS_DEST));
        }
    };
};
