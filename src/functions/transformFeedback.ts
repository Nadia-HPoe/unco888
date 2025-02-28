export type FeedbackRecords = {
  id: string;
  name: string;
  photo: string;
  message: string;
};

const [id, name, photo, message, visible] = [0, 1, 2, 3, 4];

export const transformFeedback = (data: string[][]): FeedbackRecords[] =>
  data
    .filter((line) => line[visible] === 'TRUE')
    .map((line) => ({
      id: line[id],
      name: line[name],
      photo: line[photo],
      message: line[message],
    }));