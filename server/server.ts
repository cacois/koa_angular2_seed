'use strict';

import koa = require('koa');
import session = require('koa-session');
import mount = require('koa-mount');
import koaqs = require('koa-qs');
import accesslog = require('koa-accesslog');
import Grant = require('grant-koa');
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
    .use(jwtMiddleware.jwtMiddleware(config.server.jwtSecret, '/api'))
    .use(routes.routes())
    .use(routes.allowedMethods());
koaqs(app);

var port = 8000;
var ip = '127.0.0.1';

app.listen(port, function () {
    console.log('Listening at: http://' + ip + ':' + port);
});
