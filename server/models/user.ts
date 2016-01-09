import {Db} from 'mongodb';

export module User {
    export interface User {
        _id?: string;
        type?: UserType;
        userId?: string;
        name?: string;
        email?: string;
        facebookId?: string;
        twitterId?: string;
    }

    export function getFacebookUser(mongo:Db, facebookId:string): Promise<User.User> {
        return new Promise((resolve, reject) => {
            mongo.collection('users', function (error, users) {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                users.findOne({facebookId: facebookId}, function (error, user) {
                    if (error) {
                        console.error(error);
                        reject(error);
                    }
                    resolve(user);
                });
            });
        });
    }

    export function upsertFacebookUser(mongo:Db, user:User): Promise<User.User> {
        return new Promise((resolve, reject) => {
            mongo.collection('users', function (error, users) {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                var search = {};
                if(user._id) {
                    search['_id'] = user._id;
                } else {
                    search['facebookId'] = user.facebookId;
                }
                users.update(search, user, {upsert: true}, function (error, result) {
                    if (error) {
                        console.error(error);
                        reject(error);
                    }
                    resolve();
                });
            });
        });
    }
}
