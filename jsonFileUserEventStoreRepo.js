"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const fs_1 = require("fs");
class JsonFileUserEventStoreRepo {
    constructor(filePath) {
        this.filePath = filePath;
    }
    AddEvents(events) {
        let allUserEvents = this.GetAllEvents();
        allUserEvents = allUserEvents.concat(events);
        fs_1.writeFileSync(this.filePath, JSON.stringify(allUserEvents));
    }
    GetEventsForUser(userID) {
        const allUserEvents = this.GetAllEvents();
        return lodash_1.filter(allUserEvents, (e => e.UserID === userID));
    }
    GetAllEvents() {
        const allUserEvents = require(this.filePath);
        return allUserEvents;
    }
}
exports.JsonFileUserEventStoreRepo = JsonFileUserEventStoreRepo;
