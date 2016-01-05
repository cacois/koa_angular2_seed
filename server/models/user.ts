class User {
    type: UserType;
    userId: string;
    name: string;
    email: string;

    constructor(type?: UserType, userId?:string, name?:string, email?:string) {
        this.type = type || UserType.Facebook;
        this.userId = userId || null;
        this.name = name || null;
        this.email = email || null;
    }
}
