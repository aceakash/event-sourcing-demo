import * as express from 'express'
import * as morgan from 'morgan'
import { format } from 'path';
import * as bodyParser from 'body-parser';
import {UserEventStore} from './userEventStore'
import {JsonFileUserEventStoreRepo} from './jsonFileUserEventStoreRepo'
import { AddUserCommand } from './userCommands';

let jsonFileUserEventStoreRepo = new JsonFileUserEventStoreRepo('./user-events-log.json')
let userEventStore = new UserEventStore(jsonFileUserEventStoreRepo)

const app: express.Express = express()

app.use(morgan("combined"))

app.get('/', (req, res) => {
    res.send('Hello 🤠')
})

app.get('/users/:id', (req: express.Request, res: express.Response) => {
    let user = userEventStore.GetUserByID(req.params.id)
    if (user === undefined) {
        res.status(404).send()
        return
    }
    res.json(user)
})

app.post('/users', bodyParser.json(),  (req: express.Request, res: express.Response) => {
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
