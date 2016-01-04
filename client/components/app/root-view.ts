import {Component, ViewEncapsulation} from 'angular2/core';
import {LoggedInRouterOutlet} from './LoggedInRouterOutlet';
import {Home} from '../home/home';
import {Login} from '../login/login';
import {
    RouteConfig,
    RouteParams,
    ROUTER_DIRECTIVES
} from 'angular2/router';

@Component({
    templateUrl: './components/app/root-view.html',
    encapsulation: ViewEncapsulation.None,
    directives: [ROUTER_DIRECTIVES, LoggedInRouterOutlet]
})
@RouteConfig([
    {path: '/', component: Home, as: 'Home', useAsDefault: true},
    {path: '/login', component: Login, as: 'Login'}
])
export class RootView {
    constructor(routeParams: RouteParams) {
        var jwt = routeParams.get('jwt');
        console.log(jwt);
        if(jwt && jwt !== null) {
            localStorage.setItem('jwt', jwt);
        }
    }
}
