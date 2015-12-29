var async = require('async');
var path = require('path');
var Builder = require('systemjs-builder');
import {CLIENT_JS_DEST, SYSTEM_CONFIG_BUILDER} from './config';

const BUNDLE_OPTS = {
    minify: true,
    sourceMaps: true,
    format: 'cjs'
};

export = function client_bundle(gulp, plugins) {
    return function (done) {
        let builder = new Builder(SYSTEM_CONFIG_BUILDER);

        async.parallel([bundleApp], () => done());

        function bundleApp(done) {
            builder.bundle(
                'bootstrap - angular2/*',
                path.join(CLIENT_JS_DEST, 'app.js'), BUNDLE_OPTS).then(done);
        }
    };
};
