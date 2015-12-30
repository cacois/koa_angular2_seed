import {ENV, CLIENT_POST_BUILD_CLEANUP} from './config';

export = function client_post_build(gulp, plugins, option) {
    return () => {
        if(ENV !== 'dev') {
            gulp
                .src(CLIENT_POST_BUILD_CLEANUP, {read: false})
                .pipe(plugins.rimraf());
        }
    };
};
