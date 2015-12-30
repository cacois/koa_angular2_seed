var runSequence = require('run-sequence');

export = function tsd(gulp, plugins) {
    return function () {
        gulp.task('tsd:gulp', plugins.shell.task([
            'tsd reinstall --clean',
            'tsd link',
            'tsd rebundle'
        ]));

        gulp.task('tsd:client', plugins.shell.task([
            'tsd reinstall --clean',
            'tsd link',
            'tsd rebundle'
        ], {cwd: 'client'}));

        gulp.task('tsd:server', plugins.shell.task([
            'tsd reinstall --clean',
            'tsd link',
            'tsd rebundle'
        ], {cwd: 'server'}));

        runSequence('tsd:gulp', 'tsd:client', 'tsd:server');
    };
};
