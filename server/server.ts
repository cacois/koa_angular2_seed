'use strict';

import koa = require('koa');
import session = require('koa-session');
import mount = require('koa-mount');
import koaqs = require('koa-qs');
import accesslog = require('koa-accesslog');
import Grant = require('grant-koa');
import mongo = require('koa-mongo');
import Primus = require('primus');
import validator = require('validator');
import jwtMiddleware = require('./jwt-middleware');

var config = require('./config.json');
var routes = require('./routes');

var app:any = koa();
var grant = new Grant(require('./config.json'));

app.keys = ['grant'];
app
    .use(accesslog())
    .use(session(app))
    .use(mount(grant))
    .use(mongo({
        uri: 'mongodb://localhost:27017/db',
        max: 100,
        min: 1,
        timeout: 30000,
        log: false
    }))
    .use(jwtMiddleware.jwtMiddleware(config.server.jwtSecret, '/api'))
    .use(routes.routes())
    .use(routes.allowedMethods());
koaqs(app);

var port = 8000;
var ip = '127.0.0.1';

var server = app.listen(port, function () {
    console.log('Listening at: http://' + ip + ':' + port);
});

var primus = new Primus(server, {transformer: 'engine.io'});
primus.library();

// connect hook
primus.on('connection', function (spark) {
    console.log('connection');
    // spark is the new connection
    console.log('spark headers : ', spark.headers);
    console.log('spark address : ', spark.address);
    // query string sockjs not supported
    console.log('spark query : ', spark.query);
    // spark id can get client id
    console.log('spark id  : ', spark.id);

    // send Connect message to one connect client
    spark.write('CONNECT!!!');
    // receive data
    spark.on('data', function(data) {
        console.log(data);
        // broadcast all client
        primus.write(validator.escape(data));
    });
});


// disconnect hook
primus.on('disconnection', function (spark) {
    console.log('disconnection');
});
