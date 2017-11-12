import * as express from 'express'
import * as morgan from 'morgan'
import { format } from 'path';
import {json as jsonBodyParser} from 'body-parser';
import {UserEventStore} from './userEventStore'
import {JsonFileUserEventStoreRepo} from './jsonFileUserEventStoreRepo'
import { AddUserCommand } from './userCommands';

let jsonFileUserEventStoreRepo = new JsonFileUserEventStoreRepo('./userEvents.json')
let userEventStore = new UserEventStore(jsonFileUserEventStoreRepo)

const app: express.Express = express()

app.use(morgan("combined"))

app.get('/', (req, res) => {
    res.send('Hello 🤠')
})

app.post('/users', jsonBodyParser, (req: express.Request, res: express.Response) => {
    // todo: validate input here
    let addUserCmd = new AddUserCommand()
    addUserCmd.FullName = req.body.fullName
    addUserCmd.Email = req.body.email

    const events = userEventStore.Decide(addUserCmd)
    
    

})

app.listen(7777)
