var expect = require('chai').expect;
var sinon = require('sinon');
var FB = require('fb');
import {User} from '../models/user';
import {FacebookService} from '../services/facebook-service';

describe('Facebook Service', () => {
    before(function (done) {
        sinon.stub(FB, 'setAccessToken');
        sinon.stub(FB, 'api').callsArgWith(2, {
            id: 'test',
            name: 'test',
            email: 'test'
        });

        done();
    });

    it('should return a Facebook user given a valid token', function (done) {
        FacebookService.getUser('test').then((user: User.User) => {
            expect(user).to.not.be.a('null');
            expect(user).to.have.property('facebookId');
            expect(user.facebookId).to.equal('test');
            expect(user).to.have.property('name');
            expect(user.name).to.equal('test');
            expect(user).to.have.property('email');
            expect(user.email).to.equal('test');
            done();
        });
    });
});
