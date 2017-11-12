"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserCommandType;
(function (UserCommandType) {
    UserCommandType[UserCommandType["AddUser"] = 0] = "AddUser";
    UserCommandType[UserCommandType["UpdateFullName"] = 1] = "UpdateFullName";
    UserCommandType[UserCommandType["UpdateEmail"] = 2] = "UpdateEmail";
})(UserCommandType = exports.UserCommandType || (exports.UserCommandType = {}));
class UserCommand {
}
exports.UserCommand = UserCommand;
class AddUserCommand extends UserCommand {
    constructor() {
        super();
        this.Type = UserCommandType.AddUser;
    }
}
exports.AddUserCommand = AddUserCommand;
class UpdateEmail extends UserCommand {
    constructor() {
        super();
        this.Type = UserCommandType.UpdateEmail;
    }
}
exports.UpdateEmail = UpdateEmail;
class UpdateFullName extends UserCommand {
    constructor() {
        super();
        this.Type = UserCommandType.UpdateFullName;
    }
}
exports.UpdateFullName = UpdateFullName;
