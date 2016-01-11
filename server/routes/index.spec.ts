var app = require('../server.js');
var supertest = require('co-supertest').agent(app);
var expect = require('chai').expect;

describe('OAuth', () => {
    describe('Facebook', () => {
        it('should redirect to Facebook on connect', function *() {
            var res = yield supertest.get('/connect/facebook').expect(302).end();
            expect(res.header.location).to.contain('https://www.facebook.com/dialog/oauth');
        });
        it('should throw an error on callback GET', function *() {
            var res = yield supertest.get('/connect/facebook/callback').expect(302).end();
            expect(res.text).to.contain('error');
        });
    });
    describe('Twitter', () => {
        it('should redirect to Twitter on connect', function *() {
            var res = yield supertest.get('/connect/twitter').expect(302).end();
            expect(res.header.location).to.contain('https://api.twitter.com/oauth');
        });
        it('should throw an error on callback GET', function *() {
            var res = yield supertest.get('/connect/twitter/callback').expect(302).end();
            expect(res.text).to.contain('error');
        });
    });
});
