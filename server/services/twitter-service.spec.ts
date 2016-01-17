var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;
var sinon = require('sinon');
var Twitter = require('twitter');
import {User} from '../models/user';
import {TwitterService} from '../services/twitter-service';

chai.use(chaiAsPromised);

var token = '';

describe('Twitter Service', () => {
    before(() => {
        sinon.createStubInstance(Twitter);
        sinon.stub(Twitter.prototype, 'get', (endpoint, cb) => {
            if(token === 'valid') {
                cb(null, {id:'test', name:'test'}, null);
            } else {
                cb({ error: 'test error' }, null, null);
            }
        });

    });

    it('should return a Twitter user given a valid token', (done) => {
        token = 'valid';
        TwitterService.getUser('test', 'test').then((user:User.User) => {
            expect(user).to.not.be.a('null');
            expect(user).to.have.property('twitterId');
            expect(user.twitterId).to.equal('test');
            expect(user).to.have.property('name');
            expect(user.name).to.equal('test');
        }).then(done, done);
    });

    it('should reject the promise given an invalid token', (done) => {
        token = 'invalid';
        expect(TwitterService.getUser('test', 'test')).to.be.rejected;
        done();
    });
});
