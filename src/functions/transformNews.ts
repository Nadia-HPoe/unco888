export type NewsRecords = {
  id: string;
  tag1: string;
  tag2: string;
  tag3: string;
  title: string;
  img: string;
  text: string;
  link_ds: string;
  link_tk: string;
  link_fb: string;
  link_ig: string;
  link_tg: string;
  link_lk: string;
  link_tw: string;
  link_yt: string;
};

// Same as in the google sheet
const [id, tag1, tag2, tag3, title, img,	text,	link_ds,	link_tk,	link_fb,	link_ig,	link_tg,	link_lk,	link_tw,	link_yt, visible] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

export const transformNews = (data: string[][]): NewsRecords[] =>
  data
  .filter((line) => line[visible] === 'TRUE')
  .map((line) => ({
    id: line[id],
    tag1: line[tag1],
    tag2: line[tag2],
    tag3: line[tag3],
    title: line[title],
    img: line[img],
    text: line[text],
    link_ds: line[link_ds],
    link_tk: line[link_tk],
    link_fb: line[link_fb],
    link_ig: line[link_ig],
    link_tg: line[link_tg],
    link_lk: line[link_lk],
    link_tw: line[link_tw],
    link_yt: line[link_yt],
  }));
