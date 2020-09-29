interface HasCreatedAt {
  createdAt: Date;
}

export const sortByCreatedAt = (a: HasCreatedAt, b: HasCreatedAt) =>
  b.createdAt.getTime() - a.createdAt.getTime();

interface HasUpVotes {
  upVotes: number;
}

export const sortByUpVotes = (a: HasUpVotes, b: HasUpVotes) =>
  b.upVotes - a.upVotes;
