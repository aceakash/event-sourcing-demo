"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
var EventType;
(function (EventType) {
    EventType[EventType["UserAdded"] = 0] = "UserAdded";
    EventType[EventType["EmailUpdated"] = 1] = "EmailUpdated";
})(EventType = exports.EventType || (exports.EventType = {}));
class UserEvent {
    constructor() {
        this.EventID = uuid_1.v4();
        this.CreatedOn = new Date();
    }
}
exports.UserEvent = UserEvent;
class UserAddedEvent extends UserEvent {
    constructor(user) {
        super();
        this.User = user;
        this.Type = EventType.UserAdded;
    }
}
exports.UserAddedEvent = UserAddedEvent;
// export class EmailUpdatedEvent implements UserEvent {
//     UserID: string;
//     Email: string;
// }
// export class FullNameUpdatedEvent implements UserEvent {
//     UserID: string;
//     FullName: string;
// } 
