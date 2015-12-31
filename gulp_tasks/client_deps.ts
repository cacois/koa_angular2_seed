import util = require('gulp-util');
import chalk = require('chalk');
import merge = require('merge-stream');
import {CLIENT_LIB_DEST, NPM_DEPENDENCIES} from './config';

export = function client_deps(gulp, plugins) {
    return function () {
        util.log(chalk.bgBlue('Starting client_deps...'));
        let stream = merge();

        NPM_DEPENDENCIES.forEach(dep => {
            stream.add(addStream(dep));
        });

        return stream;

        function addStream(dep) {
            let stream = gulp
                .src(dep.src)
                .pipe(plugins.changed(CLIENT_LIB_DEST))
                .pipe(gulp.dest(CLIENT_LIB_DEST));
            return stream;
        }
    };
};
