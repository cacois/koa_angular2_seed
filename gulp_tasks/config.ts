import yargs = require('yargs');

export const ENV = yargs.argv['env'] || 'dev';
export const GULP_TASKS_SRC = `./gulp_tasks/`;
export const TMP_DIR = 'tmp';
export const APP_BASE = `/`;
export const APP_DEST = `dist/`;
export const CLIENT_SRC = `client/`;
export const CLIENT_DEST = `${APP_DEST}/public`;
export const CLIENT_JS_DEST = `${CLIENT_DEST}/js`;
export const CLIENT_CSS_SRC = `${CLIENT_SRC}/css`;
export const CLIENT_CSS_DEST = `${CLIENT_DEST}/css`;
export const CLIENT_FONTS_DEST = `${CLIENT_DEST}/fonts`;
export const CLIENT_LIB_DEST = `${CLIENT_DEST}/lib`;
export const SERVER_SRC = `server/`;

export const NPM_FONTS = [
    'node_modules/bootstrap-sass/assets/fonts/bootstrap/*.*',
    'node_modules/font-awesome/fonts/*.*'
];
export const NPM_DEPENDENCIES = [
    { src: 'node_modules/systemjs/dist/system-polyfills.js' },
    { src: 'node_modules/es6-shim/es6-shim.min.js', inject: 'shims' },
    { src: 'node_modules/reflect-metadata/Reflect.js', inject: 'shims' },
    { src: 'node_modules/systemjs/dist/system.src.js', inject: 'shims' },
    { src: 'node_modules/angular2/bundles/angular2-polyfills.js', inject: 'shims' },
    { src: 'node_modules/rxjs/bundles/Rx.min.js', inject: 'libs' },
    { src: 'node_modules/angular2/bundles/angular2.min.js', inject: 'libs' },
    { src: 'node_modules/angular2/bundles/router.js', inject: 'libs' },
    { src: 'node_modules/angular2/bundles/http.min.js', inject: 'libs' }
];

const SYSTEM_CONFIG_DEV = {
    defaultJSExtensions: true,
    paths: {
        'bootstrap': `${APP_BASE}bootstrap`,
        '*': `${APP_BASE}node_modules/*`
    }
};

const SYSTEM_CONFIG_PROD = {
    defaultJSExtensions: true,
    bundles: {
        'js/app': ['bootstrap']
    }
};

export const SYSTEM_CONFIG = ENV === 'dev' ? SYSTEM_CONFIG_DEV : SYSTEM_CONFIG_PROD;

// This is important to keep clean module names as 'module name == module uri'.
export const SYSTEM_CONFIG_BUILDER = {
    defaultJSExtensions: true,
    paths: {
        '*': `${TMP_DIR}/*`,
        'angular2/*': 'node_modules/angular2/*',
        'rxjs/*': 'node_modules/rxjs/*'
    }
};
