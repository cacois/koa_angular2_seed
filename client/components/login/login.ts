import {Component, ViewEncapsulation} from 'angular2/core';

@Component({
    selector: 'login',
    templateUrl: './components/login/login.html',
    encapsulation: ViewEncapsulation.None,
})
export class Login {
    constructor() {
        localStorage.removeItem('jwt');
    }

    login(event, username, password) {
        event.preventDefault();
        console.log('login ', username, password);
        alert('This isn\'t implemented yet.');
    }

    login_facebook(event) {
        event.preventDefault();
        window.location.href='/connect/facebook';
    }

    login_twitter(event) {
        event.preventDefault();
        window.location.href='/connect/twitter';
    }
}
