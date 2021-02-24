import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CardGame from "./components/CardGame";

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Text>Card Game</Text>
      </View>
      <CardGame />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
