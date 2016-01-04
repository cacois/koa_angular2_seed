var send = require('koa-send');
var path = require('path');
var Router = require('koa-router');
var router = new Router();

var publicPath = path.resolve(__dirname, '../public');

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

module.exports = router;
