import axios from "axios";

export const getShuffledDeck = async () => {
  return axios
    .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then((response) => response.data);
};

export const getOneDrawnCard = async (deckId: number) => {
  return axios
    .get("https://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1")
    .then((response) => response.data);
};
