import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db: FirebaseFirestore.Firestore = admin.firestore();

const zoomVideoUploaded = functions.https.onRequest(async (req, res) => {
  functions.logger.log("Req received", "body", req.body);

  const zoomMeetingTopic = req.body.zoomMeetingTopic;
  const zoomMeetingDate = req.body.zoomMeetingDate;
  const streamablePlaylistUrl = req.body.streamablePlaylistUrl;

  if (!zoomMeetingTopic) {
    functions.logger.error("zoomMeetingTopic is required", {
      zoomMeetingTopic,
    });
    res
      .status(400)
      .send({ success: false, message: "zoomMeetingTopic is required" });
    return;
  }

  if (!zoomMeetingDate) {
    functions.logger.error("zoomMeetingDate is required", { zoomMeetingDate });
    res
      .status(400)
      .send({ success: false, message: "zoomMeetingDate is required" });
    return;
  }

  if (!streamablePlaylistUrl) {
    functions.logger.error("streamablePlaylistUrl is required", {
      streamablePlaylistUrl,
    });
    res
      .status(400)
      .send({ success: false, message: "streamablePlaylistUrl is required" });
    return;
  }

  functions.logger.log("Request looks good");

  // Associate a Video Playlist with an AMA room, based on
  const roomsQuerySnapshot = await db
    .collection("rooms")
    .where("zoomMeetingTopic", "==", zoomMeetingTopic)
    .orderBy("zoomMeetingDate", "desc")
    .get();

  // find a room that matches the date
  const room = roomsQuerySnapshot.docs.find(
    (roomDoc) => roomDoc.data().zoomMeetingDate === zoomMeetingDate
  );

  if (!room) {
    functions.logger.log("No room found for this topic and date");
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

export default zoomVideoUploaded;
