import firebase from "firebase";
import firebaseService, { FirebaseService } from "../firebase/firebase.service";
import {
  ACL,
  AclActions,
  AclRoleMap,
  AclRoles,
  DEFAULT_ACL,
  GuestRoleMap,
} from "./auth.acl";
import { IUserProfile } from "./auth.types";

export class AuthService {
  private userProfile: IUserProfile | null;
  private auth: firebase.auth.Auth;
  private db: firebase.firestore.Firestore;
  private storage: firebase.storage.Storage;

  constructor(firebaseService: FirebaseService, private acl: ACL) {
    console.log("AuthService :: Constructor");
    this.auth = firebaseService.auth;
    this.db = firebaseService.db;
    this.storage = firebaseService.storage;
    this.userProfile = null;
  }

  loadAcl = (acl: ACL) => (this.acl = acl);

  userProfileRef = (
    uid: string
  ): firebase.firestore.DocumentReference<IUserProfile> =>
    this.db.doc(`users/${uid}`) as firebase.firestore.DocumentReference<
      IUserProfile
    >;

  authChanged = (user: firebase.User | null) => {
    if (user === null) {
      this.userProfile = null;
      return null;
    }

    return this.userProfileRef(user.uid);
  };

  userProfileSnapshot = (uid: string) => this.userProfileRef(uid).get();

  normalizeUser = (
    userProfileSnapshot: firebase.firestore.DocumentSnapshot<IUserProfile>
  ): IUserProfile => {
    const userData = userProfileSnapshot.data();

    const normalizedUser = {
      uid: userProfileSnapshot.id,
      ...userData,
      createdAt:
        (userData &&
          userData.createdAt &&
          (userData.createdAt as firebase.firestore.Timestamp).toDate()) ||
        new Date(),
    };
    this.userProfile = normalizedUser as IUserProfile;
    return this.userProfile;
  };

  updateUser = (uid: string, profile: Partial<IUserProfile>) => {
    return this.userProfileRef(uid).update(profile);
  };

  saveUserProfilePic = (uid: string, file: File) => {
    return this.storage
      .ref()
      .child("user-profiles")
      .child(uid)
      .child(file.name)
      .put(file)
      .then((resp) => resp.ref.getDownloadURL())
      .then((photoURL) => this.userProfileRef(uid).update({ photoURL }));
  };

  canUserDo = (aclAction: AclActions) => {
    const reqRoles = this.acl[aclAction];
    const roles: AclRoleMap = this.userProfile?.roles || GuestRoleMap;
    if (aclAction === AclActions.DELETE_QUESTION) {
      console.log({ aclAction, reqRoles, roles });
    }
    if (!reqRoles || !reqRoles.length) {
      console.error(
        `This action was not registered in the system. Default to hide. Check action ${aclAction} `
      );
      return false;
    }
    return reqRoles.some((role) => !!roles[role]);
  };

  // TODO: Add separate resolvers for Auth => ACL => Route (guard)
  // canUserVisit = (
  //   path: string | string[] | undefined,
  //   params: any
  // ): boolean => {};

  hasVotedForQuestion = async (questionId: string, userId: string) => {
    if (userId === "TODO") {
      console.warn("Guests cannot vote.");
      return false;
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
  ): Promise<firebase.firestore.DocumentReference<IUserProfile> | null> => {
    console.log("AuthService :: createUserProfileDocument", { additionalData });
    if (!user) {
      this.userProfile = null;
      return null;
    }

    try {
      // Get reference to User Profile Data using Auth UID
      const userRef = this.userProfileRef(user.uid);

      const snapshot = await userRef.get();
      if (snapshot.exists) {
        console.log("snapshot.exists is true, do not make new profile");
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
      this.userProfile = profile;
      console.log(
        "AuthService :: createUserProfileDocument",
        "saving new profile",
        { profile }
      );
      await userRef.set(profile);
    } catch (error) {
      console.error(error);
    }

    return this.userProfileRef(user.uid);
  };
}

const authService = new AuthService(firebaseService, DEFAULT_ACL);
export default authService;
