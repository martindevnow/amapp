import firebase, { FirebaseService } from "../firebase/firebase.service";

export interface IUserProfile {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  createdAt: Date;
  roles?: {
    member: boolean;
    moderator: boolean;
    admin: boolean;
  };
}

export class AuthService {
  private auth: firebase.auth.Auth;
  private db: firebase.firestore.Firestore;
  public user: IUserProfile | null;

  constructor(private firebase: FirebaseService) {
    this.auth = firebase.auth;
    this.db = firebase.db;
    this.user = null;
  }

  userProfileRef = (uid: string) => this.db.doc(`users/${uid}`);
  userProfile = (uid: string) => this.userProfileRef(uid).get();

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
          member: true,
          moderator: false,
          admin: false,
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

const authService = new AuthService(firebase);
export default authService;
