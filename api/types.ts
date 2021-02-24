export type Deck = {
  deck_id: number;
  remaining: number;
  shuffled: boolean;
  success: boolean;
};

export type CardDraw = {
  cards: Card[];
  deck_id: number;
  remaining: number;
  success: boolean;
};

export type Card = {
  code: string;
  image: string;
  suit: string;
  value: number;
};

export type Images = {
  png: string;
  svg: string;
};
