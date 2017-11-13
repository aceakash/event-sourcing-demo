import * as express from 'express'
import * as morgan from 'morgan'
import { format } from 'path';
import {json, urlencoded} from 'body-parser';
import {UserEventStore} from './userEventStore'
import {JsonFileUserEventStoreRepo} from './jsonFileUserEventStoreRepo'
import { AddUserCommand } from './userCommands';
import { InMemoryRepo } from './inMemoryRepo';

// let jsonFileUserEventStoreRepo = new JsonFileUserEventStoreRepo('./user-events-log.json')
let inMemoryRepo = new InMemoryRepo()
let userEventStore = new UserEventStore(inMemoryRepo)

const app: express.Express = express()

app.use(morgan("combined"))

app.get('/', (req, res) => {
    res.send('Hello 🤠')
})

app.get('/users', (req: express.Request, res: express.Response) => {
    res.json(Array.from(userEventStore.Replay(inMemoryRepo.GetAllEvents()).keys()))
})

app.get('/users/:id', (req: express.Request, res: express.Response) => {
    let user = userEventStore.GetUserByID(req.params.id)
    if (user === undefined) {
        res.status(404).send()
        return
    }
    res.json(user)
})

app.post('/users', json(), urlencoded(), (req: express.Request, res: express.Response) => {
    console.log('boo')
    // todo: validate input here
    let addUserCmd = new AddUserCommand()
    addUserCmd.FullName = req.body.fullName
    addUserCmd.Email = req.body.email

    const events = userEventStore.Decide(addUserCmd)
    userEventStore.AddEvents(events)
    res.status(201).send()
})

app.listen(7777)
console.log('Started on 7777')
