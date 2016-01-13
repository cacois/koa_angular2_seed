import {User} from '../models/user';
import {FacebookService} from '../services/facebook-service';
import {TwitterService} from '../services/twitter-service';
'use strict';

var Router = require('koa-router');
var jwt = require('jsonwebtoken');
var config = require('../config.json');

var router = new Router();

router.use('/api', require('./api').routes(), require('./api').allowedMethods());

router.get('/handle_facebook_callback', function *(next):any {
    var redirectUri:String = '/#';

    if (this.query.access_token) {
        try {
            var fbUser = yield FacebookService.getUser(this.query.access_token);
            if (fbUser) {
                var mongo = this.mongo.db('koa');
                var user = yield User.getFacebookUser(mongo, fbUser.facebookId);
                if (!user) user = {};
                user.facebookId = fbUser.facebookId;
                user.name = fbUser.name;
                user.email = fbUser.email;
                yield User.upsertFacebookUser(mongo, user);

                redirectUri += '?jwt=' + jwt.sign({facebookToken: this.query.access_token}, config.server.jwtSecret);
            }
        } catch(err) {
            console.log('Facebook Callback Error: ', err);
        }
    }

    this.response.redirect(redirectUri);
});

router.get('/handle_twitter_callback', function *(next) {
    var redirectUri:String = '/#';

    if (this.query.access_token) {
        try {
            var twitterUser = yield TwitterService.getUser(this.query.access_token, this.query.access_secret);
            if (twitterUser) {
                var mongo = this.mongo.db('koa');
                var user = yield User.getTwitterUser(mongo, twitterUser.twitterId);
                if (!user) user = {};
                user.twitterId = twitterUser.twitterId;
                user.name = twitterUser.name;
                user.email = twitterUser.email;
                yield User.upsertTwitterUser(mongo, user);

                redirectUri += '?jwt=' + jwt.sign({
                        twitterToken: this.query.access_token,
                        twitterSecret: this.query.access_secret
                    }, config.server.jwtSecret);
            }
        } catch(err) {
            console.log('Facebook Callback Error: ', err);
        }
    }

    this.response.redirect(redirectUri);
});

router.use(require('./static').routes());

module.exports = router;
