import {v4 as newUUID} from 'uuid'



// export enum UserEventType {
//     EmailUpdated = 0,
//     FullNameUpdated,
//     UserDisabled,
//     UserEnabled
// }



// export class UserEvent {
//     Type: UserEventType;
//     EventID: string;
//     UserID: string;
//     Data: any;
//     CreatedOn: Date;

//     constructor(type: UserEventType, userID: string, data: any) {
//         this.Type = type
//         this.EventID = newUUID()
//         this.UserID = userID
//         this.Data = data
//         this.CreatedOn = new Date()
//     }
// }

export class User {
    Email : string
    FullName : string
    Enabled : boolean
    Id : string

    constructor(fullName: string, email: string) {
        this.FullName = fullName
        this.Email = email
        this.Enabled = true
        this.Id = newUUID()
    }
}


