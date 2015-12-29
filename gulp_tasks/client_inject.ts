import path = require('path');
import {ENV, CLIENT_DEST, CLIENT_CSS_DEST, TMP_DIR, NPM_DEPENDENCIES, templateLocals} from './config';

export = function client_inject(gulp, plugins, option) {
    return () => {
        let indexPath =
            ENV === 'dev' ?
                path.join(CLIENT_DEST, 'index.html') :
                path.join(TMP_DIR, 'index.html');
        return gulp.src(indexPath)
            .pipe(inject('shims'))
            .pipe(inject('libs'))
            .pipe(injectAppCss())
            .pipe(plugins.template(templateLocals()))
            .pipe(gulp.dest(ENV === 'dev' ? CLIENT_DEST : TMP_DIR));
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
