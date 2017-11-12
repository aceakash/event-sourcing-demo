"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserEventStore {
    constructor(eventStoreRepo) {
        this.eventStoreRepo = eventStoreRepo;
    }
    Decide(cmd) {
        // if (cmd)
        // const allUsers = this.eventStoreRepo.GetAllEvents()
        throw new Error("Not implemented");
    }
    Apply(users, event) {
        let user = users.get(event.UserID);
        if (user === undefined) {
            return users;
        }
        throw new Error("Not implemented");
    }
    Replay(events) {
        throw new Error("Not implemented");
    }
}
exports.UserEventStore = UserEventStore;
