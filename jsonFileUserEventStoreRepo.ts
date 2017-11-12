import { UserEventStoreRepo } from "./userEventStore";
import { UserEvent } from "./userEvents";
import {filter} from 'lodash';
import {writeFileSync} from 'fs'

export class JsonFileUserEventStoreRepo implements UserEventStoreRepo {
    private filePath: string

    constructor(filePath: string) {
        this.filePath = filePath
    }

    AddEvent(event: UserEvent): void {
        let allUserEvents = this.GetAllEvents()
        allUserEvents.push(event)
        writeFileSync(this.filePath, JSON.stringify(allUserEvents))
    }   

    GetEventsForUser(userID: string): UserEvent[] {
        const allUserEvents = this.GetAllEvents()
        return filter<UserEvent>(allUserEvents, (e => e.UserID === userID))
    }

    GetAllEvents(): UserEvent[] {
        const allUserEvents = require(this.filePath) as UserEvent[]
        return allUserEvents
    }
}