var app = require('../server.js');
var supertest = require('co-supertest');
var expect = require('chai').expect;

describe('/ endpoint', function() {
    it('should return index.html', function *(){
        var res = yield supertest(app).get('/').expect(200).end();
        expect(res.text).to.contain('<!DOCTYPE html>');
    });
});
