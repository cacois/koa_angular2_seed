var Router = require('koa-router');
var router = new Router();

router.get('/hello', function *(next):any {
    this.body = '<html><body><h1>test 123</h1></body></html>';
});

module.exports = router;
