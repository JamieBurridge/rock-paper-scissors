import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Hand from "./components/Hand";
import hands from "./data/hands";

function checkForWinner(
  playerHand,
  opponentHand,
  playerScore,
  setPlayerScore,
  opponentScore,
  setOpponentScore,
  setResult
) {
  if (playerHand.weakTo == opponentHand.name) {
    setOpponentScore(opponentScore + 1);
    setResult("Opponent wins!");
  } else if (opponentHand.weakTo == playerHand.name) {
    setPlayerScore(playerScore + 1);
    setResult("Player wins!");
  } else {
    setResult("Draw!");
  }
}

export default function App() {
  const [selectedHand, setSelectedHand] = useState(null);
  const [opponentSelectedHand, setOpponentSelectedHand] = useState(null);

  const [isPlayersTurn, setIsPlayersTurn] = useState(true);

  const [result, setResult] = useState(null);

  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);

  // Get opponent hand
  useEffect(() => {
    if (!isPlayersTurn) {
      setTimeout(() => {
        setOpponentSelectedHand(
          hands[Math.floor(Math.random() * hands.length)]
        );
      }, 1000);
    }
  }, [isPlayersTurn]);

  // Check for winner
  useEffect(() => {
    if (selectedHand && opponentSelectedHand) {
      setTimeout(() => {
        checkForWinner(
          selectedHand,
          opponentSelectedHand,
          playerScore,
          setPlayerScore,
          opponentScore,
          setOpponentScore,
          setResult
        );
        setSelectedHand(null);
        setOpponentSelectedHand(null);
        setIsPlayersTurn(true);
      }, 1000);
    }
  }, [selectedHand, opponentSelectedHand]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Rock, Paper, Scissors</Text>

      {/* Show rock, paper and scissors */}
      <View style={styles.handContainer}>
        {hands.map((hand, index) => (
          <Hand
            handImage={hand.image}
            hand={hand}
            setSelectedHand={setSelectedHand}
            key={index}
          />
        ))}
      </View>

      {isPlayersTurn ? (
        <Pressable
          onPress={() => {
            selectedHand && setIsPlayersTurn(!isPlayersTurn);
          }}
        >
          <button>Confirm</button>
        </Pressable>
      ) : (
        <Text>Opponents turn...</Text>
      )}

      <View style={styles.infoContainer}>
        {/* Selected hands */}
        <Text style={styles.infoText}>
          Selected hand: {selectedHand?.name || "None"}
        </Text>
        <Text style={styles.infoText}>
          Opponent hand: {opponentSelectedHand?.name || "None"}
        </Text>

        {/* Scores */}
        <Text style={styles.infoText}>Your score: {playerScore}</Text>
        <Text style={styles.infoText}>Opponents score: {opponentScore}</Text>

        {/* Result */}
        <Text style={styles.resultText}>{result}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 20,
  },

  heading: {
    fontSize: 25,
    fontWeight: 600,
  },

  handContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },

  infoContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },

  infoText: {
    fontSize: 17,
  },

  resultText: {
    fontSize: 20,
    fontWeight: 600,
  },
});
