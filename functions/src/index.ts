import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();
const db: FirebaseFirestore.Firestore = admin.firestore();

export const incrementVoteCount = functions.firestore
  .document("users/{userId}/votes/{questionId}")
  .onCreate((snapshot, context) => {
    const { questionId } = context.params;
    const data = snapshot.data() as { roomId: string };
    const { roomId } = data;
    return db.doc(`rooms/${roomId}/questions/${questionId}`).set(
      {
        upVotes: admin.firestore.FieldValue.increment(1),
      },
      { merge: true }
    );
  });

export const setupUserRoles = functions.firestore
  .document("users/{userId}")
  .onCreate((snapshot, context) => {
    // get userId, create a new entry in a roles table
    // in roles, default to least permissions
    // use same as what is in user
    const userId = context.params.userId;
    return db
      .doc(`roles/${userId}`)
      .set({
        member: true,
        moderator: false,
        guest: false,
        admin: false,
      })
      .then(() => console.log(`Setup Roles for ${userId}`))
      .catch((error) =>
        console.error(`Error setting up roles for ${userId}`, error)
      );
  });
