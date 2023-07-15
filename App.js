import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Hand from "./components/Hand";

const rockImage = require("./assets/rock.png");
const paperImage = require("./assets/paper.png");
const scissorsImage = require("./assets/scissors.png");

const hands = [
  {
    name: "rock",
    image: rockImage,
    weakTo: "paper",
  },
  {
    name: "paper",
    image: paperImage,
    weakTo: "scissors",
  },
  {
    name: "scissors",
    image: scissorsImage,
    weakTo: "rock",
  },
];

function checkForWinner(
  playerHand,
  opponentHand,
  playerScore,
  setPlayerScore,
  opponentScore,
  setOpponentScore
) {
  if (playerHand.weakTo == opponentHand.name) {
    console.log("opponent wins");
    setOpponentScore(opponentScore + 1);
  } else if (opponentHand.weakTo == playerHand.name) {
    console.log("player wins");
    setPlayerScore(playerScore + 1);
  } else {
    console.log("draw");
  }
}

export default function App() {
  const [selectedHand, setSelectedHand] = useState();
  const [opponentSelectedHand, setOpponentSelectedHand] = useState();

  const [isPlayersTurn, setIsPlayersTurn] = useState(true);

  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);

  useEffect(() => {
    // Get opponent hand
    if (!isPlayersTurn) {
      setTimeout(() => {
        setOpponentSelectedHand(hands[0]);
        setIsPlayersTurn(true);
      }, 1000);
    }
  }, [isPlayersTurn]);

  useEffect(() => {
    // Check for winner
    if (selectedHand && opponentSelectedHand) {
      setTimeout(() => {
        checkForWinner(
          selectedHand,
          opponentSelectedHand,
          playerScore,
          setPlayerScore,
          opponentScore,
          setOpponentScore
        );
        setSelectedHand(null);
        setOpponentSelectedHand(null);
      }, 1000);
    }
  }, [selectedHand, opponentSelectedHand]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Rock, Paper, Scissors</Text>

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

      <Pressable
        onPress={() => {
          selectedHand && setIsPlayersTurn(!isPlayersTurn);
        }}
      >
        <button>Confirm</button>
      </Pressable>

      <Text>Selected hand: {selectedHand?.name || "None"}</Text>
      <Text>Opponent hand: {opponentSelectedHand?.name || "None"}</Text>

      <Text>{isPlayersTurn ? "Your turn" : "Opponents turn"}</Text>

      <View>
        <Text>Your score: {playerScore}</Text>
        <Text>Opponents score: {opponentScore}</Text>
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
});
