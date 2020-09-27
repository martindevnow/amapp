export enum AclRoles {
  GUEST_ROLE = "guest",
  MEMBER_ROLE = "member",
  MODERATOR_ROLE = "moderator",
  ADMIN_ROLE = "admin",
}

export type AclRoleMap = {
  [key in AclRoles]: boolean;
};

export const GuestRoleMap: AclRoleMap = {
  [AclRoles.GUEST_ROLE]: true,
  [AclRoles.MEMBER_ROLE]: false,
  [AclRoles.MODERATOR_ROLE]: false,
  [AclRoles.ADMIN_ROLE]: false,
};

const AclEveryone = [
  AclRoles.GUEST_ROLE,
  AclRoles.MEMBER_ROLE,
  AclRoles.MODERATOR_ROLE,
  AclRoles.ADMIN_ROLE,
];

const AclMembersOnly = [
  AclRoles.MEMBER_ROLE,
  AclRoles.MODERATOR_ROLE,
  AclRoles.ADMIN_ROLE,
];

const AclModeratorsOnly = [AclRoles.MODERATOR_ROLE, AclRoles.ADMIN_ROLE];

const AclAdminsOnly = [AclRoles.ADMIN_ROLE];

export enum AclActions {
  LIST_ROOMS = "LIST_ROOMS",
  CREATE_ROOM = "CREATE_ROOM",
  ARCHIVE_ROOM = "ARCHIVE_ROOM",
  DELETE_ROOM = "DELETE_ROOM",

  ASK_QUESTION = "ASK_QUESTION",
  DELETE_QUESTION = "DELETE_QUESTION",
  APPROVE_QUESTION = "APPROVE_QUESTION",
  UP_VOTE_QUESTION = "UP_VOTE_QUESTION",
  ANSWER_QUESTION = "ANSWER_QUESTION",

  // Routing
  VISIT_HOME = "VISIT_HOME",
  VISIT_ROOM = "VISIT_ROOM",
}

export type ACL = {
  [key in AclActions]: AclRoles[];
};

export const DEFAULT_ACL: ACL = {
  // Members
  [AclActions.UP_VOTE_QUESTION]: AclMembersOnly,
  [AclActions.ASK_QUESTION]: AclMembersOnly,
  [AclActions.LIST_ROOMS]: AclMembersOnly,

  [AclActions.VISIT_HOME]: AclMembersOnly,
  [AclActions.VISIT_ROOM]: AclMembersOnly,

  // Moderator or Higher
  [AclActions.CREATE_ROOM]: AclModeratorsOnly,

  [AclActions.APPROVE_QUESTION]: AclModeratorsOnly,
  [AclActions.DELETE_QUESTION]: AclModeratorsOnly,
  [AclActions.ANSWER_QUESTION]: AclModeratorsOnly,

  [AclActions.ARCHIVE_ROOM]: AclAdminsOnly,
  [AclActions.DELETE_ROOM]: AclAdminsOnly,
};
