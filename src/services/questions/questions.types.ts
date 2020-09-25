export interface IQuestionRecord {
  title: string;
  upVotes: number;
  authorId: string;
  anonymous: boolean;
  answered: boolean;
}

export interface IQuestion extends IQuestionRecord {
  id: string;
}
