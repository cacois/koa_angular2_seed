'use strict';

import koa = require('koa');
import session = require('koa-session');
import router = require('koa-router');
import mount = require('koa-mount');
import koaqs = require('koa-qs');
import accesslog = require('koa-accesslog');
import Grant = require('grant-koa');
import jwtMiddleware = require('./jwt-middleware');
var config = require('./config.json');

var app:any = koa();
var api:any = router();
var grant = new Grant(require('./config.json'));

require('./routes')(api);

app.keys = ['grant'];
app
    .use(accesslog())
    .use(session(app))
    .use(mount(grant))
    .use(jwtMiddleware(config.server.jwtSecret, '/hello'))
    .use(api.routes())
    .use(api.allowedMethods());
koaqs(app);

var port = 8000;
var ip = '127.0.0.1';

app.listen(port, function () {
    console.log('Listening at: http://' + ip + ':' + port);
});
