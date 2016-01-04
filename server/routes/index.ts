'use strict';


var Router = require('koa-router');
var send = require('koa-send');
var path = require('path');
var jwt = require('jsonwebtoken');
var config = require('../config.json');

var publicPath = path.resolve(__dirname, '../public');
var router = new Router();

router.get('/', function *() {
    console.log(publicPath);
    yield send(this, 'index.html', {
        root: publicPath,
        gzip: true
    });
});

router.get('/*', function *():any {
    yield send(this, this.path, {
        root: publicPath,
        gzip: true
    });
});

var apiRouter = require('./api');
router.use('/api', apiRouter.routes(), apiRouter.allowedMethods());

router.get('/handle_facebook_callback', function *(next):any {
    let redirectUri:String = '/#';

    if (this.query.access_token) {
        redirectUri += '?jwt=' + jwt.sign({facebookToken: this.query.access_token}, config.server.jwtSecret);
    }

    this.response.redirect(redirectUri);
});

module.exports = router;
