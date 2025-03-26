"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var class_1 = require("./class");
var enum_1 = require("./enum");
var ROLE_VALUES = Object.values(enum_1.Role);
var isRoleValueCorrect = function (value) { return ROLE_VALUES.includes(value); };
var role = enum_1.UserRole.Moderator;
var roleType = "moderator";
// class
var user = new class_1.User();
