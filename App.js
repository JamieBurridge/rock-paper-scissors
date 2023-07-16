import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "./components/Button";
import Hand from "./components/Hand";
import ScoresText from "./components/ScoresText";
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

      <ScoresText playerScore={playerScore} opponentScore={opponentScore} />

      {/* Show rock, paper and scissors */}
      <View style={styles.handContainer}>
        {hands.map((hand, index) => (
          <Hand
            handImage={hand.image}
            hand={hand}
            selectedHand={selectedHand}
            setSelectedHand={setSelectedHand}
            opponentSelectedHand={opponentSelectedHand}
            key={index}
          />
        ))}
      </View>

      {isPlayersTurn ? (
        <Button
          onPressFunction={() =>
            selectedHand && setIsPlayersTurn(!isPlayersTurn)
          }
        >
          Confirm
        </Button>
      ) : (
        <Text>Opponents turn...</Text>
      )}

      <Text style={styles.resultText}>{result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 20,
    gap: 20,
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

  resultText: {
    fontSize: 20,
    fontWeight: 600,
  },
});
