"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.Role = void 0;
var Role;
(function (Role) {
    Role[Role["None"] = 0] = "None";
    Role[Role["Moderator"] = 1] = "Moderator";
    Role[Role["Admin"] = 2] = "Admin";
})(Role || (exports.Role = Role = {}));
var UserRole;
(function (UserRole) {
    UserRole["None"] = "";
    UserRole["Moderator"] = "moderator";
    UserRole["Admin"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
