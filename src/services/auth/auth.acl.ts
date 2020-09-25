export enum AclRoles {
  GUEST_ROLE = "guest",
  MEMBER_ROLE = "member",
  MODERATOR_ROLE = "moderator",
  ADMIN_ROLE = "admin",
}

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
}

export type ACL = {
  [key in AclActions]: AclRoles[];
};

export const DEFAULT_ACL: ACL = {
  [AclActions.CREATE_ROOM]: AclEveryone,
  [AclActions.LIST_ROOMS]: AclEveryone,
  [AclActions.ARCHIVE_ROOM]: AclEveryone,
  [AclActions.DELETE_ROOM]: AclEveryone,
  [AclActions.ASK_QUESTION]: AclMembersOnly,
};
