import yargs = require('yargs');

export const ENV = yargs.argv['env'] || 'dev';
export const GULP_TASKS_SRC = `./gulp_tasks/`;
export const TMP_DIR = 'tmp';
export const APP_BASE = `/`;
export const APP_DEST = `dist/`;
export const CLIENT_SRC = `client/`;
export const CLIENT_DEST = `${APP_DEST}/public`;
export const CLIENT_JS_DEST = `${APP_DEST}/js`;
export const CLIENT_CSS_SRC = `${CLIENT_SRC}/css`;
export const CLIENT_CSS_DEST = `${CLIENT_DEST}/css`;
export const CLIENT_FONTS_DEST = `${CLIENT_DEST}/fonts`;
export const CLIENT_LIB_DEST = `${CLIENT_DEST}/lib`;
export const SERVER_SRC = `server/`;

export const NPM_DEPENDENCIES = [
    { src: 'systemjs/dist/system-polyfills.js', dest: CLIENT_LIB_DEST },
    { src: 'es6-shim/es6-shim.min.js', inject: 'shims', dest: CLIENT_LIB_DEST },
    { src: 'reflect-metadata/Reflect.js', inject: 'shims', dest: CLIENT_LIB_DEST },
    { src: 'systemjs/dist/system.src.js', inject: 'shims', dest: CLIENT_LIB_DEST },
    { src: 'angular2/bundles/angular2-polyfills.js', inject: 'shims', dest: CLIENT_LIB_DEST },
    { src: 'rxjs/bundles/Rx.min.js', inject: 'libs', dest: CLIENT_LIB_DEST },
    { src: 'angular2/bundles/angular2.min.js', inject: 'libs', dest: CLIENT_LIB_DEST },
    { src: 'angular2/bundles/router.js', inject: 'libs', dest: CLIENT_LIB_DEST },
    { src: 'angular2/bundles/http.min.js', inject: 'libs', dest: CLIENT_LIB_DEST }
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
