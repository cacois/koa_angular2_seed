///<
'use strict';

import koa = require('koa');
import session = require('koa-session');
import router = require('koa-router');
import koaqs = require('koa-qs');
import accesslog = require('koa-accesslog');

console.log(koa);

var app:any = koa();
var api:any = router();
require('./routes')(api);

app
    .use(accesslog())
    .use(session(app))
    .use(api.routes())
    .use(api.allowedMethods());
koaqs(app);

var port = 8000;
var ip = '127.0.0.1';

app.listen(port, function () {
    console.log('Listening at: http://' + ip + ':' + port);
});
