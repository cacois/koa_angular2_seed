import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {App} from './components/app/app';
import {Type} from 'angular2/core';
import {STORAGE_PROVIDERS} from './services/local_storage';

bootstrap(<Type>App, [
    ROUTER_PROVIDERS,
    STORAGE_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);
