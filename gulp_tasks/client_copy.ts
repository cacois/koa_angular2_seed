import util = require('gulp-util');
import chalk = require('chalk');
import merge = require('merge-stream');
import {join} from 'path';
import {CLIENT_SRC, CLIENT_CSS_SRC, CLIENT_DEST, CLIENT_CSS_DEST, CLIENT_FONTS_DEST,  NPM_FONTS} from './config';

export = function client_copy(gulp, plugins) {
    return function () {
        util.log(chalk.bgBlue('Starting client_copy...'));
        return merge(copyHtml(), copyCss(), copyAppCss(), copyNpmFonts());

        function copyHtml() {
            return gulp
                .src([
                    join(CLIENT_SRC, '**/*.html'),
                    join('!', CLIENT_SRC, 'index.html')
                ])
                .pipe(plugins.changed(CLIENT_DEST))
                .pipe(gulp.dest(CLIENT_DEST));
        }

        function copyCss() {
            return gulp
                .src(join(CLIENT_SRC, '**/*.css'))
                .pipe(plugins.changed(CLIENT_DEST))
                .pipe(gulp.dest(CLIENT_DEST));
        }

        function copyAppCss() {
            return gulp
                .src(join(CLIENT_CSS_SRC, '**/*.*'))
                .pipe(plugins.changed(CLIENT_CSS_DEST))
                .pipe(gulp.dest(CLIENT_CSS_DEST));
        }

        function copyNpmFonts() {
            return gulp
                .src(NPM_FONTS)
                .pipe(plugins.flatten())
                .pipe(plugins.changed(CLIENT_FONTS_DEST))
                .pipe(gulp.dest(CLIENT_FONTS_DEST));
        }
    };
};
