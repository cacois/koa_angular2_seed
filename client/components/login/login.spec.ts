import * as sinon from 'sinon';
import {describe,it} from '../../util/angular2-mocha-testing';
import {Login} from './login';

export var localStorage: any = {
    removeItem: (key: any) => { return; }
};

describe('Login', () => {
    sinon.spy(localStorage, 'removeItem');

    it('Create compoment', (done) => {
        var login = new Login();
        expect(login).should.not.be.null;
        done();
    });
});
