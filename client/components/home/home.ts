import * as util from '../../util';
import {Component, ViewEncapsulation} from 'angular2/core';
import Primus = require('primus');

@Component({
    selector: 'home',
    templateUrl: './components/home/home.html',
    encapsulation: ViewEncapsulation.None
})
export class Home {
    public test:any = util.uuid();
    private primus = new Primus();

    constructor() {
        this.primus.on('open', function open() {
            console.log('open');
        });

        this.primus.on('data', function (data) {
            console.log('data : ' + data);
            var li = document.createElement('li');
            li.innerHTML = JSON.stringify(data);
            document.getElementById('list').appendChild(li);
        });
    }

    chat(text:string, $event):void {
        console.log(text);
        this.primus.write(text);
    }
}
