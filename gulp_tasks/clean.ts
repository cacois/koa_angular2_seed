import {TMP_DIR, APP_DEST, CLIENT_CSS_SRC} from './config';

export = function clean(gulp, plugins, option) {
    return () => {
        gulp
            .src([TMP_DIR, APP_DEST, CLIENT_CSS_SRC], { read: false })
            .pipe(plugins.rimraf());
    };
};
