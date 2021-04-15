import * as admin from "firebase-admin";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

export { default as zoomVideoUploadStarted } from "./zoomVideoUploadStarted";
export { default as zoomVideoUploaded } from "./zoomVideoUploaded";
export { default as setupUserRoles } from "./setupUserRoles";
export { default as incrementVoteCount } from "./incrementVoteCount";
