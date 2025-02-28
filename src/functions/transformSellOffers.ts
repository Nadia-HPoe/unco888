export type SellOffersRecords = {
  id: string;
  quantity: string;
  price: string;
  link: string;
  contact: string;
};

// Same as in the google sheet
const [id, quantity, price, link, contact, visible] = [0, 1, 2, 3, 4, 5];

export const transformSellOffers = (data: string[][]): SellOffersRecords[] =>
  data
    .filter((line) => line[visible] === 'TRUE')
    .map((line) => ({
      id: line[id],
      quantity: line[quantity],
      price: line[price],
      link: line[link],
      contact: line[contact],
    }));
