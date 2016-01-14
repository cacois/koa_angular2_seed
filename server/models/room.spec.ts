var expect = require('chai').expect;
import { Room } from  './room';
import {MongoClient} from 'mongodb';

describe('Room Model', () => {
    beforeEach(function (done) {
        MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
            db.collection('rooms', function (err, collection) {
                collection.remove({}, function (err, removed) {
                    done();
                });
            });
        });
    });

    it('should get an empty list by default', function (done) {
        MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
            expect(err).to.be.a('null');
            expect(db).to.not.be.a('null');
            Room.getRooms(db)
                .then(function (rooms) {
                    expect(rooms).to.be.instanceof(Array);
                    expect(rooms.length).to.be.equal(0);
                    done();
                });
        });
    });

    it('should insert a room', function (done) {
        MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
            expect(err).to.be.a('null');
            expect(db).to.not.be.a('null');
            Room.upsertRoom(db, {name: 'test'})
                .then(() => {
                    Room.getRooms(db)
                        .then(function (rooms) {
                            expect(rooms).to.be.instanceof(Array);
                            expect(rooms.length).to.be.equal(1);
                            done();
                        });
                });
        });
    });

    it('should return an inserted room', function (done) {
        MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
            expect(err).to.be.a('null');
            expect(db).to.not.be.a('null');
            Room.upsertRoom(db, {name: 'test'})
                .then(() => {
                    Room.getRooms(db)
                        .then(function (rooms) {
                            expect(rooms).to.be.instanceof(Array);
                            expect(rooms.length).to.be.equal(1);
                            expect((<Room.Room>rooms[0]).name).to.contain('test');
                        })
                        .then(done, done);
                });
        });
    });
});
