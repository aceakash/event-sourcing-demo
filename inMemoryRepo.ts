import { UserEventStoreRepo } from "./userEventStore";
import { UserEvent } from "./userEvents";
import { User } from "./user";
import {writeFileSync, readFileSync} from "fs"

// Keeps all the events in memory, but saves to disk every 5 seconds.
export class InMemoryRepo implements UserEventStoreRepo {
    Events: UserEvent[]
    FileName: string
    db:any

    constructor() {
        this.FileName = "user-events-log.json"        
        let f = readFileSync(this.FileName)
        let g = f.toString()
        this.Events = JSON.parse(g) as UserEvent[]
        this.FileName = "user-events-log.json"
        setInterval(() => {
            writeFileSync(this.FileName, JSON.stringify(this.Events))
        }, 5000)
    }

    AddEvents(events: UserEvent[]): void {
        this.Events = this.Events.concat(events)
        // writeFileSync(this.FileName, JSON.stringify(this.Events))
    }

    GetEventsForUser(userID: string): UserEvent[] {
        // let f = readFileSync(this.FileName)
        // let g = f.toString()
        // this.Events = JSON.parse(g) as UserEvent[]
        return this.Events.filter(e => e.UserID === userID)
    }

    GetAllEvents(): UserEvent[] {
        // let f = readFileSync(this.FileName)
        // let g = f.toString()
        // this.Events = JSON.parse(g) as UserEvent[]
        return this.Events
    }
}