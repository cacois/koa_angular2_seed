import * as chai from 'chai';
import {describe,it,inject,beforeEachProviders} from '../../util/angular2-mocha-testing';
import {App} from '../app/app';
import {Type} from 'angular2/core';

chai.config.includeStack = true;

describe('Login', () => {
    beforeEachProviders(() => [App]);

    it('Test for App to Exist', (done) => {
        inject([App], (app) => {
            console.log(app);
            done();
        });
    });
});
