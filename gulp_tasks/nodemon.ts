var _nodemon = require('nodemon');
import util = require('gulp-util');
import chalk = require('chalk');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

import { NODEMON_SCRIPT} from './config';

export = function nodemon(gulp, plugins) {
    return function (cb) {
        util.log(chalk.green('Starting Nodemon...'));
        var called = false;
        return _nodemon({
            script: NODEMON_SCRIPT
        })
            .on('start', function () {
                if (!called) {
                    called = true;
                    cb();
                }
            })
            .on('restart', function () {
                setTimeout(function () {
                    reload({stream: false});
                }, 1000);
            });
    };
};
