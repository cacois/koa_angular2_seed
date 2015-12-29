import {join} from 'path';
import util = require('gulp-util');
import {ENV, TMP_DIR, CLIENT_SRC, CLIENT_DEST} from './config';

export = function client_build(gulp, plugins, option) {
    let tsProject = plugins.typescript.createProject('tsconfig.client.json', {
        typescript: require('typescript')
    });

    return function () {
        let src = [
            join(CLIENT_SRC, '**/*.ts'),
            '!' + join(CLIENT_SRC, '**/*_spec.ts')
        ];

        let result = gulp.src(src)
            .pipe(plugins.inlineNg2Template({base: ENV === 'dev' ? CLIENT_SRC : TMP_DIR}))
            .pipe(ENV === 'dev' ? plugins.sourcemaps.init() : util.noop())
            .pipe(plugins.typescript(tsProject));

        return result.js
            .pipe(ENV === 'dev' ? plugins.sourcemaps.write('.') : util.noop())
            .pipe(gulp.dest(ENV === 'dev' ? CLIENT_DEST : TMP_DIR));
    };
}
