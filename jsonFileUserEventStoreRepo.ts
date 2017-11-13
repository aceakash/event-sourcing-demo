import { UserEventStoreRepo } from "./userEventStore";
import { UserEvent } from "./userEvents";
import {filter} from 'lodash';
import {writeFileSync} from 'fs'

export class JsonFileUserEventStoreRepo implements UserEventStoreRepo {
    private filePath: string

    constructor(filePath: string) {
        this.filePath = filePath
    }

    AddEvents(events: UserEvent[]): void {
        let allUserEvents = this.GetAllEvents()
        allUserEvents = allUserEvents.concat(events)
        writeFileSync(this.filePath, JSON.stringify(allUserEvents))
    }   

    GetEventsForUser(userID: string): UserEvent[] {
        const allUserEvents = this.GetAllEvents()
        return filter<UserEvent>(allUserEvents, (e => e.UserID === userID))
    }

    GetAllEvents(): UserEvent[] {
        const allUserEvents = require(this.filePath) as UserEvent[]
        console.log('json:allUserEvents', JSON.stringify(allUserEvents))
        return allUserEvents
    }
}