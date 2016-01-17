require('zone.js');
import {describe,it} from '../../util/angular2-mocha-testing';
import {Login} from './login';
import {Storage, StorageBackend, localStorageBackend} from '../../services/local_storage';
import {provide} from 'angular2/core';
import {inject, beforeEachProviders} from '../../util/angular2-mocha-testing';

class MockLocalStorage implements StorageBackend {
    getItem(key:string):any {
        return undefined;
    }

    setItem(key:string, value:any):void {
        return;
    }

    removeItem(key:string):void {
        return;
    }
}

describe('Login', () => {
    beforeEachProviders(() => [provide(localStorageBackend, {useClass: MockLocalStorage})]);

    it('uses LocalStorage', inject([Storage], (storage) => {
        var login = new Login(storage);
        expect(login).should.not.be.null;
    }));
});
