import merge = require('merge-stream');
import {CLIENT_LIB_DEST, NPM_DEPENDENCIES} from './config';

export = function client_deps(gulp, plugins) {
    return function () {
        let stream = merge();

        NPM_DEPENDENCIES.forEach(dep => {
            stream.add(addStream(dep));
        });

        return stream;

        function addStream(dep) {
            let stream = gulp.src(dep.src);
            stream.pipe(gulp.dest(CLIENT_LIB_DEST));
            return stream;
        }
    };
};
