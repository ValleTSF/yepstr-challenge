import React, { useEffect, useState } from "react";
import { View, Text, Button, Image } from "react-native";
import { getShuffledDeck, getOneDrawnCard } from "../api/api";
import { Card, CardDraw, Deck } from "../api/types";

export default function CardGame() {
  const [currentDeck, setCurrentDeck] = useState<Deck>({
    deck_id: 0,
    remaining: 0,
    shuffled: false,
    success: false,
  });
  const [currentCardDraw, setCurrentCardDraw] = useState<CardDraw>({
    cards: [],
    deck_id: 0,
    remaining: 0,
    success: false,
  });

  const [currentCard, setCurrentCard] = useState<Card>({
    code: "",
    image: "",
    suit: "",
    value: 0,
  });

  const [score, setScore] = useState(0);
  const [comparisonValue, setComparisonValue] = useState();
  const [remainingCards, setRemainingCards] = useState(0);

  useEffect(() => {
    getShuffledDeck().then((response) => {
      const { data } = response;
      setCurrentDeck(data);
      setRemainingCards(data.remaining);
      drawOneCard();
    });
  }, []);

  const drawOneCard = async () => {
    const { deck_id } = currentDeck;
    return getOneDrawnCard(deck_id).then((response) => {
      const { data } = response;
      setCurrentCard(data.cards[0]);
      setComparisonValue(data.cards[0].value);

      return data.cards[0].value;
    });
  };

  const onStart = () => {
    drawOneCard().then(() => {
      setRemainingCards(remainingCards - 1);
    });
  };

  const onPressHigher = () => {
    drawOneCard().then((cardValue) => {
      setRemainingCards(remainingCards - 1);
      const firstValue = cardValue;
      console.log(firstValue);
      console.log(comparisonValue);
      if (firstValue > comparisonValue) {
        console.log("Score");
        setScore(score + 1);
      } else {
        console.log("No Score");
      }
    });
  };

  const onPressLower = () => {
    drawOneCard().then((cardValue) => {
      setRemainingCards(remainingCards - 1);
      const firstValue = cardValue;
      console.log(firstValue);
      console.log(comparisonValue);
      if (firstValue < comparisonValue) {
        console.log("Score");
        setScore(score + 1);
      } else {
        console.log("No Score");
      }
    });
  };

  if (!currentDeck.success && currentCardDraw.success) {
    return (
      <View>
        <Text>Waiting for Deck!</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Counter: {remainingCards}</Text>
      <Text>Score: {score}</Text>
      <View>
        <Image
          style={{ width: 226, height: 314 }}
          source={{ uri: currentCard.image }}
        />
      </View>
      <View>
        <Button onPress={onPressHigher} title="Higher" color="#1cdf3d" />
        <Button onPress={onPressLower} title="Lower" color="#e01d16" />
        <Button onPress={onStart} title="Start" color="#e016be" />
      </View>
    </View>
  );
}
