export enum UserCommandType {
    AddUser = 0,
    UpdateFullName,
    UpdateEmail
}

export abstract class UserCommand {
    Type: UserCommandType;
}

export class AddUserCommand extends UserCommand {
    FullName: string;
    Email: string;

    constructor() {
        super()
        this.Type = UserCommandType.AddUser
    }
}

export class UpdateEmail extends UserCommand {
    UserID: string;
    Email: string;
    
    constructor() {
        super()
        this.Type = UserCommandType.UpdateEmail
    }
}

export class UpdateFullName extends UserCommand {
    UserID: string;
    FullName: string;
    
    constructor() {
        super()
        this.Type = UserCommandType.UpdateFullName
    }
}