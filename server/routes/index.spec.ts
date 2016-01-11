var app = require('../server.js');
var supertest = require('co-supertest').agent(app);
var expect = require('chai').expect;

describe('OAuth', () => {
    describe('Facebook', () => {
        it('should redirect to Facebook on connect', (done) => {
            supertest
                .get('/connect/facebook')
                .expect(302)
                .end((err, res) => {
                    expect(res.header.location).to.contain('https://www.facebook.com/dialog/oauth');
                    done();
                });
        });
        it('should throw an error on callback GET', (done) => {
            supertest
                .get('/connect/facebook/callback')
                .expect(302)
                .end((err, res) => {
                    expect(res.text).to.contain('error');
                    done();
                });
        });
    });
    describe('Twitter', () => {
        it('should redirect to Twitter on connect', (done) => {
            supertest
                .get('/connect/twitter')
                .expect(302)
                .end((err, res) => {
                    expect(res.header.location).to.contain('https://api.twitter.com/oauth');
                    done();
                });
        });
        it('should throw an error on callback GET', (done) => {
            supertest
                .get('/connect/twitter/callback')
                .expect(302)
                .end((err, res) => {
                    expect(res.text).to.contain('error');
                    done();
                });
        });
    });
});
