import * as chai from 'chai';
import { NameList } from  './name_list';

describe('NameList Service', () => {
    it('should have 4 names by default', (done) => {
        var nameList = new NameList();
        chai.expect(nameList.names.length).to.be.equals(4);
        done();
    });
    it('should get() 4 names by default', (done) => {
        var nameList = new NameList();
        chai.expect(nameList.get().length).to.be.equals(4);
        done();
    });
    it('should add a name', (done) => {
        var nameList = new NameList();
        chai.expect(nameList.names.length).to.be.equals(4);
        chai.expect(nameList.get().length).to.be.equals(4);
        nameList.add('test');
        chai.expect(nameList.names.length).to.be.equals(5);
        chai.expect(nameList.get().length).to.be.equals(5);
        chai.expect(nameList.get()).to.contain('test');
        done();
    });
});
