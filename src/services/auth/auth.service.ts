import firebase from "firebase";
import firebaseService, { FirebaseService } from "../firebase/firebase.service";
import { ACL, AclActions, AclRoles, DEFAULT_ACL } from "./auth.acl";
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
  userProfileSnapshot = (uid: string) => this.userProfileRef(uid).get();

  normalizeUser = (
    userProfileSnapshot: firebase.firestore.DocumentSnapshot<IUserProfile>
  ): IUserProfile => {
    const normalizedUser = {
      uid: userProfileSnapshot.id,
      ...userProfileSnapshot.data(),
      createdAt:
        (userProfileSnapshot.data()
          ?.createdAt as firebase.firestore.Timestamp).toDate() || new Date(),
    };
    return normalizedUser as IUserProfile;
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

  canUserDo = (aclAction: AclActions, userProfile?: IUserProfile | null) => {
    const reqRoles = this.acl[aclAction];
    userProfile = userProfile || this.userProfile;
    if (!reqRoles || !reqRoles.length) {
      return false;
    }
    if (!(userProfile || this.userProfile)) {
      return reqRoles.includes(AclRoles.GUEST_ROLE);
    }
    return (
      reqRoles.includes(AclRoles.GUEST_ROLE) ||
      reqRoles.some((role) => (userProfile as IUserProfile).roles[role])
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
  ): Promise<firebase.firestore.DocumentReference<IUserProfile> | null> => {
    if (!user) {
      this.userProfile = null;
      return null;
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
      this.userProfile = profile;
      await userRef.set(profile);
    } catch (error) {
      console.error(error);
    }

    return this.userProfileRef(user.uid);
  };
}

const authService = new AuthService(firebaseService, DEFAULT_ACL);
export default authService;
