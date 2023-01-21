import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import Hint from "../components/ui/Hint";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRoundsListLength);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Dont lie!!", "You know that this is wrong !!!... ", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }
    // lower, greater
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    console.log(minBoundary, maxBoundary);
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((rounds) => [newRndNumber, ...rounds]);
  };

  const guessRoundsListLength = guessRounds.length;
  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <Hint style={styles.hintText}>Higher or Lower ?</Hint>
        <View style={styles.btnWrapper}>
          <PrimaryButton
            onPress={nextGuessHandler.bind(this, "greater")}
            flex={1}
          >
            <Ionicons name="md-add" size={24} color="#ffffff" />
          </PrimaryButton>
          <PrimaryButton
            onPress={nextGuessHandler.bind(this, "lower")}
            flex={1}
          >
            <Ionicons name="md-remove" size={24} color="#ffffff" />
          </PrimaryButton>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonContainerWide}>
          <PrimaryButton
            onPress={nextGuessHandler.bind(this, "greater")}
            flex={1}
          >
            <Ionicons name="md-add" size={24} color="#ffffff" />
          </PrimaryButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <PrimaryButton
            onPress={nextGuessHandler.bind(this, "lower")}
            flex={1}
          >
            <Ionicons name="md-remove" size={24} color="#ffffff" />
          </PrimaryButton>
        </View>
      </>
    );
  }
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        {/* {guessRounds.map((guessRound) => (
          <Text key={guessRound}>{guessRound}</Text>
        ))} */}
        <FlatList
          data={guessRounds}
          renderItem={(guessRound) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - guessRound.index}
              guess={guessRound.item}
            >
              {guessRound.item}
            </GuessLogItem>
          )}
          keyExtractor={(gR) => gR}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hintText: {
    color: "white",
    marginBottom: 20,
  },
  screen: {
    flex: 1,
    padding: 14,
    alignItems: "center",
  },
  btnWrapper: {
    flexDirection: "row",
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  buttonContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default GameScreen;
