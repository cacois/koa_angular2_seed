var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;
var sinon = require('sinon');
var FB = require('fb');
import {User} from '../models/user';
import {FacebookService} from '../services/facebook-service';

chai.use(chaiAsPromised);

describe('Facebook Service', () => {
    before(() => {
        var ret:any = {};
        sinon.stub(FB, 'setAccessToken', (token) => {
            if(token === 'valid') {
                ret = {id: 'test', name: 'test', email: 'test'};
            } else {
                ret = { error: 'test error'};
            }
        });
        sinon.stub(FB, 'api', (endpoint, opts, cb) => {
            cb(ret);
        });
    });

    it('should return a Facebook user given a valid token', function (done) {
        FacebookService.getUser('valid').then((user:User.User) => {
            expect(user).to.not.be.a('null');
            expect(user).to.have.property('facebookId');
            expect(user.facebookId).to.equal('test');
            expect(user).to.have.property('name');
            expect(user.name).to.equal('test');
            expect(user).to.have.property('email');
            expect(user.email).to.equal('test');
        }).then(done, done);
    });

    it('should reject the promise given an invalid token', function (done) {
        expect(FacebookService.getUser('bogus')).to.be.rejected;
        done();
    });
});
