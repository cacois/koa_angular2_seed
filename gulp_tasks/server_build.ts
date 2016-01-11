import util = require('gulp-util');
import chalk = require('chalk');
import {join} from 'path';
import {ENV, SERVER_SRC, SERVER_DEST} from './config';

export = function server_build(gulp, plugins, option) {
    let tsProject = plugins.typescript.createProject('server/tsconfig.json', {
        typescript: require('typescript'),
        sortOutput: true
    });

    return function () {
        util.log(chalk.bgBlue('Starting server_build...'));
        let src = [
            join(SERVER_SRC, '**/*.ts')
        ];
        if(ENV !== 'dev') {
            src.push('!' + join(SERVER_SRC, '**/*.spec.ts'));
        }

        let result = gulp.src(src)
            .pipe(ENV === 'dev' ? plugins.sourcemaps.init() : util.noop())
            .pipe(plugins.typescript(tsProject));

        return result.js
            .pipe(ENV === 'dev' ? plugins.sourcemaps.write('.') : util.noop())
            .pipe(gulp.dest(SERVER_DEST));
    };
}
