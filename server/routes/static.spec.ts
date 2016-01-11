var app = require('../server.js');
var supertest = require('co-supertest');
var expect = require('chai').expect;

describe('Static file server', function () {
    it('should return index.html', (done) => {
        supertest(app)
            .get('/')
            .expect(200)
            .end((err, res) => {
                expect(res.text).to.contain('<!DOCTYPE html>');
                done();
            });
    });
});
