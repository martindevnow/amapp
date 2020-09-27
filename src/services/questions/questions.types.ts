export interface IQuestionRecord {
  title: string;
  upVotes: number;
  author: {
    uid: string;
    name: string;
  };
  anonymous: boolean;
  answered: boolean;
  deleted?: boolean;
  approved?: boolean;
}

export interface IQuestion extends IQuestionRecord {
  id: string;
  createdAt: Date;
}