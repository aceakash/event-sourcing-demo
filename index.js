"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const userEventStore_1 = require("./userEventStore");
const jsonFileUserEventStoreRepo_1 = require("./jsonFileUserEventStoreRepo");
const userCommands_1 = require("./userCommands");
let jsonFileUserEventStoreRepo = new jsonFileUserEventStoreRepo_1.JsonFileUserEventStoreRepo('./user-events-log.json');
let userEventStore = new userEventStore_1.UserEventStore(jsonFileUserEventStoreRepo);
const app = express();
app.use(morgan("combined"));
app.get('/', (req, res) => {
    res.send('Hello 🤠');
});
app.get('/users/:id', (req, res) => {
    let user = userEventStore.GetUserByID(req.params.id);
    if (user === undefined) {
        res.status(404).send();
        return;
    }
    res.json(user);
});
app.post('/users', bodyParser.json(), (req, res) => {
    console.log('boo');
    // todo: validate input here
    let addUserCmd = new userCommands_1.AddUserCommand();
    addUserCmd.FullName = req.body.fullName;
    addUserCmd.Email = req.body.email;
    const events = userEventStore.Decide(addUserCmd);
    userEventStore.AddEvents(events);
    res.status(201).send();
});
app.listen(7777);
console.log('Started on 7777');
