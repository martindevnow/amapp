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

export const zoomVideoUploaded = functions.https.onRequest(async (req, res) => {
  const { zoomMeetingTopic, zoomMeetingDate, streamablePlaylistUrl } = req.body;

  // TODO: Associate a Video Playlist with an AMA room, based on
  //
  const roomsQuerySnapshot = await db
    .collection("rooms")
    .where("zoomMeetingTopic", "==", zoomMeetingTopic)
    .orderBy("zoomMeetingDate", "desc")
    .get();
  // const rooms = roomsQuerySnapshot.docs.map((doc) => doc.data());

  // find a room that matches the date
  const room = roomsQuerySnapshot.docs.find(
    (room) => room.data().zoomMeetingDate === zoomMeetingDate
  );

  if (!room) {
    res.status(404).send({
      success: false,
      error: `No room was found with the 'zoomMeetingTopic' of '${zoomMeetingTopic}' for the date '${zoomMeetingDate}'`,
    });
    return;
  }

  // Save the streamablePlaylistUrl to the room document
  await room.ref.update({ cfVideoUrl: streamablePlaylistUrl });

  res.status(200).send({
    success: true,
    message: `Room ID: ${room.id} (${room.data().name}) had a video attached.`,
  });
  return;
});
