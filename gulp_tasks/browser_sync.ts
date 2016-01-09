import util = require('gulp-util');
import chalk = require('chalk');
var browserSync = require('browser-sync');
import {join} from 'path';

import {APP_DEST} from './config';

export = function browser_sync(gulp, plugins) {
    return function () {
        util.log(chalk.green('Starting BrowserSync...'));
        browserSync({
            proxy: 'localhost:8000',
            port: 8080,
            notify: true,
            ws: true,
            files: [join(APP_DEST, '**/*.*')]
        });
    };
};
