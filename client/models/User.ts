import * as util from '../util';

export class User {
    id: string;
    name: string;
    avatarSrc: string;

    constructor(id?: string,
                name?: string,
                avatarSrc?: string) {
        this.id = id || util.uuid();
        this.name = name || null;
        this.avatarSrc = avatarSrc || null;
    }
}
