import firebase, { Firebase } from "../firebase/firebase.class";

export interface IUserProfile {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  createdAt: any;
  roles?: {
    member: boolean;
    moderator: boolean;
    admin: boolean;
  };
}

export class AuthService {
  private auth: firebase.auth.Auth;
  private db: firebase.firestore.Firestore;

  constructor(private firebase: Firebase) {
    this.auth = firebase.auth;
    this.db = firebase.db;
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
    user: any, //firebase.auth.User,
    additionalData?: { displayName: string }
  ) => {
    if (!user) return;

    try {
      // Get reference to User Profile Data using Auth UID
      const userRef = this.db.doc(`users/${user.uid}`);

      const snapshot = await userRef.get();
      if (!snapshot.exists) {
        const createdAt = new Date();

        const data: IUserProfile = {
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
        await userRef.set(data);
      }
    } catch (error) {
      console.error(error);
    }

    return this.userProfileRef(user.uid);
  };
}

const authService = new AuthService(firebase);
export default authService;
