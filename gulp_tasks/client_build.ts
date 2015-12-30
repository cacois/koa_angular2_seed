import {join} from 'path';
import util = require('gulp-util');
var Builder = require('systemjs-builder');
var path = require('path');
var async = require('async');
import {ENV, SYSTEM_CONFIG_BUILDER, CLIENT_SRC, CLIENT_DEST, CLIENT_LIB_DEST} from './config';

const BUNDLE_OPTS = {
    minify: ENV !== 'dev',
    sourceMaps: ENV === 'dev',
    format: 'cjs'
};

export = function client_build(gulp, plugins, option) {
    let tsProject = plugins.typescript.createProject('client/tsconfig.json', {
        typescript: require('typescript'),
        sortOutput: true
    });

    return function (done) {
        let src = [
            join(CLIENT_SRC, '**/*.ts'),
            '!' + join(CLIENT_SRC, '**/*_spec.ts')
        ];

        let result = gulp.src(src)
            .pipe(ENV === 'dev' ? plugins.sourcemaps.init() : util.noop())
            .pipe(ENV !== 'dev' ? plugins.inlineNg2Template({base: CLIENT_SRC}) : util.noop())
            .pipe(plugins.typescript(tsProject));

        result.js
            .pipe(ENV === 'dev' ? plugins.sourcemaps.write('.') : util.noop())
            .pipe(gulp.dest(CLIENT_DEST))
            .on('end', function () {
                if (ENV === 'dev') {
                    done();
                } else {
                    let builder = new Builder(SYSTEM_CONFIG_BUILDER);

                    async.parallel([bundleApp], () => done());

                    function bundleApp(done) {
                        builder.bundle(
                            'bootstrap - angular2/*',
                            path.join(CLIENT_LIB_DEST, 'app.js'), BUNDLE_OPTS).then(done);
                    }
                }
            });
    };
}
