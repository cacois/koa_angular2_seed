import merge = require('merge-stream');
import {ENV, TMP_DIR, CLIENT_LIB_DEST, NPM_DEPENDENCIES} from './config';

export = function client_deps(gulp, plugins) {
    return function () {
        let stream = merge();

        NPM_DEPENDENCIES.forEach(dep => {
            stream.add(addStream(dep));
        });

        return stream;

        function addStream(dep) {
            let stream = gulp.src(dep.src);
            stream.pipe(ENV === 'dev' ? gulp.dest(CLIENT_LIB_DEST) : gulp.dest(TMP_DIR));
            return stream;
        }
    };
};
