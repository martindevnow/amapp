import { AclRoles } from "./auth.acl";

export interface IUserProfile {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  createdAt: firebase.firestore.Timestamp | Date;
  roles: {
    [key in AclRoles]: boolean;
  };
}
