import util = require('gulp-util');
import {join} from 'path';
import {ENV, SERVER_SRC, SERVER_DEST} from './config';

export = function server_build(gulp, plugins, option) {
    let tsProject = plugins.typescript.createProject('server/tsconfig.json', {
        typescript: require('typescript'),
        sortOutput: true
    });

    return function () {
        let src = [
            join(SERVER_SRC, '**/*.ts')
        ];

        let result = gulp.src(src)
            .pipe(ENV === 'dev' ? plugins.sourcemaps.init() : util.noop())
            .pipe(plugins.typescript(tsProject));

        return result.js
            .pipe(ENV === 'dev' ? plugins.sourcemaps.write('.') : util.noop())
            .pipe(gulp.dest(SERVER_DEST));
    };
}
