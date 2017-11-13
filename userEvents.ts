import { User } from "./user";
import {v4 as newUUID} from "uuid";
import {has} from "lodash";

export type UserEventType = string
export const UserAddedEvent: UserEventType = "UserAdded"

// export enum UserEventType {
//     UserAdded = 0,
//     EmailUpdated
// }

export class UserEvent {
    UserID: string;
    Type: UserEventType;
    EventID: string;
    CreatedOn: Date;
    Data: any;

    constructor(userID: string, type: UserEventType, data: any) {
        this.EventID = newUUID()
        this.CreatedOn = new Date()
        this.Type = type
        this.Data = data
        
        if (type === UserAddedEvent) {
            if (!has(this, 'Data.User.Id')) {
                throw new Error("User ID not provided in UserAddedEvent.Data.User")
            }
            this.UserID = this.Data.User.Id
        }
        else {
            this.UserID = userID
        }
    }
}

// export class UserAddedEvent extends UserEvent {
//     User: User;

//     constructor(user: User) {
//         super()
//         this.User = user
//         this.Type = UserEventType.UserAdded
//     }
// }

// export class EmailUpdatedEvent implements UserEvent {
//     UserID: string;
//     Email: string;
// }

// export class FullNameUpdatedEvent implements UserEvent {
//     UserID: string;
//     FullName: string;
// }