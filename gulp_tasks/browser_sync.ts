import util = require('gulp-util');
import chalk = require('chalk');
var browserSync = require('browser-sync');

export = function browser_sync(gulp, plugins) {
    return function () {
        util.log(chalk.green('Starting BrowserSync...'));
        browserSync({
            proxy: 'localhost:8000',
            port: 8080,
            notify: true
        });
    };
};
