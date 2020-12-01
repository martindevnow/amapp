import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

admin.initializeApp();
const db: FirebaseFirestore.Firestore = admin.firestore();

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
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

/**
 * This function was used in Production to migrate to new schema for Roles
 * .. We will only need to run it again if new users signup before the other function is added
 * (although, it should exist and keep the table up to date)
 */
export const migrateRolesToNewTable = functions.https.onRequest((req, res) => {
  return new Promise((resolve, reject) => {
    db.collection("users")
      .get()
      .then((snapshot) => {
        const docs = snapshot.docs;
        return docs.map((userDoc) => {
          const uid = userDoc.id;
          const roleDocRef = db.doc(`roles/${uid}`);
          return roleDocRef
            .get()
            .then((docSnapshot) => {
              if (!docSnapshot.exists) {
                return roleDocRef.set({
                  member: true,
                  moderator: false,
                  guest: false,
                  admin: false,
                });
              }
              return Promise.resolve({ exists: true } as any);
            })
            .catch((err) => {
              console.error("Problem looking up role", err);
              return Promise.reject(err);
            });
        });
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
});
