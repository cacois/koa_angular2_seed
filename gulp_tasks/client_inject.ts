import path = require('path');
import {CLIENT_SRC, CLIENT_DEST, CLIENT_CSS_DEST, NPM_DEPENDENCIES, templateLocals} from './config';

export = function client_inject(gulp, plugins, option) {
    return () => {
        return gulp.src(path.join(CLIENT_SRC, 'index.html'))
            .pipe(inject('shims'))
            .pipe(inject('libs'))
            .pipe(injectAppCss())
            .pipe(plugins.template(templateLocals()))
            .pipe(gulp.dest(CLIENT_DEST));
    };

    function inject(name?: string) {
        return plugins.inject(gulp.src(getInjectablesDependenciesRef(name), { read: false }), {
            name,
            transform: function(filepath) {
                filepath = filepath.replace(/^.*[\\\/]/, '');
                return '<script type="application/javascript" src="lib/'+ filepath +'"></script>';
            }
        });
    }

    function getInjectablesDependenciesRef(name?: string) {
        return NPM_DEPENDENCIES
            .filter(dep => dep['inject'] && dep['inject'] === (name || true))
            .map(dep => { return dep.src; });
    }

    function injectAppCss() {
        return plugins.inject(gulp.src([path.join(CLIENT_CSS_DEST, '*.css')], { read: false }), {
            transform: function(filepath) {
                filepath = filepath.replace(/^.*[\\\/]/, '');
                return '<link rel="stylesheet" type="text/css" href="css/'+ filepath +'">';
            }
        });
    }
};
