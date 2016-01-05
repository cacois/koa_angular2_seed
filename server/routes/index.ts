'use strict';

var Router = require('koa-router');
var FB = require('fb');
var jwt = require('jsonwebtoken');
var config = require('../config.json');

var router = new Router();

router.use('/api', require('./api').routes(), require('./api').allowedMethods());

router.get('/handle_facebook_callback', function *(next):any {
    let redirectUri:String = '/#';

    if (this.query.access_token) {
        FB.setAccessToken(this.query.access_token);
        FB.api('/me', {fields: ['id', 'name', 'email']}, function (res) {
            if (res && res.error) {
                console.log('error', res.error);
            } else {
                console.log(res);
            }
        });
        redirectUri += '?jwt=' + jwt.sign({facebookToken: this.query.access_token}, config.server.jwtSecret);
    }

    this.response.redirect(redirectUri);
});

router.use(require('./static').routes());

module.exports = router;
