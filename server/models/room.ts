import {Db} from 'mongodb';

export module Room {
    export interface Room {
        _id?: string;
        name: string;
    }

    export function getRooms(mongo:Db):Promise<Room.Room[]> {
        return new Promise((resolve, reject) => {
            mongo.collection('rooms', function (error, rooms) {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                var cursor = rooms.find();
                var roomsList = [];
                cursor.each(function(err, doc) {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }

                    roomsList.push(doc);
                });

                resolve(roomsList);
            });
        });
    }

    export function upsertRoom(mongo:Db, room:Room):Promise<Room.Room> {
        return new Promise((resolve, reject) => {
            mongo.collection('rooms', function (error, rooms) {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                var search = {};
                if (room._id) {
                    search['_id'] = room._id;
                } else {
                    search['name'] = room.name;
                }
                rooms.update(search, room, {upsert: true}, function (error, result) {
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
