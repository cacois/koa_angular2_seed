import {User} from '../models/user';
var Twitter = require('twitter');
var config = require('../config.json');

export module TwitterService {
    export function getUser(access_token: string, access_token_secret: string): Promise<User.User> {
        return new Promise((resolve, reject) => {
            var client = new Twitter({
                consumer_key: config.twitter.key,
                consumer_secret: config.twitter.secret,
                access_token_key: access_token,
                access_token_secret: access_token_secret
            });

            client.get('account/verify_credentials', function(error, profile, response) {
                if(error) {
                    reject(error);
                } else {
                    var user: User.User = {
                        twitterId: profile.id,
                        name: profile.name
                    };
                    resolve(user);
                }
            });
        });
    }
}
