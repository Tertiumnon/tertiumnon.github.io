import { User } from './class';
import { Role, UserRole } from './enum';
import { RoleType } from './type';

// options
const ROLE_VALUES = Object.values(Role);
const isRoleValueCorrect = (value: Role) => ROLE_VALUES.includes(value);
const options = Object.entries(UserRole);

// applying
const role = UserRole.Moderator;
const roleType: RoleType = "moderator";

// class
const user = new User();
