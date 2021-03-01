// import Logger from "../../utils/Logger";
import { AclActions } from "../auth/auth.acl";
import { AuthService } from "../auth/auth.service";
import { FirebaseService } from "../firebase/firebase.service";
import { IQuestionRecord } from "./questions.types";

export class QuestionsService {
  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private roomId: string
  ) {
    // Logger.log(`QuestionsService :: Constructor for room ${this.roomId}`);
  }

  private _getRoom = () =>
    this.firebaseService.db.collection("rooms").doc(this.roomId);

  deleteQuestion = async (questionId: string) => {
    return this._getRoom().collection("questions").doc(questionId).delete();
  };

  approveQuestion = async (questionId: string) => {
    return this._getRoom()
      .collection("questions")
      .doc(questionId)
      .update({ approved: true });
  };

  markQuestionAsDiscussed = async (questionId: string) => {
    await this._getRoom().update({ activeQuestionId: questionId });
    return this._getRoom()
      .collection("questions")
      .doc(questionId)
      .update({ answered: true });
  };

  unmarkQuestionAsDiscussed = async (questionId: string) => {
    return this._getRoom()
      .collection("questions")
      .doc(questionId)
      .update({ answered: false });
  };

  answerQuestion = async (questionId: string, answer: string) => {
    return this._getRoom()
      .collection("questions")
      .doc(questionId)
      .update({ answer });
  };

  askQuestion = async (question: IQuestionRecord) => {
    // TODO: Add ACL layer, here?
    // TODO: Generate CreatedAt on the Backend
    const createdAt = new Date();
    const questionRef = this._getRoom()
      .collection("questions")
      .add({
        ...question,
        createdAt,
        // TODO: Disable Auto Approve
        approved: true,
      });
    const questionAskedSnapshot = await (await questionRef).get();
    const questionId = questionAskedSnapshot.id;

    if (
      this.firebaseService.auth.currentUser &&
      this.firebaseService.auth.currentUser.uid
    ) {
      this.authService
        .userProfileRef(this.firebaseService.auth.currentUser.uid)
        .collection("votes")
        .doc(questionId)
        .set({ questionId });
    }
    return { ...questionAskedSnapshot, id: questionId };
  };

  upVoteQuestion = async (questionId: string) => {
    if (!this.authService.canUserDo(AclActions.UP_VOTE_QUESTION)) {
      // TODO: Throw error here?
      console.error(
        "User is not allowed to UpVote.. this should not have been triggered..."
      );
      return false;
    }
    const batch = this.firebaseService.db.batch();
    // const questionRef = this._getRoom().collection("questions").doc(questionId);

    // TODO: Expand ACL here
    if (
      this.firebaseService.auth.currentUser &&
      this.firebaseService.auth.currentUser.uid
    ) {
      const hasVotedRef = this.authService
        .userProfileRef(this.firebaseService.auth.currentUser.uid)
        .collection("votes")
        .doc(questionId);
      const hasVoted = await hasVotedRef.get();
      // Check if the user already voted
      if (hasVoted.exists) {
        // If so, do nothing
        return Promise.reject("The user has already voted for this question");
      }
      batch.set(hasVotedRef, { questionId, roomId: this.roomId });
    }

    batch.commit();
    return true;
  };

  clearActiveQuestion = () => {
    this._getRoom().update({ activeQuestionId: "" });
  };
}
