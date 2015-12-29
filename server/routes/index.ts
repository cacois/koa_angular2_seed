'use strict';

class Routes {
    send:any = require('koa-send');
    path:any = require('path');

    constructor(api: any) {
        var self = this;
        var publicPath = self.path.resolve(__dirname, '../public');

        api.get('/', function *() {
            console.log(publicPath);
            yield self.send(this, 'index.html', {
                root: publicPath,
                gzip: true
            });
        });

        api.get('/*', function *(): any {
            yield self.send(this, this.path, {
                root: publicPath,
                gzip: true
            });
        });

        api.get('/hello', function *(next): any {
            this.body = '<html><body><h1>test</h1></body></html>';
        });
    }
}

module.exports = Routes;
