import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

exports.resetChecks = functions.https.onCall(async (data, context) => {
  const db = admin.firestore();
  const collectionRef = db.collection("DailyCheckWorksheets");
  const docRef = db.collection("settings").doc("dailyWorksheetSettings");
  const d = new Date().setUTCHours(0, 0, 0, 0);
  const fire = admin.firestore.Timestamp.fromMillis(d).seconds;
  //CHECK IF WORKSHEET COUNT IS INCREASED
  async function reset() {
    await collectionRef
      .get()
      .then(async (snap) => {
        if (snap) {
          // Return a Promise to await an Array of Promises
          return Promise.all(
            snap.docs.map((element) =>
              collectionRef
                .doc(element.id)
                .update({ complete: false, date: fire, downloadURL: [] })
                .catch((err) =>
                  Promise.reject({ message: err.message, status: "warning" })
                )
            )
          );
        }
        return Promise.reject({
          message: "Nothing to reset",
          status: "warning",
        });
      })
      .then(() => {
        return docRef
          .update({ worksheetCompleteCount: 0 })
          .catch((err) =>
            Promise.reject({ message: err.message, status: "warning" })
          );
      });
    return Promise.resolve({ message: "Checks Reset", status: "warning" });
  }
  return await reset().then((res) => {
    return { res };
  });
});
