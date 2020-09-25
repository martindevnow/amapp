import firebase, { FirebaseService } from "../firebase/firebase.service";
import { ACL, AclActions, AclRoles, DEFAULT_ACL } from "./auth.acl";
import { IUserProfile } from "./auth.types";

export class AuthService {
  private auth: firebase.auth.Auth;
  private db: firebase.firestore.Firestore;
  public user: IUserProfile | null;

  constructor(private firebase: FirebaseService, private acl: ACL) {
    this.auth = firebase.auth;
    this.db = firebase.db;
    this.user = null;
  }

  loadAcl = (acl: ACL) => (this.acl = acl);
  userProfileRef = (uid: string) => this.db.doc(`users/${uid}`);
  userProfile = (uid: string) => this.userProfileRef(uid).get();

  canUserDo = (user: IUserProfile | null, aclAction: AclActions) => {
    const reqRoles = this.acl[aclAction];
    if (!reqRoles || !reqRoles.length) {
      return false;
    }
    if (user === null) {
      return reqRoles.includes(AclRoles.GUEST_ROLE);
    }
    return (
      reqRoles.includes(AclRoles.GUEST_ROLE) ||
      reqRoles.some((role) => user.roles[role])
    );
  };

  hasVotedForQuestion = async (questionId: string, userId: string) => {
    if (userId === "TODO") {
      console.log("user ID was not loaded yet");
    }
    const hasVotedRef = this.userProfileRef(userId)
      .collection("votes")
      .doc(questionId);
    const hasVoted = await hasVotedRef.get();
    return !!hasVoted.exists;
  };

  doSignInWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password: string) =>
    this.auth.currentUser?.updatePassword(password);

  doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  createUserProfileDocument = async (
    user: firebase.User | null,
    additionalData?: { displayName: string }
  ) => {
    if (!user) {
      this.user = user;
      return user;
    }

    try {
      // Get reference to User Profile Data using Auth UID
      const userRef = this.userProfileRef(user.uid);

      const snapshot = await userRef.get();
      if (snapshot.exists) {
        return userRef;
      }

      const createdAt = new Date();
      const profile: IUserProfile = {
        uid: user.uid,
        email: user.email as string,
        createdAt,
        roles: {
          [AclRoles.MEMBER_ROLE]: true,
          [AclRoles.MODERATOR_ROLE]: false,
          [AclRoles.ADMIN_ROLE]: false,
          [AclRoles.GUEST_ROLE]: false,
        },
        ...additionalData,
      };
      await userRef.set(profile);
      this.user = profile;
    } catch (error) {
      console.error(error);
    }

    return this.userProfileRef(user.uid);
  };
}

const authService = new AuthService(firebase, DEFAULT_ACL);
export default authService;
