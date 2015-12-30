'use strict';

module.exports = (api: any) => {
    var send = require('koa-send');
    var path = require('path');

    var publicPath = path.resolve(__dirname, '../public');

    api.get('/', function *() {
        console.log(publicPath);
        yield send(this, 'index.html', {
            root: publicPath,
            gzip: true
        });
    });

    api.get('/*', function *(): any {
        yield send(this, this.path, {
            root: publicPath,
            gzip: true
        });
    });

    api.get('/hello', function *(next): any {
        this.body = '<html><body><h1>test 123</h1></body></html>';
    });
};
