"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./user");
const userCommands_1 = require("./userCommands");
const userEvents_1 = require("./userEvents");
class UserEventStore {
    constructor(eventStoreRepo) {
        this.eventStoreRepo = eventStoreRepo;
    }
    GetUserByID(userID) {
        let events = this.eventStoreRepo.GetEventsForUser(userID);
        return this.Replay(events).get(userID);
    }
    AddEvents(events) {
        this.eventStoreRepo.AddEvents(events);
    }
    Decide(cmd) {
        if (cmd.Type === userCommands_1.UserCommandType.AddUser) {
            const addUserCmd = cmd;
            const allUserEvents = this.eventStoreRepo.GetAllEvents();
            const allUsersSet = this.Replay(allUserEvents);
            const allUsers = Array.from(allUsersSet.values());
            const existingUserWithSameEmail = allUsers.find(u => u.Email === addUserCmd.Email);
            if (existingUserWithSameEmail !== undefined) {
                throw new Error("User with that email already exists"); // todo typed error        
            }
            const newUser = new user_1.User(addUserCmd.FullName, addUserCmd.Email);
            const userAddedEvent = new userEvents_1.UserAddedEvent(newUser);
            return [userAddedEvent];
        }
        throw new Error("Not implemented");
    }
    Apply(users, event) {
        let user = users.get(event.UserID);
        if (user === undefined) {
            if (event.Type === userEvents_1.UserEventType.UserAdded) {
                users.set(event.UserID, event.User);
            }
            return users;
        }
        // todo implement handling for other events
        return users;
    }
    Replay(events) {
        // todo refactor this
        let allUsersSet = new Map();
        events.forEach(e => {
            allUsersSet = this.Apply(allUsersSet, e);
        });
        return allUsersSet;
    }
}
exports.UserEventStore = UserEventStore;
