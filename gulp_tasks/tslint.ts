import {join} from 'path';
import {GULP_TASKS_SRC, CLIENT_SRC, SERVER_SRC} from './config';

export = function tslint(gulp, plugins) {
    return function () {
        let src = [
            join(GULP_TASKS_SRC, '**/*.ts'),
            '!' + join(GULP_TASKS_SRC, '**/*.d.ts'),
            join(CLIENT_SRC, '**/*.ts'),
            '!' + join(CLIENT_SRC, '**/*.d.ts'),
            join(SERVER_SRC, '**/*.ts'),
            '!' + join(SERVER_SRC, '**/*.d.ts')
        ];

        return gulp.src(src)
            .pipe(plugins.tslint())
            .pipe(plugins.tslint.report(plugins.tslintStylish, {
                emitError: false,
                sort: true,
                bell: true
            }));
    };
};
