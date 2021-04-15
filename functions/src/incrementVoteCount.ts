import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db: FirebaseFirestore.Firestore = admin.firestore();

const incrementVoteCount = functions.firestore
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

export default incrementVoteCount;
