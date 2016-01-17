import {Component, ViewEncapsulation} from 'angular2/core';
import {Storage} from '../../services/local_storage';

@Component(<any>{
    selector: 'login',
    templateUrl: './components/login/login.html',
    encapsulation: ViewEncapsulation.None,
})
export class Login {
    constructor(storage:Storage) {
        storage.removeItem('jwt');
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
