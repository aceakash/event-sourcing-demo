import { User } from "./user";
import {v4 as newUUID} from "uuid";

export enum UserEventType {
    UserAdded = 0,
    EmailUpdated
}

export abstract class UserEvent {
    UserID: string;
    Type: UserEventType;
    EventID: string;
    CreatedOn: Date;

    constructor() {
        this.EventID = newUUID()
        this.CreatedOn = new Date()
    }
}

export class UserAddedEvent extends UserEvent {
    User: User;

    constructor(user: User) {
        super()
        this.User = user
        this.Type = UserEventType.UserAdded
    }
}

// export class EmailUpdatedEvent implements UserEvent {
//     UserID: string;
//     Email: string;
// }

// export class FullNameUpdatedEvent implements UserEvent {
//     UserID: string;
//     FullName: string;
// }