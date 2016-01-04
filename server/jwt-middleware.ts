var jwt = require('jsonwebtoken');

module.exports = (jwtSecret: string, path?:string, stream?:NodeJS.WritableStream) => {
    var regexPattern: string  = '^';

    if(path) {
        regexPattern += path.startsWith('/') ? path : '/' + path;
    }

    regexPattern = regexPattern.endsWith('/') ? regexPattern : regexPattern + '/';

    if (!stream) {
        stream = process.stdout;
    }

    var regex = new RegExp(regexPattern);

    return function* (next) {
        if(!this.path.match(regex)) {
            yield* next;
            return;
        }

        if (!this.header.authorization) {
            this.throw(401, 'No Authorization header found\n');
        }

        var parts:string[] = this.header.authorization.split(' ');
        if(parts.length !== 2) {
            this.throw(401, 'Bad Authorization header format. Format is "Authorization: Bearer <token>"\n');
        }

        if(parts[0].toLowerCase() !== 'bearer') {
            this.throw(401, 'Bad Authorization header format. Format is "Authorization: Bearer <token>"\n');
        }

        try {
            this.user = yield jwt.verify(parts[1], jwtSecret);
        } catch(e) {
            stream.write('Invalid token - ' + e.message + '\n');
            this.throw(401, 'Invalid token\n');
        }

        console.log(JSON.stringify(this.user));

        yield* next;
    };
};
