import * as util from '../../util';
import {Component, ViewEncapsulation} from 'angular2/core';

@Component({
    selector: 'home',
    templateUrl: './components/home/home.html',
    encapsulation: ViewEncapsulation.None,
})
export class Home {
    public test:any = util.uuid();
}
