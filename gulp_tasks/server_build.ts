import {join} from 'path';
import {SERVER_SRC, SERVER_DEST} from './config';

export = function server_build(gulp, plugins, option) {
    let tsProject = plugins.typescript.createProject('tsconfig.server.json', {
        typescript: require('typescript')
    });

    return function () {
        let src = [
            join(SERVER_SRC, '**/*.ts')
        ];

        let result = gulp.src(src)
            .pipe(plugins.typescript(tsProject));

        return result.js
            .pipe(gulp.dest(SERVER_DEST));
    };
}
