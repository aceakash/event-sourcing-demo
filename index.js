"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const body_parser_1 = require("body-parser");
const userEventStore_1 = require("./userEventStore");
const jsonFileUserEventStoreRepo_1 = require("./jsonFileUserEventStoreRepo");
const userCommands_1 = require("./userCommands");
let jsonFileUserEventStoreRepo = new jsonFileUserEventStoreRepo_1.JsonFileUserEventStoreRepo('./userEvents.json');
let userEventStore = new userEventStore_1.UserEventStore(jsonFileUserEventStoreRepo);
const app = express();
app.use(morgan("combined"));
app.get('/', (req, res) => {
    res.send('Hello 🤠');
});
app.post('/users', body_parser_1.json, (req, res) => {
    // todo: validate input here
    let addUserCmd = new userCommands_1.AddUserCommand();
    addUserCmd.FullName = req.body.fullName;
    addUserCmd.Email = req.body.email;
    userEventStore.Decide(addUserCmd);
});
app.listen(7777);
