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

export const toSeconds = (minutesColonSeconds: string) => {
  const minSecRegex = /([0-6]?[0-9]):([0-6][0-9])/;
  const values = minutesColonSeconds.match(minSecRegex);
  if (!values) {
    return 0;
  }
  const [, minutes, seconds] = values;
  return +minutes * 60 + +seconds;
};
