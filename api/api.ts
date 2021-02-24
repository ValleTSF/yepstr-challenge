import axios from "axios";

export const getShuffledDeck = () => {
  return axios.get(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
};

export const getOneDrawnCard = (deckId: number) => {
  return axios.get(
    "https://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1"
  );
};
