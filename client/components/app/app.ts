import {Component, ViewEncapsulation} from 'angular2/core';
import {RootView} from './root-view';
import {
    RouteConfig,
    ROUTER_DIRECTIVES
} from 'angular2/router';

@Component({
    selector: 'app',
    templateUrl: './components/app/app.html',
    encapsulation: ViewEncapsulation.None,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/...', component: RootView, as: 'RootView', useAsDefault: true}
])
export class App {
    constructor() {
        // nothing to do yet
    }
}
