import {User} from './user'
import { UserCommand, UserCommandType, AddUserCommand } from './userCommands';
import { UserEvent, UserEventType } from './userEvents';


export class UserEventStore {
    private eventStoreRepo: UserEventStoreRepo

    constructor(eventStoreRepo: UserEventStoreRepo) {
        this.eventStoreRepo = eventStoreRepo
    }

    GetUserByID(userID: string): User | undefined {
        let events = this.eventStoreRepo.GetEventsForUser(userID)
        return this.Replay(events).get(userID)
    }

    AddEvents(events: UserEvent[]): void {
        this.eventStoreRepo.AddEvents(events)
    }

    Decide(cmd: UserCommand): UserEvent[] {
        if (cmd.Type === UserCommandType.AddUser) {
            const addUserCmd = cmd as AddUserCommand
            const allUserEvents = this.eventStoreRepo.GetAllEvents()
            const allUsersSet = this.Replay(allUserEvents)
            
            const allUsers = Array.from(allUsersSet.values())
            const existingUserWithSameEmail = allUsers.find(u => u.Email === addUserCmd.Email)
            if (existingUserWithSameEmail !== undefined) {
                throw new Error("User with that email already exists") // todo typed error        
            }
            
            const newUser = new User(addUserCmd.FullName, addUserCmd.Email)
            console.log('line 35', newUser)
            const userAddedEvent = new UserEvent("", "UserAdded", {
                User: newUser
            }) // todo remove hardcoding
            return [userAddedEvent]
        }

        
        throw new Error("Not implemented")
        
    }

    Apply(users: Map<string, User>, event: UserEvent): Map<string, User> {
        let user = users.get(event.UserID)
        if (user === undefined) {
            if (event.Type === "UserAdded") { // todo remove hardcoding
                users.set(event.UserID, event.Data.User)
            }
            return users
        }
        // todo implement handling for other events
        return users
    }

    Replay(events: UserEvent[]): Map<string, User> {
        // todo refactor this
        let allUsersSet = new Map<string, User>()
        
        events.forEach(e => {
            allUsersSet = this.Apply(allUsersSet, e)
        })
        
        return allUsersSet
    }
}

export interface UserEventStoreRepo {
    AddEvents(events: UserEvent[]): void
    GetEventsForUser(userID: string): UserEvent[];
    GetAllEvents(): UserEvent[];
}