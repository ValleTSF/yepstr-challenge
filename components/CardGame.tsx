import React, { useState } from "react";
import { View, Text, Button, Image } from "react-native";
import { getShuffledDeck, getOneDrawnCard } from "../api/api";
import { Card, Deck } from "../api/types";

export default function CardGame() {
  const [currentDeck, setCurrentDeck] = useState<Deck>({
    deck_id: 0,
    remaining: 0,
    shuffled: false,
    success: false,
  });

  const [currentCard, setCurrentCard] = useState<Card>({
    code: "",
    image: "",
    suit: "",
    value: 0,
  });

  const [score, setScore] = useState(0);
  const [comparisonValue, setComparisonValue] = useState(0);
  const [remainingCards, setRemainingCards] = useState(0);

  const start = () => {
    getShuffledDeckFromApi();
  };

  const getShuffledDeckFromApi = () => {
    getShuffledDeck().then((response) => {
      setCurrentDeck(response);
      setRemainingCards(response.remaining);
      drawOneCard(response.deck_id);
    });
  };

  const convertStringToValue = (card: any) => {
    if (card.value === "ACE") {
      card.value = 14;
    } else if (card.value === "KING") {
      card.value = 13;
    } else if (card.value === "QUEEN") {
      card.value = 12;
    } else if (card.value === "JACK") {
      card.value = 11;
    } else {
      card.value = parseInt(card.value);
    }
    return card;
  };

  const drawOneCard = async (deck_id: number) => {
    try {
      const response = await getOneDrawnCard(deck_id);
      const convertedCard = convertStringToValue(response.cards[0]);
      setRemainingCards(response.remaining);
      setCurrentCard(convertedCard);
      setComparisonValue(convertedCard.value);
      return response.cards[0];
    } catch (error) {
      console.log(error);
    }
  };

  const onStart = () => {
    setScore(0);
    if (remainingCards === 0) {
      start();
    } else {
      drawOneCard(currentDeck.deck_id);
    }
  };

  const onPressHigher = () => {
    drawOneCard(currentDeck.deck_id)
      .then((card: any) => {
        const { value } = card;
        if (value > comparisonValue) {
          setScore(score + 1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onPressLower = () => {
    drawOneCard(currentDeck.deck_id)
      .then((card: any) => {
        const { value } = card;
        if (value < comparisonValue) {
          setScore(score + 1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderCardImage = () => {
    if (currentCard.image.length > 1) {
      return (
        <Image
          style={{ width: 226, height: 314 }}
          source={{ uri: currentCard.image }}
        />
      );
    }
  };

  if (remainingCards === 52 || remainingCards === 0) {
    return (
      <View>
        <Text>Waiting for Deck!</Text>
        <Button onPress={onStart} title="Start" color="#e016be" />
      </View>
    );
  }

  return (
    <View>
      <Text>Counter: {remainingCards}</Text>
      <Text>Score: {score}</Text>
      <View>{renderCardImage()}</View>
      <View>
        <Button onPress={onPressHigher} title="Higher" color="#1cdf3d" />
        <Button onPress={onPressLower} title="Lower" color="#e01d16" />
      </View>
    </View>
  );
}
