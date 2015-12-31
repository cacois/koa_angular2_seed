import util = require('gulp-util');
import chalk = require('chalk');
var runSequence = require('run-sequence');

export = function tsd(gulp, plugins) {
    return function () {
        util.log(chalk.bgBlue('Starting tsd...'));
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
