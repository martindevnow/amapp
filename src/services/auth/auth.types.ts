import { AclRoles } from "./auth.acl";

export interface IUserProfile {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  createdAt: Date;
  roles: {
    [key in AclRoles]: boolean;
  };
}
