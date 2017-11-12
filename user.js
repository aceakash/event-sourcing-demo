"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
class User {
    constructor(fullName, email) {
        this.FullName = fullName;
        this.Email = email;
    }
}
exports.User = User;
